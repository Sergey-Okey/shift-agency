<template>
  <span ref="el" class="counter">{{ display }}</span>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  value: string
  duration?: number
}>()

const el = ref<HTMLElement | null>(null)
const display = ref('0')
let observer: IntersectionObserver | null = null

function parse(v: string) {
  const match = v.match(/^(\d+)(.*)$/)
  if (!match) return { num: 0, suffix: v }
  return { num: parseInt(match[1], 10), suffix: match[2] || '' }
}

onMounted(() => {
  if (!el.value) return
  const { num, suffix } = parse(props.value)

  if (!('IntersectionObserver' in window)) {
    display.value = props.value
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer?.disconnect()

      const state = { val: 0 }
      anime({
        targets: state,
        val: num,
        round: 1,
        duration: props.duration ?? 1600,
        easing: 'easeOutExpo',
        update: () => {
          display.value = `${state.val}${suffix}`
        },
      })
    },
    { threshold: 0.5 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.counter {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
</style>
