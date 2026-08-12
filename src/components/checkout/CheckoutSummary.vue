<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-20">
    <h2 class="text-xl font-bold mb-6 pb-4 border-b border-slate-100">Order Summary</h2>
    
    <div class="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2">
      <div v-for="item in cartStore.cartItems" :key="item.id" class="flex justify-between text-sm">
        <div class="flex-1 pr-4">
          <p class="font-medium text-slate-800 truncate">{{ item.product?.name || 'Product Name' }}</p>
          <p class="text-slate-500">Qty: {{ item.quantity }}</p>
        </div>
        <p class="font-semibold text-slate-800">
          ${{ ((item.product?.final_price || item.product?.price || 0) * item.quantity).toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="space-y-3 text-sm text-slate-600 mb-6">
      <div class="flex justify-between">
        <span>Subtotal ({{ cartStore.totalItems }} items)</span>
        <span class="font-medium text-slate-800">${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between">
        <span>Shipping Fee</span>
        <!-- 🌟 កែប្រែលក្ខខណ្ឌនៅទីនេះ ដើម្បីបំបែករវាង "មិនទាន់រើសខេត្ត" និង "ហ្វ្រីថ្លៃដឹក" -->
        <span class="font-medium" :class="!isAddressValid || shippingFee === 0 ? 'text-emerald-500' : 'text-slate-800'">
          <span v-if="!isAddressValid">To be calculated</span>
          <span v-else-if="shippingFee === 0">Free Shipping</span>
          <span v-else>+${{ shippingFee.toFixed(2) }}</span>
        </span>
      </div>
      
      <div class="flex justify-between text-lg font-bold text-slate-800 pt-4 border-t border-slate-100">
        <span>Total</span>
        <span class="text-2xl font-extrabold text-blue-600">${{ grandTotal.toFixed(2) }}</span>
      </div>
    </div>

    <div v-if="orderStore.error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
      {{ orderStore.error }}
    </div>

    <button 
      @click="$emit('submit-order')" 
      :disabled="!isAddressValid || orderStore.isProcessing || cartStore.cartItems.length === 0"
      class="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 disabled:shadow-none flex justify-center items-center gap-2"
    >
      <span v-if="orderStore.isProcessing">
        <i class="fas fa-spinner fa-spin mr-2"></i> Processing...
      </span>
      <span v-else>
        Place Order <i class="fas fa-check-circle"></i>
      </span>
    </button>
    
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useOrderStore } from '@/stores/orderStore'; 

const props = defineProps({
  isAddressValid: {
    type: Boolean,
    required: true
  },
  shippingFee: {
    type: Number,
    default: 0
  }
});

defineEmits(['submit-order']);

const cartStore = useCartStore();
const orderStore = useOrderStore();

const grandTotal = computed(() => {
  return cartStore.totalPrice + (props.shippingFee || 0); // ប្រើធានាសុវត្ថិភាពទិន្នន័យ
});
</script>