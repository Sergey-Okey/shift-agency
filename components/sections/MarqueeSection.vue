<template>
  <section class="marquee">
    <div class="marquee__track">
      <div class="marquee__content" v-for="i in 2" :key="i">
        <span v-for="word in words" :key="word" class="marquee__word">
          {{ word }}<span class="marquee__dot" />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const words = ['Дизайн', 'Разработка', 'Брендинг', 'Маркетинг', 'Стратегия', 'Инновации']
</script>

<style scoped>
.marquee { padding: 2rem 0; border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); overflow: hidden; white-space: nowrap; }
.marquee__track { display: flex; gap: 4rem; animation: marquee 30s linear infinite; }
.marquee__content { display: flex; gap: 4rem; flex-shrink: 0; }
.marquee__word { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 4rem); text-transform: uppercase; color: var(--color-fg); display: flex; align-items: center; gap: 4rem; }
.marquee__dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); flex-shrink: 0; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>
