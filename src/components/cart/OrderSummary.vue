<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-20">
    <h2 class="text-xl font-bold mb-6 pb-4 border-b border-slate-100">Order Summary</h2>

    <div class="space-y-4 mb-6">
      <div class="flex justify-between text-slate-600">
        <span>Subtotal ({{ cartStore.totalItems }} items)</span>
        <span class="font-medium text-slate-800">${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-slate-600">
        <span>Discount</span>
        <span class="font-medium text-emerald-500">-$0.00</span>
      </div>
      <div class="flex justify-between text-slate-600">
        <span>Estimated Tax</span>
        <span class="font-medium text-slate-800">$0.00</span>
      </div>
    </div>

    <div class="border-t border-slate-100 pt-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-slate-800">Total</span>
        <span class="text-2xl font-extrabold text-blue-600"
          >${{ cartStore.totalPrice.toFixed(2) }}</span
        >
      </div>
    </div>

    <router-link
      to="/checkout"
      :class="[
        'w-full py-4 rounded-xl font-semibold transition-all flex justify-center items-center gap-2',
        cartStore.cartItems.length === 0 // 🌟 កន្លែងដែលត្រូវកែ៖ ដូរពី items ទៅជា cartItems វិញ
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed pointer-events-none'
          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5',
      ]"
    >
      Proceed to Checkout <i class="fas fa-arrow-right"></i>
    </router-link>

    <div class="mt-4 text-center">
      <router-link to="/products" class="text-sm text-blue-600 font-medium hover:underline">
        or Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>
