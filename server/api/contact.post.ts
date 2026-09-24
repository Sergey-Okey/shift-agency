export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, email, message } = body || {}

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Заполните все поля' })
  }

  if (!config.telegramBotToken || !config.telegramChatId) {
    console.warn('[contact] Telegram не настроен. Проверьте .env')
    return { ok: true, warning: 'Telegram не настроен' }
  }

  const text = [
    '🔥 <b>Новая заявка с сайта SHIFT</b>',
    '',
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
    `💬 <b>Сообщение:</b>`,
    escapeHtml(message),
    '',
    `🕐 ${new Date().toLocaleString('ru-RU')}`,
  ].join('\n')

  try {
    await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: config.telegramChatId,
        text,
        parse_mode: 'HTML',
      },
    })
    return { ok: true }
  } catch (err) {
    console.error('[contact] Ошибка Telegram:', err)
    throw createError({ statusCode: 500, statusMessage: 'Не удалось отправить заявку' })
  }
})

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
