import { onMounted, onBeforeUnmount } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const els = document.querySelectorAll<HTMLElement>(selector)
    if (!els.length) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )

    els.forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
