// Яндекс.Метрика: подключение и цели воронки (раздел 6 ТЗ).
// YM_ID — номер счётчика Яндекс.Метрики. Если поставить 0, счётчик
// выключается и события уходят в console (удобно для отладки).

export const YM_ID = 111314472;

// Имена целей. Их же нужно создать в интерфейсе Метрики (тип: JavaScript-событие).
export const GOALS = {
  INPUT_INTERACT: 'input_interact',   // цель 2: фокус в поле ввода
  CHIP_CLICK: 'chip_click',           // цель 2: клик по чипсу
  RESULT_RECIPE: 'result_recipe',     // цель 3: показ карточки — рецепт найден
  RESULT_AI: 'result_ai',             // цель 3: показ карточки — AI-совет / вне базы
  CTA_TRIAL: 'cta_trial_click',       // цель 4: клики «Попробовать» / «Начать бесплатно» (параметр place)
  // цель 1 (визит с UTM) Метрика считает сама;
  // цели 5–6 (регистрация, дневник, возврат дня 3) — на стороне приложения.
} as const;

declare global {
  interface Window { ym?: (id: number, action: string, ...args: unknown[]) => void }
}

export function initMetrika(): void {
  if (!YM_ID) return;
  // Отложенная загрузка: не блокирует отрисовку первого экрана
  const load = () => {
    if (window.ym) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(s);
    // очередь до загрузки скрипта
    const w = window as unknown as Record<string, unknown>;
    w.ym = w.ym || function (this: unknown, ...args: unknown[]) {
      ((w.ym as { a?: unknown[][] }).a = (w.ym as { a?: unknown[][] }).a || []).push(args);
    };
    (w.ym as { l?: number }).l = Date.now();
    window.ym!(YM_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
  };
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 });
  else setTimeout(load, 1500);
}

export function reachGoal(goal: string, params?: Record<string, unknown>): void {
  if (YM_ID && window.ym) window.ym(YM_ID, 'reachGoal', goal, params);
  else console.info('[metrika:stub]', goal, params ?? '');
}
