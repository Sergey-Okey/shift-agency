<template>
  <span ref="el" class="flip-counter">
    <span v-for="(digit, i) in digits" :key="i" class="flip-counter__digit">
      <span class="flip-counter__reel">
        <span v-for="n in 10" :key="n - 1" class="flip-counter__num">
          {{ n - 1 }}
        </span>
      </span>
    </span>
    <span v-if="suffix" class="flip-counter__suffix">{{ suffix }}</span>
  </span>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  value: string
  duration?: number
}>()

const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const digits = computed(() => {
  const match = props.value.match(/\d+/)?.[0] || '0'
  return match.split('')
})

const suffix = computed(() => props.value.replace(/\d+/g, ''))

onMounted(() => {
  if (!el.value) return

  const reels = el.value.querySelectorAll<HTMLElement>('.flip-counter__reel')
  reels.forEach((reel) => {
    reel.style.transform = 'translateY(0%)'
  })

  const play = () => {
    reels.forEach((reel, i) => {
      const target = parseInt(digits.value[i] || '0', 10)
      anime({
        targets: reel,
        translateY: ['0%', `-${target * 10}%`],
        duration: props.duration ?? 1500,
        delay: 200 + i * 90,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      })
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
    { threshold: 0.5 },
  )

  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.flip-counter {
  display: inline-flex;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.flip-counter__digit {
  display: inline-block;
  height: 1em;
  overflow: hidden;
  line-height: 1;
  vertical-align: baseline;
}

.flip-counter__reel {
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.flip-counter__num {
  display: block;
  height: 1em;
  line-height: 1;
  text-align: center;
}

.flip-counter__suffix {
  margin-left: 0.02em;
}
</style>
