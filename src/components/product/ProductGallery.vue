<template>
  <div class="flex flex-col gap-4">
    
    <!-- 🌟 ១. រូបភាពធំ -->
    <div class="bg-slate-50 border border-slate-100 rounded-xl aspect-square flex items-center justify-center p-4 md:p-8 relative overflow-hidden group">
      <button class="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
      </button>
      <img :src="mainImage" alt="Product" class="w-full h-full object-contain cursor-zoom-in group-hover:scale-125 transition-transform duration-500" />
    </div>
    
    <!-- 🌟 ២. រូបភាពតូចៗ (Thumbnails) -->
    <!-- លក្ខខណ្ឌ v-if="images.length > 1" មានន័យថា៖ បង្ហាញលុះត្រាតែមានរូបចាប់ពី ២ សន្លឹកឡើងទៅ -->
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-2 md:gap-4">
      <div 
        v-for="(img, index) in images" 
        :key="index"
        @click="changeMainImage(img)"
        class="bg-white border-2 rounded-lg aspect-square flex items-center justify-center p-2 cursor-pointer hover:border-ikit-blue transition-colors"
        :class="mainImage === img ? 'border-ikit-blue shadow-sm' : 'border-slate-100'"
      >
        <img :src="img" alt="Thumbnail" class="w-full h-full object-contain" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'

// ទទួលយករូបភាពពី ProductDetailView ជាទម្រង់ Array
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})

// តម្កល់រូបភាពទី ១ ជា default
const mainImage = ref('')

// 🌟 ប្រើ watch ដើម្បីចាំចាប់ទិន្នន័យពី API (ព្រោះទិន្នន័យដើរយឺតជាង Component បន្តិច)
watch(
  () => props.images,
  (newImages) => {
    if (newImages && newImages.length > 0) {
      mainImage.value = newImages[0] // យករូបទី១ ដាក់ជាការបង្ហាញពេញ
    } else {
      mainImage.value = '/default-placeholder.png' // រូបជំនួស បើគ្មានទិន្នន័យសោះ
    }
  },
  { immediate: true } // ឱ្យវាដំណើរការភ្លាមៗពេល Component កើតឡើង
)

// មុខងារពេលចុចប្តូររូប
const changeMainImage = (img) => {
  mainImage.value = img
}
</script>