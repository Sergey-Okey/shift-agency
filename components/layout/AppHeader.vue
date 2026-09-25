<template>
  <header class="header glass">
    <a href="#" class="logo" aria-label="SHIFT home" @click.prevent="onLogoClick">
      <img src="/logo.png" alt="SHIFT logo" class="logo__img" />
      <span class="logo__text">SHIFT<span class="text-accent">.</span></span>
    </a>

    <nav ref="navRef" class="nav">
      <span class="nav__pill" :class="{ 'nav__pill--visible': pillVisible }" :style="pillStyle" />

      <a v-for="(link, i) in links" :key="link.href" :ref="(el) => (linkRefs[i] = el as HTMLElement)" :href="link.href"
        class="nav__link" :class="{ 'is-active': activeSection === link.id }">
        {{ $t(link.label) }}
      </a>
    </nav>

    <div class="header__actions">
      <UiLanguageSwitcher />
      <a href="#contact" class="btn btn-accent magnetic header__cta">
        {{ $t('nav.contact') }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const { locale } = useI18n()
const { $lenis } = useNuxtApp() as any

const links = [
  { label: 'nav.about', href: '#about', id: 'about' },
  { label: 'nav.services', href: '#services', id: 'services' },
  { label: 'nav.portfolio', href: '#portfolio', id: 'portfolio' },
  { label: 'nav.pricing', href: '#pricing', id: 'pricing' },
  { label: 'nav.faq', href: '#faq', id: 'faq' },
]

const navRef = ref<HTMLElement | null>(null)
const linkRefs = ref<HTMLElement[]>([])
const activeSection = ref<string>('')
const pillVisible = ref(false)
const pillStyle = ref({ transform: 'translateX(0)', width: '0px' })

/* ---------- Клик по логотипу — скролл наверх ---------- */
function onLogoClick() {
  if ($lenis?.scrollTo) {
    $lenis.scrollTo(0, { duration: 1.4 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/* ---------- Капля под активной ссылкой ---------- */
function updatePill() {
  if (!activeSection.value) {
    pillVisible.value = false
    return
  }
  const idx = links.findIndex((l) => l.id === activeSection.value)
  if (idx === -1) {
    pillVisible.value = false
    return
  }
  const el = linkRefs.value[idx]
  if (!el || !el.offsetWidth) return

  pillStyle.value = {
    transform: `translateX(${el.offsetLeft}px)`,
    width: `${el.offsetWidth}px`,
  }
  pillVisible.value = true
}

/* ---------- Определение активной секции при скролле ---------- */
let raf = 0
function detectActive() {
  const y = window.scrollY + window.innerHeight * 0.35
  let current = ''
  for (const link of links) {
    const el = document.querySelector(link.href) as HTMLElement | null
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    if (top <= y) current = link.id
  }
  if (current !== activeSection.value) {
    activeSection.value = current
    nextTick(updatePill)
  }
}

function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    detectActive()
    raf = 0
  })
}

onMounted(async () => {
  await nextTick()
  updatePill()
  detectActive()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', updatePill)

  if ($lenis?.on) $lenis.on('scroll', detectActive)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updatePill)
  if (raf) cancelAnimationFrame(raf)
  if ($lenis?.off) $lenis.off('scroll', detectActive)
})

watch(locale, () => nextTick(updatePill))
</script>

<style scoped>
.header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: var(--container-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 0.7rem 0.7rem 0.7rem 1.5rem;
  z-index: var(--z-header);
  border-radius: var(--radius-pill);
}

/* ---------- Лого (без scale при hover) ---------- */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  flex-shrink: 0;
  cursor: none;
}

.logo__img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
}

.logo__text {
  line-height: 1;
}

/* ---------- Навигация ---------- */
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
}

.nav__pill {
  position: absolute;
  top: 0.25rem;
  left: 0;
  height: calc(100% - 0.5rem);
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
  border: 1px solid rgba(186, 245, 20, 0.25);
  box-shadow: 0 0 18px rgba(186, 245, 20, 0.12);
  transition:
    transform 0.55s var(--ease-back),
    width 0.55s var(--ease-back),
    opacity 0.35s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  will-change: transform, width;
}

.nav__pill--visible {
  opacity: 1;
}

.nav__link {
  position: relative;
  z-index: 1;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-fg-dim);
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-pill);
  transition: color var(--duration-base) var(--ease-out-expo);
  cursor: none;
  line-height: 1;
  white-space: nowrap;
}

.nav__link:hover {
  color: var(--color-fg);
}

.nav__link.is-active {
  color: var(--color-accent);
}

/* ---------- Действия справа ---------- */
.header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.header__cta {
  padding: 0.75rem 1.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
}

/* ---------- Адаптив ---------- */
@media (max-width: 1200px) {
  .nav {
    gap: 0.15rem;
  }

  .nav__link {
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    padding: 0.45rem 0.75rem;
  }
}

@media (max-width: 1100px) {
  .nav {
    display: none;
  }
}

@media (max-width: 600px) {
  .header {
    padding: 0.55rem 0.55rem 0.55rem 1.1rem;
    gap: 0.75rem;
  }

  .logo {
    font-size: 1.2rem;
  }

  .logo__img {
    width: 20px;
    height: 20px;
  }

  .header__cta {
    padding: 0.6rem 1.1rem;
    font-size: 0.72rem;
  }
}
</style>
