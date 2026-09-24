# SHIFT — Digital Agency

Готовый сайт digital-агентства на Nuxt 3.

## Что внутри

- **11 секций**: Hero, Marquee, About, Services, Portfolio, Process, Pricing, Team, Testimonials, FAQ, Contact
- **Nuxt 3** + Vue 3 + TypeScript
- **Lenis** — плавный скролл
- **Anime.js** + **Split-Type** — премиум-анимации
- **Animate.css** — появление элементов
- **Swiper** — слайдер отзывов
- **Vee-validate + Zod** — валидация форм
- **Telegram Bot API** — реальная отправка заявок
- **@nuxt/image**, **@nuxt/fonts**, **@nuxt/icon**, **@nuxtjs/seo**
- Кастомный курсор, магнитные кнопки, scroll progress, marquee
- Шрифт **Anton** (бесплатный аналог Coolvetica) из Google Fonts

## Установка

1. Установите зависимости:
   ```
   npm install
   ```

2. Создайте `.env` (скопируйте из `.env.example`):
   ```
   cp .env.example .env
   ```

3. Заполните Telegram-токены (инструкция ниже).

4. Запустите:
   ```
   npm run dev
   ```

## Настройка Telegram для заявок

1. Откройте Telegram, найдите **@BotFather**
2. Отправьте `/newbot`, задайте имя и username
3. Получите токен вида `1234567890:ABC...`
4. Вставьте токен в `.env` → `TELEGRAM_BOT_TOKEN`
5. Найдите **@userinfobot**, отправьте `/start` — он покажет ваш `id`
6. Вставьте id в `.env` → `TELEGRAM_CHAT_ID`
7. **Важно**: напишите вашему боту любое сообщение (иначе он не сможет вам писать)

Теперь все заявки с формы будут приходить в Telegram.

## Кастомизация

Все стили — в `assets/css/tokens.css`. Меняйте переменные:

- `--color-accent` — акцентный цвет
- `--font-display` — шрифт заголовков
- `--font-body` — основной шрифт
- `--space-*` — отступы
- `--radius-*` — радиусы

## Структура

- `assets/css/` — токены и базовые стили
- `components/layout/` — header, footer
- `components/sections/` — 11 секций
- `components/ui/` — курсор, тосты, split-text, аккордеон
- `composables/` — scroll, parallax, magnetic, toast
- `server/api/contact.post.ts` — API для Telegram
- `plugins/lenis.client.ts` — плавный скролл

## Сборка

```
npm run build      # SSR
npm run generate   # статика в .output/public
```

## Деплой

Рекомендую **Vercel** или **Netlify**:
1. Запушьте код в GitHub
2. Подключите репозиторий на Vercel
3. Добавьте env-переменные из `.env` в настройках Vercel
4. Deploy
