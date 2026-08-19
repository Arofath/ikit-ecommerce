<template>
  <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 print:hidden">
    <div class="flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full font-bold">
      <i class="fas fa-check-circle mr-2"></i> Order Placed Successfully!
    </div>
    <div class="flex gap-3">
      <button
        @click="$emit('print')"
        class="px-6 py-2.5 cursor-pointer bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900 transition-colors flex items-center gap-2"
      >
        <i class="fas fa-print"></i> Print / PDF
      </button>
      <router-link
        to="/products"
        class="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        Continue Shopping <i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineEmits(['print'])
</script>