# Легче — лендинг legche.online

Каркас лендинга (день 1). Стек тот же, что у приложения: Vite + React + TypeScript + Tailwind.

## Что где лежит

- `src/lib/light-version.ts` — **копия базы из приложения, здесь не редактируется**. Правило синхронизации — в шапке файла.
- `src/lib/analytics.ts` — Яндекс.Метрика. Перед выкладкой вписать номер счётчика в `YM_ID`.
- `src/lib/guest.ts` — гостевая попытка, заглушки API. Когда чат приложения отдаст эндпоинты — поставить `API_ENABLED = true`.
- `src/components/` — первый экран с вводом и все блоки ТЗ.
- `oferta.html`, `privacy.html` — страницы-заготовки под юридические тексты.

## Флаги (одна строка — одно включение)

| Что | Где | Когда включать |
|---|---|---|
| Метрика | `analytics.ts` → `YM_ID` | перед выкладкой (день 2) |
| Живой AI и лог запросов | `guest.ts` → `API_ENABLED = true` | когда готовы публичные эндпоинты |
| Плашка «цены основателей» | `Sections.tsx` → `FOUNDERS_PRICE_ENABLED = true` | при включении оплаты |

## Деплой (для Инги, коротко)

1. Загрузить файлы в репозиторий `legche-landing` на GitHub (Add file → Upload files).
2. На сервере:
   ```
   cd ~/legche-landing
   git pull
   npm install
   npm run build
   ```
3. Папку `dist/` отдаёт nginx на домене `legche.online`. Пример конфига:
   ```
   server {
     server_name legche.online;
     root /home/USER/legche-landing/dist;
     location = /oferta  { try_files /oferta.html =404; }
     location = /privacy { try_files /privacy.html =404; }
     location / { try_files $uri /index.html; }
   }
   ```
   (Точный конфиг согласуем с чатом приложения — nginx общий на два домена; SSL — Let's Encrypt.)

Подробная пошаговая инструкция «с телефона» будет в день 3.
