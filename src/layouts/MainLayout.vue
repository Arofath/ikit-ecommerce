<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    <header class="w-full relative z-50">
      <HeaderTop />
      <HeaderBottom /> </header>

    <main class="grow">
      <router-view></router-view>
    </main>

    <FooterLayout />
  </div>
</template>

<script setup>
import HeaderTop from '@/components/layout/HeaderTop.vue'
import HeaderBottom from '@/components/layout/HeaderBottom.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue';
</script>