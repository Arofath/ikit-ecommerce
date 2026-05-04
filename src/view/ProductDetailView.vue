<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6 md:mb-8">
      <router-link to="/" class="hover:text-ikit-blue transition-colors">Home</router-link>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      <router-link to="/products" class="hover:text-ikit-blue transition-colors">Laptops</router-link>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      <span class="text-slate-800 font-medium truncate">ASUS ROG Strix G15 (2024)</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
      <ProductGallery />
      <ProductInfo />
    </div>

    <!-- 🌟 ផ្នែក Tab ដាក់នៅទីនេះ -->
    <ProductTabs />

  </div>
</template>

<script setup>
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import ProductTabs from '@/components/product/ProductTabs.vue' // 🌟 Import នៅទីនេះ
</script>