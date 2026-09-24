<template>
  <section id="process" class="section">
    <div class="container">
      <span class="section-label reveal">04 — Процесс</span>
      <h2 class="section-title reveal">Как мы <span class="text-accent">работаем</span></h2>
      <div class="process-grid">
        <article v-for="(s, i) in steps" :key="i" class="step glass glass-hover reveal">
          <span class="step__num text-accent">0{{ i + 1 }}</span>
          <h3 class="step__title">{{ s.title }}</h3>
          <p class="step__desc text-muted">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { title: 'Анализ', desc: 'Изучаем бизнес, конкурентов и аудиторию. Формируем гипотезы.' },
  { title: 'Стратегия', desc: 'Создаем концепцию, прототип и техническое задание.' },
  { title: 'Разработка', desc: 'Дизайн, код, интеграции, тестирование.' },
  { title: 'Запуск', desc: 'Деплой, аналитика, поддержка и развитие.' },
]
</script>

<style scoped>
.process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
.step { padding: 2.5rem 2rem; }
.step__num { font-family: var(--font-display); font-size: 2.5rem; display: block; margin-bottom: 1.5rem; }
.step__title { font-size: var(--fs-h4); margin-bottom: 0.75rem; }
.step__desc { font-size: 0.9rem; }
</style>
