<template>
  <div>
    <UiCustomCursor />
    <UiScrollProgress />
    <UiToastContainer />
    <LayoutAppHeader />

    <main>
      <SectionsHeroSection />
      <SectionsMarqueeSection />
      <SectionsAboutSection />
      <SectionsServicesSection />
      <SectionsPortfolioSection />
      <SectionsProcessSection />
      <SectionsPricingSection />
      <SectionsTeamSection />
      <SectionsTestimonialsSection />
      <SectionsFaqSection />
      <SectionsContactSection />
    </main>

    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
useScrollReveal()
useParallax()
useMagnetic('.magnetic', 0.25)

useSeoMeta({
  title: 'SHIFT — Digital Agency | Веб-разработка, дизайн, брендинг',
  description: 'Создаем цифровые продукты: сайты, приложения, брендинг. Vue 3, Nuxt, TypeScript.',
  ogTitle: 'SHIFT — Digital Agency',
  ogDescription: 'Создаем цифровые продукты, которые работают на бизнес.',
  ogType: 'website',
})
</script>
