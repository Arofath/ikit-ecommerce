<template>
  <div class="flex flex-col gap-4">
    <!-- រូបភាពធំ -->
    <div class="bg-slate-50 border border-slate-100 rounded-xl aspect-square flex items-center justify-center p-4 md:p-8 relative overflow-hidden group">
      <!-- ប៊ូតុង Zoom ពេល Hover -->
      <button class="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
      </button>
      <img :src="mainImage" alt="Product" class="w-full h-full object-contain cursor-zoom-in group-hover:scale-125 transition-transform duration-500" />
    </div>
    
    <!-- រូបភាពតូចៗ (Thumbnails) -->
    <div class="grid grid-cols-4 gap-2 md:gap-4">
      <div 
        v-for="(img, index) in thumbnails" 
        :key="index"
        @click="changeMainImage(img)"
        class="bg-slate-50 border-2 rounded-lg aspect-square flex items-center justify-center p-2 cursor-pointer hover:border-ikit-blue transition-colors"
        :class="mainImage === img ? 'border-ikit-blue' : 'border-slate-100'"
      >
        <img :src="img" alt="Thumbnail" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const thumbnails = ref([
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
])

const mainImage = ref(thumbnails.value[0])

const changeMainImage = (img) => {
  mainImage.value = img
}
</script>