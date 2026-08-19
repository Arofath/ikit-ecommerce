<template>
  <div class="max-w-4xl mx-auto px-4 py-10 relative">
    <!-- Loading State -->
    <div v-if="orderStore.isLoading && !orderStore.currentOrder" class="text-center py-32 text-slate-500">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
      <p>Loading your order details...</p>
    </div>

    <template v-else-if="orderStore.currentOrder">
      <!-- 1. Header Component -->
      <CheckoutHeader @print="printInvoice" />

      <!-- 2. Payment Section (KHQR & Receipt Upload or COD) -->
      <PaymentSection />

      <!-- 3. Edit Address Button -->
      <div v-if="canEditAddress" class="mb-4 flex justify-end print:hidden">
        <button
          @click="showEditModal = true"
          class="px-6 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-bold hover:bg-blue-100 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <i class="fas fa-map-marker-alt text-blue-600"></i> Edit Shipping Address
        </button>
      </div>

      <!-- 4. Invoice Content Component -->
      <OrderInvoice />
    </template>

    <!-- 5. Edit Address Modal -->
    <EditAddressModal v-if="showEditModal" @close="showEditModal = false" />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

// Import Components
import CheckoutHeader from '@/components/checkout/CheckoutHeader.vue'
import PaymentSection from '@/components/checkout/PaymentSection.vue'
import OrderInvoice from '@/components/checkout/OrderInvoice.vue'
import EditAddressModal from '@/components/checkout/EditAddressModal.vue'

const route = useRoute()
const orderStore = useOrderStore()
const showEditModal = ref(false)

const orderId = computed(() => route.query.order_id)

const canEditAddress = computed(() => {
  const order = orderStore.currentOrder
  if (!order) return false
  return ['PENDING', 'PROCESSING'].includes(order.status)
})

onMounted(async () => {
  if (orderId.value) {
    await orderStore.fetchOrderDetail(orderId.value)
  }
})

const printInvoice = () => {
  window.print()
}
</script>

<style>
/* Global Print Styles (Can remain here) */
@media print {
  @page { size: A4 portrait; margin: 10mm; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body * { visibility: hidden; }
  #invoice-content, #invoice-content * { visibility: visible; }
  #invoice-content {
    position: absolute; left: 0; top: 0; width: 100%; margin: 0 !important;
    padding: 10px !important; box-shadow: none !important; border: none !important;
    page-break-inside: avoid;
  }
  .print\:hidden { display: none !important; }
}
</style>