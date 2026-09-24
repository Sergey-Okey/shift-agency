<template>
  <div ref="cursor" class="cursor" :class="{ 'is-active': isActive }">
    <div class="cursor__dot" />
    <div class="cursor__ring" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const isActive = ref(false)

onMounted(() => {
  if (window.matchMedia('(max-width: 768px)').matches) return
  const el = cursor.value
  if (!el) return

  let mx = window.innerWidth / 2, my = window.innerHeight / 2
  let cx = mx, cy = my

  function onMove(e: MouseEvent) {
    mx = e.clientX; my = e.clientY
    const target = e.target as HTMLElement
    isActive.value = !!target.closest('a, button, .magnetic')
  }
  function loop() {
    cx += (mx - cx) * 0.18
    cy += (my - cy) * 0.18
    el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
    requestAnimationFrame(loop)
  }
  window.addEventListener('mousemove', onMove)
  loop()
  onBeforeUnmount(() => window.removeEventListener('mousemove', onMove))
})
</script>

<style scoped>
.cursor { position: fixed; top: 0; left: 0; pointer-events: none; z-index: var(--z-cursor); mix-blend-mode: difference; }
.cursor__dot { position: absolute; top: -3px; left: -3px; width: 6px; height: 6px; background: #fff; border-radius: 50%; }
.cursor__ring { position: absolute; top: -20px; left: -20px; width: 40px; height: 40px; border: 1.5px solid #fff; border-radius: 50%; transition: transform 0.4s var(--ease-out-expo); }
.cursor.is-active .cursor__ring { transform: scale(1.6); }
@media (max-width: 768px) { .cursor { display: none; } }
</style>
