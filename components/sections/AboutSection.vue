<template>
  <section id="about" class="section section--about">
    <!-- Aurora-фон за карточками -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
      <span class="aurora__blob aurora__blob--3" />
    </div>

    <div class="container">
      <span class="section-label reveal">{{ $t('about.label') }}</span>
      <h2 class="section-title reveal">
        {{ $t('about.title') }} <span class="text-accent">{{ $t('about.titleAccent') }}</span>{{ $t('about.titleMiddle')
        }}<span class="text-accent">{{ $t('about.titleFinal') }}</span>{{ $t('about.titleSuffix') }}
      </h2>

      <div ref="statsRef" class="bento">
        <article v-for="(item, i) in items" :key="i" class="card" :class="[
          i === 0 ? 'card--lg' : '',
          i === 1 ? 'card--sm' : '',
          i === 2 ? 'card--wide' : '',
        ]" :style="{ '--stagger-delay': `${i * 130}ms` }" data-tilt>
          <!-- Слои стекла -->
          <span class="card__bg" aria-hidden="true" />
          <span class="card__reflection" aria-hidden="true" />
          <span class="card__border" aria-hidden="true" />
          <span class="card__spotlight" aria-hidden="true" />

          <!-- Рейтинг — только для карточки "довольных" (i === 2) -->
          <div v-if="i === 2" class="card__rating" aria-hidden="true">
            <div class="card__stars">
              <span v-for="s in 5" :key="s" class="card__star" :class="{ 'is-filled': s <= 4 }">★</span>
            </div>
            <div class="card__rating-value">
              <span class="card__rating-num">4</span>
              <span class="card__rating-sep">/</span>
              <span class="card__rating-total">5</span>
            </div>
          </div>

          <!-- Число -->
          <div class="card__num">
            <UiFlipCounter :value="item.num" />
          </div>

          <!-- Разделитель -->
          <div class="card__line" aria-hidden="true" />

          <!-- Текст -->
          <div class="card__body">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__text">{{ item.text }}</p>
          </div>

          <!-- Точки-индикаторы -->
          <footer class="card__foot" aria-hidden="true">
            <span v-for="(d, di) in 8" :key="di" class="card__dot" :class="{ 'is-accent': di < item.dots }"
              :style="{ '--dot-i': di }" />
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const statsRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
const cleanups: Array<() => void> = []

const items = computed(() => [
  {
    num: '4+',
    dots: 4,
    title: t('about.stats.experience.title'),
    text: t('about.stats.experience.text'),
  },
  {
    num: '32+',
    dots: 7,
    title: t('about.stats.projects.title'),
    text: t('about.stats.projects.text'),
  },
  {
    num: '98%',
    dots: 8,
    title: t('about.stats.happy.title'),
    text: t('about.stats.happy.text'),
  },
])

/* ============================================================
   3D-TILT + SPOTLIGHT
   ============================================================ */
function initTilt(el: HTMLElement) {
  const strength = 4
  let raf = 0
  let rect = { left: 0, top: 0, width: 1, height: 1 }
  let mx = 0
  let my = 0

  function measure() { rect = el.getBoundingClientRect() }

  function update() {
    raf = 0
    el.style.setProperty('--mx', `${mx}px`)
    el.style.setProperty('--my', `${my}px`)
    const cx = rect.width / 2
    const cy = rect.height / 2
    const ry = ((mx - cx) / cx) * strength
    const rx = -((my - cy) / cy) * strength
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
  }

  function onEnter() { measure() }
  function onMove(e: MouseEvent) {
    if (!rect.width) measure()
    mx = e.clientX - rect.left
    my = e.clientY - rect.top
    if (!raf) raf = requestAnimationFrame(update)
  }
  function onLeave() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  cleanups.push(() => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    if (raf) cancelAnimationFrame(raf)
  })
}

/* ============================================================
   LIFECYCLE
   ============================================================ */
onMounted(async () => {
  await nextTick()
  if (!statsRef.value) return

  const isCoarse = window.matchMedia('(pointer: coarse)').matches
  if (!isCoarse) {
    const cards = statsRef.value.querySelectorAll<HTMLElement>('[data-tilt]')
    cards.forEach(initTilt)
  }

  anime.set('.card__num', { opacity: 0, translateY: 26 })
  anime.set('.card__line', { scaleX: 0 })
  anime.set('.card__title, .card__text', { opacity: 0, translateY: 14 })
  anime.set('.card__dot', { opacity: 0, scale: 0.3 })

  /* Рейтинг */
  anime.set('.card__star', { opacity: 0, scale: 0.3, rotate: -25 })
  anime.set('.card__rating-value', { opacity: 0, y: 12 })
  anime.set('.card__rating-label', { opacity: 0, y: 6 })

  const play = () => {
    statsRef.value?.classList.add('is-visible')

    anime({
      targets: '.card__num',
      opacity: [0, 1],
      translateY: [26, 0],
      duration: 900,
      delay: anime.stagger(130, { start: 200 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.card__line',
      scaleX: [0, 1],
      duration: 700,
      delay: anime.stagger(130, { start: 500 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.card__title, .card__text',
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 750,
      delay: anime.stagger(80, { start: 700 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.card__dot',
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 500,
      delay: anime.stagger(35, { start: 850 }),
      easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    })

    /* Рейтинг — звёзды по очереди */
    anime({
      targets: '.card__star',
      opacity: [0, 1],
      scale: [0.3, 1],
      rotate: [-25, 0],
      duration: 700,
      delay: anime.stagger(110, { start: 700 }),
      easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    })
    anime({
      targets: '.card__rating-value',
      opacity: [0, 1],
      y: [12, 0],
      duration: 700,
      delay: 1250,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })
    anime({
      targets: '.card__rating-label',
      opacity: [0, 1],
      y: [6, 0],
      duration: 600,
      delay: 1450,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
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
    { threshold: 0.2 },
  )
  observer.observe(statsRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cleanups.forEach((fn) => fn())
})
</script>

<style scoped>
/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--about {
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
  filter: blur(90px);
  opacity: 0.75;
  will-change: transform;
}

.aurora__blob--1 {
  top: 20%;
  left: 8%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.38) 0%,
      rgba(186, 245, 20, 0.1) 40%,
      transparent 70%);
  animation: auroraFloat1 22s ease-in-out infinite;
}

.aurora__blob--2 {
  top: 55%;
  right: 10%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle,
      rgba(110, 123, 255, 0.32) 0%,
      rgba(110, 123, 255, 0.08) 40%,
      transparent 70%);
  animation: auroraFloat2 28s ease-in-out infinite;
}

.aurora__blob--3 {
  bottom: 5%;
  left: 35%;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle,
      rgba(20, 245, 201, 0.22) 0%,
      rgba(20, 245, 201, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat3 26s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(80px, -40px) scale(1.15);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-70px, 50px) scale(1.1);
  }
}

@keyframes auroraFloat3 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(50px, -60px) scale(0.95);
  }
}

.container {
  position: relative;
  z-index: 1;
}

/* ============================================================
   BENTO GRID
   ============================================================ */
.bento {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.25rem;
  perspective: 1600px;
}

.card--lg {
  grid-column: 1;
  grid-row: 1;
}

.card--sm {
  grid-column: 2;
  grid-row: 1;
}

.card--wide {
  grid-column: 1 / -1;
  grid-row: 2;
}

/* ============================================================
   КАРТОЧКА
   ============================================================ */
.card {
  position: relative;
  padding: 2.25rem 2rem 1.75rem;
  border-radius: 28px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;

  --mx: 50%;
  --my: 50%;
  --rx: 0deg;
  --ry: 0deg;
  --stagger-delay: 0ms;

  opacity: 0;
  translate: 0 40px;
  transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));

  transition:
    opacity 1s var(--ease-out-expo) var(--stagger-delay),
    translate 1s var(--ease-out-expo) var(--stagger-delay),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  will-change: transform, opacity;
}

.bento.is-visible .card {
  opacity: 1;
  translate: 0 0;
}

/* ============================================================
   WIDE-КАРТОЧКА — горизонтальный layout + рейтинг справа
   ============================================================ */
.card--wide {
  min-height: 280px;
  display: grid;
  grid-template-columns: auto 1px 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 3rem;
  row-gap: 0;
  /* padding-right увеличен под большой рейтинг */
  padding: 2.5rem 4rem 2.5rem 2.5rem;
}

.card--wide .card__num {
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 0;
}

.card--wide .card__line {
  grid-column: 2;
  grid-row: 1;
  width: 1px;
  height: 100%;
  min-height: 100px;
  background: linear-gradient(to bottom,
      transparent 0%,
      rgba(255, 255, 255, 0.18) 30%,
      rgba(255, 255, 255, 0.18) 70%,
      transparent 100%);
  transform-origin: top center;
  margin-bottom: 0;
}

.card--wide .card__body {
  grid-column: 3;
  grid-row: 1;
  margin-bottom: 0;
}

.card--wide .card__foot {
  grid-column: 1 / -1;
  grid-row: 2;
  margin-top: 2rem;
}

/* Рейтинг — 4-й столбец wide-карточки */
.card__rating {
  position: relative;
  z-index: 5;
  grid-column: 4;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  padding-left: 1rem;
}

/* ============================================================
   ЗВЁЗДЫ — крупные
   ============================================================ */
.card__stars {
  display: flex;
  gap: 0.15rem;
  font-size: 1.9rem;
  line-height: 1;
  letter-spacing: 0.03em;
}

.card__star {
  display: inline-block;
  color: rgba(255, 255, 255, 0.14);
  will-change: transform, opacity;
  transition: color 0.4s ease, text-shadow 0.4s ease;
}

.card__star.is-filled {
  color: #f5d15a;
  text-shadow: 0 0 18px rgba(245, 209, 90, 0.4);
}

/* ============================================================
   ЦИФРА РЕЙТИНГА — крупно, с акцентной "4"
   ============================================================ */
.card__rating-value {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  font-family: var(--font-display);
  line-height: 1;
  letter-spacing: -0.02em;
  will-change: transform, opacity;
}

.card__rating-num {
  font-size: 3rem;
  color: var(--color-fg);
  transition: color 0.5s ease;
}

.card--wide:hover .card__rating-num {
  color: var(--color-accent);
}

.card__rating-sep {
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.25);
  margin: 0 0.1rem;
}

.card__rating-total {
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.4);
}

.card__rating-label {
  font-family: var(--font-body);
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.32);
  will-change: transform, opacity;
}

/* ============================================================
   СЛОЙ 1: BASE
   ============================================================ */
.card__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  z-index: 0;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.card:hover .card__bg {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(48px) saturate(200%);
  -webkit-backdrop-filter: blur(48px) saturate(200%);
}

/* ============================================================
   СЛОЙ 2: REFLECTION
   ============================================================ */
.card__reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.02) 15%,
      transparent 40%);
  opacity: 0.9;
  transition: opacity 0.6s ease;
}

.card:hover .card__reflection {
  opacity: 1;
}

/* ============================================================
   СЛОЙ 3: BORDER
   ============================================================ */
.card__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  padding: 1px;
  background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.03) 30%,
      rgba(255, 255, 255, 0.02) 70%,
      rgba(255, 255, 255, 0.1) 100%);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: background 0.5s ease;
}

.card:hover .card__border {
  background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.32) 0%,
      rgba(255, 255, 255, 0.05) 30%,
      rgba(186, 245, 20, 0.08) 70%,
      rgba(255, 255, 255, 0.14) 100%);
}

/* ============================================================
   СЛОЙ 4: SPOTLIGHT
   ============================================================ */
.card__spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;
  background: radial-gradient(500px circle at var(--mx) var(--my),
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.03) 35%,
      transparent 65%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card:hover .card__spotlight {
  opacity: 1;
}

/* ============================================================
   ТЕНЬ
   ============================================================ */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.04) inset,
    0 30px 60px -20px rgba(0, 0, 0, 0.5),
    0 15px 30px -15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s ease;
}

.card:hover::after {
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
    0 45px 80px -20px rgba(0, 0, 0, 0.6),
    0 20px 40px -15px rgba(186, 245, 20, 0.06);
}

/* ============================================================
   ЧИСЛО
   ============================================================ */
.card__num {
  position: relative;
  z-index: 5;
  font-family: var(--font-display);
  font-size: clamp(4rem, 6.5vw, 6.5rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--color-fg);
  margin-bottom: 1.75rem;
  transition: color 0.5s ease;
}

.card--sm .card__num {
  font-size: clamp(3.5rem, 5vw, 5rem);
}

.card--wide .card__num {
  font-size: clamp(4rem, 7vw, 7.5rem);
}

.card:hover .card__num {
  color: var(--color-accent);
}

/* ============================================================
   РАЗДЕЛИТЕЛЬ
   ============================================================ */
.card__line {
  position: relative;
  z-index: 5;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.04) 60%,
      transparent 100%);
  margin-bottom: 1.5rem;
  transform-origin: left center;
}

/* ============================================================
   ТЕКСТ
   ============================================================ */
.card__body {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: auto;
}

.card__title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1.3;
  text-transform: uppercase;
  color: var(--color-fg);
}

.card__text {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-fg-mute);
}

/* ============================================================
   FOOTER — точки
   ============================================================ */
.card__foot {
  position: relative;
  z-index: 5;
  display: flex;
  gap: 6px;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.card__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  will-change: transform, opacity;
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.card__dot.is-accent {
  background: rgba(255, 255, 255, 0.45);
}

.card:hover .card__dot.is-accent {
  background: var(--color-accent);
  box-shadow: 0 0 6px rgba(186, 245, 20, 0.6);
  animation: dotPulse 1.6s ease-in-out infinite;
  animation-delay: calc(var(--dot-i) * 0.05s);
}

@keyframes dotPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.6);
  }
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 1024px) {
  .card {
    padding: 1.75rem;
    min-height: 300px;
  }

  .card__num {
    font-size: clamp(3.25rem, 5vw, 5rem);
  }

  .card--wide {
    padding: 2rem 3rem 2rem 2rem;
    column-gap: 2rem;
  }

  .card__stars {
    font-size: 1.5rem;
  }

  .card__rating-num {
    font-size: 2.4rem;
  }

  .card__rating-sep,
  .card__rating-total {
    font-size: 1.3rem;
  }

  .aurora__blob {
    filter: blur(70px);
    opacity: 0.6;
  }
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .card--lg,
  .card--sm,
  .card--wide {
    grid-column: 1;
    grid-row: auto;
  }

  .card {
    min-height: auto;
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
  }

  .card--wide {
    display: flex;
    flex-direction: column;
    padding: 2rem 1.75rem;
    column-gap: 0;
    row-gap: 0;
  }

  .card--wide .card__num {
    margin-bottom: 1.25rem;
  }

  .card--wide .card__line {
    width: 100%;
    height: 1px;
    min-height: 0;
    background: linear-gradient(90deg,
        rgba(255, 255, 255, 0.18) 0%,
        rgba(255, 255, 255, 0.04) 60%,
        transparent 100%);
    transform-origin: left center;
    margin-bottom: 1.25rem;
  }

  .card--wide .card__body {
    margin-bottom: 1rem;
  }

  .card--wide .card__foot {
    margin-top: 1.5rem;
  }

  .card__num {
    font-size: clamp(3.5rem, 10vw, 5rem);
    margin-bottom: 1.25rem;
  }

  .card__line {
    margin-bottom: 1.25rem;
  }

  .card__foot {
    margin-top: 1.5rem;
    padding-top: 1rem;
  }

  /* Рейтинг на мобиле — в строку под текстом */
  .card__rating {
    grid-column: auto;
    grid-row: auto;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
    padding-left: 0;
    margin-top: 1.25rem;
    justify-content: flex-start;
  }

  .card__stars {
    font-size: 1.2rem;
  }

  .card__rating-num {
    font-size: 1.5rem;
  }

  .card__rating-sep,
  .card__rating-total {
    font-size: 1rem;
  }

  .card__rating-label {
    display: none;
  }
}

@media (pointer: coarse) {
  .card {
    transform: none !important;
  }

  .card__spotlight {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none !important;
    opacity: 1 !important;
    translate: 0 0 !important;
    transform: none !important;
  }

  .card__spotlight,
  .card__dot.is-accent,
  .aurora__blob {
    animation: none !important;
  }
}
</style>
