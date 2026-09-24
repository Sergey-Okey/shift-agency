<template>
  <div class="progress"><div class="progress__bar" :style="{ width: progress + '%' }" /></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
const progress = ref(0)
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.progress { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: var(--z-header); }
.progress__bar { height: 100%; background: var(--color-accent); transition: width 0.1s linear; box-shadow: 0 0 12px var(--color-accent); }
</style>
