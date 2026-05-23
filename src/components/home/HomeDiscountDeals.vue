<template>
  <section v-if="isLoading || products.length > 0" class="mb-12 font-sans">
    
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 21l10-18m-8 6h.01M17 16h.01"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-800">Special Discount Deals</h2>
      </div>

      <router-link
        :to="{ path: '/products', query: { has_discount: 1 } }"
        class="text-sm font-medium text-rose-600 hover:text-rose-800 flex items-center gap-1 group"
      >
        View All
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </router-link>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div v-for="i in 5" :key="i" class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse">
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
        :badgeText="'-' + product.discount_percent + '%'" 
        badgeColor="bg-rose-500" 
      />
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import ProductCard from '@/components/common/ProductCard.vue' 

defineProps({
  products: { type: Array, required: true, default: () => [] },
  isLoading: { type: Boolean, default: false },
})
</script>