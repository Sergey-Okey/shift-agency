<template>
  <div class="lang-switcher glass" :class="{ 'lang-switcher--ready': isReady }">
    <div ref="trackRef" class="lang-switcher__track">
      <span class="lang-switcher__blob" :style="{ transform: `translateX(${blobX}px)`, width: `${blobW}px` }" />
      <button v-for="(loc, i) in locales" :key="loc.code" :ref="(el) => (btnRefs[i] = el as HTMLElement)"
        class="lang-switcher__btn" :class="{ 'is-active': currentLocale === loc.code }" type="button"
        @click="switchTo(loc.code)">
        {{ loc.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const { locale, setLocale } = useI18n()

const locales = [
  { code: 'ru' as const, label: 'RU' },
  { code: 'en' as const, label: 'EN' },
]

const trackRef = ref<HTMLElement | null>(null)
const btnRefs = ref<HTMLElement[]>([])
const blobX = ref(0)
const blobW = ref(0)
const isReady = ref(false)

const currentLocale = computed(() => locale.value)

function updateBlob() {
  const idx = locales.findIndex((l) => l.code === locale.value)
  const btn = btnRefs.value[idx]
  if (!btn) return
  blobX.value = btn.offsetLeft
  blobW.value = btn.offsetWidth
}

async function switchTo(code: 'ru' | 'en') {
  if (code === locale.value) return
  await setLocale(code)
  await nextTick()
  updateBlob()
}

onMounted(async () => {
  await nextTick()
  updateBlob()
  setTimeout(() => (isReady.value = true), 100)
  window.addEventListener('resize', updateBlob)
})

watch(locale, async () => {
  await nextTick()
  updateBlob()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBlob)
})
</script>

<style scoped>
.lang-switcher {
  position: relative;
  padding: 4px;
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.lang-switcher__track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
}

/* Плавающая капля — без свечения */
.lang-switcher__blob {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  transition: transform 0.55s var(--ease-back), width 0.55s var(--ease-back);
  will-change: transform, width;
  z-index: 0;
}

.lang-switcher__btn {
  position: relative;
  z-index: 1;
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-fg-dim);
  transition: color 0.4s var(--ease-out-expo);
  cursor: none;
  line-height: 1;
  user-select: none;
  min-width: 44px;
  text-align: center;
}

.lang-switcher__btn.is-active {
  color: var(--color-bg);
}

.lang-switcher__btn:hover:not(.is-active) {
  color: var(--color-fg);
}

.lang-switcher:not(.lang-switcher--ready) .lang-switcher__blob {
  opacity: 0;
}

.lang-switcher--ready .lang-switcher__blob {
  opacity: 1;
  transition: transform 0.55s var(--ease-back), width 0.55s var(--ease-back),
    opacity 0.3s ease;
}

@media (max-width: 1100px) {
  .lang-switcher {
    padding: 3px;
  }

  .lang-switcher__btn {
    padding: 0.45rem 0.8rem;
    font-size: 0.75rem;
    min-width: 40px;
  }
}
</style>
