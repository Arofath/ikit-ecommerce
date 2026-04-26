<template>
  <div class="bg-red border-b border-gray-100 py-4">
    <div class="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between gap-6">
      
      <router-link to="/" class="shrink-0 flex items-center gap-2 group cursor-pointer">
        <div class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-700 transition">
          IK
        </div>
        <span class="text-2xl font-extrabold text-slate-800 tracking-tight">Ikit<span class="text-blue-600">Computer</span></span>
      </router-link>

      <div class="hidden md:flex flex-1 max-w-2xl mx-auto">
        <form @submit.prevent="handleSearch" class="relative flex items-center w-full h-11 rounded-full bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all overflow-hidden">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search for products..." 
            class="w-full h-full bg-transparent outline-none text-sm text-slate-700 px-5 placeholder:text-slate-400" 
          />
          <button type="submit" class="h-full px-6 bg-blue-600 text-white font-medium text-sm flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      <div class="hidden lg:flex items-center gap-6 text-sm">
        
        <div class="flex items-center gap-3">
          <div class="text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-slate-500 font-medium">24/7 Support</span>
            <span class="text-blue-600 font-bold hover:text-blue-700 cursor-pointer transition">095 222 334</span>
          </div>
        </div>

        <div class="h-8 w-px bg-slate-200"></div>

        <div class="flex items-center gap-3">
          <div class="text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-slate-500 font-medium">Store Location</span>
            <span class="text-slate-800 font-bold hover:text-blue-600 cursor-pointer transition">Phnom Penh</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // បញ្ជូនទៅកាន់ទំព័រ Products ជាមួយនឹងអក្សរដែលវាយបញ្ចូល
    router.push({ name: 'Products', query: { search: searchQuery.value } })
  }
}
</script>