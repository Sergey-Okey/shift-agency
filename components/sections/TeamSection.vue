<template>
  <section id="team" class="section section--team">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <span class="section-label reveal">{{ $t('team.label') }}</span>
      <h2 class="section-title reveal">
        {{ $t('team.title') }} <span class="text-accent">{{ $t('team.titleAccent') }}</span>
      </h2>

      <div ref="teamRef" class="team-grid">
        <article v-for="(m, i) in members" :key="i" class="member" :style="{ '--stagger-delay': `${i * 150}ms` }"
          :data-tilt="!isCoarse">
          <!-- Слои стекла -->
          <span class="member__bg" aria-hidden="true" />
          <span class="member__border" aria-hidden="true" />
          <span class="member__reflection" aria-hidden="true" />
          <span class="member__spotlight" aria-hidden="true" />

          <!-- Аватар -->
          <div class="member__avatar-wrap">
            <div class="member__avatar-ring" aria-hidden="true" />
            <div class="member__avatar">
              <NuxtImg :src="m.avatar" :alt="m.name" format="webp" width="400" height="400" loading="lazy" />
            </div>
            <span class="member__status" :aria-label="$t('team.status')">
              <span class="member__status-dot" />
            </span>
          </div>

          <!-- Инфо -->
          <div class="member__info">
            <h3 class="member__name">{{ m.name }}</h3>
          </div>

          <!-- Разделитель -->
          <span class="member__divider" aria-hidden="true" />

          <!-- Био -->
          <p class="member__bio">{{ m.bio }}</p>

          <!-- Стек-теги -->
          <ul class="member__tags">
            <li v-for="(tag, ti) in m.tags" :key="ti" class="member__tag">
              {{ tag }}
            </li>
          </ul>

          <!-- Соцсети -->
          <div class="member__socials">
            <a v-for="(s, si) in m.socials" :key="si" :href="s.href"
              :target="s.href.startsWith('http') ? '_blank' : undefined"
              :rel="s.href.startsWith('http') ? 'noopener' : undefined" class="member__social" :aria-label="s.label">
              <svg v-if="s.icon === 'telegram'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 3L3 10.5l5.5 2L10 19l3-4 5 3.5L21 3z" />
                <path d="M8.5 12.5L21 3" />
              </svg>
              <svg v-else-if="s.icon === 'github'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M15 22v-4a4 4 0 0 0-1-2.65c3.5-.5 7-1.5 7-7a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.35-3.5 1.3a12 12 0 0 0-6 0C7.6 2.5 6.5 2.85 6.5 2.85a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 5 9.85c0 5.5 3.5 6.5 7 7A4 4 0 0 0 11 18v4" />
              </svg>
              <svg v-else-if="s.icon === 'mail'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const teamRef = ref<HTMLElement | null>(null)
const isCoarse = ref(false)

let observer: IntersectionObserver | null = null
const cleanups: Array<() => void> = []

const members = computed(() => [
  {
    name: 'Сергей Борисов',
    role: t('team.members.sergey.role'),
    bio: t('team.members.sergey.bio'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    tags: ['Vue 3', 'Nuxt', 'TypeScript', 'UI/UX'],
    socials: [
      { icon: 'telegram', label: 'Telegram', href: '#' },
      { icon: 'github', label: 'GitHub', href: '#' },
      { icon: 'mail', label: 'Email', href: 'mailto:hello@shift-agency.ru' },
    ],
  },
  {
    name: 'Антон Назаркин',
    role: t('team.members.anton.role'),
    bio: t('team.members.anton.bio'),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    tags: ['Node.js', 'Backend', 'DevOps', 'API'],
    socials: [
      { icon: 'telegram', label: 'Telegram', href: '#' },
      { icon: 'github', label: 'GitHub', href: '#' },
      { icon: 'mail', label: 'Email', href: 'mailto:hello@shift-agency.ru' },
    ],
  },
])

/* ============================================================
   3D-TILT + SPOTLIGHT
   ============================================================ */
function initTilt(el: HTMLElement) {
  const strength = 3
  let raf = 0
  let rect = { left: 0, top: 0, width: 1, height: 1 }
  let mx = 0
  let my = 0

  function measure() { rect = el.getBoundingClientRect() }

  function update() {
    raf = 0
    el.style.setProperty('--mx', `${mx}px`)
    el.style.setProperty('--my', `${my}px`)

    const cx = rect.width / 2
    const cy = rect.height / 2
    const ry = ((mx - cx) / cx) * strength
    const rx = -((my - cy) / cy) * strength
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
  }

  function onEnter() { measure() }
  function onMove(e: MouseEvent) {
    if (!rect.width) measure()
    mx = e.clientX - rect.left
    my = e.clientY - rect.top
    if (!raf) raf = requestAnimationFrame(update)
  }
  function onLeave() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  cleanups.push(() => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    if (raf) cancelAnimationFrame(raf)
  })
}

/* ============================================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ
   ============================================================ */
onMounted(async () => {
  isCoarse.value = window.matchMedia('(pointer: coarse)').matches

  await nextTick()
  if (!teamRef.value) return

  if (!isCoarse.value) {
    const cards = teamRef.value.querySelectorAll<HTMLElement>('[data-tilt]')
    cards.forEach(initTilt)
  }

  anime.set('.member', { opacity: 0, translateY: 50 })
  anime.set('.member__avatar-wrap', { opacity: 0, scale: 0.85 })
  anime.set('.member__info', { opacity: 0, translateY: 16 })
  anime.set('.member__divider', { scaleX: 0 })
  anime.set('.member__bio', { opacity: 0, translateY: 12 })
  anime.set('.member__tag', { opacity: 0, scale: 0.85 })
  anime.set('.member__social', { opacity: 0, translateY: 8 })

  const play = () => {
    anime({
      targets: '.member',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      delay: anime.stagger(150),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.member__avatar-wrap',
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 900,
      delay: anime.stagger(150, { start: 250 }),
      easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    })

    anime({
      targets: '.member__info',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      delay: anime.stagger(150, { start: 450 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.member__divider',
      scaleX: [0, 1],
      duration: 700,
      delay: anime.stagger(150, { start: 600 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.member__bio',
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700,
      delay: anime.stagger(150, { start: 750 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.member__tag',
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 500,
      delay: anime.stagger(60, { start: 900 }),
      easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    })

    anime({
      targets: '.member__social',
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 500,
      delay: anime.stagger(60, { start: 1100 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
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
    { threshold: 0.15 },
  )
  observer.observe(teamRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cleanups.forEach((fn) => fn())
})
</script>

<style scoped>
/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--team {
  position: relative;
  overflow: hidden;
}

.aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.aurora__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  will-change: transform;
}

.aurora__blob--1 {
  top: 15%;
  left: 12%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.26) 0%,
      rgba(186, 245, 20, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat1 30s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 10%;
  right: 10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle,
      rgba(20, 245, 201, 0.22) 0%,
      rgba(20, 245, 201, 0.05) 40%,
      transparent 70%);
  animation: auroraFloat2 34s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(70px, -60px) scale(1.12);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-80px, 50px) scale(0.95);
  }
}

/* ============================================================
   СЕТКА — 2 колонки
   ============================================================ */
.team-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 0.5rem;
  perspective: 1600px;
}

/* ============================================================
   КАРТОЧКА
   ============================================================ */
.member {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.25rem 2rem 1.75rem;
  border-radius: 24px;
  isolation: isolate;
  overflow: hidden;
  transform-style: preserve-3d;

  --mx: 50%;
  --my: 50%;
  --rx: 0deg;
  --ry: 0deg;

  transform:
    perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));

  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.5s ease;

  will-change: transform, opacity;
}

.member:hover {
  translate: 0 -6px;
}

/* ---------- Слои стекла ---------- */
.member__bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  z-index: 0;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.member:hover .member__bg {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
}

.member__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.member:hover .member__border {
  border-color: rgba(186, 245, 20, 0.45);
  box-shadow:
    inset 0 0 0 1px rgba(186, 245, 20, 0.12),
    0 0 20px rgba(186, 245, 20, 0.08);
}

.member__reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 12%,
      transparent 35%);
  opacity: 0.9;
}

.member__spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(450px circle at var(--mx) var(--my),
      rgba(186, 245, 20, 0.12) 0%,
      rgba(255, 255, 255, 0.04) 25%,
      transparent 55%);
  opacity: 0;
  transition: opacity 0.5s ease;
  mix-blend-mode: screen;
}

.member:hover .member__spotlight {
  opacity: 1;
}

/* Тень */
.member::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.04) inset,
    0 20px 40px -16px rgba(0, 0, 0, 0.45);
  transition: box-shadow 0.5s ease;
}

.member:hover::after {
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
    0 30px 56px -18px rgba(0, 0, 0, 0.6),
    0 15px 30px -12px rgba(186, 245, 20, 0.1);
}

/* ============================================================
   АВАТАР
   ============================================================ */
.member__avatar-wrap {
  position: relative;
  z-index: 5;
  align-self: center;
  margin-bottom: 1.5rem;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member__avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 1px;
  background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.03) 40%,
      rgba(186, 245, 20, 0.25) 100%);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: background 0.5s ease;
}

.member:hover .member__avatar-ring {
  background: linear-gradient(145deg,
      rgba(186, 245, 20, 0.6) 0%,
      rgba(255, 255, 255, 0.06) 40%,
      rgba(186, 245, 20, 0.4) 100%);
}

.member__avatar {
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.member__avatar :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.member:hover .member__avatar :deep(img) {
  transform: scale(1.08);
}

/* Статус — салатовая точка онлайн */
.member__status {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.06);
  z-index: 2;
}

.member__status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 12px rgba(186, 245, 20, 0.7);
  animation: statusPulse 2.4s ease-in-out infinite;
}

@keyframes statusPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
}

/* ============================================================
   ИНФО — имя и роль
   ============================================================ */
.member__info {
  position: relative;
  z-index: 5;
  text-align: center;
  margin-bottom: 1.25rem;
}

.member__name {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2vw, 1.85rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: var(--color-fg);
  margin-bottom: 0.35rem;
  transition: color 0.4s ease;
}

.member:hover .member__name {
  color: var(--color-accent);
}

/* ============================================================
   РАЗДЕЛИТЕЛЬ
   ============================================================ */
.member__divider {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.12) 30%,
      rgba(255, 255, 255, 0.12) 70%,
      transparent 100%);
  margin-bottom: 1.25rem;
  transform-origin: center;
}

.member__divider::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 5px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(186, 245, 20, 0.6);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.member:hover .member__divider::after {
  opacity: 1;
}

/* ============================================================
   БИО
   ============================================================ */
.member__bio {
  position: relative;
  z-index: 5;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-fg-mute);
  text-align: center;
  margin-bottom: 1.5rem;
  min-height: 3em;
  transition: color 0.4s ease;
}

/* ============================================================
   ТЕГИ
   ============================================================ */
.member__tags {
  position: relative;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.member__tag {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    color 0.4s ease,
    background 0.4s ease,
    border-color 0.4s ease;
}

.member:hover .member__tag {
  color: var(--color-fg);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.14);
}

/* ============================================================
   СОЦСЕТИ
   ============================================================ */
.member__socials {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
}

.member__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.65);
  cursor: none;
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    color 0.4s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.member__social svg {
  width: 16px;
  height: 16px;
  display: block;
}

.member__social:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
  transform: translateY(-3px) scale(1.08);
  box-shadow: 0 8px 20px -6px rgba(186, 245, 20, 0.4);
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .member {
    padding: 2rem 1.75rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .member {
    padding: 1.75rem 1.5rem 1.35rem;
  }

  .member__avatar-wrap {
    width: 120px;
    height: 120px;
  }

  .member__avatar {
    width: 108px;
    height: 108px;
  }

  .member__name {
    font-size: 1.35rem;
  }

  .member__bio {
    font-size: 0.82rem;
    margin-bottom: 1.25rem;
  }
}

@media (pointer: coarse) {
  .member {
    transform: none !important;
  }

  .member__social,
  .member__spotlight {
    cursor: auto;
  }

  .member__spotlight {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {

  .member,
  .member__avatar :deep(img),
  .member__social,
  .member__tag,
  .member__bg,
  .member__border {
    transition: none !important;
  }

  .aurora__blob,
  .member__status-dot {
    animation: none !important;
  }

  .member {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
