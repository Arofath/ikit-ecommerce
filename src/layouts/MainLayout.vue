<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    
    <header class="w-full relative z-50">
      <HeaderTop />
      
      </header>

    <main class="grow">
      <router-view></router-view>
    </main>

    </div>
</template>

<script setup>
import HeaderTop from '@/components/layout/HeaderTop.vue'
// import HeaderBottom from './HeaderBottom.vue' (ត្រៀមសម្រាប់ពេលក្រោយ)
</script>