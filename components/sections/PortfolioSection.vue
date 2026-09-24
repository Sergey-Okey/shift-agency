<template>
  <section id="portfolio" class="section">
    <div class="container">
      <span class="section-label reveal">03 — Кейсы</span>
      <h2 class="section-title reveal">Работы, <span class="text-accent">которые</span> говорят</h2>
      <div class="portfolio-grid">
        <article v-for="(p, i) in projects" :key="i" class="project glass glass-hover reveal">
          <div class="project__img">
            <NuxtImg :src="p.img" :alt="p.title" format="webp" width="800" height="600" />
          </div>
          <div class="project__body">
            <span class="project__tag text-muted">{{ p.tag }}</span>
            <h3 class="project__title">{{ p.title }}</h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  { title: 'Core of Life', tag: 'Vue · Nuxt · TS', img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80' },
  { title: 'Carbon Core', tag: 'Open Source', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' },
  { title: 'Noir Series', tag: 'Photography', img: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=800&q=80' },
]
</script>

<style scoped>
.portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.project { overflow: hidden; padding: 0; }
.project__img { aspect-ratio: 4 / 3; overflow: hidden; }
.project__img :deep(img) { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease-out-expo); }
.project:hover .project__img :deep(img) { transform: scale(1.08); }
.project__body { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.project__tag { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; }
.project__title { font-size: var(--fs-h4); }
</style>
