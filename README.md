# МЕТЭЛ Chat

Frontend-прототип корпоративного мессенджера. Проект предназначен для демонстрации интерфейса, адаптивной вёрстки, состояний компонентов и локальной логики без подключения backend.

## Стек

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- Radix UI
- shadcn-style components
- Lucide React

## Запуск локально

Требуется совместимая с Vite 7 версия Node.js: Node.js 20.19+ или 22.12+.

```bash
npm install
npm run dev
```

После запуска откройте адрес, который Vite покажет в терминале. По умолчанию приложение доступно по адресу `http://localhost:5173/`.

## Production-сборка

```bash
npm run build
npm run preview
```

Команда `npm run build` проверяет TypeScript и создаёт готовую статическую сборку в каталоге `dist/`. Команда `npm run preview` запускает локальный сервер для проверки этой сборки.

## Данные и состояние

Backend и база данных отсутствуют. Интерфейс использует mock-данные из `src/data/mock.ts`, а изменения хранятся только в локальном состоянии React. После обновления страницы состояние сбрасывается к исходным mock-данным.

## Публикация

Проект является обычным Vite SPA и может публиковаться на Vercel со стандартным Vite preset:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Приложение использует клиентскую маршрутизацию. Файл `vercel.json` перенаправляет прямые запросы к маршрутам SPA на `index.html`.
