<template>
  <section class="section">
    <div class="container">
      <span class="section-label reveal">06 — Команда</span>
      <h2 class="section-title reveal">Те, кто <span class="text-accent">делает</span></h2>
      <div class="team-grid">
        <article v-for="(m, i) in members" :key="i" class="member glass glass-hover reveal">
          <div class="member__avatar">
            <NuxtImg :src="m.avatar" :alt="m.name" format="webp" width="400" height="400" />
          </div>
          <h3 class="member__name">{{ m.name }}</h3>
          <p class="member__role text-accent">{{ m.role }}</p>
          <p class="member__bio text-muted">{{ m.bio }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const members = [
  { name: 'Александр К.', role: 'Founder / Tech Lead', bio: '10 лет в веб-разработке. Специалист по Vue, Nuxt, архитектуре.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Мария С.', role: 'Design Lead', bio: 'UI/UX дизайнер. Создает интерфейсы, которые продают.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Игорь В.', role: 'Fullstack Developer', bio: 'Backend + Frontend. Node.js, TypeScript, PostgreSQL.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
]
</script>

<style scoped>
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.member { padding: 2rem; text-align: center; display: flex; flex-direction: column; gap: 0.5rem; align-items: center; }
.member__avatar { width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin-bottom: 1rem; border: 2px solid var(--glass-border); }
.member__avatar :deep(img) { width: 100%; height: 100%; object-fit: cover; }
.member__name { font-size: var(--fs-h4); }
.member__role { font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; }
.member__bio { font-size: 0.9rem; margin-top: 0.5rem; }
</style>
