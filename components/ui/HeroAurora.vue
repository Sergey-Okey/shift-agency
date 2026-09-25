<template>
  <div class="aurora" aria-hidden="true">
    <div ref="wrapRef" class="aurora__wrap">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
      <span class="aurora__blob aurora__blob--3" />
      <span class="aurora__blob aurora__blob--4" />
      <span class="aurora__blob aurora__blob--5" />
    </div>
    <div class="aurora__grain" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const wrapRef = ref<HTMLElement | null>(null)

let raf = 0
const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 }

function onMouseMove(e: MouseEvent) {
  const w = window.innerWidth
  const h = window.innerHeight
  mouse.tx = (e.clientX / w - 0.5) * 2
  mouse.ty = (e.clientY / h - 0.5) * 2
}

function loop() {
  mouse.cx += (mouse.tx - mouse.cx) * 0.04
  mouse.cy += (mouse.ty - mouse.cy) * 0.04

  if (wrapRef.value) {
    wrapRef.value.style.transform = `translate3d(${mouse.cx * 40}px, ${mouse.cy * 30}px, 0)`
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches

  if (reduced || coarse) return

  window.addEventListener('mousemove', onMouseMove)
  loop()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.aurora {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* ---------- Слой с пятнами ---------- */
.aurora__wrap {
  position: absolute;
  inset: -10%;
  filter: blur(80px) saturate(140%);
  will-change: transform;
}

.aurora__blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  will-change: transform;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Каждое пятно — своя траектория, скорость, цвет */
.aurora__blob--1 {
  top: 15%;
  left: 20%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle at 30% 30%, #baf514 0%, rgba(186, 245, 20, 0) 70%);
  opacity: 0.35;
  animation: float1 22s infinite;
}

.aurora__blob--2 {
  top: 40%;
  left: 55%;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle at 30% 30%, #6e7bff 0%, rgba(110, 123, 255, 0) 70%);
  opacity: 0.28;
  animation: float2 28s infinite;
}

.aurora__blob--3 {
  top: 60%;
  left: 15%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 30% 30%, #14f5c9 0%, rgba(20, 245, 201, 0) 70%);
  opacity: 0.22;
  animation: float3 26s infinite;
}

.aurora__blob--4 {
  top: 10%;
  left: 70%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle at 30% 30%, #d4ff3d 0%, rgba(212, 255, 61, 0) 70%);
  opacity: 0.24;
  animation: float4 24s infinite;
}

.aurora__blob--5 {
  top: 55%;
  left: 80%;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle at 30% 30%, #7bd10d 0%, rgba(123, 209, 13, 0) 70%);
  opacity: 0.2;
  animation: float5 30s infinite;
}

/* ---------- Траектории ---------- */
@keyframes float1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(80px, -50px) scale(1.15);
  }

  50% {
    transform: translate(30px, 60px) scale(0.95);
  }

  75% {
    transform: translate(-60px, 20px) scale(1.1);
  }
}

@keyframes float2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(-100px, 40px) scale(1.2);
  }

  66% {
    transform: translate(40px, -80px) scale(0.9);
  }
}

@keyframes float3 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(120px, -70px) scale(1.25);
  }
}

@keyframes float4 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  40% {
    transform: translate(-70px, 90px) scale(1.1);
  }

  70% {
    transform: translate(50px, -30px) scale(0.95);
  }
}

@keyframes float5 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  30% {
    transform: translate(-90px, -60px) scale(1.15);
  }

  60% {
    transform: translate(60px, 80px) scale(0.9);
  }
}

/* ---------- Film grain (зернистость) ---------- */
.aurora__grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: grainShift 0.8s steps(4) infinite;
}

@keyframes grainShift {
  0% {
    background-position: 0 0;
  }

  25% {
    background-position: -30px 20px;
  }

  50% {
    background-position: 20px -30px;
  }

  75% {
    background-position: -20px -20px;
  }

  100% {
    background-position: 0 0;
  }
}

/* ---------- Reduce motion ---------- */
@media (prefers-reduced-motion: reduce) {

  .aurora__blob,
  .aurora__grain {
    animation: none !important;
  }
}

/* ---------- Mobile — меньше пятен для производительности ---------- */
@media (max-width: 768px) {
  .aurora__wrap {
    filter: blur(60px) saturate(120%);
  }

  .aurora__blob--3,
  .aurora__blob--5 {
    display: none;
  }
}
</style>
