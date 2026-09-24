<template>
  <section id="services" class="section">
    <div class="container">
      <span class="section-label reveal">02 — Услуги</span>
      <h2 class="section-title reveal">Что мы <span class="text-accent">делаем</span></h2>
      <div class="services-grid">
        <article v-for="(s, i) in services" :key="i" class="service glass glass-hover reveal">
          <div class="service__num text-accent">0{{ i + 1 }}</div>
          <h3 class="service__title">{{ s.title }}</h3>
          <p class="service__desc text-muted">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  { title: 'Веб-разработка', desc: 'Создание сайтов и веб-приложений на Vue 3 и Nuxt. SPA, SSR, PWA.' },
  { title: 'UI/UX Дизайн', desc: 'Проектирование интерфейсов: исследование, прототипы, дизайн-система.' },
  { title: 'Брендинг', desc: 'Логотипы, фирменный стиль, айдентика, брендбук.' },
  { title: 'Маркетинг', desc: 'Продвижение в digital: SEO, контент, таргет, аналитика.' },
]
</script>

<style scoped>
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.service { padding: 2.5rem; display: flex; flex-direction: column; gap: 1rem; min-height: 260px; }
.service__num { font-family: var(--font-display); font-size: 2.5rem; opacity: 0.7; }
.service__title { font-size: var(--fs-h3); margin-top: auto; }
.service__desc { font-size: 0.95rem; }
</style>
