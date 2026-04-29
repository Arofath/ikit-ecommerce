<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      <!-- 🌟 ដកពាក្យ 'hidden lg:block' ចេញ ដើម្បីឱ្យវាបង្ហាញលើ Mobile ដែរ -->
      <div class="lg:col-span-3">
        <HomeCategoryList />
      </div>

      <div class="lg:col-span-9">
        <HomeHeroSlider />
      </div>
    </section>
  </div>
</template>

<script setup>
// ទាញយកគ្រឿងបន្លាស់មកប្រើ
import HomeCategoryList from '@/components/home/HomeCategoryList.vue'
import HomeHeroSlider from '@/components/home/HomeHeroSlider.vue'
</script>
