<template>
  <Teleport to="body">
    <div class="toasts">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id" class="toast" :class="'toast--' + t.type">
          <span class="toast__dot" />
          {{ t.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast()
</script>

<style scoped>
.toasts { position: fixed; bottom: 2rem; right: 2rem; display: flex; flex-direction: column; gap: 0.75rem; z-index: var(--z-toast); pointer-events: none; }
.toast { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: rgba(20, 20, 20, 0.95); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--radius-pill); color: #fff; font-size: 0.9rem; min-width: 240px; }
.toast__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 12px var(--color-accent); }
.toast--error .toast__dot { background: #ff4d4d; box-shadow: 0 0 12px #ff4d4d; }
.toast-enter-active, .toast-leave-active { transition: all 0.5s var(--ease-out-expo); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(60px); }
</style>
