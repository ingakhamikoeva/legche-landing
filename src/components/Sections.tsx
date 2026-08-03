import { useEffect, useState } from 'react';
import { LIGHT_RECIPES, timesLighter } from '../lib/light-version';
import { APP_URL, registerUrl } from '../lib/guest';
import { reachGoal, GOALS, initMetrika } from '../lib/analytics';
import LightSearch from './LightSearch';
import ingaPhoto from '../assets/inga.webp';
import mark from '../assets/mark.png';
import { recipePhoto } from '../lib/photos';
import {
  IconLesson, IconPlate, IconChat, IconHeadphones, IconDiary, IconShield,
  IconVk, IconTelegram, IconYoutube, IconInstagram, IconMax,
} from './Icons';

/* ---------- Шапка (ТЗ v2, раздел 2) ---------- */
export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-5 py-4">
      <a href="/" className="flex items-center gap-2.5">
        <img src={mark} alt="" width={208} height={240} className="h-10 w-auto sm:h-12" />
        {/* Трёхстрочный замок формулы (правка Инги); строки-спутники равны
            по ширине слову ЛЕГЧЕ; на мобильном — только «Легче» */}
        <span className="w-fit leading-none">
          <span className="hidden w-full justify-between text-[13px] font-medium leading-tight text-ink-soft sm:flex">
            <span>Снизить</span><span>вес</span>
          </span>
          <span className="block text-2xl font-bold uppercase leading-none tracking-wide text-bordeaux">Легче</span>
          <span className="hidden w-full justify-between text-[13px] font-medium leading-tight text-ink-soft sm:flex">
            <span>чем</span><span>кажется</span>
          </span>
        </span>
      </a>
      <div className="flex items-center gap-2">
        <a
          href={APP_URL}
          className="rounded-xl px-3 py-2 font-medium text-ink-soft transition-colors hover:text-orange"
        >
          Войти
        </a>
        <a
          href={`${APP_URL}/register`}
          onClick={(e) => { e.currentTarget.href = registerUrl(); reachGoal(GOALS.CTA_TRIAL, { place: 'header' }); }}
          className="rounded-xl bg-orange px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-deep"
        >
          Начать бесплатно
        </a>
      </div>
    </header>
  );
}

/* ---------- Блок 1: первый экран ---------- */
export function Hero() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 pb-12 pt-4 sm:pt-10">
      {/* Правка Инги 05.07: заголовок разделён — крупно призыв, мелко обещание;
          строка «Без запретов, подсчётов и голода…» убрана */}
      <h1 className="font-display text-[1.4rem] font-bold leading-snug text-bordeaux sm:text-4xl sm:leading-tight">
        Напишите блюдо, от которого вы не готовы отказаться
      </h1>
      <p className="mt-3 text-lg text-ink-soft">
        За 5 секунд покажу, как его есть и худеть
      </p>
      <div className="mt-6">
        <LightSearch />
      </div>
    </section>
  );
}

/* ---------- Блок 2: почему диеты не работают ---------- */
export function WhyDietsFail() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">
        Срыв после любой диеты — это не слабая сила воли. Это голод и ограничения.
      </h2>
      {/* Полотно текста разбито на плашки — тот же приём, что в блоке «о вас» (правка Инги) */}
      <div className="mt-6 space-y-3">
        <div className="rounded-3xl border border-line bg-card p-5 leading-relaxed">
          Все диеты устроены одинаково: запретить всё вкусное и держаться на силе воли. Голод копится и
          побеждает — так работает физиология, это нормально. Потом следует срыв и откат. Так происходит
          почти у всех.
        </div>
        <div className="rounded-3xl border border-line bg-card p-5 leading-relaxed">
          Метод «Лёгкая замена» убирает голод и ограничения — основные причины срыва. Вы продолжаете есть
          любимые блюда и получать удовольствие от еды. Просто эти блюда становятся в несколько раз легче
          по калориям.
        </div>
        <div className="rounded-3xl border border-line bg-card p-5 leading-relaxed">
          Считать ничего не нужно — ни калории, ни баллы, ни граммы.
        </div>
      </div>
      <p className="mt-6 text-xl font-semibold text-orange-deep">
        Не отказывайтесь от любимого — сделайте его легче.
      </p>
    </section>
  );
}

/* ---------- Блок 3: почему работает «Лёгкая замена» ---------- */
export function WhyItWorks() {
  return (
    <section className="bg-orange-mist/60 py-12">
      <div className="mx-auto w-full max-w-4xl px-5">
      <div className="grid items-start gap-6 sm:grid-cols-[240px_1fr]">
        {/* Кадр с фотосессии (оранжевая рубашка, десерт) — выбран Ингой 04.07
            как самый близкий к «живому». Замена = перезаписать src/assets/inga.webp. */}
        <img
          src={ingaPhoto}
          alt="Инга, нутрициолог"
          width={600}
          height={720}
          loading="lazy"
          className="aspect-[5/6] w-full rounded-3xl object-cover object-top sm:aspect-auto sm:h-72"
        />
        <div>
          <h2 className="font-display text-3xl font-bold text-bordeaux">
            Меня зовут Инга, я нутрициолог и специалист по снижению веса
          </h2>
          <p className="mt-3 leading-relaxed">
            Я сама похудела на 17 кг в 44 года и сохраняю результат более 2 лет.
          </p>
          <p className="mt-5 font-semibold">Вот на чём построен метод «Лёгкая замена»:</p>
          <div className="mt-3 space-y-4">
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="leading-relaxed">
                Вы уже видели его в деле. Лёгкая версия вашего любимого блюда выше — это не презентация, а
                сам метод в действии. Вы не ограничиваете себя запретами и не испытываете чувство голода.
                У вас в рационе остаются десерты — только лёгкие. Фрукты, ягоды, жареное, выпечка — вы
                научитесь это есть и худеть.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="font-semibold text-bordeaux">
                Есть три этапа снижения веса: снижение → фиксация → сохранение. Все они важны.
              </p>
              <p className="mt-2 leading-relaxed">
                Если вы похудели, но не зафиксировали вес — высокая вероятность, что он вернётся снова.
                Если не управляете весом на этапе сохранения — он также может вернуться.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="leading-relaxed">
                Метод ведёт вас до конца — вы снизите вес, зафиксируете его и научитесь сохранять.
                Большинство программ заканчиваются на первом этапе — мы пройдём все три.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------- Блок 4: витрина ----------
   Названия — обычные (не фирменные), цифры — строго из light-version.ts.
   Поиск по алиасу: карточки «Жареная картошка» и «Котлеты» появятся
   автоматически, когда рецепты войдут в базу приложения и придёт новая
   копия файла (блокеры запуска — ТЗ v2, раздел 11). До этого показываем
   только то, что реально есть в базе. */
// 4 карточки для симметрии. Обновление базы 06.07: картошка и котлеты стали
// настоящими карточками сравнения (алиас «жареная картошка» подхватывается
// автоматически, правка кода не понадобилась); котлеты не в витрине, но
// остаются в гостевом поиске с фото.
const SHOWCASE: { display: string; alias: string }[] = [
  { display: 'Шоколадный пирог с вишней', alias: 'шоколадный кекс' },
  { display: 'Жареная картошка', alias: 'жареная картошка' },
  { display: 'Шарлотка', alias: 'шарлотка' },
  { display: 'Блины', alias: 'блины' },
];

export function Showcase() {
  const cards = SHOWCASE
    .map(({ display, alias }) => {
      const r = LIGHT_RECIPES.find((x) => x.aliases.includes(alias));
      return r ? { display, r } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">Любимое — в лёгкой версии</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ display, r }) => (
          <div key={display} className="rounded-3xl border border-line bg-card p-4">
            {recipePhoto(r.recipeId) ? (
              <img
                src={recipePhoto(r.recipeId)!}
                alt={display}
                width={900}
                height={600}
                loading="lazy"
                className="mb-3 h-28 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mb-3 flex h-28 items-center justify-center rounded-2xl bg-orange-mist text-center text-sm text-orange-deep">
                фото скоро
              </div>
            )}
            <p className="font-display font-bold leading-snug text-bordeaux">{display}</p>
            <p className="mt-1 text-sm text-ink-soft">
              ~{r.classicKcal} → <span className="font-semibold text-leaf">{r.lightKcal} ккал</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">{timesLighter(r.classicKcal, r.lightKcal)}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 leading-relaxed">
        База фирменных рецептов уже внутри. Новые видеорецепты снимаю по вашим запросам: введённое блюдо
        попадает в план съёмок.
      </p>
    </section>
  );
}

/* ---------- Блок 5: что внутри ---------- */
export function WhatsInside() {
  const rows: [React.ComponentType<{ className?: string }>, string, React.ReactNode][] = [
    [IconLesson, '«Не знаю, как похудеть»', <><b>короткие уроки</b>, простым языком, без домашних заданий</>],
    [IconPlate, '«Не знаю, что можно есть»', <><b>лёгкая версия любого блюда</b>, карта лёгких замен, база проверенных рецептов, меню на 2 недели как ориентир</>],
    [IconChat, '«Некого спросить»', <><b>чат с AI-помощницей, обученной на моём методе</b>: в любое время. Сложные случаи разбираю лично.</>],
    [IconHeadphones, '«Пропадает мотивация, срываюсь»', <><b>поддерживающие аудиопрактики</b> для настроя и мотивации; <b>копилка лёгкости</b>: сэкономленные калории в цифрах; отчёты о прогрессе; награды за достижения</>],
    [IconDiary, '«Начинаю и бросаю»', <><b>дневник питания, утренние мини-отчёты, трекер воды</b></>],
    [IconShield, '«Похудею и снова наберу»', <><b>сопровождение на этапах фиксации и сохранения веса</b> — там, где решается всё</>],
  ];
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">
        Внутри — всё, чего вам не хватало при прошлых попытках похудеть:
      </h2>
      <div className="mt-6 space-y-4">
        {rows.map(([Icon, q, a]) => (
          <div key={q} className="flex items-start gap-4 rounded-3xl border border-line bg-card p-5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-mist text-orange">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-bordeaux">{q}</p>
              <p className="mt-2 leading-relaxed">{a}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 leading-relaxed">
        Плюс гайды по продуктам и сахарозаменителям — чтобы в магазине выбирать было просто.
      </p>
      {/* Скриншот «дневник + чат» из ТЗ v1 в v2 не упомянут — уточнено у Инги, пока не ставим */}
    </section>
  );
}

/* ---------- Блок 6: честные ожидания ---------- */
export function HonestExpectations() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">Чего я не обещаю</h2>
      <p className="mt-4 leading-relaxed">
        Минус 10 кг за месяц. Плоский живот к пятнице. Чуда без изменений пищевых привычек.
      </p>
      <h2 className="mt-8 font-display text-3xl font-bold text-bordeaux">Что обещаю</h2>
      <p className="mt-4 leading-relaxed">
        Вы освоите хитрости в приготовлении, благодаря которым снизите калорийность вашего рациона.
      </p>
      <p className="mt-3 leading-relaxed">
        Вы перестанете испытывать чувство голода и сможете есть даже на ночь.
      </p>
      <p className="mt-3 leading-relaxed">
        Вес пойдёт вниз — в комфортном для вашего тела темпе. Возможно, килограммы будут уходить медленнее,
        чем в рекламе марафонов. Но — надёжнее, чем всё, что вы пробовали.
      </p>
      <p className="mt-4 leading-relaxed">
        Приложение не заменяет врача. При тревожных симптомах приложение порекомендует обратиться к врачу.
      </p>
    </section>
  );
}

/* ---------- Блок 7: цена ---------- */
export function Pricing() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">Давайте посчитаем</h2>
      <p className="mt-4 leading-relaxed">
        Месяц сопровождения у нутрициолога стоит 15 000–30 000 ₽. Одна расширенная консультация —
        6 000–12  000 ₽.
      </p>
      <p className="mt-3 leading-relaxed">
        Здесь — поддержка каждый день, база рецептов, уроки и лёгкая версия любого блюда:
      </p>
      {/* Год — первый и визуально главный (ТЗ v2) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-orange bg-card p-6">
          <p className="font-display text-2xl font-bold text-bordeaux">Год — 6 990 ₽</p>
          <p className="mt-1 text-ink-soft">≈583 ₽/мес</p>
          <p className="mt-2 leading-relaxed">Год ежедневного сопровождения — дешевле одной консультации.</p>
        </div>
        <div className="rounded-3xl border border-line bg-card p-6">
          <p className="font-display text-2xl font-bold text-bordeaux">Месяц — 1 490 ₽</p>
        </div>
      </div>
      {/* Плашка основателей: счётчик 100 мест настоящий, по исчерпании плашка снимается */}
      <div className="mt-4 rounded-3xl bg-orange-mist p-5">
        <p className="leading-relaxed">
          ▸ <b>Первым 100 подписчикам — 4 990 ₽/год или 990 ₽/мес. Навсегда.</b> Когда места закончатся,
          предложение исчезнет. Вы помогаете продукту расти — я закрепляю за вами стартовую цену.
        </p>
      </div>
      <p className="mt-5 leading-relaxed">
        <b>Начните с 7 дней бесплатно.</b> Карта не нужна. Если решите, что это не ваше, — просто ничего не
        делайте: списаний и писем с уговорами не будет.
      </p>
      <a
        href={`${APP_URL}/register`}
        onClick={(e) => { e.currentTarget.href = registerUrl(); reachGoal(GOALS.CTA_TRIAL, { place: 'pricing' }); }}
        className="mt-6 inline-block w-full rounded-2xl bg-orange px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-orange-deep sm:w-auto"
      >
        Попробовать
      </a>
    </section>
  );
}

/* ---------- Блок 8: финал ---------- */
export function FinalAsk() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12">
      <h2 className="font-display text-3xl font-bold text-bordeaux">
        От какого блюда вы не готовы отказаться?
      </h2>
      <p className="mt-3 text-lg text-ink-soft">
        Напишите — покажу лёгкую версию прямо сейчас. Бесплатно, за 5 секунд.
      </p>
      <div className="mt-6">
        <LightSearch compact />
      </div>
    </section>
  );
}

/* ---------- Подвал ---------- */
export function Footer() {
  return (
    <footer className="mt-8 border-t border-line">
      <div className="mx-auto w-full max-w-4xl px-5 py-8 text-sm text-ink-soft">
        <p className="text-base font-semibold text-bordeaux">Снизить вес — легче, чем кажется.</p>
        {/* Соцсети Инги (правка 05.07) — тихой строкой, чтобы не спорить с CTA */}
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://vk.com/club239899185" target="_blank" rel="noopener noreferrer"
             aria-label="ВКонтакте"
             className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-mist text-orange-deep transition-colors hover:bg-orange hover:text-white">
            <IconVk className="h-5 w-5" />
          </a>
          <a href="https://t.me/hudeemsvarenjem" target="_blank" rel="noopener noreferrer"
             aria-label="Telegram"
             className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-mist text-orange-deep transition-colors hover:bg-orange hover:text-white">
            <IconTelegram className="h-5 w-5" />
          </a>
          <a href="https://www.youtube.com/@Inga_Orange" target="_blank" rel="noopener noreferrer"
             aria-label="YouTube"
             className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-mist text-orange-deep transition-colors hover:bg-orange hover:text-white">
            <IconYoutube className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com/inga_orange_" target="_blank" rel="noopener noreferrer"
             aria-label="Instagram"
             className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-mist text-orange-deep transition-colors hover:bg-orange hover:text-white">
            <IconInstagram className="h-5 w-5" />
          </a>
          <a href="https://max.ru/se13278182_biz" target="_blank" rel="noopener noreferrer"
             aria-label="MAX"
             className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-mist text-orange-deep transition-colors hover:bg-orange hover:text-white">
            <IconMax className="h-5 w-5" />
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <a href="/oferta" className="hover:text-orange">Публичная оферта</a>
          <a href="/privacy" className="hover:text-orange">Политика обработки персональных данных</a>
        </div>
        {/* Реквизиты (ИП / самозанятость) — вписать перед подключением ЮKassa */}
        <p className="mt-4">© {new Date().getFullYear()} Легче · legche.online</p>
      </div>
    </footer>
  );
}

/* ---------- Кука-баннер (Метрика) ---------- */
const CONSENT_KEY = 'legche_cookie_ok';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ok = false;
    try { ok = localStorage.getItem(CONSENT_KEY) === '1'; } catch { /* ignore */ }
    if (ok) initMetrika();
    else setVisible(true);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card p-4 shadow-lg">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-soft">
          Мы используем cookie для работы сайта и Яндекс.Метрики.{' '}
          <a href="/privacy" className="underline hover:text-orange">Подробнее</a>
        </p>
        <button
          onClick={() => {
            try { localStorage.setItem(CONSENT_KEY, '1'); } catch { /* ignore */ }
            initMetrika();
            setVisible(false);
          }}
          className="shrink-0 rounded-xl bg-orange px-5 py-2 font-medium text-white hover:bg-orange-deep"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
}
