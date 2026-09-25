import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  const isMobile = typeof window !== 'undefined' && (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )

  if (isMobile) {
    nuxtApp.provide('lenis', null)
    return
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (href && href !== '#') {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) lenis.scrollTo(target as HTMLElement, { offset: -100 })
      }
    })
  })

  nuxtApp.provide('lenis', lenis)
})
