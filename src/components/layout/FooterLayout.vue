<template>
  <footer class="bg-white text-slate-600 border-t-4 border-ikit-blue font-sans">
    
    <div class="container mx-auto px-4 lg:px-8 max-w-7xl pt-10 pb-8 md:pt-12 md:pb-10 lg:pt-16 lg:pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-8">
        
        <div class="md:col-span-2 lg:col-span-3 flex justify-center lg:justify-start">
          <router-link to="/" class="inline-block hover:opacity-80 transition mt-2">
            <img
              src="@/assets/images/ikit-logo.png"
              alt="Ikit Computer"
              class="w-48 md:w-56 h-auto object-contain"
            />
          </router-link>
        </div>

        <div class="md:col-span-1 lg:col-span-2">
          <h3 class="text-ikit-blue text-lg font-bold mb-5 lg:mb-6">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/products" class="hover:text-ikit-red transition-colors">All Products</router-link>
            </li>
            <li>
              <router-link to="/services" class="hover:text-ikit-red transition-colors">Our Services</router-link>
            </li>
            <li>
              <router-link to="/warranty" class="hover:text-ikit-red transition-colors">Check Warranty</router-link>
            </li>
            <li>
              <router-link to="/promotions" class="hover:text-ikit-red transition-colors">Promotions</router-link>
            </li>
          </ul>
        </div>

        <div class="md:col-span-1 lg:col-span-2">
          <h3 class="text-ikit-blue text-lg font-bold mb-5 lg:mb-6">Information</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/about" class="hover:text-ikit-red transition-colors">About Us</router-link>
            </li>
            <li>
              <router-link to="/delivery" class="hover:text-ikit-red transition-colors">Delivery Policy</router-link>
            </li>
            <li>
              <router-link to="/privacy" class="hover:text-ikit-red transition-colors">Privacy Policy</router-link>
            </li>
            <li>
              <router-link to="/terms" class="hover:text-ikit-red transition-colors">Terms & Conditions</router-link>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2 lg:col-span-5">
          <h3 class="text-ikit-blue text-lg font-bold mb-5 lg:mb-6">Contact Us</h3>
          <ul class="space-y-4 text-sm mb-6">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-ikit-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-slate-600">#123, St. 456, Sangkat Toul Tompoung, Khan Chamkarmon, Phnom Penh</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-ikit-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-slate-600">Mon - Sun: 8:00 AM - 8:00 PM</span>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 text-ikit-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-slate-600 font-medium">+855 95 222 334</span>
            </li>
          </ul>

          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-ikit-blue transition-colors text-ikit-blue hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors text-sky-500 hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.282-.346-.088l-6.4 4.024-2.76-.86c-.6-.185-.613-.6.125-.89l10.736-4.136c.498-.223.965.115.825.88z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 border-t border-slate-200 py-6">
      <div class="container mx-auto px-4 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-y-4 gap-x-4 text-sm text-slate-500">
        
        <p class="text-center md:text-left">&copy; {{ currentYear }} Ikit Computer. All Rights Reserved.</p>
        
        <div class="flex gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" class="h-6 grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" class="h-6 grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/ABA_Bank_Logo.png/200px-ABA_Bank_Logo.png" alt="ABA" class="h-6 grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>