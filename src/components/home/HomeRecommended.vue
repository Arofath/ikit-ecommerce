<template>
  <section class="mb-12 font-sans">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">Recommended For You</h2>
      </div>

      <router-link
        :to="{ path: '/products', query: { filter: 'recommended' } }"
        class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group"
      >
        View All
        <svg
          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </router-link>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="i in 5"
        :key="i"
        class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse"
      >
        <div class="aspect-square bg-slate-200 rounded-md mb-4 w-full"></div>
        <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
        <div class="h-5 bg-slate-200 rounded w-1/2 mt-auto"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        badgeText="RECOMMENDED" 
        badgeColor="bg-orange-500" 
      />
      
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

// 🌟 Import Component ថ្មី (សូមប្រាកដថា Path នេះត្រូវទីតាំងដែលអ្នកបាន Save វា)
import ProductCard from '@/components/common/ProductCard.vue' 

defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>