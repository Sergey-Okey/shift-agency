<template>
  <section ref="pinRef" id="portfolio" class="section-pin">
    <div class="section-pin__inner">
      <!-- Aurora-фон -->
      <div class="aurora" aria-hidden="true">
        <span class="aurora__blob aurora__blob--1" />
        <span class="aurora__blob aurora__blob--2" />
      </div>

      <!-- Заголовок -->
      <div class="container portfolio__head">
        <span class="section-label reveal">{{ $t('portfolio.label') }}</span>
        <h2 class="section-title reveal">
          {{ $t('portfolio.title') }} <span class="text-accent">{{ $t('portfolio.titleAccent') }}</span>
        </h2>
      </div>

      <!-- Галерея -->
      <div class="gallery-wrap">
        <div class="gallery-fog gallery-fog--left" aria-hidden="true" />
        <div class="gallery-fog gallery-fog--right" aria-hidden="true" />

        <div ref="galleryRef" class="gallery" @scroll.passive="onGalleryScroll">
          <div class="gallery__track" :style="{ '--card-w': cardWidth + 'px' }">
            <article v-for="(p, i) in projects" :key="i" :ref="(el) => (cardsRef[i] = el as HTMLElement)"
              class="gallery__card" :class="{
                'is-active': i === activeIndex,
                'is-prev': i < activeIndex,
                'is-next': i > activeIndex,
              }" :data-magnetic="!isCoarse" @click="i !== activeIndex ? scrollToIndex(i) : null">
              <span class="gallery__bg" aria-hidden="true" />
              <span class="gallery__border" aria-hidden="true" />
              <span class="gallery__reflection" aria-hidden="true" />

              <div class="gallery__media">
                <NuxtImg :src="p.img" :alt="p.title" format="webp" width="800" height="1100" loading="lazy" />
                <div class="gallery__overlay" aria-hidden="true" />
                <div class="gallery__overlay-bottom" aria-hidden="true" />
              </div>

              <div class="gallery__body">
                <span class="gallery__tag">{{ p.tag }}</span>
                <h3 class="gallery__title">{{ p.title }}</h3>
                <p class="gallery__desc">{{ p.desc }}</p>
                <a :href="p.link || '#'" class="gallery__cta" @click.stop>
                  <span>{{ $t('portfolio.view') }}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Прогресс + точки -->
      <div class="portfolio__progress container">
        <div class="portfolio__progress-track">
          <div class="portfolio__progress-bar" :style="{ transform: `scaleX(${progress})` }" />
        </div>
        <div class="portfolio__dots">
          <button v-for="(p, i) in projects" :key="i" class="portfolio__dot" :class="{ 'is-active': i === activeIndex }"
            :aria-label="`${$t('portfolio.goTo')} ${i + 1}`" @click="scrollToIndex(i)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()
const { $lenis } = useNuxtApp() as any

const pinRef = ref<HTMLElement | null>(null)
const galleryRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const progress = ref(0)
const cardWidth = ref(400)
const isCoarse = ref(false)

let raf = 0
const cleanups: Array<() => void> = []

const projects = [
  { title: 'Core of Life', tag: 'Vue · Nuxt · TS', desc: 'Таск-менеджер с древовидной структурой. Продуктивность через ограничение.', year: '2024', img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80', link: '#' },
  { title: 'Carbon Core', tag: 'Open Source', desc: 'Архитектурная база на Vue 3, Pinia, Vite. Переиспользуемая для проектов.', year: '2024', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', link: '#' },
  { title: 'Noir Series', tag: 'Photography', desc: 'Нуар-кадры и мини-фильмы. Съёмка на iPhone 15 в Log, монтаж в CapCut.', year: '2024', img: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=800&q=80', link: '#' },
  { title: 'Aurora Bank', tag: 'Fintech · UI/UX', desc: 'Мобильный банкинг с фокусом на приватность и скорость операций.', year: '2023', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', link: '#' },
  { title: 'Nomad Coffee', tag: 'E-commerce', desc: 'Интернет-магазин specialty-кофе с подписочной моделью и кастомизацией.', year: '2023', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', link: '#' },
  { title: 'Vertex Fitness', tag: 'Branding · Web', desc: 'Айдентика и сайт для сети премиум-фитнес-клубов. Ребрендинг с нуля.', year: '2023', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', link: '#' },
  { title: 'Kinetic Studio', tag: 'Motion · Web', desc: 'Портфолио моушн-студии с WebGL-интро и интерактивными кейсами.', year: '2022', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', link: '#' },
  { title: 'Terra Systems', tag: 'SaaS Platform', desc: 'B2B-платформа для управления строительными проектами. Дашборд + API.', year: '2022', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', link: '#' },
]

/* ============================================================
   ИЗОГНУТЫЙ ГОРИЗОНТ — карточки наклоняются от центра
   ============================================================ */
function updateCurves() {
  const gallery = galleryRef.value
  if (!gallery) return

  const center = gallery.scrollLeft + gallery.clientWidth / 2
  const halfW = gallery.clientWidth / 2

  cardsRef.value.forEach((card) => {
    if (!card) return

    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = (cardCenter - center) / halfW
    const d = Math.max(-1.7, Math.min(1.7, distance))

    const maxAngle = 14
    const ry = -d * maxAngle
    const depth = -Math.abs(d) * 90

    card.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    card.style.setProperty('--tz', `${depth.toFixed(2)}px`)
  })
}

/* ============================================================
   Активная карточка
   ============================================================ */
function updateActive() {
  const gallery = galleryRef.value
  if (!gallery) return

  const center = gallery.scrollLeft + gallery.clientWidth / 2
  let closest = 0
  let closestDist = Infinity

  cardsRef.value.forEach((card, i) => {
    if (!card) return
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const dist = Math.abs(cardCenter - center)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })

  if (closest !== activeIndex.value) {
    activeIndex.value = closest
  }
}

/* ============================================================
   Скролл
   ============================================================ */
function onPageScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    const pin = pinRef.value
    const gallery = galleryRef.value
    if (!pin || !gallery) { raf = 0; return }

    const rect = pin.getBoundingClientRect()
    const scrollDistance = pin.offsetHeight - window.innerHeight
    if (scrollDistance <= 0) { raf = 0; return }

    const scrolled = Math.max(0, Math.min(scrollDistance, -rect.top))
    const progressRatio = scrolled / scrollDistance

    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth
    gallery.scrollLeft = maxScrollLeft * progressRatio

    progress.value = progressRatio
    updateActive()
    updateCurves()
    raf = 0
  })
}

function onGalleryScroll() {
  updateActive()
  updateCurves()
}

/* ============================================================
   Переход к карточке
   ============================================================ */
function scrollToIndex(i: number) {
  const pin = pinRef.value
  const gallery = galleryRef.value
  const card = cardsRef.value[i]
  if (!pin || !gallery || !card) return

  const targetScrollLeft = card.offsetLeft - (gallery.clientWidth - card.offsetWidth) / 2
  const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth
  const targetProgress = maxScrollLeft > 0 ? targetScrollLeft / maxScrollLeft : 0

  const pinTop = pin.offsetTop
  const scrollDistance = pin.offsetHeight - window.innerHeight
  const targetY = pinTop + scrollDistance * targetProgress

  if ($lenis?.scrollTo) {
    $lenis.scrollTo(targetY, { duration: 1.2 })
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }
}

/* ============================================================
   Клавиатура
   ============================================================ */
function onKey(e: KeyboardEvent) {
  const pin = pinRef.value
  if (!pin) return

  const rect = pin.getBoundingClientRect()
  const inView = rect.top < window.innerHeight && rect.bottom > 0
  if (!inView) return

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    scrollToIndex(Math.min(activeIndex.value + 1, projects.length - 1))
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    scrollToIndex(Math.max(activeIndex.value - 1, 0))
  }
}

/* ============================================================
   МАГНИТ
   ============================================================ */
function initMagnetic(el: HTMLElement) {
  const strength = 0.12
  const maxOffset = 18

  let frame = 0
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  function tick() {
    currentX += (targetX - currentX) * 0.18
    currentY += (targetY - currentY) * 0.18

    el.style.setProperty('--mag-x', `${currentX.toFixed(2)}px`)
    el.style.setProperty('--mag-y', `${currentY.toFixed(2)}px`)

    if (
      Math.abs(currentX - targetX) > 0.1 ||
      Math.abs(currentY - targetY) > 0.1
    ) {
      frame = requestAnimationFrame(tick)
    } else {
      frame = 0
    }
  }

  function onMove(e: MouseEvent) {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength

    targetX = Math.max(-maxOffset, Math.min(maxOffset, dx))
    targetY = Math.max(-maxOffset, Math.min(maxOffset, dy))

    if (!frame) frame = requestAnimationFrame(tick)
  }

  function onLeave() {
    targetX = 0
    targetY = 0
    if (!frame) frame = requestAnimationFrame(tick)
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  cleanups.push(() => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    if (frame) cancelAnimationFrame(frame)
  })
}

/* ============================================================
   Утилиты
   ============================================================ */
function updateCardWidth() {
  const w = window.innerWidth
  const h = window.innerHeight

  const reservedH = 360
  const availableH = Math.max(360, h - reservedH)
  const widthFromHeight = availableH * 0.75

  let maxWidth
  if (w < 480) maxWidth = 260
  else if (w < 640) maxWidth = 300
  else if (w < 900) maxWidth = 340
  else if (w < 1200) maxWidth = 380
  else maxWidth = 440

  cardWidth.value = Math.min(Math.round(widthFromHeight), maxWidth)
}

function updatePinHeight() {
  const pin = pinRef.value
  const gallery = galleryRef.value
  if (!pin || !gallery) return

  if (window.matchMedia('(pointer: coarse)').matches) {
    pin.style.height = ''
    return
  }

  const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth
  pin.style.height = `calc(100vh + ${maxScrollLeft}px)`
}

/* ============================================================
   LIFECYCLE
   ============================================================ */
onMounted(async () => {
  isCoarse.value = window.matchMedia('(pointer: coarse)').matches

  await nextTick()
  updateCardWidth()

  await nextTick()
  await nextTick()
  updatePinHeight()

  if (!isCoarse.value) {
    await nextTick()
    cardsRef.value.forEach((card) => {
      if (card) initMagnetic(card)
    })
  }

  const handler = () => onPageScroll()

  if ($lenis?.on) {
    $lenis.on('scroll', handler)
  } else {
    window.addEventListener('scroll', handler, { passive: true })
  }

  const onResize = () => {
    updateCardWidth()
    setTimeout(() => {
      updatePinHeight()
      onPageScroll()
    }, 80)
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)

  onPageScroll()
  updateCurves()

  cleanups.push(() => {
    if ($lenis?.off) $lenis.off('scroll', handler)
    else window.removeEventListener('scroll', handler)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('resize', onResize)
  })
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  cleanups.forEach((fn) => fn())
})
</script>

<style scoped>
/* ============================================================
   РЕГИСТРАЦИЯ CUSTOM PROPERTIES
   ============================================================ */
@property --s {
  syntax: '<number>';
  inherits: false;
  initial-value: 0.88;
}

@property --ty {
  syntax: '<length>';
  inherits: false;
  initial-value: 12px;
}

@property --ry {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@property --tz {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

/* ============================================================
   PIN-СЕКЦИЯ
   ============================================================ */
.section-pin {
  position: relative;
}

.section-pin__inner {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 0 1.25rem;
  overflow: hidden;
  background: var(--color-bg);
}

/* ============================================================
   Aurora
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
  filter: blur(100px);
  opacity: 0.7;
  will-change: transform;
}

.aurora__blob--1 {
  top: 10%;
  left: 15%;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.32) 0%,
      rgba(186, 245, 20, 0.08) 40%,
      transparent 70%);
  animation: auroraFloat1 26s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 5%;
  right: 12%;
  width: 620px;
  height: 620px;
  background: radial-gradient(circle,
      rgba(110, 123, 255, 0.28) 0%,
      rgba(110, 123, 255, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat2 30s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(90px, -50px) scale(1.15);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-80px, 60px) scale(1.1);
  }
}

/* ============================================================
   HEAD — выровнен по левому краю, как в других секциях
   ============================================================ */
.portfolio__head {
  position: relative;
  z-index: 2;
}

.portfolio__head .section-title {
  margin-bottom: 0;
}

/* ============================================================
   ОБЁРТКА ГАЛЕРЕИ
   ============================================================ */
.gallery-wrap {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  mask-image: linear-gradient(90deg,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%);
  -webkit-mask-image: linear-gradient(90deg,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%);
}

.gallery-fog {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 18%;
  max-width: 280px;
  pointer-events: none;
  z-index: 10;
}

.gallery-fog--left {
  left: 0;
  background: linear-gradient(90deg,
      var(--color-bg) 0%,
      rgba(5, 5, 5, 0.85) 40%,
      rgba(5, 5, 5, 0.4) 70%,
      transparent 100%);
}

.gallery-fog--right {
  right: 0;
  background: linear-gradient(270deg,
      var(--color-bg) 0%,
      rgba(5, 5, 5, 0.85) 40%,
      rgba(5, 5, 5, 0.4) 70%,
      transparent 100%);
}

/* ============================================================
   ГАЛЕРЕЯ
   ============================================================ */
.gallery {
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: auto;
  overscroll-behavior: contain;
}

.gallery::-webkit-scrollbar {
  display: none;
}

.gallery__track {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem calc(50vw - var(--card-w) / 2) 1rem;
  width: max-content;
  perspective: 2400px;
  perspective-origin: 50% 50%;
}

/* ============================================================
   КАРТОЧКА
   ============================================================ */
.gallery__card {
  position: relative;
  flex-shrink: 0;
  width: var(--card-w);
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  overflow: hidden;
  cursor: none;
  transform-style: preserve-3d;

  --mag-x: 0px;
  --mag-y: 0px;
  --ry: 0deg;
  --tz: 0px;
  --s: 0.88;
  --ty: 12px;

  translate: var(--mag-x) var(--mag-y);

  transform:
    rotateY(var(--ry)) translateZ(var(--tz)) scale(var(--s)) translateY(var(--ty));

  transition:
    --s 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    --ty 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  isolation: isolate;
  will-change: transform, opacity, filter, translate;
}

.gallery__card.is-active {
  --s: 1;
  --ty: 0;
}

.gallery__card.is-prev:not(.is-active),
.gallery__card.is-next:not(.is-active) {
  --s: 0.9;
  --ty: 8px;
}

.gallery__card {
  opacity: 0.2;
  filter: blur(5px) saturate(0.5) brightness(0.55);
}

.gallery__card.is-active {
  opacity: 1;
  filter: blur(0) saturate(1) brightness(1);
}

.gallery__card.is-prev:not(.is-active),
.gallery__card.is-next:not(.is-active) {
  opacity: 0.42;
  filter: blur(2.5px) saturate(0.65) brightness(0.7);
}

/* ---------- Слои стекла ---------- */
.gallery__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  z-index: 0;
}

.gallery__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.5s ease, background 0.5s ease;
}

.gallery__card.is-active .gallery__border {
  border-color: rgba(186, 245, 20, 0.45);
  background: rgba(186, 245, 20, 0.04);
}

.gallery__reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.02) 12%,
      transparent 35%);
  opacity: 0.9;
}

/* ============================================================
   IMAGE
   ============================================================ */
.gallery__media {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.gallery__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery__card.is-active .gallery__media :deep(img) {
  transform: scale(1.04);
}

.gallery__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.05) 25%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.35) 100%);
}

.gallery__overlay-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70%;
  background: linear-gradient(180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 25%,
      rgba(0, 0, 0, 0.7) 55%,
      rgba(0, 0, 0, 0.9) 80%,
      rgba(0, 0, 0, 0.95) 100%);
  pointer-events: none;
}

/* ============================================================
   HEAD карточки
   ============================================================ */
.gallery__head {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  right: 1.25rem;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  transition: opacity 0.5s ease;
}

.gallery__card:not(.is-active) .gallery__head {
  opacity: 0;
}

.gallery__index {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: #fff;
  padding: 0.35rem 0.65rem;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
}

.gallery__year {
  font-weight: 600;
}

/* ============================================================
   BODY карточки
   ============================================================ */
.gallery__body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  padding: 1.75rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery__card:not(.is-active) .gallery__body {
  opacity: 0;
  transform: translateY(12px);
}

.gallery__tag {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.gallery__title {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2vw, 1.75rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
}

.gallery__desc {
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}

.gallery__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  align-self: flex-start;
  padding: 0.6rem 1.1rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery__cta:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
  transform: translateY(-2px);
}

.gallery__cta svg {
  transition: transform 0.3s ease;
}

.gallery__cta:hover svg {
  transform: translate(2px, -2px);
}

/* ============================================================
   PROGRESS + DOTS
   ============================================================ */
.portfolio__progress {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0.25rem;
}

.portfolio__progress-track {
  position: relative;
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.portfolio__progress-bar {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform-origin: left center;
  transition: transform 0.15s linear;
  box-shadow: 0 0 12px rgba(186, 245, 20, 0.4);
}

.portfolio__dots {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.portfolio__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  padding: 0;
  cursor: none;
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.portfolio__dot:hover {
  background: rgba(255, 255, 255, 0.35);
}

.portfolio__dot.is-active {
  background: var(--color-accent);
  transform: scale(1.4);
  box-shadow: 0 0 10px rgba(186, 245, 20, 0.6);
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 1024px) {
  .section-pin__inner {
    gap: 1.25rem;
    padding: 0.75rem 0 1rem;
  }
}

@media (max-width: 640px) {
  .section-pin__inner {
    gap: 1rem;
    padding: 0.5rem 0 0.75rem;
  }

  .gallery__track {
    gap: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
  }

  .gallery__body {
    padding: 1.25rem 1.1rem 1.1rem;
  }

  .gallery__desc {
    font-size: 0.78rem;
  }

  .portfolio__progress {
    gap: 1.25rem;
  }

  .gallery-fog {
    width: 14%;
  }
}

@media (pointer: coarse) {
  .section-pin {
    height: auto !important;
  }

  .section-pin__inner {
    position: static;
    height: auto;
    padding: 4rem 0;
    gap: 1.5rem;
  }

  .gallery {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .gallery__card {
    scroll-snap-align: center;
    cursor: auto;
    translate: 0 0 !important;
  }

  .gallery__card,
  .portfolio__dot,
  .gallery__cta {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-pin {
    height: auto !important;
  }

  .section-pin__inner {
    position: static;
    height: auto;
    padding: 4rem 0;
  }

  .gallery {
    overflow-x: auto;
  }

  .gallery__card,
  .gallery__media :deep(img) {
    transition: none !important;
  }

  .aurora__blob {
    animation: none !important;
  }
}
</style>
