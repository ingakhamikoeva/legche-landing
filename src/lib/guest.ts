// Гостевой доступ к «Лёгкой версии»: 3 попытки на устройство (localStorage).
// API приложения (лог запросов + AI-совет) подключается флагом API_ENABLED,
// когда чат приложения отдаст публичные эндпоинты. До этого лендинг работает
// автономно с честной заглушкой.

export const APP_URL = 'https://app.legche.online';
const API_BASE = `${APP_URL}/api/v1/public`;
export const API_ENABLED = false; // включить после готовности эндпоинтов

export const MAX_GUEST_ATTEMPTS = 3;
const COUNT_KEY = 'legche_guest_attempts';

export function guestAttemptsUsed(): number {
  try { return Math.max(0, parseInt(localStorage.getItem(COUNT_KEY) ?? '0', 10) || 0); }
  catch { return 0; }
}

export function attemptsLeft(): number {
  return Math.max(0, MAX_GUEST_ATTEMPTS - guestAttemptsUsed());
}

export function markGuestAttempt(): void {
  try { localStorage.setItem(COUNT_KEY, String(guestAttemptsUsed() + 1)); }
  catch { /* приватный режим — ок */ }
}

// Запросы гостей идут в общий список «что ищут» (план съёмок Инги)
export function logGuestSearch(query: string, result: string): void {
  if (!API_ENABLED) { console.info('[light-search-log:stub]', { query, result }); return; }
  fetch(`${API_BASE}/light-search-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, result, source: 'landing' }),
    keepalive: true,
  }).catch(() => { /* лендинг никогда не выглядит сломанным */ });
}

// AI-совет «как сделать блюдо легче». null = недоступен → честная заглушка в UI.
export async function fetchAiAdvice(query: string): Promise<string | null> {
  if (!API_ENABLED) return null;
  try {
    const r = await fetch(`${API_BASE}/light-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query.slice(0, 50) }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return typeof data.answer === 'string' && data.answer ? data.answer : null;
  } catch {
    return null;
  }
}

// Ссылка на регистрацию с проброской UTM — источник доходит до аналитики приложения
export function registerUrl(): string {
  if (typeof window === 'undefined') return `${APP_URL}/register`; // пререндер: без UTM
  const utm = new URLSearchParams();
  const current = new URLSearchParams(window.location.search);
  for (const [k, v] of current) if (k.startsWith('utm_')) utm.set(k, v);
  const qs = utm.toString();
  return `${APP_URL}/register${qs ? `?${qs}` : ''}`;
}
