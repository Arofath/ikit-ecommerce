<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង និងប៊ូតុង View All -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <!-- Icon ផ្កាយ (Sparkles) តំណាងឱ្យរបស់ថ្មី -->
        <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">New Arrivals</h2>
      </div>

      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- 🌟 បញ្ជីទំនិញថ្មីៗ (ប្រើ Grid 5 ក្រឡាលើកុំព្យូទ័រ) -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      <!-- លូកយកទិន្នន័យ New Products មកបង្ហាញ -->
      <div 
        v-for="(product, index) in newProducts" 
        :key="index" 
        class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
      >
        <!-- 🌟 ផ្លាក NEW ពណ៌ខៀវ -->
        <span class="absolute top-3 left-3 bg-ikit-blue text-white text-[10px] font-bold px-2 py-1 rounded z-10">
          NEW
        </span>
        
        <!-- រូបភាពទំនិញ -->
        <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
           <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
           <!-- ប៊ូតុង Add to Cart (លេចឡើងពេល Hover) -->
           <button class="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md">
             Add to Cart
           </button>
        </div>

        <!-- ព័ត៌មានទំនិញ (ដាក់ mt-auto ឱ្យតម្លៃរុញទៅបាតស្មើៗគ្នា) -->
        <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 hover:text-ikit-blue cursor-pointer transition-colors mt-auto">
          {{ product.name }}
        </h3>
        <div class="font-bold text-ikit-red text-base">
          {{ product.price }}
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// ទិន្នន័យគំរូសម្រាប់ទំនិញថ្មីៗ (មាន ៥ ទំនិញ)
const newProducts = ref([
  { name: 'Apple MacBook Pro M3 Max 16-inch 2024', price: '$3,499.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Razer Blade 16 Gaming Laptop RTX 4090', price: '$2,899.00', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Logitech MX Master 3S Wireless Mouse', price: '$99.00', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Keychron Q1 Pro Mechanical Keyboard', price: '$199.00', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'LG UltraGear 27" OLED Gaming Monitor', price: '$899.00', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
])
</script>