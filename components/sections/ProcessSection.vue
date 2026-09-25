<template>
  <section id="process" class="section section--process">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <span class="section-label reveal">{{ $t('process.label') }}</span>
      <h2 class="section-title reveal">
        {{ $t('process.title') }} <span class="text-accent">{{ $t('process.titleAccent') }}</span>
      </h2>

      <div ref="processRef" class="process">
        <!-- Прогресс-линия -->
        <div class="process__line" aria-hidden="true">
          <div class="process__line-fill" :style="{ transform: `scaleY(${lineProgress})` }" />
        </div>

        <!-- Шаги -->
        <div v-for="(s, i) in steps" :key="i" :ref="(el) => (stepRefs[i] = el as HTMLElement)" class="step"
          :class="{ 'is-active': activeIndex >= i }">
          <!-- Маркер с иконкой -->
          <div class="step__marker">
            <div class="step__icon">
              <svg v-if="i === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <svg v-else-if="i === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
              <svg v-else-if="i === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 6l-4 6 4 6" />
                <path d="M16 6l4 6-4 6" />
                <path d="M14 4l-4 16" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v6" />
                <path d="M12 22v-6" />
                <path d="M6 12H2" />
                <path d="M22 12h-4" />
                <path d="M16.5 7.5l4-4" />
                <path d="M7.5 16.5l-4 4" />
              </svg>
            </div>
          </div>

          <!-- Карточка -->
          <article class="step__card">
            <span class="step__card-bg" aria-hidden="true" />
            <span class="step__card-border" aria-hidden="true" />
            <span class="step__card-reflection" aria-hidden="true" />

            <h3 class="step__title">{{ s.title }}</h3>
            <p class="step__desc">{{ s.desc }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const processRef = ref<HTMLElement | null>(null)
const stepRefs = ref<HTMLElement[]>([])
const activeIndex = ref(-1)
const lineProgress = ref(0)

let raf = 0
let observer: IntersectionObserver | null = null

const steps = computed(() => [
  { title: t('process.steps.analysis.title'), desc: t('process.steps.analysis.desc') },
  { title: t('process.steps.strategy.title'), desc: t('process.steps.strategy.desc') },
  { title: t('process.steps.development.title'), desc: t('process.steps.development.desc') },
  { title: t('process.steps.launch.title'), desc: t('process.steps.launch.desc') },
])

/* ============================================================
   Активный шаг + прогресс-линия
   ============================================================ */
function updateProgress() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    const container = processRef.value
    if (!container) return

    const rect = container.getBoundingClientRect()
    const viewportH = window.innerHeight
    const focusY = viewportH * 0.55

    const totalH = rect.height
    const scrolled = Math.max(0, Math.min(totalH, focusY - rect.top))
    lineProgress.value = totalH > 0 ? scrolled / totalH : 0

    let active = -1
    stepRefs.value.forEach((step, i) => {
      if (!step) return
      const stepRect = step.getBoundingClientRect()
      const stepCenter = stepRect.top + stepRect.height / 2
      if (stepCenter < focusY) active = i
    })
    activeIndex.value = active

    raf = 0
  })
}

function onScroll() {
  updateProgress()
}

onMounted(async () => {
  await nextTick()

  if (processRef.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) updateProgress()
      },
      { threshold: [0, 0.1, 0.5, 1] },
    )
    observer.observe(processRef.value)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)

  updateProgress()
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--process {
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
  filter: blur(100px);
  opacity: 0.6;
  will-change: transform;
}

.aurora__blob--1 {
  top: 15%;
  right: 10%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.3) 0%,
      rgba(186, 245, 20, 0.08) 40%,
      transparent 70%);
  animation: auroraFloat1 28s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 10%;
  left: 8%;
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
    transform: translate(-80px, 50px) scale(1.12);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(70px, -60px) scale(0.95);
  }
}

/* ============================================================
   ПРОЦЕСС — вертикальный timeline
   ============================================================ */
.process {
  position: relative;
  z-index: 2;
  margin-top: 2rem;
  padding-left: 44px;
}

/* ============================================================
   ПРОГРЕСС-ЛИНИЯ
   ============================================================ */
.process__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 16px;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.process__line-fill {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform-origin: top center;
  transition: transform 0.15s linear;
  box-shadow: 0 0 12px rgba(186, 245, 20, 0.5);
}

/* ============================================================
   ШАГ — карточки одинаковой высоты, кружок по центру
   ============================================================ */
.step {
  position: relative;
  display: flex;
  align-items: stretch;
  padding-bottom: 1.5rem;
}

.step:last-child {
  padding-bottom: 0;
}

/* ---------- Маркер с иконкой — по центру карточки ---------- */
.step__marker {
  position: absolute;
  top: 50%;
  left: -44px;
  transform: translateY(-50%);
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.step__icon {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  transition:
    color 0.5s ease,
    border-color 0.5s ease,
    background 0.5s ease,
    box-shadow 0.5s ease;
}

.step__icon svg {
  width: 15px;
  height: 15px;
  display: block;
}

/* Активный шаг — иконка подсвечена */
.step.is-active .step__icon {
  color: var(--color-bg);
  background: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow:
    0 0 0 4px rgba(186, 245, 20, 0.12),
    0 0 20px rgba(186, 245, 20, 0.4);
}

/* ---------- Карточка ---------- */
.step__card {
  position: relative;
  flex: 1;
  width: 100%;
  /* Фиксированная минимальная высота — все карточки одинаковые */
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.75rem 2.25rem;
  border-radius: 20px;
  isolation: isolate;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.step__card:hover {
  transform: translateX(6px);
}

/* Слои стекла */
.step__card-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  z-index: 0;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.step__card:hover .step__card-bg {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
}

.step__card-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.5s ease;
}

.step.is-active .step__card-border {
  border-color: rgba(186, 245, 20, 0.25);
}

.step__card:hover .step__card-border {
  border-color: rgba(186, 245, 20, 0.45);
}

.step__card-reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 12%,
      transparent 35%);
  opacity: 0.9;
}

/* Тень */
.step__card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.04) inset,
    0 20px 40px -16px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.5s ease;
}

.step__card:hover::after {
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
    0 28px 56px -16px rgba(0, 0, 0, 0.55),
    0 12px 32px -10px rgba(186, 245, 20, 0.05);
}

/* ---------- Текст карточки ---------- */
.step__title {
  position: relative;
  z-index: 5;
  font-family: var(--font-body);
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
  color: var(--color-fg);
  margin-bottom: 0.6rem;
}

.step__desc {
  position: relative;
  z-index: 5;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-fg-mute);
  max-width: 620px;
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 640px) {
  .process {
    padding-left: 36px;
  }

  .process__line {
    left: 12px;
  }

  .step__marker {
    left: -36px;
    width: 25px;
    height: 25px;
  }

  .step__icon {
    width: 25px;
    height: 25px;
  }

  .step__icon svg {
    width: 12px;
    height: 12px;
  }

  .step__card {
    min-height: 110px;
    padding: 1.25rem 1.35rem;
  }

  .step {
    padding-bottom: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .step__card,
  .step__icon,
  .step__card-bg,
  .step__card-border {
    transition: none !important;
  }

  .aurora__blob {
    animation: none !important;
  }
}
</style>
