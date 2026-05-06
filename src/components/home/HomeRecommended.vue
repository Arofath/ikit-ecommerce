<template>
  <section class="mb-12 font-sans">
    
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">Recommended For You</h2>
      </div>

      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- Skeleton -->
     <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <!-- ប្រើ Loop 5 ដង ដើម្បីបង្កើតប្រអប់សខ្មោចចំនួន ៥ -->
      <div v-for="i in 5" :key="i" class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse">
        <!-- រូបភាព Skeleton -->
        <div class="aspect-square bg-slate-200 rounded-md mb-4 w-full"></div>
        <!-- ឈ្មោះ Brand Skeleton -->
        <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
        <!-- ចំណងជើងទំនិញ Skeleton (2 បន្ទាត់) -->
        <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
        <!-- តម្លៃ Skeleton -->
        <div class="h-5 bg-slate-200 rounded w-1/2 mt-auto"></div>
      </div>
    </div>

    <!-- 🌟 បញ្ជីទំនិញណែនាំ -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      <!-- 🌟 កែប្រែ <div> ទៅជា <router-link> រួចចង្អុល (to) ទៅកាន់ទំព័រ Detail តាមរយៈ Slug -->
      <router-link 
        v-for="product in products" 
        :key="product.id" 
        :to="'/product/' + product.slug" 
        class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex-col h-full block"
      >
        <span class="absolute top-3 left-3 bg-orange-500 text-white text-[9px] tracking-wider font-bold px-2 py-1 rounded z-10">
          RECOMMENDED
        </span>
        
        <!-- រូបភាពទំនិញ -->
        <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
           <img 
             :src="product.thumbnail ? product.thumbnail.image_path : '/default-placeholder.png'" 
             :alt="product.name" 
             class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
           />
           <!-- ចំណាំ៖ ប៊ូតុង Add to Cart អាចនឹងមានបញ្ហាពេលស្ថិតក្នុង <router-link> ។ 
                ដើម្បីការពារកុំឱ្យពេលចុច Add to Cart វារត់ទៅ Detail 
                យើងត្រូវថែម @click.prevent="addToCart(product)" -->
           <button 
             @click.prevent="console.log('Add to cart clicked')" 
             class="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md z-20"
           >
             Add to Cart
           </button>
        </div>

        <!-- ព័ត៌មានទំនិញ -->
        <span v-if="product.brand" class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          {{ product.brand.name }}
        </span>
        
        <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-ikit-blue transition-colors mt-auto">
          {{ product.name }}
        </h3>
        
        <div class="font-bold text-ikit-red text-base">
          ${{ product.price }}
        </div>
      </router-link>

    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

// 🌟 ទទួលទិន្នន័យ products ពីទំព័រ HomeView
defineProps({
  products: {
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