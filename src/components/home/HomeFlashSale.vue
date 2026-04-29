<template>
  <section class="mb-12">
    <!-- 🌟 ក្បាល Flash Sale (មានចំណងជើង, ម៉ោង, និងប៊ូតុង See All) -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8 text-ikit-red" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          <h2 class="text-2xl font-bold text-slate-800">Flash Sale</h2>
        </div>
        
        <!-- Timer គំរូ -->
        <div class="flex items-center gap-2 text-sm font-bold">
          <span class="bg-ikit-red text-white px-2 py-1 rounded">02</span>
          <span class="text-slate-400">:</span>
          <span class="bg-ikit-red text-white px-2 py-1 rounded">45</span>
          <span class="text-slate-400">:</span>
          <span class="bg-ikit-red text-white px-2 py-1 rounded">30</span>
        </div>
      </div>
      
      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- 🌟 បញ្ជីទំនិញ Flash Sale (ជា Card) -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <!-- ទំនិញគំរូ (កាត់ចេញជា Components ផ្សេងបាននៅពេលក្រោយ) -->
      <div v-for="i in 5" :key="i" class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative">
        <!-- ផ្លាកបញ្ចុះតម្លៃ -->
        <span class="absolute top-3 left-3 bg-ikit-red text-white text-[10px] font-bold px-2 py-1 rounded z-10">
          -15%
        </span>
        
        <!-- រូបភាពទំនិញ -->
        <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
           <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Product" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
           <!-- ប៊ូតុង Add to Cart (លេចឡើងពេល Hover) -->
           <button class="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md">
             Add to Cart
           </button>
        </div>

        <!-- ព័ត៌មានទំនិញ -->
        <h3 class="text-sm font-medium text-slate-800 mb-1 line-clamp-2 hover:text-ikit-blue cursor-pointer transition-colors">
          ASUS ROG Strix G15 Gaming Laptop
        </h3>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-lg font-bold text-ikit-red">$1,299.00</span>
          <span class="text-xs text-slate-400 line-through">$1,499.00</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ទិន្នន័យគំរូនឹងត្រូវបានបន្ថែមនៅពេលក្រោយ
</script>