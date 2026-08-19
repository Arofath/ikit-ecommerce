<template>
  <div class="bg-white p-10 sm:p-14 rounded-none sm:rounded-xl shadow-md border border-slate-200" id="invoice-content">
    <div class="flex flex-col sm:flex-row justify-between items-start mb-12 gap-6">
      <div>
        <h1 class="text-5xl font-black text-slate-800 uppercase tracking-wider mb-2">INVOICE</h1>
      </div>
      <div class="w-24 h-24 rounded-full flex items-center justify-center shrink-0">
        <img src="@/assets/images/ikit-logo.png" alt="" />
      </div>
    </div>

    <!-- Company & Customer Info -->
    <div class="flex flex-col sm:flex-row justify-between mb-10 text-sm gap-8">
      <div>
        <p class="font-bold text-slate-800 uppercase mb-2">From:</p>
        <p class="font-bold text-slate-800 text-lg">IKit Computer Shop</p>
        <p class="text-slate-600">Phnom Penh, Cambodia</p>
        <p class="text-slate-600">095 222 334</p>
        <p class="text-slate-600">info@ikitcomputer.com</p>
      </div>
      <div class="sm:text-right">
        <div class="flex justify-start sm:justify-end items-center gap-2 mb-2">
          <p class="font-bold text-slate-800 uppercase">Bill To:</p>
        </div>
        <p class="font-bold text-slate-800 text-lg">{{ orderStore.currentOrder.shipping_name }}</p>
        <p class="text-slate-600 max-w-62.5 sm:ml-auto whitespace-pre-line">{{ formatAddress(orderStore.currentOrder) }}</p>
        <p class="text-slate-600">{{ orderStore.currentOrder.shipping_phone }}</p>
      </div>
    </div>

    <!-- Invoice Dates -->
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

    <!-- Items Table -->
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
          <tr v-for="item in orderStore.currentOrder.items" :key="item.id" class="border-b border-slate-100">
            <td class="py-4 px-4 text-slate-800 font-medium whitespace-normal min-w-50">
              {{ item.product_name || item.product?.name }}
              <span v-if="item.product?.discount_percent > 0" class="ml-2 inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                -{{ item.product.discount_percent }}%
              </span>
            </td>
            <td class="py-4 px-4 text-slate-800 text-center">{{ item.quantity }}</td>
            <td class="py-4 px-4 text-slate-800 text-right">
              <div v-if="item.product?.discount_percent > 0" class="text-xs text-slate-400 line-through">
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

    <!-- Summary Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
      <div>
        <h3 class="font-bold text-slate-800 uppercase mb-3 bg-slate-50 py-2 px-4 rounded text-center border border-slate-100">Payment Details</h3>
        <div class="px-2 space-y-1">
          <p class="text-slate-600">Method: <strong class="text-slate-800">{{ orderStore.currentOrder.payment_method?.replace(/_/g, ' ') }}</strong></p>
          <p class="text-slate-600">
            Status:
            <strong :class="{'text-emerald-600': ['PAID', 'COMPLETED'].includes(orderStore.currentOrder.payment_status), 'text-amber-600': orderStore.currentOrder.payment_status === 'UNPAID', 'text-red-600': ['INVALID_RECEIPT', 'FAILED'].includes(orderStore.currentOrder.payment_status) }">
              {{ orderStore.currentOrder.payment_status }}
            </strong>
          </p>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-slate-800 uppercase mb-3 bg-slate-50 py-2 px-4 rounded text-center border border-slate-100">Invoice Summary</h3>
        <div class="space-y-3 px-4">
          <div class="flex justify-between text-slate-600">
            <span>SUB TOTAL</span>
            <span>${{ originalSubtotal.toFixed(2) }}</span>
          </div>
          <div v-if="totalDiscountAmount > 0" class="flex justify-between text-red-500 font-medium">
            <span class="uppercase">Discount</span>
            <span>-${{ totalDiscountAmount.toFixed(2) }}</span>
          </div>
          <template v-if="orderStore.currentOrder.bulky_surcharge_total > 0">
            <div class="flex justify-between text-slate-600">
              <span>SHIPPING (BASE)</span>
              <span>{{ orderStore.currentOrder.base_shipping_cost > 0 ? '+$' + parseFloat(orderStore.currentOrder.base_shipping_cost).toFixed(2) : 'Free' }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>BULKY SURCHARGE</span>
              <span>+${{ parseFloat(orderStore.currentOrder.bulky_surcharge_total).toFixed(2) }}</span>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-between text-slate-600">
              <span>SHIPPING</span>
              <span>{{ orderStore.currentOrder.shipping_fee > 0 ? '+$' + parseFloat(orderStore.currentOrder.shipping_fee).toFixed(2) : 'Free' }}</span>
            </div>
          </template>
          <div class="flex justify-between font-bold text-slate-800 pt-3 border-t border-slate-200">
            <span>TOTAL</span>
            <span>${{ parseFloat(orderStore.currentOrder.grand_total).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
      This invoice was generated electronically by Ikit Computer Shop.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
}

const formatAddress = (order) => {
  if (!order) return ''
  let address = order.shipping_address || ''
  let zone = order.shippingZone?.name || order.shipping_zone?.name || order.city || ''
  if (zone && !address.toLowerCase().includes(zone.toLowerCase())) {
    address = address.replace(/,\s*$/, '')
    return `${address}, ${zone}`
  }
  return address
}

const originalSubtotal = computed(() => {
  if (!orderStore.currentOrder?.items) return 0
  return orderStore.currentOrder.items.reduce((sum, item) => {
    const originalPrice = parseFloat(item.product?.price || item.unit_price)
    return sum + (originalPrice * item.quantity)
  }, 0)
})

const totalDiscountAmount = computed(() => {
  if (!orderStore.currentOrder?.items) return 0
  const paidSubtotal = orderStore.currentOrder.items.reduce((sum, item) => sum + (parseFloat(item.unit_price) * item.quantity), 0)
  const itemDiscounts = originalSubtotal.value - paidSubtotal
  const orderDiscount = parseFloat(orderStore.currentOrder.discount_amount || 0)
  return itemDiscounts + orderDiscount
})
</script>