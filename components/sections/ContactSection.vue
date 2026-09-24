<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="contact glass reveal">
        <span class="section-label">09 — Контакты</span>
        <h2 class="contact__title">Готовы <span class="text-accent">обсудить</span> проект?</h2>
        <p class="contact__desc text-muted">Оставьте заявку — ответим в течение 24 часов.</p>

        <form @submit="onSubmit" class="form">
          <div class="form__group">
            <input v-model="name" type="text" placeholder="Ваше имя" class="form__input" :class="{ 'form__input--error': errors.name }" />
            <span v-if="errors.name" class="form__error">{{ errors.name }}</span>
          </div>
          <div class="form__group">
            <input v-model="email" type="email" placeholder="Email" class="form__input" :class="{ 'form__input--error': errors.email }" />
            <span v-if="errors.email" class="form__error">{{ errors.email }}</span>
          </div>
          <div class="form__group">
            <textarea v-model="message" placeholder="Расскажите о проекте" rows="4" class="form__input form__textarea" :class="{ 'form__input--error': errors.message }" />
            <span v-if="errors.message" class="form__error">{{ errors.message }}</span>
          </div>
          <button type="submit" class="btn btn-accent magnetic" :disabled="isSubmitting">
            {{ isSubmitting ? 'Отправляем...' : 'Отправить заявку' }}
          </button>
        </form>

        <div class="contact__info">
          <a href="mailto:hello@shift-agency.ru">hello@shift-agency.ru</a>
          <span class="text-muted">·</span>
          <a href="tel:+79990000000">+7 999 000-00-00</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const { show } = useToast()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Некорректный email'),
    message: z.string().min(10, 'Минимум 10 символов'),
  }),
)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({ validationSchema: schema })
const [name] = defineField('name')
const [email] = defineField('email')
const [message] = defineField('message')

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/contact', { method: 'POST', body: values })
    show(`Спасибо, ${values.name}! Заявка отправлена.`, 'success')
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (err) {
    show('Не удалось отправить. Попробуйте позже.', 'error')
  }
})
</script>

<style scoped>
.contact { padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem); text-align: center; }
.contact__title { font-size: var(--fs-h2); margin-bottom: 1.5rem; }
.contact__desc { margin-bottom: 3rem; }
.form { display: flex; flex-direction: column; gap: 1rem; max-width: 500px; margin: 0 auto; text-align: left; }
.form__group { display: flex; flex-direction: column; gap: 0.4rem; }
.form__input { padding: 1.1rem 1.4rem; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--color-fg); font-family: var(--font-body); font-size: 0.95rem; outline: none; transition: all var(--duration-base); width: 100%; }
.form__input:focus { border-color: var(--color-accent); background: rgba(255, 255, 255, 0.06); }
.form__input--error { border-color: #ff4d4d; }
.form__textarea { resize: vertical; min-height: 120px; }
.form__error { font-size: 0.8rem; color: #ff4d4d; }
.form .btn { align-self: center; margin-top: 1rem; }
.form .btn:disabled { opacity: 0.6; cursor: wait; }
.contact__info { margin-top: 3rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; font-size: 0.9rem; }
.contact__info a { color: var(--color-fg-dim); transition: color 0.3s; }
.contact__info a:hover { color: var(--color-accent); }
</style>
