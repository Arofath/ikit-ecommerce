<template>
  <div v-if="lastPage > 1" class="mt-12 flex items-center justify-center gap-2 font-sans ">
    
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-ikit-blue hover:text-ikit-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'w-10 h-10 rounded-lg font-bold flex items-center justify-center transition-all duration-200 cursor-pointer',
        page === currentPage
          ? 'bg-ikit-blue text-white shadow-md scale-105' // Style សម្រាប់ទំព័រដែលកំពុងឈរ
          : 'border border-slate-200 text-slate-600 hover:border-ikit-blue hover:text-ikit-blue bg-white'
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === lastPage"
      class="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-ikit-blue hover:text-ikit-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  lastPage: {
    type: Number,
    required: true,
    default: 1
  }
})

const router = useRouter()
const route = useRoute()

// ==========================================
// 🌟 ១. មុខងារប្តូរ URL ពេលចុចលេខទំព័រ
// ==========================================
const changePage = (page) => {
  // ការពារកុំឱ្យចុចលើសទំព័រ ឬចុចលេខដដែល
  if (page < 1 || page > props.lastPage || page === props.currentPage) return;

  const currentQuery = { ...route.query } // ចម្លង Filter ចាស់ៗទុក (ឧ. brand=asus)
  currentQuery.page = page // បន្ថែម ឬប្តូរលេខ page

  // បញ្ជាឱ្យ Vue Router ប្តូរ URL
  router.push({ query: currentQuery })
}

// ==========================================
// 🌟 ២. គណនាការបង្ហាញលេខ (Smart Pagination)
// ==========================================
// បើទំព័រមានដល់ ១០០ វាស្អាតជាងបើបង្ហាញត្រឹម ៥ លេខជុំវិញទំព័របច្ចុប្បន្ន (ឧ. 4 5 [6] 7 8)
const visiblePages = computed(() => {
  const pages = []
  // កំណត់បង្ហាញ ៥ លេខ
  let start = Math.max(1, props.currentPage - 2)
  let end = Math.min(props.lastPage, props.currentPage + 2)

  // កែតម្រូវបើវានៅដើមទី ឬ ចុងទី
  if (props.currentPage <= 2) {
    end = Math.min(props.lastPage, 5)
  }
  if (props.currentPage >= props.lastPage - 1) {
    start = Math.max(1, props.lastPage - 4)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>