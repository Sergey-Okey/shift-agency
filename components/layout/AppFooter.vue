<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="footer__logo">SHIFT<span class="text-accent">.</span></div>
          <p class="footer__desc text-muted">Создаем цифровые продукты, которые работают на бизнес.</p>
        </div>
        <div class="footer__cols">
          <div class="footer__col">
            <span class="footer__title">Навигация</span>
            <a href="#about">О нас</a>
            <a href="#services">Услуги</a>
            <a href="#portfolio">Кейсы</a>
            <a href="#pricing">Тарифы</a>
          </div>
          <div class="footer__col">
            <span class="footer__title">Контакты</span>
            <a href="mailto:hello@shift-agency.ru">hello@shift-agency.ru</a>
            <a href="tel:+79990000000">+7 999 000-00-00</a>
            <a href="#">Telegram</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© {{ year }} SHIFT Digital Agency</span>
        <span class="text-muted">Сделано с ♥ в России</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer { border-top: 1px solid var(--glass-border); padding: 4rem 0 2rem; margin-top: 4rem; }
.footer__top { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; margin-bottom: 4rem; }
.footer__logo { font-family: var(--font-display); font-size: 2rem; letter-spacing: 0.08em; margin-bottom: 1rem; }
.footer__desc { max-width: 300px; }
.footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.footer__col { display: flex; flex-direction: column; gap: 0.75rem; }
.footer__title { font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-fg-mute); margin-bottom: 0.5rem; }
.footer__col a { color: var(--color-fg-dim); transition: color 0.3s; }
.footer__col a:hover { color: var(--color-accent); }
.footer__bottom { display: flex; justify-content: space-between; padding-top: 2rem; border-top: 1px solid var(--glass-border); font-size: 0.8rem; color: var(--color-fg-mute); letter-spacing: 0.1em; text-transform: uppercase; }
@media (max-width: 768px) { .footer__top { grid-template-columns: 1fr; gap: 2rem; } .footer__bottom { flex-direction: column; gap: 0.5rem; text-align: center; } }
</style>
