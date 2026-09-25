<template>
  <section id="faq" class="section section--faq">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <span class="section-label reveal">{{ $t('faq.label') }}</span>
      <h2 class="section-title reveal">
        {{ $t('faq.title') }} <span class="text-accent">{{ $t('faq.titleAccent') }}</span>
      </h2>

      <div ref="faqRef" class="faq-list">
        <UiAccordionItem v-for="(item, i) in faq" :key="i" :question="item.q" :answer="item.a" :index="i" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const faqRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const email = 'hello@shift-agency.ru'

const faq = computed(() => [
  { q: t('faq.items.cost.q'), a: t('faq.items.cost.a') },
  { q: t('faq.items.timeline.q'), a: t('faq.items.timeline.a') },
  { q: t('faq.items.contract.q'), a: t('faq.items.contract.a') },
  { q: t('faq.items.support.q'), a: t('faq.items.support.a') },
  { q: t('faq.items.update.q'), a: t('faq.items.update.a') },
  { q: t('faq.items.contact.q'), a: t('faq.items.contact.a', { email }) },
])

onMounted(async () => {
  await nextTick()
  if (!faqRef.value) return

  anime.set('.accordion', { opacity: 0, translateY: 20 })

  const play = () => {
    anime({
      targets: '.accordion',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: anime.stagger(80),
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
    { threshold: 0.1 },
  )
  observer.observe(faqRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--faq {
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
  opacity: 0.5;
  will-change: transform;
}

.aurora__blob--1 {
  top: 15%;
  left: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.26) 0%,
      rgba(186, 245, 20, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat1 30s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 10%;
  right: 10%;
  width: 560px;
  height: 560px;
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
    transform: translate(60px, -50px) scale(1.12);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-70px, 40px) scale(0.95);
  }
}

/* ============================================================
   СПИСОК — во всю ширину
   ============================================================ */
.faq-list {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  /* max-width убран — на всю ширину контейнера */
}

@media (max-width: 640px) {
  .faq-list {
    gap: 0.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora__blob {
    animation: none !important;
  }

  .accordion {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
