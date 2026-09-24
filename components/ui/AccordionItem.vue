<template>
  <div class="accordion" :class="{ 'accordion--open': isOpen }">
    <button class="accordion__head" @click="toggle">
      <span class="accordion__q">{{ question }}</span>
      <span class="accordion__icon">+</span>
    </button>
    <div class="accordion__body" :style="{ maxHeight: isOpen ? '500px' : '0' }">
      <div class="accordion__content">{{ answer }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ question: string; answer: string }>()
const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
</script>

<style scoped>
.accordion { border-bottom: 1px solid var(--glass-border); }
.accordion__head { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.75rem 0; text-align: left; font-size: 1.1rem; font-family: var(--font-display); letter-spacing: 0.02em; text-transform: uppercase; transition: color 0.3s; }
.accordion__head:hover { color: var(--color-accent); }
.accordion__icon { font-family: var(--font-body); font-size: 1.5rem; color: var(--color-accent); transition: transform 0.4s var(--ease-out-expo); }
.accordion--open .accordion__icon { transform: rotate(45deg); }
.accordion__body { overflow: hidden; transition: max-height 0.5s var(--ease-out-expo); }
.accordion__content { padding: 0 0 1.75rem 0; color: var(--color-fg-mute); line-height: 1.7; max-width: 800px; }
</style>
