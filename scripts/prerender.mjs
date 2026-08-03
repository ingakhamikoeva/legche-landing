// Пререндер боевой сборки: вставляет готовый HTML в dist/index.html
// и сверяет, что все пути картинок из HTML существуют в dist.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { render } from '../dist-ssr/entry-server.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const file = join(root, 'dist', 'index.html');
const html = readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Маркер #root не найден');

const rendered = render();

// Проверка целостности: каждый src="/assets/..." из отрендеренного HTML
// должен существовать как файл в dist (иначе картинки на сайте пропадут).
const srcs = [...rendered.matchAll(/src="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
const missing = srcs.filter((s) => !existsSync(join(root, 'dist', s)));
if (missing.length) throw new Error('В dist нет файлов: ' + missing.join(', '));
console.log(`prerender: картинки сверены (${srcs.length} шт., все на месте)`);

writeFileSync(file, html.replace(marker, `<div id="root">${rendered}</div>`));
console.log('prerender: HTML вставлен в dist/index.html');
