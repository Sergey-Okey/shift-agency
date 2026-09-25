<template>
  <canvas ref="canvasRef" class="glass-ripple-canvas" />
</template>

<script setup lang="ts">
import { GlassRipple } from 'glass-ripple'
import { claude } from 'glass-ripple/icons'; // Пример иконки, можно заменить
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ripple: GlassRipple | null = null

onMounted(() => {
  if (!canvasRef.value) return

  ripple = new GlassRipple({
    canvas: canvasRef.value,
    icon: claude.icon, // Иконка по умолчанию, можно менять через setIcon
    background: '#050505', // Ваш тёмный фон
    pixelRatio: Math.min(window.devicePixelRatio, 2), // Ограничиваем для производительности
    wave: {
      damping: 0.8,   // Затухание волн
      speed: 1.0,     // Скорость распространения
      radius: 0.025,  // Радиус влияния мыши
      intensity: 20.0, // Сила "толчка" от мыши
      momentum: 0.4,  // Сглаживание движения мыши
    },
    effects: {
      halftone: [{ mix: 0.29 }, { mix: 0.38 }], // Эффект полутонов
      chromab: { amount: 0.2 }, // Хроматическая аберрация
      retroScreen: { cellScale: 0.028, glow: 0.5 }, // Ретро-экран
      vignette: { intensity: 0.3 }, // Виньетка
    },
  })
})

onBeforeUnmount(() => {
  // Важно: очищаем ресурсы при размонтировании
  ripple?.dispose()
})
</script>

<style scoped>
.glass-ripple-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Чтобы canvas не перехватывал клики, если он поверх */
  z-index: 1;
  /* Разместите под контентом, но над фоном */
}
</style>
