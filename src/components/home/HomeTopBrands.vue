<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង និងប៊ូតុង View All -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">Top Brands</h2>
      </div>

      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- 🌟 បង្ហាញ Logo Brand -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <a 
        v-for="brand in topBrands" 
        :key="brand.id" 
        href="#" 
        class="bg-white border border-slate-200 rounded-lg h-24 flex items-center justify-center p-4 hover:border-ikit-blue hover:shadow-md transition-all duration-300 group cursor-pointer"
      >
        <img 
          :src="brand.logo" 
          :alt="brand.name" 
          class="max-h-full max-w-full object-contain transition-all duration-300 transform lg:grayscale lg:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
        />
      </a>
    </div>

  </section>
</template>

<script setup>
import { computed, defineProps } from 'vue'

// 🌟 ១. ទទួលទិន្នន័យពី HomeView
const props = defineProps({
  brands: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 🌟 ២. កាត់យកតែ ៦ ម៉ាកល្បីៗមកបង្ហាញ ដើម្បីកុំឱ្យលើសពី ១ ជួរនៅលើ Desktop
const topBrands = computed(() => props.brands.slice(0, 6))
</script>