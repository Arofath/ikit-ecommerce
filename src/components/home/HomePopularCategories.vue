<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង -->
    <div class="flex items-center gap-2 mb-6">
      <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
      <h2 class="text-2xl font-bold text-slate-800">Popular Categories</h2>
    </div>

    <!-- ========================================== -->
    <!-- 🌟 ១. SKELETON LOADER (បង្ហាញពេលកំពុង Loading) -->
    <!-- ========================================== -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="relative overflow-hidden rounded-lg h-40 md:h-48 bg-slate-200 animate-pulse">
        <div class="absolute inset-0 p-5 flex flex-col justify-end">
          <div class="h-6 bg-slate-300 rounded w-2/3 mb-2"></div>
          <div class="flex items-center justify-between">
            <div class="h-3 bg-slate-300 rounded w-1/4"></div>
            <div class="h-4 bg-slate-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 🌟 ២. ទិន្នន័យពិត -->
    <!-- ========================================== -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- លូកយកទិន្នន័យពី Props categories មកបង្ហាញ -->
      <a 
        v-for="cat in categories" 
        :key="cat.id" 
        href="#" 
        class="relative overflow-hidden rounded-lg h-40 md:h-48 group cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
      >
        <img 
          :src="cat.image ? cat.image : '/default-placeholder.png'" 
          :alt="cat.name" 
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        <div class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
        
        <div class="absolute inset-0 p-5 flex flex-col justify-end text-white">
          <h3 class="text-xl font-bold mb-1">{{ cat.name }}</h3>
          
          <div class="flex items-center justify-between">
            <!-- ចំណាំ៖ ប្រសិនបើ Backend មិនមានភ្ជាប់ Products Count ទេ អាចដកចេញសិន ឬប្រើមុខងារ withCount('products') ក្នុង Laravel -->
            <span class="text-xs text-slate-300">View Products</span>
            
            <span class="text-sm font-bold text-blue-400 flex items-center gap-1 group-hover:gap-2 group-hover:text-white transition-all">
              Shop Now 
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </div>
      </a>

    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

// 🌟 ទទួលទិន្នន័យពី HomeView
defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>