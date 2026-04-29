<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង -->
    <div class="flex items-center gap-2 mb-6">
      <!-- Icon ប្រអប់ Grid តំណាងឱ្យប្រភេទ (Category) -->
      <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
      <h2 class="text-2xl font-bold text-slate-800">Popular Categories</h2>
    </div>

    <!-- 🌟 ប្រអប់រូបភាព (Grid 4 ក្រឡាលើកុំព្យូទ័រ, 2 ក្រឡាលើ Mobile) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- លូកយកទិន្នន័យ Category មកបង្ហាញ -->
      <a 
        v-for="(cat, index) in popCategories" 
        :key="index" 
        href="#" 
        class="relative overflow-hidden rounded-lg h-40 md:h-48 group cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
      >
        <!-- រូបភាពផ្ទៃខាងក្រោយ (Zoom ពេល Hover) -->
        <img 
          :src="cat.image" 
          :alt="cat.name" 
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        <!-- Gradient ពណ៌ខ្មៅថ្លាពីក្រោម ដើម្បីឱ្យអានអក្សរច្បាស់ -->
        <div class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
        
        <!-- ព័ត៌មានអក្សរនៅពីលើរូបភាព -->
        <div class="absolute inset-0 p-5 flex flex-col justify-end text-white">
          <h3 class="text-xl font-bold mb-1">{{ cat.name }}</h3>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-300">{{ cat.count }} Products</span>
            
            <!-- ប៊ូតុង Shop Now រុញទៅស្តាំតិចៗពេល Hover -->
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
import { ref } from 'vue'

// ទិន្នន័យគំរូសម្រាប់ប្រភេទពេញនិយមទាំង ៤
const popCategories = ref([
  { name: 'Gaming Laptops', count: '120+', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'PC Components', count: '350+', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Gaming Gear', count: '85+', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Monitors', count: '60+', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
])
</script>