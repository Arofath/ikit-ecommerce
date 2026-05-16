<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 print:hidden">
      <div
        class="flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full font-bold"
      >
        <i class="fas fa-check-circle mr-2"></i> Order Placed Successfully!
      </div>
      <div class="flex gap-3">
        <button
          @click="printInvoice"
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

     <!-- Invoice -->
    <div
      v-if="orderStore.currentOrder"
      class="bg-white p-10 sm:p-14 rounded-none sm:rounded-xl shadow-md border border-slate-200"
      id="invoice-content"
    >
      <div class="flex flex-col sm:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 class="text-5xl font-black text-slate-800 uppercase tracking-wider mb-2">INVOICE</h1>
        </div>

        <div class="w-24 h-24 rounded-full flex items-center justify-center shrink-0">
          <img src="@/assets/images/ikit-logo.png" alt="" />
          <!-- <span class="text-blue-600 font-bold text-xl">iKit</span> -->
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-10 text-sm gap-8">
        <div>
          <p class="font-bold text-slate-800 uppercase mb-2">From:</p>
          <p class="font-bold text-slate-800 text-lg">IKit Computer Shop</p>
          <p class="text-slate-600">Phnom Penh, Cambodia</p>
          <p class="text-slate-600">095 222 334</p>
          <p class="text-slate-600">info@ikitcomputer.com</p>
        </div>
        <div class="sm:text-right">
          <p class="font-bold text-slate-800 uppercase mb-2">Bill To:</p>
          <p class="font-bold text-slate-800 text-lg">
            {{ orderStore.currentOrder.shipping_name }}
          </p>
          <p class="text-slate-600 max-w-62.5 sm:ml-auto">
            {{ orderStore.currentOrder.shipping_address }}
          </p>
          <p class="text-slate-600">{{ orderStore.currentOrder.shipping_phone }}</p>
        </div>
      </div>

      <div class="flex justify-between mb-8 pb-4 border-b border-slate-200 text-sm">
        <div>
          <p class="font-bold text-slate-800 uppercase mb-1">Invoice No:</p>
          <p class="text-slate-600">{{ orderStore.currentOrder.order_number }}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-800 uppercase mb-1">Invoice Date:</p>
          <p class="text-slate-600">{{ formatDate(orderStore.currentOrder.created_at) }}</p>
        </div>
      </div>

      <div class="mb-10 overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="py-3 px-4 font-bold text-slate-800 uppercase">Name</th>
              <th class="py-3 px-4 font-bold text-slate-800 uppercase text-center">QTY</th>
              <th class="py-3 px-4 font-bold text-slate-800 uppercase text-right">Amount</th>
              <th class="py-3 px-4 font-bold text-slate-800 uppercase text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in orderStore.currentOrder.items"
              :key="item.id"
              class="border-b border-slate-100"
            >
              <td class="py-4 px-4 text-slate-800 font-medium whitespace-normal min-w-50">
                {{ item.product_name || item.product?.name }}
                <span
                  v-if="item.product?.discount_percent > 0"
                  class="ml-2 inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded"
                >
                  -{{ item.product.discount_percent }}%
                </span>
              </td>
              <td class="py-4 px-4 text-slate-800 text-center">{{ item.quantity }}</td>
              <td class="py-4 px-4 text-slate-800 text-right">
                <div
                  v-if="item.product?.discount_percent > 0"
                  class="text-xs text-slate-400 line-through"
                >
                  ${{ parseFloat(item.product.price).toFixed(2) }}
                </div>
                <div>${{ parseFloat(item.unit_price).toFixed(2) }}</div>
              </td>
              <td class="py-4 px-4 text-slate-800 text-right font-bold">
                ${{ parseFloat(item.subtotal).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
        <div>
          <h3
            class="font-bold text-slate-800 uppercase mb-3 bg-slate-50 py-2 px-4 rounded text-center border border-slate-100"
          >
            Payment Details
          </h3>
          <div class="px-2 space-y-1">
            <p class="text-slate-600">
              Method:
              <strong class="text-slate-800">{{
                orderStore.currentOrder.payment_method?.replace(/_/g, ' ')
              }}</strong>
            </p>
            <p class="text-slate-600">
              Status:
              <strong
                :class="
                  orderStore.currentOrder.payment_status === 'PAID'
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                "
                >{{ orderStore.currentOrder.payment_status }}</strong
              >
            </p>

            <div
              v-if="orderStore.currentOrder.payment_method !== 'CASH_ON_DELIVERY'"
              class="mt-4 border border-slate-200 p-2 rounded-xl w-32 inline-block"
            >
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=iKitComputerPayment"
                alt="QR"
                class="w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h3
            class="font-bold text-slate-800 uppercase mb-3 bg-slate-50 py-2 px-4 rounded text-center border border-slate-100"
          >
            Invoice Summary
          </h3>
          <div class="space-y-3 px-4">
            <div class="flex justify-between text-slate-600">
              <span>SUB TOTAL</span>
              <span>${{ originalSubtotal.toFixed(2) }}</span>
            </div>

            <div
              v-if="totalDiscountAmount > 0"
              class="flex justify-between text-red-500 font-medium"
            >
              <span>DISCOUNT</span>
              <span>-${{ totalDiscountAmount.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between text-slate-600">
              <span>SHIPPING</span>
              <span>{{
                orderStore.currentOrder.shipping_fee > 0
                  ? '+$' + parseFloat(orderStore.currentOrder.shipping_fee).toFixed(2)
                  : 'Free'
              }}</span>
            </div>

            <div
              class="flex justify-between font-bold text-slate-800 pt-3 border-t border-slate-200"
            >
              <span>TOTAL</span>
              <span>${{ parseFloat(orderStore.currentOrder.grand_total).toFixed(2) }}</span>
            </div>

            <!-- <div class="flex justify-between font-bold text-blue-600">
              <span>TOTAL (KHR)</span>
              <span>៛{{ (parseFloat(orderStore.currentOrder.grand_total) * 4100).toLocaleString() }}</span>
            </div> -->
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
        This invoice was generated electronically by Ikit Computer Shop.
      </div>
    </div>

    <div v-else-if="orderStore.isLoading" class="text-center py-32 text-slate-500">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
      <p>Generating your invoice...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const route = useRoute()
const orderStore = useOrderStore()

onMounted(async () => {
  const orderId = route.query.order_id
  if (orderId) {
    await orderStore.fetchOrderDetail(orderId)
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

const originalSubtotal = computed(() => {
  if (!orderStore.currentOrder?.items) return 0
  return orderStore.currentOrder.items.reduce((sum, item) => {
    // យកតម្លៃដើមរបស់ Product មកគុណនឹងចំនួន (បើអត់មានតម្លៃដើម យកតម្លៃដែលលក់)
    const originalPrice = item.product?.price || item.unit_price
    return sum + originalPrice * item.quantity
  }, 0)
})

const totalDiscountAmount = computed(() => {
  if (!orderStore.currentOrder) return 0
  // យកតម្លៃដើមសរុប ដក តម្លៃដែលអតិថិជនទិញជាក់ស្តែង (Subtotal ក្នុង Order)
  return originalSubtotal.value - orderStore.currentOrder.subtotal
})

const printInvoice = () => {
  window.print()
}
</script>

<style>
@media print {
  /* ១. កំណត់ទំហំក្រដាស A4 និងលុប Header/Footer របស់ Browser ចោល (URL, ថ្ងៃខែ) */
  @page {
    size: A4 portrait;
    margin: 10mm; /* ទុកចន្លោះគែមក្រដាសបន្តិច ដើម្បីកុំអោយបាត់អក្សរ Browser */
  }

  /* ២. បង្ខំអោយ Browser Print ជាប់ពណ៌ Background (ឧ. ពណ៌ផ្ទៃតារាង, ពណ៌ Badge) */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* ៣. លាក់អ្វីៗទាំងអស់នៅលើវេបសាយ លើកលែងតែ Invoice ប៉ុណ្ណោះ */
  body * {
    visibility: hidden;
  }

  #invoice-content,
  #invoice-content * {
    visibility: visible;
  }

  /* ៤. រៀបចំ Invoice អោយទាញមកនៅកំពូលគេ និងបំបាត់ស្រមោល (Shadow) */
  #invoice-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0 !important;
    padding: 10px !important; /* បន្ថយ Padding ពេល Print ដើម្បីកុំអោយធ្លាក់ទំព័រ */
    box-shadow: none !important;
    border: none !important;
    page-break-inside: avoid; /* ការពារកុំអោយដាច់ធ្លាក់ទៅទំព័រទី ២ (ធានាថាចេញតែ ១ សន្លឹក) */
  }

  /* ៥. លាក់ប៊ូតុង Print និង ប៊ូតុង Continue */
  .print\:hidden {
    display: none !important;
  }
}
</style>
