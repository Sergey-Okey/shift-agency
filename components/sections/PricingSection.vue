  <template>
    <section id="pricing" class="section section--pricing">
      <!-- Aurora-фон -->
      <div class="aurora" aria-hidden="true">
        <span class="aurora__blob aurora__blob--1" />
        <span class="aurora__blob aurora__blob--2" />
      </div>

      <div class="container">
        <span class="section-label reveal">{{ $t('pricing.label') }}</span>
        <h2 class="section-title reveal">
          {{ $t('pricing.title') }} <span class="text-accent">{{ $t('pricing.titleAccent') }}</span>
        </h2>

        <div ref="pricingRef" class="pricing-grid">
          <article v-for="(plan, i) in plans" :key="i" class="plan" :class="{ 'plan--featured': plan.featured }"
            :style="{ '--stagger-delay': `${i * 120}ms` }">
            <span class="plan__bg" aria-hidden="true" />
            <span class="plan__border" aria-hidden="true" />
            <span class="plan__reflection" aria-hidden="true" />

            <span v-if="plan.featured" class="plan__badge">
              <span class="plan__badge-dot" />
              {{ $t('pricing.popular') }}
            </span>

            <!-- ЗОНА 1: HEAD (иконка + индекс) -->
            <header class="plan__head">
              <span class="plan__icon">
                <svg v-if="i === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
                <svg v-else-if="i === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 21V7l9-4 9 4v14" />
                  <path d="M9 21V12h6v9" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 18l6-6-6-6" />
                  <path d="M8 6l-6 6 6 6" />
                  <path d="M14 4l-4 16" />
                </svg>
              </span>
            </header>

            <!-- ЗОНА 2: НАЗВАНИЕ + ОПИСАНИЕ -->
            <div class="plan__intro">
              <h3 class="plan__name">{{ plan.name }}</h3>
              <p class="plan__desc">{{ plan.desc }}</p>
            </div>

            <!-- ЗОНА 3: ЦЕНА (крупная) -->
            <div class="plan__price">
              <span class="plan__price-value">{{ plan.price }}</span>
              <span class="plan__price-currency">{{ currency }}</span>
            </div>

            <!-- ЗОНА 4: РАЗДЕЛИТЕЛЬ -->
            <span class="plan__divider" aria-hidden="true" />

            <!-- ЗОНА 5: ФИЧИ -->
            <ul class="plan__features">
              <li v-for="(f, fi) in plan.features" :key="fi" class="plan__feature">
                <UiFeatureIcon :name="f.icon" />
                <span class="plan__feature-text">{{ f.text }}</span>
              </li>
            </ul>

            <!-- ЗОНА 6: КНОПКА -->
            <a href="#contact" class="plan__cta magnetic">
              <span>{{ $t('pricing.choose') }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  </template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { locale, t } = useI18n()

const pricingRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const currency = computed(() => (locale.value === 'en' ? '$' : '₽'))

const plans = computed(() => [
  {
    name: t('pricing.plans.landing.name'),
    price: t('pricing.plans.landing.price'),
    desc: t('pricing.plans.landing.desc'),
    features: [
      { icon: 'palette', text: t('pricing.plans.landing.feature1') },
      { icon: 'phone', text: t('pricing.plans.landing.feature2') },
      { icon: 'mail', text: t('pricing.plans.landing.feature3') },
      { icon: 'search', text: t('pricing.plans.landing.feature4') },
      { icon: 'clock', text: t('pricing.plans.landing.feature5') },
    ],
    featured: false,
  },
  {
    name: t('pricing.plans.corporate.name'),
    price: t('pricing.plans.corporate.price'),
    desc: t('pricing.plans.corporate.desc'),
    features: [
      { icon: 'pages', text: t('pricing.plans.corporate.feature1') },
      { icon: 'settings', text: t('pricing.plans.corporate.feature2') },
      { icon: 'chart', text: t('pricing.plans.corporate.feature3') },
      { icon: 'search', text: t('pricing.plans.corporate.feature4') },
      { icon: 'puzzle', text: t('pricing.plans.corporate.feature5') },
      { icon: 'clock', text: t('pricing.plans.corporate.feature6') },
    ],
    featured: true,
  },
  {
    name: t('pricing.plans.app.name'),
    price: t('pricing.plans.app.price'),
    desc: t('pricing.plans.app.desc'),
    features: [
      { icon: 'code', text: t('pricing.plans.app.feature1') },
      { icon: 'api', text: t('pricing.plans.app.feature2') },
      { icon: 'lock', text: t('pricing.plans.app.feature3') },
      { icon: 'dashboard', text: t('pricing.plans.app.feature4') },
      { icon: 'clock', text: t('pricing.plans.app.feature5') },
    ],
    featured: false,
  },
])

/* ============================================================
  Анимация появления
  ============================================================ */
onMounted(async () => {
  await nextTick()
  if (!pricingRef.value) return

  anime.set('.plan', { opacity: 0, translateY: 40 })
  anime.set('.plan__head', { opacity: 0 })
  anime.set('.plan__intro', { opacity: 0, translateY: 16 })
  anime.set('.plan__price', { opacity: 0, translateY: 12 })
  anime.set('.plan__divider', { scaleX: 0 })
  anime.set('.plan__feature', { opacity: 0, translateX: -10 })
  anime.set('.plan__cta', { opacity: 0, translateY: 12 })

  const play = () => {
    anime({
      targets: '.plan',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900,
      delay: anime.stagger(130),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.plan__head',
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(130, { start: 200 }),
      easing: 'easeOutQuad',
    })

    anime({
      targets: '.plan__intro',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      delay: anime.stagger(130, { start: 300 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.plan__price',
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700,
      delay: anime.stagger(130, { start: 450 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.plan__divider',
      scaleX: [0, 1],
      duration: 600,
      delay: anime.stagger(130, { start: 650 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.plan__feature',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: anime.stagger(30, { start: 750 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.plan__cta',
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 600,
      delay: anime.stagger(130, { start: 1050 }),
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
    { threshold: 0.15 },
  )
  observer.observe(pricingRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* ============================================================
    СЕКЦИЯ
    ============================================================ */
.section--pricing {
  position: relative;
  overflow: hidden;
}

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
  opacity: 0.5;
  will-change: transform;
}

.aurora__blob--1 {
  top: 10%;
  left: 10%;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.26) 0%,
      rgba(186, 245, 20, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat1 30s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 5%;
  right: 8%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle,
      rgba(110, 123, 255, 0.22) 0%,
      rgba(110, 123, 255, 0.05) 40%,
      transparent 70%);
  animation: auroraFloat2 34s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(80px, 60px) scale(1.12);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-70px, -50px) scale(0.95);
  }
}

/* ============================================================
    СЕТКА
    ============================================================ */
.pricing-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  align-items: stretch;
  margin-top: 0.5rem;
}

/* ============================================================
    КАРТОЧКА — строгая вертикальная структура
    ============================================================ */
.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.75rem 1.5rem;
  border-radius: 28px;
  isolation: isolate;
  overflow: hidden;
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease,
    background 0.45s ease;
  will-change: transform, opacity;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
}

.plan:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 24px 46px rgba(0, 0, 0, 0.32), 0 0 30px rgba(186, 245, 20, 0.08);
}

.plan__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  z-index: 0;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.plan:hover .plan__bg {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
}

.plan__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.plan:hover .plan__border {
  border-color: rgba(186, 245, 20, 0.5);
  box-shadow: inset 0 0 0 1px rgba(186, 245, 20, 0.15), 0 0 18px rgba(186, 245, 20, 0.08);
}

.plan__reflection {
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

.plan::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.04) inset,
    0 16px 32px -16px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.5s ease;
}

.plan:hover::after {
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
    0 30px 56px -18px rgba(0, 0, 0, 0.62),
    0 18px 30px -12px rgba(186, 245, 20, 0.12);
}

/* ============================================================
    FEATURED
    ============================================================ */
.plan--featured {
  transform: translateY(-10px);
}

.plan--featured:hover {
  transform: translateY(-15px);
}

.plan--featured .plan__border {
  border-color: rgba(186, 245, 20, 0.52);
  box-shadow: inset 0 0 0 1px rgba(186, 245, 20, 0.12);
}

.plan--featured .plan__bg {
  background: rgba(186, 245, 20, 0.028);
  backdrop-filter: blur(36px) saturate(180%);
  -webkit-backdrop-filter: blur(36px) saturate(180%);
}

.plan--featured::after {
  box-shadow:
    0 1px 0 0 rgba(186, 245, 20, 0.1) inset,
    0 20px 40px -16px rgba(0, 0, 0, 0.5),
    0 0 50px -20px rgba(186, 245, 20, 0.22);
}

.plan--featured:hover::after {
  box-shadow:
    0 1px 0 0 rgba(186, 245, 20, 0.15) inset,
    0 32px 60px -18px rgba(0, 0, 0, 0.6),
    0 0 70px -16px rgba(186, 245, 20, 0.3);
}

/* ============================================================
    BADGE
    ============================================================ */
.plan__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
  background: rgba(186, 245, 20, 0.12);
  border: 1px solid rgba(186, 245, 20, 0.35);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  z-index: 5;
  backdrop-filter: blur(20px);
}

.plan__badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px rgba(186, 245, 20, 0.7);
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}

/* ============================================================
    ЗОНА 1: HEAD
    ============================================================ */
.plan__head {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  /* Фиксированная высота — все карточки выравниваются */
  height: 36px;
}

.plan__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  transition:
    color 0.5s ease,
    background 0.5s ease,
    border-color 0.5s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.plan__icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

.plan:hover .plan__icon {
  color: var(--color-accent);
  background: rgba(186, 245, 20, 0.08);
  border-color: rgba(186, 245, 20, 0.3);
  transform: scale(1.05);
}

.plan--featured .plan__icon {
  color: var(--color-accent);
  background: rgba(186, 245, 20, 0.1);
  border-color: rgba(186, 245, 20, 0.35);
}

.plan__index {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
}

/* ============================================================
    ЗОНА 2: INTRO — название + описание, фиксированная высота
    ============================================================ */
.plan__intro {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  /* Фиксированная min-height — выравнивает цену по одной линии */
  min-height: 84px;
  margin-bottom: 1.5rem;
}

.plan__name {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.25;
  text-transform: uppercase;
  color: var(--color-fg);
}

.plan__desc {
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-fg-mute);
}

/* ============================================================
    ЗОНА 3: ЦЕНА — крупная
    ============================================================ */
.plan__price {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
  /* Фиксированная высота — все карточки выравниваются */
  min-height: 60px;
}

.plan__price-value {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 3.4vw, 3.2rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-fg);
  transition: color 0.5s ease;
}

.plan--featured .plan__price-value {
  color: var(--color-accent);
}

.plan__price-currency {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  color: rgba(255, 255, 255, 0.5);
  align-self: flex-start;
  padding-top: 0.15rem;
}

.plan--featured .plan__price-currency {
  color: var(--color-accent);
  opacity: 0.75;
}

/* ============================================================
    ЗОНА 4: РАЗДЕЛИТЕЛЬ
    ============================================================ */
.plan__divider {
  position: relative;
  z-index: 5;
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.03) 100%);
  margin-bottom: 1.5rem;
  transform-origin: left center;
}

.plan--featured .plan__divider {
  background: linear-gradient(90deg,
      rgba(186, 245, 20, 0.25) 0%,
      rgba(186, 245, 20, 0.03) 100%);
}

/* ============================================================
    ЗОНА 5: ФИЧИ
    ============================================================ */
.plan__features {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
  /* Растягиваем — кнопка всегда внизу */
  flex: 1;
}

.plan__feature {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.3s ease;
}

.plan__feature:hover {
  color: var(--color-fg);
}

.plan__feature :deep(.feature-icon) {
  width: 18px;
  height: 18px;
}

.plan__feature :deep(.feature-icon svg) {
  width: 14px;
  height: 14px;
}

.plan:hover .plan__feature :deep(.feature-icon) {
  color: var(--color-accent);
}

.plan--featured .plan__feature :deep(.feature-icon) {
  color: var(--color-accent);
}

.plan__feature-text {
  flex: 1;
}

/* ============================================================
    ЗОНА 6: КНОПКА
    ============================================================ */
.plan__cta {
  position: relative;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(20px);
  color: var(--color-fg);
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: none;
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    color 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}

.plan__cta svg {
  width: 12px;
  height: 12px;
  display: block;
  transition: transform 0.3s ease;
}

.plan__cta:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -8px rgba(186, 245, 20, 0.4);
}

.plan__cta:hover svg {
  transform: translateX(3px);
}

.plan--featured .plan__cta {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
}

.plan--featured .plan__cta:hover {
  background: #fff;
  border-color: #fff;
  box-shadow: 0 10px 24px -8px rgba(255, 255, 255, 0.3);
}

/* ============================================================
    АДАПТИВ
    ============================================================ */
@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .plan--featured {
    transform: translateY(0);
  }

  .plan--featured:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 700px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .plan {
    padding: 1.5rem 1.35rem 1.25rem;
  }

  .plan__head {
    margin-bottom: 1.25rem;
  }

  .plan__intro {
    min-height: 0;
    margin-bottom: 1.25rem;
  }

  .plan__price {
    min-height: 0;
    margin-bottom: 1.25rem;
  }

  .plan__divider {
    margin-bottom: 1.25rem;
  }

  .plan__features {
    margin-bottom: 1.25rem;
    gap: 0.55rem;
  }
}

@media (pointer: coarse) {
  .plan__cta {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .plan,
  .plan__icon,
  .plan__cta,
  .plan__bg,
  .plan__border {
    transition: none !important;
  }

  .aurora__blob,
  .plan__badge-dot {
    animation: none !important;
  }

  .plan {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
