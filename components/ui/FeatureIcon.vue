<template>
  <span class="feature-icon">
    <!-- palette — дизайн -->
    <svg v-if="name === 'palette'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>

    <!-- phone — адаптив -->
    <svg v-else-if="name === 'phone'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>

    <!-- mail — форма -->
    <svg v-else-if="name === 'mail'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>

    <!-- search — SEO -->
    <svg v-else-if="name === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>

    <!-- clock — сроки -->
    <svg v-else-if="name === 'clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>

    <!-- pages — страницы -->
    <svg v-else-if="name === 'pages'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="12" height="16" rx="1.5" />
      <path d="M8 4V3a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-1" />
    </svg>

    <!-- settings — CMS -->
    <svg v-else-if="name === 'settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <circle cx="10" cy="7" r="2.5" fill="var(--color-bg)" />
      <line x1="4" y1="17" x2="20" y2="17" />
      <circle cx="16" cy="17" r="2.5" fill="var(--color-bg)" />
    </svg>

    <!-- chart — аналитика -->
    <svg v-else-if="name === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 20V10" />
      <path d="M9 20V4" />
      <path d="M15 20v-7" />
      <path d="M21 20v-12" />
    </svg>

    <!-- puzzle — интеграции -->
    <svg v-else-if="name === 'puzzle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path
        d="M19.5 11.5V7a1 1 0 0 0-1-1h-4.5a1.5 1.5 0 1 0-3 0H6.5a1 1 0 0 0-1 1v4.5a1.5 1.5 0 1 0 0 3V19a1 1 0 0 0 1 1h4.5a1.5 1.5 0 1 1 3 0H19a1 1 0 0 0 1-1v-4.5a1.5 1.5 0 1 0 0-3z" />
    </svg>

    <!-- code — разработка -->
    <svg v-else-if="name === 'code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 6l-4 6 4 6" />
      <path d="M16 6l4 6-4 6" />
      <path d="M14 4l-4 16" />
    </svg>

    <!-- api — API -->
    <svg v-else-if="name === 'api'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4" />
      <path d="M16 6h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>

    <!-- lock — авторизация -->
    <svg v-else-if="name === 'lock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" />
    </svg>

    <!-- dashboard — дашборд -->
    <svg v-else-if="name === 'dashboard'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>

    <!-- star — премиум -->
    <svg v-else-if="name === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3l2.7 5.5 6 .9-4.35 4.2 1.03 6L12 16.9l-5.38 2.7 1.03-6L3.3 9.4l6-.9L12 3z" />
    </svg>

    <!-- zap — скорость -->
    <svg v-else-if="name === 'zap'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>

    <!-- globe — глобус -->
    <svg v-else-if="name === 'globe'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0-18z" />
    </svg>

    <!-- layers — структура -->
    <svg v-else-if="name === 'layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>

    <!-- users — пользователи -->
    <svg v-else-if="name === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 5.5a3.5 3.5 0 0 1 0 7" />
      <path d="M21 20c0-2.5-1.5-4.7-3.5-5.5" />
    </svg>

    <!-- check — fallback -->
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style scoped>
.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.feature-icon svg {
  width: 16px;
  height: 16px;
  display: block;
}
</style>
