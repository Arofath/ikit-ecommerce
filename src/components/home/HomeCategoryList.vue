<template>
  <!-- 🌟 ១. ដកកម្ពស់ថេរចេញលើ Mobile ដើម្បីឱ្យវាបត់ចុះឡើងបាន, ទុក h-[450px] សម្រាប់តែ Desktop (lg) -->
  <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col lg:h-112.5">
    
    <!-- 🌟 ២. ក្បាលពណ៌ខៀវ (ប្តូរទៅជា Button ដើម្បីឱ្យចុចបានលើ Mobile) -->
    <button 
      @click="toggleMobileCategory" 
      class="bg-ikit-blue text-white font-bold py-3 px-4 flex items-center justify-between w-full shrink-0 cursor-pointer lg:cursor-default"
    >
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <span>SHOP BY CATEGORY</span>
      </div>
      <!-- Icon ព្រួញ (បង្ហាញតែលើ Mobile) វិលចុះក្រោមពេលបើក -->
      <svg 
        class="w-5 h-5 lg:hidden transition-transform duration-300" 
        :class="isOpen ? 'rotate-180' : ''"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- 🌟 ៣. បញ្ជីប្រភេទ (ប្រើ v-show / Class ដើម្បីលាក់លើ Mobile បើអត់ទាន់ចុច) -->
    <ul 
      :class="[isOpen ? 'block' : 'hidden', 'lg:block divide-y divide-slate-100 overflow-y-auto grow custom-scrollbar max-h-75 lg:max-h-full']"
    >
      <li v-for="(category, index) in categories" :key="index" class="py-3 px-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors group">
        <span class="text-sm text-slate-700 group-hover:text-ikit-blue group-hover:font-medium transition-all">{{ category }}</span>
        <svg class="w-4 h-4 text-slate-400 group-hover:text-ikit-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// បង្កើត State សម្រាប់កត់ត្រាការបើក/បិទលើ Mobile
const isOpen = ref(false)

const toggleMobileCategory = () => {
  isOpen.value = !isOpen.value
}

const categories = ref([
  'Laptops & Computers',
  'PC Components',
  'Smartphones & Tablets',
  'Monitors & Displays',
  'Gaming Accessories',
  'Printers & Scanners',
  'Networking Devices',
  'Software & Security',
  'Storage & Drives',
  'More Categories'
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
</style>