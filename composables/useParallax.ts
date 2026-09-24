import { onMounted, onBeforeUnmount } from 'vue'

export function useParallax(selector = '.blob') {
  let raf = false
  function update() {
    const blobs = document.querySelectorAll<HTMLElement>(selector)
    const y = window.scrollY
    blobs.forEach((b, i) => {
      const rate = [0.15, -0.08, 0.12][i] ?? 0.1
      b.style.transform = `translateY(${y * rate}px)`
    })
    raf = false
  }
  function onScroll() {
    if (!raf) { raf = true; requestAnimationFrame(update) }
  }
  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
}
