<template>
  <aside class="w-full lg:w-1/4 shrink-0 space-y-8 hidden lg:block font-sans">
    <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm relative mb-8">
      <div
        v-if="isLoadingData"
        class="absolute inset-0 bg-white/50 flex items-center justify-center z-10"
      >
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-ikit-blue"></div>
      </div>

      <h3 class="font-bold text-slate-800 mb-3 uppercase tracking-wider text-sm">Categories</h3>

      <div class="mb-4 relative">
        <input
          type="text"
          v-model="searchCategoryQuery"
          placeholder="Search categories..."
          class="w-full text-sm pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none"
        />
        <svg
          class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <div class="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
        <CategoryTreeItem
          v-for="cat in filteredCategories"
          :key="cat.slug"
          :category="cat"
          v-model="selectedCategories"
          @update:modelValue="applyFilters"
        />

        <div
          v-if="filteredCategories.length === 0 && !isLoadingData"
          class="text-xs text-slate-400 text-center py-2"
        >
          No categories found matching "{{ searchCategoryQuery }}"
        </div>
      </div>
    </div>

 <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm relative">
      <h3 class="font-bold text-slate-800 mb-3 uppercase tracking-wider text-sm">Brands</h3>

      <div class="mb-4 relative">
        <input 
          type="text" 
          v-model="searchBrandQuery" 
          placeholder="Search brands..." 
          class="w-full text-sm pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none transition-colors"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        
        <button v-if="searchBrandQuery" @click="searchBrandQuery = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        <label
          v-for="brand in filteredBrands"
          :key="brand.slug"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            :value="brand.slug"
            v-model="selectedBrands"
            @change="applyFilters"
            class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer"
          />
          <span class="text-slate-600 group-hover:text-ikit-blue text-sm font-medium" :class="{'text-ikit-blue font-bold': selectedBrands.includes(brand.slug)}">
            {{ brand.name }}
          </span>
        </label>
        
        <div v-if="filteredBrands.length === 0" class="text-xs text-slate-400 text-center py-2">
          No brands found matching "{{ searchBrandQuery }}"
        </div>
      </div>
    </div>

    <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
      <h3 class="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Price Range</h3>
      <div class="flex items-center gap-2 mb-4">
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
          <input
            type="number"
            v-model="minPrice"
            placeholder="Min"
            class="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none"
          />
        </div>
        <span class="text-slate-400">-</span>
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
          <input
            type="number"
            v-model="maxPrice"
            placeholder="Max"
            class="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none"
          />
        </div>
      </div>
      <button
        @click="applyFilters"
        class="w-full bg-slate-100 hover:bg-ikit-blue hover:text-white text-slate-800 font-bold py-2 rounded-lg transition-colors text-sm"
      >
        Apply Filter
      </button>

      <button
        v-if="selectedCategories.length || selectedBrands.length || minPrice || maxPrice"
        @click="clearAll"
        class="w-full mt-3 text-red-500 hover:text-red-700 text-sm font-bold py-2"
      >
        Clear All Filters
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { categoryService } from '@/services/category.service'
import { brandService } from '@/services/brand.service'
import CategoryTreeItem from './CategoryTreeItem.vue'

const router = useRouter()
const route = useRoute()

// 🌟 ទិន្នន័យពិតពី DB
const categories = ref([])
const brands = ref([])
const isLoadingData = ref(false)

// 🌟 ប្តូរទៅជា Array សម្រាប់ផ្ទុកតម្លៃច្រើន
const selectedCategories = ref([])
const selectedBrands = ref([])
const minPrice = ref('')
const maxPrice = ref('')

const searchCategoryQuery = ref('')
const searchBrandQuery = ref('')

// 🌟 មុខងារទាញយក Categories និង Brands ពី API
const fetchFilterData = async () => {
  isLoadingData.value = true
  try {
    // ហៅតាមរយៈ Service វិញ (ស្អាត និងមានសុវត្ថិភាព)
    const catRes = await categoryService.getStorefrontCategories()
    categories.value = catRes.data.data // ឬអាស្រ័យលើ JSON Response របស់អ្នក

    const brandRes = await brandService.getStorefrontBrands()
    brands.value = brandRes.data.data
  } catch (error) {
    console.error('Error loading filter data:', error)
  } finally {
    isLoadingData.value = false
  }
}

// 🌟 អានទិន្នន័យពី URL បំបែកដោយសញ្ញាក្បៀស (,) ដាក់ចូល Array វិញ
const syncFiltersFromUrl = () => {
  selectedCategories.value = route.query.category ? route.query.category.split(',') : []
  selectedBrands.value = route.query.brand ? route.query.brand.split(',') : []
  minPrice.value = route.query.min_price || ''
  maxPrice.value = route.query.max_price || ''
}

onMounted(() => {
  fetchFilterData() // ទាញទិន្នន័យពី DB ពេលបើកមក
  syncFiltersFromUrl()
})

watch(
  () => route.query,
  () => {
    syncFiltersFromUrl()
  },
)

const filteredCategories = computed(() => {
  // បើគេមិនទាន់វាយអ្វីទេ បង្ហាញ Category ដើមទាំងអស់
  if (!searchCategoryQuery.value) return categories.value

  const query = searchCategoryQuery.value.toLowerCase()

  // បង្កើតក្បួនហៅខ្លួនឯង ដើម្បីឆែកមើលទាំងមេ ទាំងកូន
  const filterTree = (nodes) => {
    return nodes
      .map((node) => {
        // Copy ទិន្នន័យមេ ដើម្បីកុំឱ្យប៉ះពាល់ទិន្នន័យដើម
        const newNode = { ...node }

        // បើមានកូន, យកកូនទៅឆែក Filter បន្តទៀត
        if (newNode.children) {
          newNode.children = filterTree(newNode.children)
        }

        return newNode
      })
      .filter((node) => {
        // 🌟 លក្ខខណ្ឌរក្សាទុក៖
        // ១. ឈ្មោះរបស់វាត្រូវនឹងអ្វីដែលគេ Search
        const matchesName = node.name.toLowerCase().includes(query)
        // ២. ឬក៏កូនៗរបស់វាមានមួយណាត្រូវ (ទោះមេមិនត្រូវឈ្មោះក៏ដោយ ក៏ត្រូវរក្សាមេទុកដែរ)
        const hasMatchingChildren = node.children && node.children.length > 0

        return matchesName || hasMatchingChildren
      })
  }

  return filterTree(categories.value)
})

const sortedBrands = computed(() => {
  const regularBrands = brands.value.filter(b => b.slug !== 'other' && b.name.toLowerCase() !== 'other');
  const otherBrand = brands.value.find(b => b.slug === 'other' || b.name.toLowerCase() === 'other');
  
  if (otherBrand) return [...regularBrands, otherBrand];
  return regularBrands;
});

const filteredBrands = computed(() => {
  // បើគេមិនទាន់វាយអ្វីទេ បង្ហាញម៉ាកទាំងអស់ដែលបានតម្រៀបរៀបរយហើយ
  if (!searchBrandQuery.value) return sortedBrands.value;

  // ប្តូរពាក្យដែលគេវាយទៅជាអក្សរតូចទាំងអស់ ដើម្បីងាយស្រួលប្រៀបធៀប (Case Insensitive)
  const query = searchBrandQuery.value.toLowerCase();

  // ច្រោះយកតែ Brand ណាដែលមានឈ្មោះត្រូវនឹងអ្វីដែលគេវាយ
  return sortedBrands.value.filter(brand => 
    brand.name.toLowerCase().includes(query)
  );
});

// 🌟 មុខងារបញ្ជូនការជ្រើសរើសទៅកាន់ URL
const applyFilters = () => {
  const currentQuery = { ...route.query }

  // ប្តូរពី Array ទៅជា String ដែលមានក្បៀស (ឧ. laptop,desktop)
  if (selectedCategories.value.length > 0)
    currentQuery.category = selectedCategories.value.join(',')
  else delete currentQuery.category

  if (selectedBrands.value.length > 0) currentQuery.brand = selectedBrands.value.join(',')
  else delete currentQuery.brand

  if (minPrice.value) currentQuery.min_price = minPrice.value
  else delete currentQuery.min_price

  if (maxPrice.value) currentQuery.max_price = maxPrice.value
  else delete currentQuery.max_price

  delete currentQuery.page

  // បញ្ជាឱ្យរត់ទៅ URL ថ្មី
  router.push({ query: currentQuery })
}

// 🌟 មុខងារ Clear All ងាយស្រួលជាងមុន
const clearAll = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  minPrice.value = ''
  maxPrice.value = ''
  applyFilters()
}
</script>
