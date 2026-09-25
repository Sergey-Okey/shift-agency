<template>
  <section id="contact" class="section section--contact">
    <!-- Aurora-фон -->
    <div class="aurora" aria-hidden="true">
      <span class="aurora__blob aurora__blob--1" />
      <span class="aurora__blob aurora__blob--2" />
    </div>

    <div class="container">
      <div ref="contactRef" class="contact">
        <!-- ЛЕВАЯ КОЛОНКА — заголовок + контакты -->
        <aside class="contact__aside">
          <span class="section-label reveal">{{ $t('contact.label') }}</span>
          <h2 class="contact__title reveal">
            {{ $t('contact.title') }}
            <span class="text-accent">{{ $t('contact.titleAccent') }}</span>
            {{ $t('contact.titleSuffix') }}
          </h2>
          <p class="contact__desc reveal">{{ $t('contact.desc') }}</p>

          <!-- Контактные каналы -->
          <ul class="contact__channels reveal">
            <li class="contact__channel">
              <a href="mailto:hello@shift-agency.ru" class="contact__channel-link">
                <span class="contact__channel-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </span>
                <span class="contact__channel-body">
                  <span class="contact__channel-label">{{ $t('contact.channels.email') }}</span>
                  <span class="contact__channel-value">hello@shift-agency.ru</span>
                </span>
                <span class="contact__channel-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </a>
            </li>

            <li class="contact__channel">
              <a href="tel:+79990000000" class="contact__channel-link">
                <span class="contact__channel-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span class="contact__channel-body">
                  <span class="contact__channel-label">{{ $t('contact.channels.phone') }}</span>
                  <span class="contact__channel-value">{{ $t('contact.phone') }}</span>
                </span>
                <span class="contact__channel-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </a>
            </li>

            <li class="contact__channel">
              <a href="https://t.me/shift_agency" target="_blank" rel="noopener" class="contact__channel-link">
                <span class="contact__channel-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M21 3L3 10.5l5.5 2L10 19l3-4 5 3.5L21 3z" />
                    <path d="M8.5 12.5L21 3" />
                  </svg>
                </span>
                <span class="contact__channel-body">
                  <span class="contact__channel-label">{{ $t('contact.channels.telegram') }}</span>
                  <span class="contact__channel-value">@shift_agency</span>
                </span>
                <span class="contact__channel-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <!-- ПРАВАЯ КОЛОНКА — форма -->
        <div class="contact__form-wrap">
          <span class="contact__form-bg" aria-hidden="true" />
          <span class="contact__form-border" aria-hidden="true" />
          <span class="contact__form-reflection" aria-hidden="true" />

          <form @submit="onSubmit" class="form">
            <div class="form__group">
              <label class="form__label">
                <span class="form__label-text">{{ $t('contact.nameLabel') }}</span>
                <input v-model="name" type="text" :placeholder="$t('contact.namePlaceholder')" class="form__input"
                  :class="{ 'form__input--error': errors.name }" />
              </label>
              <Transition name="err">
                <span v-if="errors.name" class="form__error">{{ errors.name }}</span>
              </Transition>
            </div>

            <div class="form__group">
              <label class="form__label">
                <span class="form__label-text">{{ $t('contact.emailLabel') }}</span>
                <input v-model="email" type="email" :placeholder="$t('contact.emailPlaceholder')" class="form__input"
                  :class="{ 'form__input--error': errors.email }" />
              </label>
              <Transition name="err">
                <span v-if="errors.email" class="form__error">{{ errors.email }}</span>
              </Transition>
            </div>

            <div class="form__group">
              <label class="form__label">
                <span class="form__label-text">{{ $t('contact.messageLabel') }}</span>
                <textarea v-model="message" :placeholder="$t('contact.messagePlaceholder')" rows="4"
                  class="form__input form__textarea" :class="{ 'form__input--error': errors.message }" />
              </label>
              <Transition name="err">
                <span v-if="errors.message" class="form__error">{{ errors.message }}</span>
              </Transition>
            </div>

            <button type="submit" class="form__submit magnetic" :disabled="isSubmitting">
              <span class="form__submit-text">
                {{ isSubmitting ? $t('contact.sending') : $t('contact.submit') }}
              </span>
              <span class="form__submit-icon" aria-hidden="true">
                <svg v-if="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                  stroke-linecap="round" stroke-linejoin="round" class="form__submit-spinner">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import anime from 'animejs/lib/anime.es.js'
import { useForm } from 'vee-validate'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { z } from 'zod'

const { t } = useI18n()
const { show } = useToast()

const contactRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, t('contact.validation.nameMin')),
    email: z.string().email(t('contact.validation.emailInvalid')),
    message: z.string().min(10, t('contact.validation.messageMin')),
  }),
)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({ validationSchema: schema })
const [name] = defineField('name')
const [email] = defineField('email')
const [message] = defineField('message')

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/contact', { method: 'POST', body: values })
    show(t('contact.success', { name: values.name }), 'success')
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (err) {
    show(t('contact.error'), 'error')
  }
})

/* ============================================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ
   ============================================================ */
onMounted(async () => {
  await nextTick()
  if (!contactRef.value) return

  anime.set('.contact__channel', { opacity: 0, translateX: -20 })
  anime.set('.contact__form-wrap', { opacity: 0, translateY: 30 })
  anime.set('.form__group', { opacity: 0, translateY: 14 })
  anime.set('.form__submit', { opacity: 0, translateY: 14 })

  const play = () => {
    anime({
      targets: '.contact__channel',
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 700,
      delay: anime.stagger(120, { start: 300 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.contact__form-wrap',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900,
      delay: 200,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.form__group',
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 700,
      delay: anime.stagger(100, { start: 500 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    })

    anime({
      targets: '.form__submit',
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 700,
      delay: 900,
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
  observer.observe(contactRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* ============================================================
   СЕКЦИЯ
   ============================================================ */
.section--contact {
  position: relative;
  overflow: hidden;
}

/* ---------- Aurora ---------- */
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
  left: 8%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle,
      rgba(186, 245, 20, 0.28) 0%,
      rgba(186, 245, 20, 0.06) 40%,
      transparent 70%);
  animation: auroraFloat1 30s ease-in-out infinite;
}

.aurora__blob--2 {
  bottom: 5%;
  right: 8%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle,
      rgba(110, 123, 255, 0.24) 0%,
      rgba(110, 123, 255, 0.05) 40%,
      transparent 70%);
  animation: auroraFloat2 34s ease-in-out infinite;
}

@keyframes auroraFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(70px, -50px) scale(1.12);
  }
}

@keyframes auroraFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-70px, 50px) scale(0.95);
  }
}

/* ============================================================
   LAYOUT
   ============================================================ */
.contact {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  align-items: start;
}

/* ============================================================
   ЛЕВАЯ КОЛОНКА
   ============================================================ */
.contact__aside {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

.contact__title {
  font-size: var(--fs-h2);
  line-height: 1;
  margin-bottom: 1.5rem;
}

.contact__desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-fg-mute);
  max-width: 380px;
  margin-bottom: 2.5rem;
}

/* ---------- Каналы связи ---------- */
.contact__channels {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 420px;
}

.contact__channel {
  list-style: none;
}

.contact__channel-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  cursor: none;
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact__channel-link:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(186, 245, 20, 0.3);
  transform: translateX(4px);
}

.contact__channel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.65);
  transition:
    color 0.4s ease,
    background 0.4s ease,
    border-color 0.4s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact__channel-icon svg {
  width: 17px;
  height: 17px;
  display: block;
}

.contact__channel-link:hover .contact__channel-icon {
  color: var(--color-accent);
  background: rgba(186, 245, 20, 0.08);
  border-color: rgba(186, 245, 20, 0.3);
  transform: scale(1.06);
}

.contact__channel-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.contact__channel-label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.4s ease;
}

.contact__channel-link:hover .contact__channel-label {
  color: var(--color-accent);
}

.contact__channel-value {
  font-size: 0.9rem;
  color: var(--color-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact__channel-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact__channel-arrow svg {
  width: 14px;
  height: 14px;
  display: block;
}

.contact__channel-link:hover .contact__channel-arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

/* ============================================================
   ПРАВАЯ КОЛОНКА — форма
   ============================================================ */
.contact__form-wrap {
  position: relative;
  padding: 2.25rem 2rem 2rem;
  border-radius: 24px;
  isolation: isolate;
  overflow: hidden;
}

.contact__form-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  z-index: 0;
}

.contact__form-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.contact__form-reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 12%,
      transparent 35%);
  opacity: 0.9;
}

.contact__form-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.04) inset,
    0 20px 40px -16px rgba(0, 0, 0, 0.4);
}

/* ============================================================
   ФОРМА
   ============================================================ */
.form {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form__label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: none;
}

.form__label-text {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.4s ease;
}

.form__label:focus-within .form__label-text {
  color: var(--color-accent);
}

.form__input {
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  color: var(--color-fg);
  font-family: var(--font-body);
  font-size: 0.92rem;
  outline: none;
  transition:
    border-color 0.4s ease,
    background 0.4s ease,
    box-shadow 0.4s ease;
  width: 100%;
  cursor: none;
}

.form__input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form__input:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.14);
}

.form__input:focus {
  border-color: var(--color-accent);
  background: rgba(186, 245, 20, 0.03);
  box-shadow: 0 0 0 3px rgba(186, 245, 20, 0.08);
}

.form__input--error {
  border-color: #ff4d4d;
  background: rgba(255, 77, 77, 0.03);
}

.form__input--error:focus {
  box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.1);
}

.form__textarea {
  resize: vertical;
  min-height: 110px;
  font-family: var(--font-body);
}

/* ---------- Ошибки ---------- */
.form__error {
  display: block;
  font-size: 0.75rem;
  color: #ff6b6b;
  padding-left: 0.25rem;
}

.err-enter-active,
.err-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.err-enter-from,
.err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ============================================================
   КНОПКА ОТПРАВКИ
   ============================================================ */
.form__submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  align-self: flex-start;
  padding: 1.1rem 2rem;
  margin-top: 0.5rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  color: var(--color-bg);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: none;
  overflow: hidden;
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    color 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}

.form__submit-text {
  position: relative;
  z-index: 1;
}

.form__submit-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.form__submit-icon svg {
  width: 14px;
  height: 14px;
  display: block;
}

.form__submit:hover:not(:disabled) {
  background: #fff;
  border-color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 16px 34px -10px rgba(186, 245, 20, 0.45);
}

.form__submit:hover:not(:disabled) .form__submit-icon {
  transform: translateX(3px);
}

.form__submit:disabled {
  opacity: 0.75;
  cursor: wait;
}

.form__submit-spinner {
  animation: spin 0.9s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 1024px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact__desc {
    max-width: 100%;
  }

  .contact__channels {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .contact__form-wrap {
    padding: 1.75rem 1.5rem 1.5rem;
  }

  .contact__title {
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .contact__channel-link {
    padding: 0.85rem 1rem;
  }

  .contact__channel-icon {
    width: 36px;
    height: 36px;
  }

  .contact__channel-icon svg {
    width: 15px;
    height: 15px;
  }

  .form__submit {
    align-self: stretch;
    justify-content: center;
  }
}

@media (pointer: coarse) {

  .contact__channel-link,
  .form__input,
  .form__label,
  .form__submit {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .contact__channel-link,
  .contact__channel-icon,
  .contact__channel-arrow,
  .form__input,
  .form__submit,
  .form__submit-icon {
    transition: none !important;
  }

  .aurora__blob {
    animation: none !important;
  }

  .form__submit-spinner {
    animation: none !important;
  }
}
</style>
