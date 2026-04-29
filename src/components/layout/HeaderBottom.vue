<template>
  <div class="bg-ikit-blue text-white top-0 z-40 shadow-md font-sans relative">
    <div class="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between h-14">
      
      <nav class="hidden lg:flex items-center gap-8 text-sm font-medium">
        <router-link to="/" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">Home</router-link>
        <router-link to="/products" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">Products</router-link>
        <router-link to="/services" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">Services</router-link>
        <router-link to="/warranty" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">Check Warranty</router-link>
        <router-link to="/about" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">About Us</router-link>
        <router-link to="/contact" class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100">Contact Us</router-link>
      </nav>

      <button @click="toggleMobileMenu" class="lg:hidden p-2 -ml-2 hover:bg-black/10 rounded-lg transition-colors">
        <svg v-if="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div class="flex items-center gap-2 sm:gap-4">
        
        <router-link to="/wishlist" class="relative hover:bg-black/10 p-2 rounded-lg transition cursor-pointer group">
          <svg class="w-6 h-6 group-hover:text-red-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span class="absolute top-0 right-0 w-4 h-4 bg-ikit-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-ikit-blue">
            0
          </span>
        </router-link>

        <router-link to="/cart" class="relative flex items-center gap-2 bg-white text-ikit-blue hover:bg-slate-100 px-4 py-2 rounded-lg transition cursor-pointer shadow-sm">
          <div class="relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="absolute -top-2 -right-2 w-4 h-4 bg-ikit-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
              2
            </span>
          </div>
          <span class="hidden sm:block text-sm font-extrabold">$0.00</span>
        </router-link>

        <div class="w-px h-6 bg-blue-400/50 hidden sm:block mx-1"></div>

        <router-link to="/profile" class="flex items-center gap-2 hover:bg-black/10 p-2 rounded-lg transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="hidden sm:block text-sm font-medium">Account</span>
        </router-link>

      </div>
    </div>

    <div 
      v-show="isMobileMenuOpen" 
      class="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col font-medium text-slate-700"
    >
      <router-link @click="closeMobileMenu" to="/" class="px-6 py-4 border-b border-slate-100 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Home</router-link>
      <router-link @click="closeMobileMenu" to="/products" class="px-6 py-4 border-b border-slate-100 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Products</router-link>
      <router-link @click="closeMobileMenu" to="/services" class="px-6 py-4 border-b border-slate-100 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Services</router-link>
      <router-link @click="closeMobileMenu" to="/warranty" class="px-6 py-4 border-b border-slate-100 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Check Warranty</router-link>
      <router-link @click="closeMobileMenu" to="/about" class="px-6 py-4 border-b border-slate-100 hover:bg-slate-50 hover:text-ikit-blue transition-colors">About Us</router-link>
      <router-link @click="closeMobileMenu" to="/contact" class="px-6 py-4 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Contact Us</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🌟 បង្កើត State សម្រាប់គ្រប់គ្រងការបើក/បិទ Mobile Menu
const isMobileMenuOpen = ref(false)

// អនុគមន៍សម្រាប់បិទបើក
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// អនុគមន៍សម្រាប់បិទ Menu ពេលដែលចុចលើ Link រួច
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>