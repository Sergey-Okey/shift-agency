<template>
  <section class="hero">
    <div class="hero__glow" />
    <div class="container hero__inner">
      <div class="hero__badge glass reveal">SHIFT · Digital Agency · 2025</div>

      <h1 class="hero__title">
        <SplitText :stagger="30">Мы создаем</SplitText><br>
        <SplitText :stagger="30" :delay="200" class="text-accent">цифровые</SplitText><br>
        <SplitText :stagger="30" :delay="400">продукты</SplitText>
      </h1>

      <p class="hero__lead reveal">
        Команда экспертов, объединяющая креативность и технологии для роста вашего бизнеса.
      </p>

      <div class="hero__cta reveal">
        <a href="#portfolio" class="btn btn-accent magnetic">Смотреть работы</a>
        <a href="#contact" class="btn btn-ghost magnetic">Обсудить проект</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { onMounted } from 'vue'
import SplitText from '~/components/ui/SplitText.vue'

onMounted(() => {
  anime({ targets: '.hero__glow', scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4], duration: 5000, loop: true, easing: 'easeInOutSine' })
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: calc(var(--header-height) + 4rem) 0 4rem;
  overflow: hidden;
}

.hero__glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.hero__inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero__badge {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-fg-dim);
  margin-bottom: 2.5rem;
}

.hero__title {
  font-size: var(--fs-h1);
  margin-bottom: 2rem;
}

.hero__lead {
  font-size: 1.15rem;
  color: var(--color-fg-mute);
  max-width: 600px;
  margin: 0 auto 3rem;
}

.hero__cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
