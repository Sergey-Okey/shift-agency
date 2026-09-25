<template>
  <section ref="heroRef" class="hero">
    <UiHeroAurora />

    <!-- 3-слойный магнитный glow, следует за курсором -->
    <div class="hero__glow-layer" aria-hidden="true">
      <span ref="glowSlowRef" class="hero__glow hero__glow--slow" />
      <span ref="glowMainRef" class="hero__glow hero__glow--main" />
      <span ref="glowCoreRef" class="hero__glow hero__glow--core" />
    </div>

    <div class="container hero__inner">
      <div class="hero__badge hero-el hero-el--badge">
        {{ $t('hero.badge') }}
      </div>

      <h1 class="hero__title">
        <SplitText :key="`l1-${locale}`" :stagger="26" :delay="250" :blur="10">
          {{ $t('hero.line1') }}
        </SplitText><br>
        <SplitText :key="`l2-${locale}`" :stagger="26" :delay="500" :blur="10" class="text-accent-gradient">
          {{ $t('hero.line2') }}
        </SplitText><br>
        <SplitText :key="`l3-${locale}`" :stagger="26" :delay="750" :blur="10">
          {{ $t('hero.line3') }}
        </SplitText>
      </h1>

      <p class="hero__lead hero-el hero-el--lead">
        {{ $t('hero.lead') }}
      </p>

      <div class="hero__cta hero-el hero-el--cta">
        <a href="#portfolio" class="btn btn-accent magnetic">
          {{ $t('hero.ctaPortfolio') }}
        </a>
        <a href="#contact" class="btn btn-ghost magnetic">
          {{ $t('hero.ctaContact') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const glowSlowRef = ref<HTMLElement | null>(null)
const glowMainRef = ref<HTMLElement | null>(null)
const glowCoreRef = ref<HTMLElement | null>(null)

/* =====================================================
   Mouse-follow: 3 слоя с разной инерцией + idle drift
   ===================================================== */
let raf = 0
const mouse = { x: 0, y: 0, active: false }
const layer = {
  slow: { x: 0, y: 0, l: 0.035 },
  main: { x: 0, y: 0, l: 0.09 },
  core: { x: 0, y: 0, l: 0.22 },
}

function onMouseMove(e: MouseEvent) {
  const rect = heroRef.value?.getBoundingClientRect()
  if (!rect) return
  // Смещение от центра hero, в диапазоне примерно -1..1
  mouse.x = e.clientX - (rect.left + rect.width / 2)
  mouse.y = e.clientY - (rect.top + rect.height / 2)
  mouse.active = true
}

function loop(time: number) {
  const t = time * 0.001

  // Idle drift — даже без мыши пятна живут
  const driftX = Math.sin(t * 0.35) * 45 + Math.sin(t * 0.9) * 15
  const driftY = Math.cos(t * 0.28) * 35 + Math.cos(t * 0.7) * 12

  const targetX = mouse.active ? mouse.x : 0
  const targetY = mouse.active ? mouse.y : 0

  layer.slow.x += (targetX - layer.slow.x) * layer.slow.l
  layer.slow.y += (targetY - layer.slow.y) * layer.slow.l
  layer.main.x += (targetX - layer.main.x) * layer.main.l
  layer.main.y += (targetY - layer.main.y) * layer.main.l
  layer.core.x += (targetX - layer.core.x) * layer.core.l
  layer.core.y += (targetY - layer.core.y) * layer.core.l

  if (glowSlowRef.value) {
    glowSlowRef.value.style.transform =
      `translate(-50%, -50%) translate3d(${layer.slow.x * 0.4 + driftX}px, ${layer.slow.y * 0.4 + driftY}px, 0)`
  }
  if (glowMainRef.value) {
    glowMainRef.value.style.transform =
      `translate(-50%, -50%) translate3d(${layer.main.x * 0.7 + driftX * 0.5}px, ${layer.main.y * 0.7 + driftY * 0.5}px, 0)`
  }
  if (glowCoreRef.value) {
    glowCoreRef.value.style.transform =
      `translate(-50%, -50%) translate3d(${layer.core.x * 0.9}px, ${layer.core.y * 0.9}px, 0)`
  }

  raf = requestAnimationFrame(loop)
}

/* =====================================================
   Строгий таймлайн появления
   ===================================================== */
onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches

  // Badge
  anime({
    targets: '.hero-el--badge',
    opacity: [0, 1],
    translateY: [24, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration: 800,
    delay: 100,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  })

  // Lead
  anime({
    targets: '.hero-el--lead',
    opacity: [0, 1],
    translateY: [24, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration: 800,
    delay: 1050,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  })

  // CTA
  anime({
    targets: '.hero-el--cta',
    opacity: [0, 1],
    translateY: [24, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration: 800,
    delay: 1250,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  })

  // Mouse-follow only on desktop and without reduce-motion
  if (!reduced && !coarse) {
    window.addEventListener('mousemove', onMouseMove)
    raf = requestAnimationFrame(loop)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
/* =====================================================
   Каркас
   ===================================================== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: calc(var(--header-height) + 2rem) 0 4rem;
  overflow: hidden;
}

/* =====================================================
   3-слойный glow
   ===================================================== */
.hero__glow-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  will-change: auto;
}

.hero__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

/* Медленный — большой мягкий ореол, следует лениво */
.hero__glow--slow {
  width: 1100px;
  height: 1100px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.18) 0%,
      rgba(110, 123, 255, 0.10) 35%,
      transparent 70%);
  filter: blur(60px);
  mix-blend-mode: screen;
}

/* Средний — основной яркий glow */
.hero__glow--main {
  width: 620px;
  height: 620px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.42) 0%,
      rgba(186, 245, 20, 0.12) 40%,
      transparent 75%);
  filter: blur(50px);
  mix-blend-mode: screen;
}

/* Быстрый — маленькое яркое ядро, почти приклеено к курсору */
.hero__glow--core {
  width: 220px;
  height: 220px;
  background: radial-gradient(circle,
      rgba(212, 255, 61, 0.75) 0%,
      rgba(186, 245, 20, 0.25) 45%,
      transparent 75%);
  filter: blur(30px);
  mix-blend-mode: screen;
  opacity: 0.9;
}

/* =====================================================
   Контент
   ===================================================== */
.hero__inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero__badge {
  margin-bottom: 2.5rem;
  opacity: 0;
}

.hero__title {
  font-size: var(--fs-h1);
  margin-bottom: 2rem;
  line-height: 1;
}

.text-accent-gradient {
  background: linear-gradient(120deg, #d4ff3d 0%, #baf514 45%, #7bd10d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero__lead {
  font-size: 1.15rem;
  color: var(--color-fg-mute);
  max-width: 620px;
  margin: 0 auto 3rem;
  opacity: 0;
}

.hero__cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
}

/* =====================================================
   Адаптив
   ===================================================== */
@media (max-width: 900px) {
  .hero__glow--slow {
    width: 700px;
    height: 700px;
  }

  .hero__glow--main {
    width: 460px;
    height: 460px;
  }

  .hero__glow--core {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: calc(var(--header-height) + 3rem) 0 4rem;
  }

  .hero__glow-layer {
    opacity: 0.7;
  }
}

/* Reduce motion — отключаем дрейф и лишнее */
@media (prefers-reduced-motion: reduce) {
  .hero__glow {
    transition: none;
  }
}
</style>
