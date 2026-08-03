import { useEffect, useRef, useState } from 'react';
import {
  searchLightVersion, timesLighter,
  type LightRecipeEntry, type KnownQueryEntry,
} from '../lib/light-version';
import {
  attemptsLeft, markGuestAttempt, logGuestSearch, fetchAiAdvice, registerUrl,
  MAX_GUEST_ATTEMPTS, APP_URL,
} from '../lib/guest';
import { reachGoal, GOALS } from '../lib/analytics';
import { recipePhoto } from '../lib/photos';
import { replacementTeaser } from '../lib/teasers';

// Чипсы — по ТЗ v2 (блоки 1 и 8)
const CHIPS = ['шарлотка', 'оливье', 'блины', 'котлеты'];

type ResultState =
  | { view: 'idle' }
  | { view: 'recipe'; entry: LightRecipeEntry; query: string; left: number }
  | { view: 'advice'; heading: string; lines: string[]; left: number }
  | { view: 'limit' }; // попытки кончились → экран регистрации

// Счётчик оставшихся подборов (тексты — из ТЗ v2, раздел 3)
function AttemptsLeftNote({ left }: { left: number }) {
  if (left >= MAX_GUEST_ATTEMPTS || left <= 0) return null;
  const text = left === 1 ? 'остался 1 подбор без регистрации' : `осталось ${left} подбора без регистрации`;
  return <p className="mt-3 text-sm text-ink-soft">{text}</p>;
}

function TrialCta({ place, label = 'Попробовать' }: { place: string; label?: string }) {
  return (
    <a
      href={`${APP_URL}/register`}
      onClick={(e) => { e.currentTarget.href = registerUrl(); reachGoal(GOALS.CTA_TRIAL, { place }); }}
      className="mt-5 inline-block w-full rounded-2xl bg-orange px-6 py-4 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-orange-deep sm:w-auto"
    >
      {label}
    </a>
  );
}

function RecipeCard({ entry, query, left }: { entry: LightRecipeEntry; query: string; left: number }) {
  const photo = recipePhoto(entry.recipeId);
  const teaser = replacementTeaser(entry.recipeId);
  const title = query.trim().charAt(0).toUpperCase() + query.trim().slice(1).toLowerCase();
  return (
    <div className="animate-rise mt-6 rounded-3xl border border-line bg-card p-5 text-left shadow-sm sm:p-7">
      {photo && (
        <div className="relative mb-5">
          {/* На фото — лёгкая версия Инги, честная плашка (правка №6) */}
          <img
            src={photo}
            alt={`${title} — лёгкая версия`}
            width={1200}
            height={600}
            className="aspect-[2/1] w-full rounded-2xl object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-sm font-semibold text-orange-deep">
            лёгкая версия
          </span>
        </div>
      )}
      <p className="text-xl font-bold text-bordeaux">{title}</p>
      {/* Две колонки: за 2 секунды понятно, где сколько (правка №5) */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-cream p-4">
          <p className="text-sm text-ink-soft">Классическая</p>
          <p className="mt-1 text-3xl font-bold">~{entry.classicKcal} <span className="text-base font-semibold">ккал</span></p>
        </div>
        <div className="rounded-2xl bg-leaf-mist p-4">
          <p className="text-sm text-ink-soft">Лёгкая</p>
          <p className="mt-1 text-3xl font-bold text-leaf">{entry.lightKcal} <span className="text-base font-semibold">ккал</span></p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-leaf-mist px-3 py-1 text-sm font-semibold text-leaf">
          {timesLighter(entry.classicKcal, entry.lightKcal)}
        </span>
        {teaser && <span className="text-ink">{teaser}</span>}
      </div>
      <TrialCta place="result_recipe" />
      <AttemptsLeftNote left={left} />
    </div>
  );
}

function AdviceCard({ heading, lines, left }: { heading: string; lines: string[]; left: number }) {
  return (
    <div className="animate-rise mt-6 rounded-3xl border border-line bg-card p-5 text-left shadow-sm sm:p-7">
      <p className="font-display text-xl font-bold text-bordeaux">{heading}</p>
      {lines.map((l, i) => (
        <p key={i} className="mt-3 leading-relaxed text-ink-soft">{l}</p>
      ))}
      <TrialCta place="result_advice" />
      <AttemptsLeftNote left={left} />
    </div>
  );
}

function LimitScreen() {
  return (
    <div className="animate-rise mt-6 rounded-3xl border border-line bg-card p-5 text-left shadow-sm sm:p-7">
      <p className="font-display text-xl font-bold text-bordeaux">
        Понравилось? Зарегистрируйтесь — и подбирайте без ограничений.
      </p>
      <p className="mt-3 leading-relaxed text-ink-soft">Первые 7 дней бесплатно.</p>
      <TrialCta place="limit_screen" label="Начать бесплатно" />
    </div>
  );
}

export default function LightSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<ResultState>({ view: 'idle' });
  const [busy, setBusy] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Результат появляется ниже поля — на телефоне без прокрутки его не видно
  useEffect(() => {
    if (state.view !== 'idle') resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [state]);

  async function run(raw: string) {
    const q = raw.trim();
    if (q.length < 2 || busy) return;

    if (attemptsLeft() <= 0) {
      setState({ view: 'limit' });
      return;
    }

    setBusy(true);
    const res = searchLightVersion(q);
    markGuestAttempt();
    const left = attemptsLeft();
    const attempt = MAX_GUEST_ATTEMPTS - left; // номер попытки 1/2/3 — в аналитику
    logGuestSearch(q, res.kind);

    if (res.kind === 'recipes') {
      reachGoal(GOALS.RESULT_RECIPE, { query: q, attempt });
      setState({ view: 'recipe', entry: res.entries[0], query: q, left });
    } else if (res.kind === 'hopeless') {
      reachGoal(GOALS.RESULT_AI, { query: q, attempt, kind: 'hopeless' });
      setState({ view: 'advice', heading: q, lines: [res.entry.answer], left });
    } else {
      // known / unknown → AI-совет; пока эндпоинта нет — честная заглушка (тексты из ТЗ v2)
      reachGoal(GOALS.RESULT_AI, { query: q, attempt, kind: res.kind });
      const advice = await fetchAiAdvice(q);
      const known = res.kind === 'known' ? (res as { entry: KnownQueryEntry }).entry : null;
      const lines: string[] = [];
      if (known) lines.push(`В классической версии — примерно ${known.classicKcal} ккал на 100 г.`);
      lines.push(advice ?? 'Такого рецепта у меня пока нет — в приложении подскажу, как сделать его легче.');
      lines.push('Записала ваш запрос — возможно, скоро сниму этот рецепт.');
      setState({ view: 'advice', heading: known ? known.label : q, lines, left });
    }
    setBusy(false);
  }

  return (
    <div className={compact ? '' : 'w-full'}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => reachGoal(GOALS.INPUT_INTERACT)}
          onKeyDown={(e) => { if (e.key === 'Enter') run(query); }}
          placeholder="Какое блюдо вы любите?"
          maxLength={50}
          className="w-full rounded-2xl border border-line bg-card px-5 py-4 text-lg placeholder:text-ink-soft/70 focus:border-orange"
          aria-label="Какое блюдо вы любите?"
        />
        {/* Кнопка обязана помещаться в одну строку на мобильном;
            запасной вариант «Легче!» — согласовать с Ингой на вёрстке */}
        <button
          type="button"
          onClick={() => run(query)}
          disabled={busy}
          className="whitespace-nowrap rounded-2xl bg-orange px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-orange-deep disabled:opacity-60"
        >
          Хочу легче
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setQuery(c); reachGoal(GOALS.CHIP_CLICK, { chip: c }); }}
            className="rounded-full bg-orange-mist px-4 py-2 text-orange-deep transition-colors hover:bg-orange hover:text-white"
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={resultRef}>
        {state.view === 'recipe' && <RecipeCard entry={state.entry} query={state.query} left={state.left} />}
        {state.view === 'advice' && <AdviceCard heading={state.heading} lines={state.lines} left={state.left} />}
        {state.view === 'limit' && <LimitScreen />}
      </div>
    </div>
  );
}
