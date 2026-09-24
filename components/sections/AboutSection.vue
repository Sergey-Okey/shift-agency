<template>
  <section id="about" class="section">
    <div class="container">
      <span class="section-label reveal">01 — О нас</span>
      <h2 class="section-title reveal">Создаем <span class="text-accent">смыслы</span>, а не просто сайты</h2>
      <div class="about-grid">
        <article v-for="(item, i) in items" :key="i" class="about-card glass glass-hover reveal">
          <div class="about-card__num">{{ item.num }}</div>
          <h3 class="about-card__title">{{ item.title }}</h3>
          <p class="about-card__text text-muted">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  { num: '5+', title: 'Лет опыта', text: 'Работаем с бизнесом любого масштаба — от стартапов до корпораций.' },
  { num: '120+', title: 'Проектов', text: 'Запустили более 120 проектов в 15 нишах — от e-commerce до финтеха.' },
  { num: '98%', title: 'Довольных', text: 'Клиенты возвращаются и рекомендуют нас своим партнерам.' },
]
</script>

<style scoped>
.about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.about-card { padding: 3rem 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.about-card__num { font-family: var(--font-display); font-size: clamp(3rem, 5vw, 5rem); line-height: 1; color: var(--color-accent); }
.about-card__title { font-size: var(--fs-h4); margin-bottom: 0.5rem; }
.about-card__text { font-size: 0.95rem; }
@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
</style>
