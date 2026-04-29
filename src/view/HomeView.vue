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

    <HomeTrustBadges />

    <HomeFlashSale />

    <HomeTopBrands/>

    <HomeNewArrivals/>

    ុ<HomePopularCategories />

    <HomePromoBanner />

    <HomeBestSellers />

  </div>
</template>

<script setup>
// ទាញយកគ្រឿងបន្លាស់មកប្រើ
import HomeBestSellers from '@/components/home/HomeBestSellers.vue';
import HomeCategoryList from '@/components/home/HomeCategoryList.vue'
import HomeFlashSale from '@/components/home/HomeFlashSale.vue';
import HomeHeroSlider from '@/components/home/HomeHeroSlider.vue'
import HomeNewArrivals from '@/components/home/HomeNewArrivals.vue';
import HomePopularCategories from '@/components/home/HomePopularCategories.vue';
import HomePromoBanner from '@/components/home/HomePromoBanner.vue';
import HomeTopBrands from '@/components/home/HomeTopBrands.vue';
import HomeTrustBadges from '@/components/home/HomeTrustBadges.vue';
</script>
