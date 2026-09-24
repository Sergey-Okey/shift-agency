<template>
  <section class="section">
    <div class="container">
      <span class="section-label reveal">07 — Отзывы</span>
      <h2 class="section-title reveal">Что <span class="text-accent">говорят</span></h2>

      <ClientOnly>
        <Swiper
          :modules="[SwiperAutoplay, SwiperPagination]"
          :slides-per-view="1"
          :space-between="24"
          :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
          :autoplay="{ delay: 4500, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="swiper"
        >
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  { text: 'Ребята сделали сайт, который реально продает. Конверсия выросла в 3 раза за первый месяц.', name: 'Анна К.', role: 'CEO, Brandly' },
  { text: 'Профессиональный подход, четкие сроки и потрясающий дизайн. Работать было в удовольствие.', name: 'Игорь С.', role: 'Founder, TechLab' },
  { text: 'Поняли задачу с полуслова. Сделали лучше, чем мы представляли. Рекомендую!', name: 'Мария В.', role: 'CMO, GrowCo' },
  { text: 'Отличная команда. Быстро, качественно, с вниманием к деталям.', name: 'Дмитрий П.', role: 'CTO, Fintech' },
]
</script>

<style scoped>
.swiper { padding-bottom: 3rem; }
.testimonial { padding: 2.5rem; height: 100%; display: flex; flex-direction: column; gap: 1.5rem; position: relative; }
.testimonial__quote { font-family: var(--font-display); font-size: 4rem; line-height: 0.5; color: var(--color-accent); opacity: 0.4; }
.testimonial__text { font-size: 1.05rem; line-height: 1.6; flex: 1; }
.testimonial__author { display: flex; flex-direction: column; gap: 0.25rem; }
.testimonial__author strong { font-family: var(--font-display); letter-spacing: 0.05em; }
.testimonial__author span { font-size: 0.85rem; }
</style>
