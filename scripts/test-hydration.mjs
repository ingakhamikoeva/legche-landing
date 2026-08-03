// Функциональный тест боевой сборки: гидратация пререндеренного HTML
// настоящим клиентским бандлом + клики, как у пользователя.
import { readFileSync, readdirSync } from 'node:fs';
import { Window } from 'happy-dom';

const html = readFileSync('dist/index.html', 'utf8');
const win = new Window({ url: 'https://legche.online/' });
const doc = win.document;

// глобали браузера для бандла
globalThis.window = win;
globalThis.document = doc;
Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
globalThis.localStorage = win.localStorage;
globalThis.location = win.location;
globalThis.HTMLElement = win.HTMLElement;
globalThis.HTMLAnchorElement = win.HTMLAnchorElement;
globalThis.Element = win.Element;
globalThis.Node = win.Node;
globalThis.requestIdleCallback = (cb) => setTimeout(cb, 0);
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);

doc.write(html);

const errors = [];
win.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origError = console.error;
console.error = (...args) => { errors.push('console.error: ' + args.join(' ').slice(0, 200)); };

// импортирую боевой клиентский бандл
const mainJs = readdirSync('dist/assets').find((f) => f.startsWith('main-') && f.endsWith('.js'));
await import('../dist/assets/' + mainJs);
await new Promise((r) => setTimeout(r, 300));

console.error = origError;

const q = (sel) => doc.querySelector(sel);
const qa = (sel) => [...doc.querySelectorAll(sel)];

console.log('=== после гидратации ===');
console.log('ошибок React/окна:', errors.length, errors.slice(0, 3));
console.log('h1:', q('h1')?.textContent?.slice(0, 50));
console.log('карточек витрины:', qa('img').length, 'картинок всего');

// сценарий пользователя: чипс «шарлотка» → кнопка «Хочу легче»
const chip = qa('button').find((b) => b.textContent.trim() === 'шарлотка');
chip.click();
await new Promise((r) => setTimeout(r, 50));
const input = q('input');
console.log('после чипса поле =', JSON.stringify(input.value));

const btn = qa('button').find((b) => b.textContent.trim() === 'Хочу легче');
btn.click();
await new Promise((r) => setTimeout(r, 200));

const bodyText = doc.body.textContent;
console.log('=== после «Хочу легче» ===');
console.log('карточка результата (Классическая/Лёгкая):', bodyText.includes('Классическая') && bodyText.includes('Лёгкая'));
console.log('цифры шарлотки (~230 → 122):', bodyText.includes('~230') && bodyText.includes('122'));
console.log('«в 1,9 раза легче»:', bodyText.includes('в 1,9 раза легче'));
console.log('счётчик «осталось 2 подбора»:', bodyText.includes('осталось 2 подбора'));

// вторая попытка: ввод текстом
input.value = 'жареная картошка';
input.dispatchEvent(new win.Event('input', { bubbles: true }));
await new Promise((r) => setTimeout(r, 50));
btn.click();
await new Promise((r) => setTimeout(r, 200));
const t2 = doc.body.textContent;
console.log('=== вторая попытка: картошка ===');
console.log('цифры картошки (~190 → 60):', t2.includes('~190') && t2.includes('60'));
console.log('«остался 1 подбор»:', t2.includes('остался 1 подбор'));
console.log('итого ошибок за весь прогон:', errors.length);
