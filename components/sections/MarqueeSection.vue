<template>
  <section class="marquee">
    <div class="marquee__track">
      <div class="marquee__content" v-for="i in 2" :key="i">
        <span v-for="word in words" :key="word" class="marquee__word">
          {{ word }}<span class="marquee__dot" />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const words = computed(() => [
  t('marquee.design'),
  t('marquee.development'),
  t('marquee.branding'),
  t('marquee.marketing'),
  t('marquee.strategy'),
  t('marquee.innovation'),
])
</script>

<style scoped>
.marquee {
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 110, 110, 0.28);
  border-bottom: 1px solid rgba(255, 110, 110, 0.28);
  background: linear-gradient(90deg, rgba(150, 23, 23, 0.42), rgba(210, 46, 46, 0.22), rgba(150, 23, 23, 0.42));
  overflow: hidden;
  white-space: nowrap;
}

.marquee__track {
  display: flex;
  gap: 4rem;
  animation: marquee 30s linear infinite;
}

.marquee__content {
  display: flex;
  gap: 4rem;
  flex-shrink: 0;
}

.marquee__word {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 4rem);
  text-transform: uppercase;
  color: rgba(255, 245, 245, 1);
  display: flex;
  align-items: center;
  gap: 4rem;
}

.marquee__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 101, 101, 1);
  flex-shrink: 0;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
