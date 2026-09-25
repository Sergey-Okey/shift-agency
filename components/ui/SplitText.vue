<template>
  <span ref="el" class="split-text">
    <slot />
  </span>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import SplitType from 'split-type';
import { nextTick, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    delay?: number
    duration?: number
    stagger?: number
    blur?: number
  }>(),
  {
    delay: 0,
    duration: 900,
    stagger: 25,
    blur: 10,
  },
)

const el = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (!el.value) return

  const split = new SplitType(el.value, { types: 'chars,words' })
  const chars = split.chars
  if (!chars) return

  anime.set(chars, {
    opacity: 0,
    translateY: 60,
    filter: `blur(${props.blur}px)`,
    scale: 1.1,
  })

  anime({
    targets: chars,
    opacity: [0, 1],
    translateY: [60, 0],
    scale: [1.1, 1],
    filter: [`blur(${props.blur}px)`, 'blur(0px)'],
    duration: props.duration,
    delay: anime.stagger(props.stagger, { start: props.delay }),
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  })
})
</script>

<style scoped>
.split-text {
  display: inline-block;
}
</style>
