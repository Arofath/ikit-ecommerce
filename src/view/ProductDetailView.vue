<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    
    <!-- ស្ថានភាព Loading -->
    <div v-if="productStore.isLoading">Loading...</div>
    
    <!-- ស្ថានភាពមានទិន្នន័យ -->
    <div v-else-if="productStore.hasProduct">
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6 md:mb-8">
        <router-link to="/" class="hover:text-ikit-blue transition-colors">Home</router-link>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <router-link
          :to="'/category/' + productStore.mainCategory?.slug"
          class="hover:text-ikit-blue transition-colors"
        >
          {{ productStore.mainCategory?.name || 'Products' }}
        </router-link>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="text-slate-800 font-medium truncate">
          {{ productStore.currentProduct?.name }}
        </span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <!-- បោះ Array រូបភាព -->
        <ProductGallery :images="productStore.galleryImages" />
        
        <!-- 🌟 កែតម្រូវ៖ បោះទិន្នន័យ Product ទៅឱ្យ ProductInfo -->
        <ProductInfo :product="productStore.currentProduct" />
      </div>

      <!-- 🌟 កែតម្រូវ៖ ទាញវាបញ្ចូលមកក្នុងប្រអប់ v-else-if វិញ និងបោះទិន្នន័យឱ្យវា -->
      <ProductTabs :product="productStore.currentProduct" />
      
    </div> <!-- នេះទើបជាកន្ទុយបិទពិតប្រាកដរបស់ v-else-if -->
    
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import ProductTabs from '@/components/product/ProductTabs.vue'

import { useProductStore } from '@/stores/productStore'

// 🌟 ១. ប្រកាសហៅប្រើ Route (ដើម្បីចាប់យក Slug) និង Store (ដើម្បីទាញទិន្នន័យ)
const route = useRoute()
const productStore = useProductStore()

// 🌟 ២. ពេល Component នេះលោតចេញមកភ្លាម (ចូលដល់ទំព័រ)
onMounted(() => {
  const slug = route.params.slug // ចាប់យកពាក្យនៅចុង URL (ឧ. /product/cyborg-15-a13vek)
  if (slug) {
    productStore.fetchProductBySlug(slug) // បញ្ជាឱ្យ Store ទៅទាញទិន្នន័យពី API
  }
})

// 🌟 ៣. ការពារករណីអ្នកប្រើចុចពី Product មួយ ទៅ Product មួយទៀត
// នៅពេល URL ប្តូរ Slug (តែនៅទំព័រ Detail ដដែល) យើងត្រូវបញ្ជាឱ្យទាញទិន្នន័យម្តងទៀត
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      productStore.fetchProductBySlug(newSlug)
    }
  },
)

// 🌟 ៤. ពេលចាកចេញពីទំព័រនេះ ត្រូវលុបទិន្នន័យចោល
// បើមិនលុបទេ ពេលចូលមើល Product ទី២ វានឹងលោតរូប Product ទី១ បង្ហាញមួយភ្លែតមុននឹង Load ចូល
onUnmounted(() => {
  productStore.clearProduct()
})
</script>
