<template>
  <section id="services" class="section section--services">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <header class="services__head">
        <span class="section-label reveal">{{ $t('services.label') }}</span>
        <h2 class="section-title reveal">
          {{ $t('services.title') }} <span class="text-accent">{{ $t('services.titleAccent') }}</span>
        </h2>
      </header>

      <!-- Услуги -->
      <div ref="listRef" class="services-list">
        <article v-for="(service, index) in services" :key="service.id" class="service-card"
          :class="`service-card--c${index + 1}`" tabindex="0">
          <span class="service-card__halo" aria-hidden="true" />
          <span class="service-card__glow" aria-hidden="true" />

          <header class="service-card__head">
            <span class="service-card__num">0{{ index + 1 }}</span>
            <span class="service-card__icon" aria-hidden="true">
              <Icon :name="service.icon" size="18" />
            </span>
          </header>

          <h3 class="service-card__title">{{ service.title }}</h3>

          <div class="service-card__body">
            <p class="service-card__desc">{{ service.desc }}</p>

            <ul class="service-card__details">
              <li v-for="(detail, i) in service.details" :key="i" class="service-card__detail"
                :style="{ '--reveal-delay': `${i * 70}ms` }">
                <span class="service-card__detail-dot" aria-hidden="true" />
                <span class="service-card__detail-text">{{ detail }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const listRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const services = computed(() => [
  {
    id: 'landing',
    icon: 'lucide:zap',
    title: t('services.items.landing.title'),
    desc: t('services.items.landing.desc'),
    details: [
      t('services.items.landing.details.identity'),
      t('services.items.landing.details.structure'),
      t('services.items.landing.details.visual'),
      t('services.items.landing.details.tools'),
    ],
  },
  {
    id: 'multipage',
    icon: 'lucide:layers',
    title: t('services.items.multipage.title'),
    desc: t('services.items.multipage.desc'),
    details: [
      t('services.items.multipage.details.database'),
      t('services.items.multipage.details.logs'),
      t('services.items.multipage.details.security'),
    ],
  },
  {
    id: 'apps',
    icon: 'lucide:smartphone',
    title: t('services.items.apps.title'),
    desc: t('services.items.apps.desc'),
    details: [
      t('services.items.apps.details.web'),
      t('services.items.apps.details.crossPlatform'),
      t('services.items.apps.details.mobile'),
      t('services.items.apps.details.integrations'),
    ],
  },
])

/* ============================================================
   Анимация появления
   ============================================================ */
onMounted(async () => {
  await nextTick()
  if (!listRef.value) return

  const cards = listRef.value.querySelectorAll('.service-card')
  const nums = listRef.value.querySelectorAll('.service-card__num')
  const icons = listRef.value.querySelectorAll('.service-card__icon')
  const titles = listRef.value.querySelectorAll('.service-card__title')
  const descriptions = listRef.value.querySelectorAll('.service-card__desc')

  anime.set(cards, { opacity: 0, translateY: 40 })
  anime.set(nums, { opacity: 0, translateY: 20 })
  anime.set(icons, { opacity: 0, scale: 0.7 })
  anime.set(titles, { opacity: 0, translateY: 20 })
  anime.set(descriptions, { opacity: 0 })

  const play = () => {
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900,
      delay: anime.stagger(110),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: nums,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(110, { start: 150 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: icons,
      opacity: [0, 1],
      scale: [0.7, 1],
      duration: 700,
      delay: anime.stagger(110, { start: 200 }),
      easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    })
    anime({
      targets: titles,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(110, { start: 280 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: descriptions,
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(110, { start: 450 }),
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
   ЦВЕТА УСЛУГ
   ============================================================ */
.service-card--c1 {
  --row-color: 186, 245, 20;
  --card-offset: 0ms;
}

.service-card--c2 {
  --row-color: 110, 123, 255;
  --card-offset: 90ms;
}

.service-card--c3 {
  --row-color: 245, 161, 90;
  --card-offset: 180ms;
}

/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--services {
  position: relative;
  overflow: hidden;
}

/* ---------- Aurora ---------- */
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
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

/* ============================================================
   СПИСОК
   ============================================================ */
.services-list {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

/* ============================================================
   КАРТОЧКА
   ============================================================ */
.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 360px;
  padding: 1.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.025);
  color: inherit;
  cursor: none;
  isolation: isolate;
  overflow: hidden;
  transition:
    border-color 0.4s ease,
    background 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}

.service-card:hover,
.service-card:focus-visible {
  border-color: rgba(var(--row-color), 0.4);
  background: rgba(var(--row-color), 0.035);
  transform: translateY(-6px);
  box-shadow:
    0 30px 60px -20px rgba(0, 0, 0, 0.5),
    0 0 40px -12px rgba(var(--row-color), 0.15);
  outline: none;
}

.service-card:focus-visible {
  outline: 2px solid rgba(var(--row-color), 0.6);
  outline-offset: 4px;
}

/* ---------- Halo ---------- */
.service-card__halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110%;
  height: 160%;
  transform: translate(-50%, -50%) scale(0.9);
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(ellipse at center,
      rgba(var(--row-color), 0.35) 0%,
      rgba(var(--row-color), 0.12) 35%,
      rgba(var(--row-color), 0.04) 60%,
      transparent 80%);
  filter: blur(60px);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .service-card__halo,
.service-card:focus-visible .service-card__halo {
  opacity: 1;
  animation: haloPulse 2.6s ease-in-out infinite;
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

/* ---------- Radial glow ---------- */
.service-card__glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(120% 100% at 50% 0%,
      rgba(var(--row-color), 0.12) 0%,
      rgba(var(--row-color), 0.04) 40%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.service-card:hover .service-card__glow,
.service-card:focus-visible .service-card__glow {
  opacity: 1;
}

/* ============================================================
   HEAD — номер + иконка
   ============================================================ */
.service-card__head {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-card__num {
  display: inline-block;
  flex-shrink: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  color: rgba(var(--row-color), 0.7);
  padding: 0.35rem 0.75rem;
  border: 1px solid rgba(var(--row-color), 0.25);
  border-radius: 100px;
  background: rgba(var(--row-color), 0.06);
  transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
}

.service-card:hover .service-card__num,
.service-card:focus-visible .service-card__num {
  background: rgba(var(--row-color), 0.14);
  border-color: rgba(var(--row-color), 0.55);
  color: rgb(var(--row-color));
}

.service-card__icon {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.03);
  transition:
    color 0.4s ease,
    border-color 0.4s ease,
    background 0.4s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.service-card:hover .service-card__icon,
.service-card:focus-visible .service-card__icon {
  color: rgb(var(--row-color));
  border-color: rgba(var(--row-color), 0.5);
  background: rgba(var(--row-color), 0.1);
  transform: rotate(-6deg) scale(1.06);
}

.service-card__icon :deep(svg) {
  width: 1.1rem;
  height: 1.1rem;
  display: block;
}

/* ============================================================
   TITLE
   ============================================================ */
.service-card__title {
  position: relative;
  z-index: 2;
  font-family: var(--font-display, 'Inter'), sans-serif;
  font-size: clamp(1.5rem, 2.2vw, 1.85rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--color-fg);
  margin-bottom: 1.25rem;
  transition: color 0.4s ease;
}

.service-card:hover .service-card__title,
.service-card:focus-visible .service-card__title {
  color: rgb(var(--row-color));
}

/* ============================================================
   BODY — GRID STACK
   ============================================================ */
.service-card__body {
  position: relative;
  z-index: 2;
  flex: 1;
  display: grid;
  align-items: start;
}

.service-card__desc,
.service-card__details {
  grid-area: 1 / 1;
}

/* ---------- Описание (idle) — при hover размывается ---------- */
.service-card__desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-fg-mute);
  transition:
    opacity 0.4s ease,
    filter 0.4s ease,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .service-card__desc,
.service-card:focus-visible .service-card__desc {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(-12px);
  pointer-events: none;
}

/* ---------- Детали (hover) ---------- */
.service-card__details {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s ease,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.service-card:hover .service-card__details,
.service-card:focus-visible .service-card__details {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.service-card__detail {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.35s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s ease;
}

.service-card:hover .service-card__detail,
.service-card:focus-visible .service-card__detail {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(var(--reveal-delay, 0ms) + var(--card-offset, 0ms));
}

.service-card:hover .service-card__detail-text,
.service-card:focus-visible .service-card__detail-text {
  color: #fff;
}

.service-card__detail-dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 0.55em;
  border-radius: 50%;
  background: rgb(var(--row-color));
  box-shadow: 0 0 8px rgba(var(--row-color), 0.6);
}

.service-card__detail-text {
  flex: 1;
  min-width: 0;
  transition: color 0.4s ease;
}

/* ============================================================
   АДАПТИВ
   ============================================================ */

/* Планшет — 2 колонки */
@media (max-width: 900px) {
  .services-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-card:last-child {
    grid-column: 1 / -1;
    min-height: 280px;
  }

  .service-card {
    min-height: 320px;
  }

  .service-card__halo {
    width: 90%;
    filter: blur(45px);
  }
}

/* Мобилка — 1 колонка, без hover, всё видно сразу */
@media (max-width: 640px) {
  .services-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .service-card {
    min-height: 0;
    padding: 1.5rem 1.35rem 1.35rem;
  }

  .service-card:last-child {
    grid-column: auto;
    min-height: 0;
  }

  .service-card__halo {
    display: none;
  }

  .aurora__blob {
    animation: none;
  }

  .service-card:hover,
  .service-card:focus-visible {
    transform: none;
    box-shadow: none;
  }

  .service-card__body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .service-card__desc {
    position: static;
    opacity: 1;
    filter: none;
    transform: none;
  }

  .service-card__details {
    position: static;
    opacity: 1;
    transform: none;
    pointer-events: auto;
    gap: 0.55rem;
  }

  .service-card__detail {
    opacity: 1;
    transform: none;
    font-size: 0.82rem;
  }

  .service-card__details::before {
    content: '';
    display: block;
    height: 1px;
    margin: 0 0 0.25rem;
    background: rgba(var(--row-color), 0.18);
  }

  .service-card__head {
    margin-bottom: 1.15rem;
  }

  .service-card__title {
    font-size: 1.35rem;
    margin-bottom: 1rem;
  }
}

@media (pointer: coarse) {
  .service-card {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .service-card,
  .service-card__halo,
  .service-card__glow,
  .service-card__num,
  .service-card__icon,
  .service-card__title,
  .service-card__desc,
  .service-card__details,
  .service-card__detail {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    filter: none !important;
  }

  .service-card__desc {
    opacity: 1 !important;
  }

  .service-card__details,
  .service-card__detail {
    opacity: 1 !important;
  }

  .aurora__blob {
    animation: none !important;
  }
}
</style>
