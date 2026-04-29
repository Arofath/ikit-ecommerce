<template>
  <div class="bg-white border-b border-gray-100 font-sans">
    
    <div class="lg:hidden bg-slate-50 border-b border-slate-100 py-2">
      <div class="container mx-auto px-4 flex justify-between items-center text-xs">
        <div class="flex items-center gap-1.5 text-ikit-blue font-medium">
          <svg class="w-4 h-4 text-ikit-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          095 222 334
        </div>
        <div class="flex items-center gap-1.5 text-ikit-blue font-medium">
          <svg class="w-4 h-4 text-ikit-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Phnom Penh
        </div>
      </div>
    </div>

    <div class="py-3 md:py-2">
      <div class="container mx-auto px-4 lg:px-8 max-w-7xl flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 gap-x-6">
        
        <router-link to="/" class="shrink-0 flex items-center group cursor-pointer -my-8 md:-my-12">
          <img
            src="@/assets/images/ikit-logo3.png"
            alt="Ikit Computer"
            class="h-28 md:h-28 w-auto object-contain hover:opacity-80 transition"
          />
        </router-link>

        <div class="w-full md:w-auto md:flex-1 order-last md:order-0 max-w-2xl mx-auto">
          <form
            @submit.prevent="handleSearch"
            class="relative flex items-center w-full h-11 rounded-full bg-slate-50 border border-slate-200 focus-within:border-ikit-blue focus-within:bg-white focus-within:ring-4 focus-within:ring-ikit-blue/10 transition-all overflow-hidden"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for products..."
              class="w-full h-full bg-transparent outline-none text-sm text-slate-700 px-5 placeholder:text-slate-400"
            />
            <button
              type="submit"
              class="h-full px-6 bg-ikit-blue text-white font-medium text-sm flex items-center justify-center hover:bg-ikit-dark transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        <div class="hidden lg:flex items-center gap-6 text-sm">
          <div class="flex items-center gap-3">
            <div class="text-ikit-red">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500 font-medium">24/7 Support</span>
              <span class="text-ikit-blue font-bold hover:text-ikit-dark cursor-pointer transition">095 222 334</span>
            </div>
          </div>

          <div class="h-8 w-px bg-slate-200"></div>

          <div class="flex items-center gap-3">
            <div class="text-ikit-red">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500 font-medium">Store Location</span>
              <span class="text-ikit-blue font-bold hover:text-ikit-dark cursor-pointer transition">Phnom Penh</span>
            </div>
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
    router.push({ name: 'Products', query: { search: searchQuery.value } })
  }
}
</script>