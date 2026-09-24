<template>
  <section id="pricing" class="section">
    <div class="container">
      <span class="section-label reveal">05 — Тарифы</span>
      <h2 class="section-title reveal">Прозрачные <span class="text-accent">цены</span></h2>
      <div class="pricing-grid">
        <article v-for="(plan, i) in plans" :key="i" class="plan glass glass-hover reveal" :class="{ 'plan--featured': plan.featured }">
          <span v-if="plan.featured" class="plan__badge">Популярный</span>
          <h3 class="plan__name">{{ plan.name }}</h3>
          <div class="plan__price">
            <span class="plan__price-value">{{ plan.price }}</span>
            <span class="plan__price-currency">₽</span>
          </div>
          <p class="plan__desc text-muted">{{ plan.desc }}</p>
          <ul class="plan__features">
            <li v-for="f in plan.features" :key="f">
              <span class="text-accent">✓</span> {{ f }}
            </li>
          </ul>
          <a href="#contact" class="btn btn-accent magnetic plan__btn">Выбрать</a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    name: 'Лендинг',
    price: 'от 80 000',
    desc: 'Одностраничный сайт для продукта или услуги',
    features: ['Дизайн под ключ', 'Адаптив', 'Форма заявок', 'Базовое SEO', '2 недели'],
    featured: false,
  },
  {
    name: 'Корпоративный',
    price: 'от 200 000',
    desc: 'Многостраничный сайт с админкой',
    features: ['До 10 страниц', 'CMS', 'Аналитика', 'SEO-оптимизация', 'Интеграции', '4-6 недель'],
    featured: true,
  },
  {
    name: 'Web App',
    price: 'от 500 000',
    desc: 'Веб-приложение или SPA с логикой',
    features: ['Кастомная разработка', 'API', 'Авторизация', 'Дашборды', '8+ недель'],
    featured: false,
  },
]
</script>

<style scoped>
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: stretch; }
.plan { padding: 3rem 2rem; display: flex; flex-direction: column; gap: 1rem; position: relative; }
.plan--featured { border-color: var(--color-accent); box-shadow: 0 0 40px var(--color-accent-soft); }
.plan__badge { position: absolute; top: -12px; left: 2rem; background: var(--color-accent); color: var(--color-bg); padding: 0.35rem 0.9rem; border-radius: var(--radius-pill); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.plan__name { font-size: var(--fs-h3); }
.plan__price { display: flex; align-items: baseline; gap: 0.35rem; margin: 0.5rem 0; }
.plan__price-value { font-family: var(--font-display); font-size: 2.2rem; color: var(--color-accent); }
.plan__price-currency { font-size: 1.2rem; color: var(--color-fg-mute); }
.plan__desc { font-size: 0.9rem; margin-bottom: 1rem; }
.plan__features { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; flex: 1; }
.plan__features li { font-size: 0.9rem; display: flex; gap: 0.5rem; align-items: flex-start; }
.plan__btn { width: 100%; justify-content: center; }
</style>
