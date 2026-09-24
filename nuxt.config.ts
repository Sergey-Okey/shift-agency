export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
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
    ogImage: {
      secret: process.env.NUXT_OG_IMAGE_SECRET || 'shift-agency-og-secret-2026',
    },
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://shift-agency.ru',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'SHIFT — Digital Agency',
      meta: [
        { name: 'theme-color', content: '#050505' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
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

  seo: {
    treeShakeUseSeoMeta: false,
    metaDataFiles: false,
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
