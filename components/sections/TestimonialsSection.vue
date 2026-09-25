<template>
  <section class="section">
    <div class="container">
      <span class="section-label reveal">{{ $t('testimonials.label') }}</span>
      <h2 class="section-title reveal">
        {{ $t('testimonials.title') }} <span class="text-accent">{{ $t('testimonials.titleAccent') }}</span>
      </h2>

      <ClientOnly>
        <Swiper :modules="[SwiperAutoplay, SwiperPagination]" :slides-per-view="1" :space-between="24"
          :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
          :autoplay="{ delay: 4500, disableOnInteraction: false }" :pagination="{ clickable: true }" class="swiper">
          <SwiperSlide v-for="(t, i) in testimonials" :key="i">
            <div class="testimonial glass">
              <div class="testimonial__quote">"</div>
              <p class="testimonial__text">{{ t.text }}</p>
              <div class="testimonial__author">
                <strong>{{ t.name }}</strong>
                <span class="text-muted">{{ t.role }}</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const { t } = useI18n()

const testimonials = computed(() => [
  { text: t('testimonials.items.anna.text'), name: t('testimonials.items.anna.name'), role: t('testimonials.items.anna.role') },
  { text: t('testimonials.items.igor.text'), name: t('testimonials.items.igor.name'), role: t('testimonials.items.igor.role') },
  { text: t('testimonials.items.maria.text'), name: t('testimonials.items.maria.name'), role: t('testimonials.items.maria.role') },
  { text: t('testimonials.items.dmitry.text'), name: t('testimonials.items.dmitry.name'), role: t('testimonials.items.dmitry.role') },
])
</script>

<style scoped>
.swiper {
  padding-bottom: 3rem;
}

.testimonial {
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.testimonial__quote {
  font-family: var(--font-display);
  font-size: 4rem;
  line-height: 0.5;
  color: var(--color-accent);
  opacity: 0.4;
}

.testimonial__text {
  font-size: 1.05rem;
  line-height: 1.6;
  flex: 1;
}

.testimonial__author {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.testimonial__author strong {
  font-family: var(--font-display);
  letter-spacing: 0.05em;
}

.testimonial__author span {
  font-size: 0.85rem;
}
</style>
