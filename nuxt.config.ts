export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/seo',
  ],

  css: [
    'animate.css/animate.min.css',
    'lenis/dist/lenis.css',
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://shift-agency.ru',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'SHIFT — Digital Agency',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#050505' },
      ],
    },
  },

  fonts: {
    families: [
      { name: 'Anton', provider: 'google', weights: [400] },
      { name: 'Raleway', provider: 'google', weights: [300, 400, 500, 600, 800] },
    ],
  },

  image: {
    format: ['webp', 'avif'],
    quality: 80,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://shift-agency.ru',
    name: 'SHIFT Digital Agency',
    description: 'Современное digital-агентство: веб-разработка, дизайн, брендинг',
    defaultLocale: 'ru',
  },

  ogImage: {
    enabled: true,
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
  },

  typescript: { strict: true, typeCheck: false },
})
