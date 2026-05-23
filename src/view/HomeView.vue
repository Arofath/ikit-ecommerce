<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      <!-- 🌟 ដកពាក្យ 'hidden lg:block' ចេញ ដើម្បីឱ្យវាបង្ហាញលើ Mobile ដែរ -->
      <div class="lg:col-span-3">
        <HomeCategoryList
          :categories="homeStore.sidebarCategories"
          :is-loading="homeStore.isLoading"
        />
      </div>

      <div class="lg:col-span-9">
        <HomeHeroSlider :slides="homeStore.slideshows" :is-loading="homeStore.isLoading" />
      </div>
    </section>

    <HomeTrustBadges />

    <HomeDiscountDeals 
      :products="homeStore.discountProducts" 
      :is-loading="homeStore.isLoading" 
    />

    <HomeRecommended :products="homeStore.recommendedProducts" :is-loading="homeStore.isLoading" />

    <HomeTopBrands :brands="homeStore.brands" :is-loading="homeStore.isLoading" />

    <HomeNewArrivals :products="homeStore.newArrivals" :is-loading="homeStore.isLoading" />

    <HomePopularCategories
      :categories="homeStore.popularCategories"
      :is-loading="homeStore.isLoading"
    />

    <HomePromoBanner />

    <HomeBestSellers />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// ទាញយកគ្រឿងបន្លាស់មកប្រើ
import HomeBestSellers from '@/components/home/HomeBestSellers.vue'
import HomeCategoryList from '@/components/home/HomeCategoryList.vue'
import HomeHeroSlider from '@/components/home/HomeHeroSlider.vue'
import HomeNewArrivals from '@/components/home/HomeNewArrivals.vue'
import HomePopularCategories from '@/components/home/HomePopularCategories.vue'
import HomePromoBanner from '@/components/home/HomePromoBanner.vue'
import HomeRecommended from '@/components/home/HomeRecommended.vue'
import HomeTopBrands from '@/components/home/HomeTopBrands.vue'
import HomeTrustBadges from '@/components/home/HomeTrustBadges.vue'
import HomeDiscountDeals from '@/components/home/HomeDiscountDeals.vue'

// ទាញយក Store មកប្រើ
import { useHomeStore } from '@/stores/homeStore'

const homeStore = useHomeStore()

// 🌟 ៤. ហៅ Function ទាញទិន្នន័យពេលទំព័រដើរ
onMounted(() => {
  homeStore.fetchHomeData()
})

// watch(() => homeStore.recommendedProducts, (newProducts) => {
//   console.log('✅ ទិន្នន័យមកដល់ហើយ! ចំនួនសរុបគឺ:', newProducts.length);
// });
</script>
