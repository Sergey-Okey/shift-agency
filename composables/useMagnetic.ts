import { onBeforeUnmount, onMounted } from 'vue'

export function useMagnetic(selector = '.magnetic', strength = 0.3) {
  const cleanups: Array<() => void> = []

  const isMobile = typeof window !== 'undefined' && (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )

  if (isMobile) return

  onMounted(() => {
    const els = document.querySelectorAll<HTMLElement>(selector)
    els.forEach((el) => {
      let raf = false, targetX = 0, targetY = 0, currentX = 0, currentY = 0

      function animate() {
        currentX += (targetX - currentX) * 0.15
        currentY += (targetY - currentY) * 0.15
        el.style.transform = `translate(${currentX}px, ${currentY}px)`
        if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
          requestAnimationFrame(animate)
        } else { raf = false }
      }
      function onMove(e: MouseEvent) {
        const rect = el.getBoundingClientRect()
        targetX = (e.clientX - (rect.left + rect.width / 2)) * strength
        targetY = (e.clientY - (rect.top + rect.height / 2)) * strength
        if (!raf) { raf = true; requestAnimationFrame(animate) }
      }
      function onLeave() {
        targetX = 0; targetY = 0
        if (!raf) { raf = true; requestAnimationFrame(animate) }
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })
  })
  onBeforeUnmount(() => cleanups.forEach((fn) => fn()))
}
