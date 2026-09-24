<template>
  <span ref="el" class="split-text"><slot /></span>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import SplitType from 'split-type'
import anime from 'animejs/lib/anime.es.js'

const props = defineProps<{ delay?: number; duration?: number; stagger?: number }>()
const el = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (!el.value) return
  const split = new SplitType(el.value, { types: 'chars,words' })
  const chars = split.chars
  if (!chars) return

  anime.set(chars, { opacity: 0, translateY: 40 })
  anime({
    targets: chars,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: props.duration ?? 900,
    delay: anime.stagger(props.stagger ?? 25, { start: props.delay ?? 0 }),
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  })
})
</script>

<style scoped>.split-text { display: inline-block; }</style>
