<template>
  <section id="services" class="section section--services">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <!-- Заголовок -->
      <header class="services__head">
        <span class="section-label reveal">{{ $t('services.label') }}</span>
        <h2 class="section-title reveal">
          {{ $t('services.title') }} <span class="text-accent">{{ $t('services.titleAccent') }}</span>
        </h2>
      </header>

      <!-- Список услуг -->
      <div ref="listRef" class="services-list">
        <article v-for="(s, i) in services" :key="i" class="service-row" :class="`service-row--c${i + 1}`">
          <!-- Свечение за строкой (импульс при hover) -->
          <span class="service-row__halo" aria-hidden="true" />
          <!-- Aurora-градиент по строке -->
          <span class="service-row__glow" aria-hidden="true" />

          <!-- Название -->
          <h3 class="service-row__title">{{ s.title }}</h3>

          <!-- Описание -->
          <p class="service-row__desc">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const listRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const services = computed(() => [
  { title: t('services.items.web.title'), desc: t('services.items.web.desc') },
  { title: t('services.items.design.title'), desc: t('services.items.design.desc') },
  { title: t('services.items.branding.title'), desc: t('services.items.branding.desc') },
  { title: t('services.items.marketing.title'), desc: t('services.items.marketing.desc') },
])

onMounted(async () => {
  await nextTick()
  if (!listRef.value) return

  anime.set('.service-row', { opacity: 0, translateY: 40 })
  anime.set('.service-row__title', { opacity: 0, translateY: 20 })
  anime.set('.service-row__desc', { opacity: 0 })

  const play = () => {
    anime({
      targets: '.service-row',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900,
      delay: anime.stagger(110),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.service-row__title',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(110, { start: 200 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.service-row__desc',
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(110, { start: 400 }),
      easing: 'easeOutQuad',
    })
  }

  if (!('IntersectionObserver' in window)) {
    play()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer?.disconnect()
      play()
    },
    { threshold: 0.15 },
  )

  observer.observe(listRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* ============================================================
   ЦВЕТА КАЖДОЙ УСЛУГИ
   ============================================================ */
.service-row--c1 {
  --row-color: 186, 245, 20;
}

.service-row--c2 {
  --row-color: 110, 123, 255;
}

.service-row--c3 {
  --row-color: 245, 161, 90;
}

.service-row--c4 {
  --row-color: 20, 245, 201;
}

/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--services {
  position: relative;
  overflow: hidden;
}

/* ============================================================
   AURORA
   ============================================================ */
.aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.aurora__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.5;
  will-change: transform;
}

.aurora__blob--1 {
  top: 15%;
  right: 10%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle,
      rgba(110, 123, 255, 0.28) 0%,
      rgba(110, 123, 255, 0.05) 40%,
      transparent 70%);
  animation: auroraFloat1 28s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 10%;
  left: 5%;
  width: 580px;
  height: 580px;
  background: radial-gradient(circle,
      rgba(20, 245, 201, 0.22) 0%,
      rgba(20, 245, 201, 0.05) 40%,
      transparent 70%);
  animation: auroraFloat2 32s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-70px, 60px) scale(1.15);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(80px, -50px) scale(1.1);
  }
}

/* ============================================================
   HEAD
   ============================================================ */
.services__head {
  position: relative;
  z-index: 2;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.services__head .section-title {
  margin-bottom: 0;
}

/* ============================================================
   СПИСОК
   ============================================================ */
.services-list {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ============================================================
   СТРОКА
   ============================================================ */
.service-row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding: clamp(1.75rem, 3vw, 2.5rem) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: none;
  isolation: isolate;
}

/* ---------- Aurora-градиент по строке ---------- */
.service-row__glow {
  position: absolute;
  inset: -1px 0;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(var(--row-color), 0.04) 25%,
      rgba(var(--row-color), 0.1) 50%,
      rgba(var(--row-color), 0.04) 75%,
      transparent 100%);
  opacity: 0;
  transform: scaleX(0.95);
  transform-origin: left center;
  transition:
    opacity 0.5s ease,
    transform 0.6s var(--ease-out-expo);
}

.service-row:hover .service-row__glow {
  opacity: 1;
  transform: scaleX(1);
}

/* ============================================================
   СВЕЧЕНИЕ ЗА СТРОКОЙ — импульс при hover
   ============================================================ */
.service-row__halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110%;
  height: 220%;
  transform: translate(-50%, -50%) scale(0.9);
  pointer-events: none;
  z-index: -2;
  background: radial-gradient(ellipse at center,
      rgba(var(--row-color), 0.4) 0%,
      rgba(var(--row-color), 0.15) 35%,
      rgba(var(--row-color), 0.05) 60%,
      transparent 80%);
  filter: blur(60px);
  opacity: 0;
  transition:
    opacity 0.6s ease,
    transform 0.7s var(--ease-out-expo);
}

.service-row:hover .service-row__halo {
  opacity: 1;
  animation: haloPulse 2.4s ease-in-out infinite;
}

@keyframes haloPulse {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(0.95);
    filter: blur(55px);
    opacity: 0.85;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.08);
    filter: blur(75px);
    opacity: 1;
  }
}

/* ============================================================
   НАЗВАНИЕ — без сжатия, дефолтный трекинг
   ============================================================ */
.service-row__title {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-fg);
  transition:
    color 0.4s ease,
    transform 0.6s var(--ease-out-expo);
  will-change: transform;
}

.service-row:hover .service-row__title {
  color: rgb(var(--row-color));
  transform: translateX(12px);
}

/* ============================================================
   ОПИСАНИЕ
   ============================================================ */
.service-row__desc {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-fg-mute);
  max-width: 320px;
  transition: color 0.4s ease;
}

.service-row:hover .service-row__desc {
  color: rgba(255, 255, 255, 0.88);
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 1024px) {
  .service-row {
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
  }

  .service-row__desc {
    max-width: 100%;
  }

  .service-row__halo {
    width: 90%;
    filter: blur(45px);
  }
}

@media (max-width: 640px) {
  .service-row {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1.5rem 0;
  }

  .service-row__desc {
    font-size: 0.88rem;
    margin-top: 0;
  }

  .service-row__halo {
    display: none;
  }
}

@media (pointer: coarse) {

  .service-row,
  .service-row__title {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .service-row,
  .service-row__title,
  .service-row__desc,
  .service-row__glow,
  .service-row__halo {
    transition: none !important;
    animation: none !important;
  }

  .aurora__blob {
    animation: none !important;
  }
}
</style>
