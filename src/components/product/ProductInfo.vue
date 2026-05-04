<template>
  <div class="flex flex-col">
    <!-- ម៉ាក និង ចំណាត់ថ្នាក់ (Rating) -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-ikit-blue font-bold text-sm tracking-wider uppercase">ASUS</span>
      <div class="flex items-center gap-1 text-sm">
        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <span class="font-bold text-slate-800">4.9</span>
        <span class="text-slate-400 underline cursor-pointer">(124 Reviews)</span>
      </div>
    </div>

    <!-- ចំណងជើង -->
    <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
      ASUS ROG Strix G15 (2024) Gaming Laptop - RTX 4070
    </h1>

    <!-- តម្លៃ និង ស្ថានភាពស្តុក -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <div class="text-3xl font-black text-ikit-red">$1,299.00</div>
      <div class="text-lg text-slate-400 line-through font-medium">$1,499.00</div>
      <div class="ml-auto bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        In Stock
      </div>
    </div>

    <!-- ចំណុចពិសេស (Key Features) -->
    <ul class="space-y-2 text-sm text-slate-600 mb-8 list-disc list-inside">
      <li><strong>Processor:</strong> AMD Ryzen™ 9 7945HX</li>
      <li><strong>Graphics:</strong> NVIDIA® GeForce RTX™ 4070 8GB GDDR6</li>
      <li><strong>Display:</strong> 15.6" WQHD (2560 x 1440) 240Hz, 3ms, IPS-level</li>
      <li><strong>Color:</strong> Eclipse Gray</li>
    </ul>

    <div class="border-t border-slate-200 mb-6"></div>

    <!-- ជម្រើសបំបែក (Variants) -->
    <div class="mb-6">
      <h3 class="text-sm font-bold text-slate-800 mb-3">Configuration (RAM + Storage)</h3>
      <div class="flex flex-wrap gap-3">
        <button 
          v-for="(variant, index) in variants" 
          :key="index"
          @click="selectedVariant = variant"
          class="border-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
          :class="selectedVariant === variant ? 'border-ikit-blue bg-blue-50 text-ikit-blue' : 'border-slate-200 text-slate-600 hover:border-slate-300'"
        >
          {{ variant }}
        </button>
      </div>
    </div>

    <!-- ប៊ូតុង Add to Cart / Buy Now -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <div class="flex items-center border-2 border-slate-200 rounded-lg h-12 w-32">
        <button @click="quantity > 1 ? quantity-- : null" class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-ikit-blue hover:bg-slate-50 transition-colors">-</button>
        <input type="text" v-model="quantity" class="w-full h-full text-center font-bold text-slate-800 outline-none" readonly />
        <button @click="quantity++" class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-ikit-blue hover:bg-slate-50 transition-colors">+</button>
      </div>

      <button class="flex-1 h-12 bg-white border-2 border-ikit-blue text-ikit-blue hover:bg-ikit-blue hover:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        Add to Cart
      </button>

      <button class="h-12 w-12 border-2 border-slate-200 text-slate-500 hover:text-ikit-red hover:border-ikit-red hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      </button>
    </div>
    
    <button class="w-full h-14 bg-ikit-red hover:bg-red-700 text-white font-extrabold rounded-lg shadow-md transition-colors text-lg mb-6 transform hover:-translate-y-0.5">
      BUY NOW
    </button>

    <!-- ទំនុកចិត្ត (Trust Info) -->
    <div class="flex items-center gap-6 text-xs text-slate-500 font-medium">
      <div class="flex items-center gap-1.5">
        <svg class="w-5 h-5 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        1 Year Warranty
      </div>
      <div class="flex items-center gap-1.5">
        <svg class="w-5 h-5 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        Free Delivery
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const variants = ref(['16GB RAM + 512GB SSD', '32GB RAM + 1TB SSD', '64GB RAM + 2TB SSD'])
const selectedVariant = ref(variants.value[0])
const quantity = ref(1)
</script>