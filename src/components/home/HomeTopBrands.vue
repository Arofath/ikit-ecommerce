<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង និងប៊ូតុង View All (ប្រើ justify-between) -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">Top Brands</h2>
      </div>

      <!-- 🌟 ប៊ូតុង View All -->
      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- 🌟 Grid: លោត 6 ក្រឡាលើ Desktop ធ្វើឱ្យចេញតែ 1 ជួរស្អាត -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      
      <!-- 🌟 ប្រើ topBrands ជំនួសឱ្យ brands ដើម -->
      <a 
        v-for="(brand, index) in topBrands" 
        :key="index" 
        href="#" 
        class="bg-white border border-slate-200 rounded-lg h-24 flex items-center justify-center p-4 hover:border-ikit-blue hover:shadow-md transition-all duration-300 group cursor-pointer"
      >
        <img 
          :src="brand.logo" 
          :alt="brand.name" 
          class="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" 
        />
      </a>

    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

// ទិន្នន័យ Brand ទាំងអស់របស់ហាង (តំណាងឱ្យទិន្នន័យពី API)
const allBrands = ref([
  { name: 'ASUS', logo: 'https://dlcdnimgs.asus.com/websites/global/Sno/79183.jpg' },
  { name: 'Apple', logo: 'https://logo.com/image-cdn/images/kts928pd/production/4429bc095f6ddb190c0457f215d2d625959aae87-1600x900.png?w=1920&q=72&fm=webp' },
  { name: 'MSI', logo: 'https://logos-world.net/wp-content/uploads/2020/11/MSI-Logo.png' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png' },
  { name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg' },
  { name: 'Gigabyte', logo: 'https://1000logos.net/wp-content/uploads/2020/05/Gigabyte-Logo.png' },
  { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/200px-HP_logo_2012.svg.png' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png' },
])

// 🌟 កាត់យកតែ ៦ ម៉ាកល្បីៗមកបង្ហាញ ដើម្បីកុំឱ្យលើសពី ១ ជួរនៅលើ Desktop
const topBrands = computed(() => allBrands.value.slice(0, 6))
</script>