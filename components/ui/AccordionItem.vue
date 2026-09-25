<template>
  <div class="accordion" :class="{ 'accordion--open': isOpen }" :style="{ '--stagger-delay': `${index * 80}ms` }">
    <span class="accordion__bg" aria-hidden="true" />
    <span class="accordion__border" aria-hidden="true" />
    <span class="accordion__accent" aria-hidden="true" />

    <button ref="headRef" class="accordion__head" @click="toggle" :aria-expanded="isOpen">
      <span class="accordion__num">{{ String(index + 1).padStart(2, '0') }}</span>

      <span class="accordion__q">{{ question }}</span>

      <span class="accordion__icon" aria-hidden="true">
        <span class="accordion__icon-line accordion__icon-line--h" />
        <span class="accordion__icon-line accordion__icon-line--v" />
      </span>
    </button>

    <div ref="bodyRef" class="accordion__body" :style="{ height: bodyHeight }">
      <div ref="contentRef" class="accordion__content">
        <p class="accordion__answer">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { nextTick, ref } from 'vue';

const props = defineProps<{
  question: string
  answer: string
  index: number
}>()

const isOpen = ref(false)
const bodyRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const headRef = ref<HTMLElement | null>(null)
const bodyHeight = ref('0px')

/* ============================================================
   ТОГГЛ
   ============================================================ */
async function toggle() {
  isOpen.value = !isOpen.value
  await nextTick()

  const body = bodyRef.value
  const content = contentRef.value
  if (!body || !content) return

  const targetHeight = isOpen.value ? content.offsetHeight : 0

  /* Анимируем высоту с пружинным easing — как iOS */
  anime.remove(body)
  anime({
    targets: body,
    height: [body.offsetHeight, targetHeight],
    duration: isOpen.value ? 620 : 420,
    easing: isOpen.value
      ? 'cubicBezier(0.16, 1, 0.3, 1)'  // открытие — мягкое замедление
      : 'cubicBezier(0.4, 0, 1, 1)',     // закрытие — быстрее
    complete: () => {
      bodyHeight.value = isOpen.value ? 'auto' : '0px'
    },
  })

  /* Каскадное появление контента — только при открытии */
  if (isOpen.value) {
    anime.set(content, { opacity: 0, translateY: 8 })
    anime({
      targets: content,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 600,
      delay: 180,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    /* Пульс по рамке при открытии */
    const border = headRef.value?.parentElement?.querySelector('.accordion__border')
    if (border) {
      anime({
        targets: border,
        boxShadow: [
          { value: 'inset 0 0 0 1px rgba(186,245,20,0), 0 0 0px rgba(186,245,20,0)' },
          { value: 'inset 0 0 0 1px rgba(186,245,20,0.35), 0 0 30px rgba(186,245,20,0.25)' },
          { value: 'inset 0 0 0 1px rgba(186,245,20,0.15), 0 0 18px rgba(186,245,20,0.1)' },
        ],
        duration: 900,
        easing: 'easeOutQuad',
      })
    }
  } else {
    /* Закрытие — контент мгновенно уходит, чтобы не мигал */
    anime.set(content, { opacity: 0 })
  }
}
</script>

<style scoped>
/* ============================================================
   АККОРДЕОН
   ============================================================ */
.accordion {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  isolation: isolate;
  --stagger-delay: 0ms;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    margin 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---------- Слои стекла ---------- */
.accordion__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  z-index: 0;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.accordion:hover .accordion__bg {
  background: rgba(255, 255, 255, 0.035);
}

.accordion--open .accordion__bg {
  background: rgba(186, 245, 20, 0.03);
  backdrop-filter: blur(36px) saturate(180%);
  -webkit-backdrop-filter: blur(36px) saturate(180%);
}

.accordion__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.4s ease;
}

.accordion:hover .accordion__border {
  border-color: rgba(255, 255, 255, 0.14);
}

.accordion--open .accordion__border {
  border-color: rgba(186, 245, 20, 0.35);
}

/* ---------- Акцентная полоска слева ---------- */
.accordion__accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-accent);
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 16px rgba(186, 245, 20, 0.6);
  z-index: 3;
  pointer-events: none;
}

.accordion--open .accordion__accent {
  transform: scaleY(1);
}

/* ============================================================
   HEAD
   ============================================================ */
.accordion__head {
  position: relative;
  z-index: 3;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  text-align: left;
  background: none;
  border: none;
  cursor: none;
  color: inherit;
  font: inherit;
  transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.accordion__num {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.28);
  flex-shrink: 0;
  width: 28px;
  transition: color 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.accordion:hover .accordion__num {
  color: rgba(255, 255, 255, 0.6);
  transform: translateX(2px);
}

.accordion--open .accordion__num {
  color: var(--color-accent);
  transform: translateX(2px);
}

.accordion__q {
  flex: 1;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.4;
  color: var(--color-fg);
  transition: color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.accordion:hover .accordion__q {
  transform: translateX(3px);
}

.accordion--open .accordion__q {
  transform: translateX(3px);
}

/* ============================================================
   ИКОНКА
   ============================================================ */
.accordion__icon {
  position: relative;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.accordion:hover .accordion__icon {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.06);
}

.accordion--open .accordion__icon {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: rotate(180deg) scale(1.06);
  box-shadow: 0 0 18px rgba(186, 245, 20, 0.35);
}

.accordion__icon-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.75);
  transition: background 0.4s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.accordion__icon-line--h {
  width: 13px;
  height: 1.5px;
  border-radius: 1px;
}

.accordion__icon-line--v {
  width: 1.5px;
  height: 13px;
  border-radius: 1px;
}

.accordion--open .accordion__icon-line {
  background: var(--color-bg);
}

.accordion--open .accordion__icon-line--v {
  transform: rotate(90deg);
}

/* ============================================================
   BODY
   ============================================================ */
.accordion__body {
  position: relative;
  z-index: 3;
  height: 0;
  overflow: hidden;
  will-change: height;
}

.accordion__content {
  padding: 0 1.75rem 1.75rem;
  padding-left: calc(1.75rem + 28px + 1.5rem);
  opacity: 0;
}

.accordion__answer {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-fg-mute);
  max-width: 820px;
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 640px) {
  .accordion__head {
    padding: 1.25rem 1.25rem;
    gap: 1rem;
  }

  .accordion__q {
    font-size: 0.9rem;
  }

  .accordion__num {
    font-size: 0.65rem;
    width: 22px;
  }

  .accordion__icon {
    width: 30px;
    height: 30px;
  }

  .accordion__content {
    padding: 0 1.25rem 1.35rem;
    padding-left: calc(1.25rem + 22px + 1rem);
  }

  .accordion__answer {
    font-size: 0.86rem;
  }
}

@media (pointer: coarse) {
  .accordion__head {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .accordion,
  .accordion__accent,
  .accordion__icon,
  .accordion__q,
  .accordion__num {
    transition: none !important;
  }

  .accordion__accent {
    transform: scaleY(1) !important;
  }
}
</style>
