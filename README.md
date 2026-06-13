# Добрострой 25 - сайт

Сайт строительной компании из Владивостока. Продаём тротуарную плитку, стеновые блоки и бордюры. На сайте есть каталог с фильтрами, корзина, страницы доставки, сертификатов, отзывов и контактов, плюс админка для управления товарами и SEO.

## Стек

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query - запросы к API
- React Hook Form + Zod - формы и валидация
- Axios - HTTP-клиент
- HeroUI - часть UI-компонентов

## Как запустить

Нужен Node 20+ (или Bun).

```bash
git clone https://github.com/Nichich/stroyka.git
cd stroyka
npm install
```

Скопируйте `.env.example` в `.env` и при необходимости поправьте адреса:

```bash
cp .env.example .env
```

Запуск в режиме разработки:

```bash
npm run dev
```

Дальше открываете http://localhost:3000.

Сборка и прод:

```bash
npm run build
npm run start
```

## Структура

```
src/
  app/          # роутинг и страницы (App Router), включая (public) и admin
  components/   # UI-компоненты по фичам
  services/     # обращения к API
  hooks/        # кастомные хуки (товары, категории, заказы, авторизация и т.д.)
  providers/    # провайдеры (query-клиент и пр.)
  data/         # статичные данные для главной и демо-каталога
  shared/       # типы, общие утилиты, api-хелперы
  constants/    # константы (в т.ч. SEO)
  config/       # конфиги (api, url)
public/         # картинки, иконки, сертификаты
```

## Переменные окружения

- `NEXT_PUBLIC_APP_URL` - адрес фронта
- `NEXT_PUBLIC_APP_DOMAIN` - домен (для кук)
- `NEXT_PUBLIC_SERVER_URL` - адрес бэкенда
- `NEXT_PUBLIC_NODE_ENV` - окружение (dev/prod)

## Ветки

- `main` - сам сайт
- `task` - материалы по учебному заданию: постановка задачи, ТЗ, дизайн, userflow, оценка, оптимизация и т.д.
