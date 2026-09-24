<template>
  <header class="header glass">
    <a href="#" class="logo" aria-label="SHIFT home">
      <img src="/logo.png" alt="SHIFT logo" class="logo__img" />
      <span class="logo__text">SHIFT<span class="text-accent">.</span></span>
    </a>
    <nav class="nav">
      <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>
    <a href="#contact" class="btn btn-accent magnetic">Связаться</a>
  </header>
</template>

<script setup lang="ts">
const links = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#portfolio' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]
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
  padding: 0.75rem 1rem 0.75rem 1.75rem;
  z-index: var(--z-header);
  border-radius: var(--radius-pill);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.08em;
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

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-fg-dim);
  transition: color var(--duration-fast);
}

.nav a:hover {
  color: var(--color-accent);
}

@media (max-width: 1100px) {
  .nav {
    display: none;
  }
}
</style>
