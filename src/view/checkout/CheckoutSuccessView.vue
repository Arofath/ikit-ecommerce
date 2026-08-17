<template>
  <div class="max-w-4xl mx-auto px-4 py-10 relative">
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

    <!-- កន្លែង Upload Receipt (Keep existing code) -->
    <div
      v-if="orderStore.currentOrder && orderStore.currentOrder.payment_method === 'BANK_TRANSFER'"
      class="mb-8 p-6 sm:p-8 bg-blue-50 border border-blue-100 rounded-xl print:hidden flex flex-col md:flex-row gap-8 items-start"
    >
      <!-- បង្ហាញ KHQR សម្រាប់ស្កេន -->
      <div class="w-full md:w-1/3 flex flex-col items-center text-center">
        <h3 class="font-bold text-slate-800 mb-2">1. Scan to Pay</h3>
        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-3 inline-block">
          <img src="/src/assets/images/qrcode.jpg" alt="KHQR" class="w-40 h-40 object-cover" />
        </div>
        <p class="text-sm font-bold text-blue-600">
          Total: ${{ parseFloat(orderStore.currentOrder.grand_total).toFixed(2) }}
        </p>
      </div>

      <!-- កន្លែង Upload ឯកសារ -->
      <div class="w-full md:w-2/3">
        <h3 class="font-bold text-slate-800 mb-2">2. Upload Payment Receipt</h3>
        <p class="text-sm text-slate-600 mb-4">
          Please upload a screenshot of your successful transaction to complete your order.
        </p>

        <div
          v-if="orderStore.currentOrder.payment_status === 'INVALID_RECEIPT'"
          class="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm"
        >
          <h4 class="text-red-700 font-bold flex items-center gap-2 mb-1.5">
            <i class="fas fa-exclamation-triangle"></i> Payment Rejected
          </h4>
          <p class="text-sm text-red-600 leading-relaxed">
            <span class="font-semibold">Reason:</span>
            {{
              orderStore.currentOrder.payment_note ||
              'Your receipt was rejected. Please check and upload a valid one.'
            }}
          </p>
        </div>

        <div
          v-if="
            orderStore.currentOrder.payment_receipt &&
            orderStore.currentOrder.payment_status !== 'INVALID_RECEIPT'
          "
          class="bg-white p-4 rounded-lg border border-emerald-200 flex items-start gap-4"
        >
          <a :href="orderStore.currentOrder.payment_receipt" target="_blank" class="shrink-0">
            <img
              :src="orderStore.currentOrder.payment_receipt"
              class="w-20 h-20 object-cover rounded shadow-sm border hover:opacity-80 transition"
            />
          </a>
          <div>
            <p class="text-emerald-600 font-bold flex items-center gap-1">
              <i class="fas fa-check-circle"></i> Receipt Uploaded
            </p>
            <p class="text-sm text-slate-500 mt-1">
              We are verifying your payment. Your order will be processed shortly.
            </p>
          </div>
        </div>

        <div v-else>
          <div v-if="previewUrl" class="mb-4 relative inline-block">
            <div class="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <img
                :src="previewUrl"
                alt="Receipt Preview"
                class="max-h-48 rounded object-contain"
              />
            </div>
            <button
              @click="clearSelection"
              class="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 shadow-md cursor-pointer transition-transform hover:scale-110"
              title="Remove image"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="file"
              ref="fileInputRef"
              @change="handleFileSelect"
              accept="image/png, image/jpeg, image/jpg"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer bg-white border border-slate-200 rounded-lg"
              :disabled="orderStore.isProcessing"
            />
            <button
              @click="submitReceipt"
              :disabled="!selectedFile || orderStore.isProcessing"
              class="px-8 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <i v-if="orderStore.isProcessing" class="fas fa-spinner fa-spin"></i>
              <span v-else>Upload</span>
            </button>
          </div>
          <p class="text-xs text-slate-400 mt-2">Accepted formats: JPG, PNG. Max size: 5MB.</p>
        </div>
      </div>
    </div>

    <div v-if="orderStore.currentOrder && canEditAddress" class="mb-4 flex justify-end print:hidden">
      <button
        @click="openEditModal"
        class="px-6 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-bold hover:bg-blue-100 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
      >
        <i class="fas fa-map-marker-alt text-blue-600"></i> Edit Shipping Address
      </button>
    </div>

    <!-- Invoice Content -->
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
          <p class="text-slate-600 max-w-62.5 sm:ml-auto whitespace-pre-line">
            {{ formatAddress(orderStore.currentOrder) }}
          </p>
          <p class="text-slate-600">{{ orderStore.currentOrder.shipping_phone }}</p>
        </div>
      </div>

      <!-- Keep existing Invoice details (Items, Summary, etc.) -->
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
                :class="{
                  'text-emerald-600': orderStore.currentOrder.payment_status === 'PAID',
                  'text-amber-600': orderStore.currentOrder.payment_status === 'UNPAID',
                  'text-red-600': orderStore.currentOrder.payment_status === 'INVALID_RECEIPT',
                }"
                >{{ orderStore.currentOrder.payment_status }}</strong
              >
            </p>
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

            <!-- បង្ហាញជួរ DISCOUNT ពណ៌ក្រហម ប្រសិនបើមានការចុះថ្លៃ -->
            <div
              v-if="totalDiscountAmount > 0"
              class="flex justify-between text-red-500 font-medium"
            >
              <span class="uppercase">Discount</span>
              <span>-${{ totalDiscountAmount.toFixed(2) }}</span>
            </div>

            <template v-if="orderStore.currentOrder.bulky_surcharge_total > 0">
              <div class="flex justify-between text-slate-600">
                <span>SHIPPING (BASE)</span>
                <span>{{
                  orderStore.currentOrder.base_shipping_cost > 0
                    ? '+$' + parseFloat(orderStore.currentOrder.base_shipping_cost).toFixed(2)
                    : 'Free'
                }}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>BULKY SURCHARGE</span>
                <span
                  >+${{
                    parseFloat(orderStore.currentOrder.bulky_surcharge_total).toFixed(2)
                  }}</span
                >
              </div>
            </template>
            <template v-else>
              <div class="flex justify-between text-slate-600">
                <span>SHIPPING</span>
                <span>{{
                  orderStore.currentOrder.shipping_fee > 0
                    ? '+$' + parseFloat(orderStore.currentOrder.shipping_fee).toFixed(2)
                    : 'Free'
                }}</span>
              </div>
            </template>

            <div
              class="flex justify-between font-bold text-slate-800 pt-3 border-t border-slate-200"
            >
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

    <div v-else-if="orderStore.isLoading" class="text-center py-32 text-slate-500">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
      <p>Generating your invoice...</p>
    </div>

    <!-- 🌟 MODAL EDIT ADDRESS 🌟 -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-100 flex items-center justify-center print:hidden"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeEditModal"></div>

      <!-- Modal Content -->
      <div
        class="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in-up"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"
        >
          <h3 class="text-lg font-bold text-slate-800">Edit Shipping Address</h3>
          <button
            @click="closeEditModal"
            class="text-slate-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 cursor-pointer"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Body Form -->
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Receiver Name *</label>
              <input
                v-model="editForm.shipping_name"
                type="text"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
              <input
                v-model="editForm.shipping_phone"
                type="text"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <!-- Zone Dropdown (Locked if PAID) -->
          <div class="relative">
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >City / Province (Shipping Zone) *</label
            >
            <div
              class="w-full px-3 py-2 border rounded-lg flex justify-between items-center transition-colors"
              :class="
                isPaid
                  ? 'bg-slate-100 border-slate-200 cursor-not-allowed text-slate-500'
                  : 'bg-white border-slate-300 cursor-pointer hover:border-blue-500'
              "
              @click="!isPaid ? (isDropdownOpen = !isDropdownOpen) : null"
            >
              <span>{{ selectedEditZoneName || 'Select Shipping Zone' }}</span>
              <i v-if="!isPaid" class="fas fa-chevron-down text-slate-400 text-xs"></i>
              <i
                v-else
                class="fas fa-lock text-slate-400 text-xs"
                title="Locked due to payment"
              ></i>
            </div>

            <p v-if="isPaid" class="text-xs text-amber-600 mt-1.5 flex items-start gap-1">
              <i class="fas fa-info-circle mt-0.5"></i>
              Cannot change province/city because this order is already paid. Please contact support
              if needed.
            </p>

            <!-- Dropdown List -->
            <div
              v-if="isDropdownOpen && !isPaid"
              class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
            >
              <div class="p-2 border-b border-slate-100 bg-slate-50">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search zone..."
                  class="w-full px-3 py-1.5 border border-slate-200 rounded text-sm outline-none"
                  autofocus
                />
              </div>
              <ul class="max-h-48 overflow-y-auto py-1">
                <li v-if="isLoadingZones" class="px-4 py-2 text-sm text-center text-slate-500">
                  <i class="fas fa-spinner fa-spin"></i>
                </li>
                <li
                  v-else-if="filteredZones.length === 0"
                  class="px-4 py-2 text-sm text-center text-slate-500"
                >
                  No zone found
                </li>
                <li
                  v-else
                  v-for="zone in filteredZones"
                  :key="zone.id"
                  @click="selectEditZone(zone)"
                  class="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                  :class="{
                    'bg-blue-50 font-bold text-blue-700': editForm.shipping_zone_id === zone.id,
                  }"
                >
                  {{ zone.name }}
                </li>
              </ul>
            </div>
            <div
              v-if="isDropdownOpen && !isPaid"
              @click="isDropdownOpen = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Address Details *</label>
            <textarea
              v-model="editForm.shipping_address"
              rows="3"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="House #, Street..."
            ></textarea>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            @click="closeEditModal"
            class="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            :disabled="isSavingAddress"
          >
            Cancel
          </button>
          <button
            @click="submitAddressUpdate"
            class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            :disabled="isSavingAddress || !isFormValid"
          >
            <i v-if="isSavingAddress" class="fas fa-spinner fa-spin"></i>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shippingZoneService } from '@/services/shippingZone.service'
import { useOrderStore } from '@/stores/orderStore'
import Swal from 'sweetalert2'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderStore = useOrderStore()

const fileInputRef = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)

// 🌟 Modal Edit States 🌟
const showEditModal = ref(false)
const isSavingAddress = ref(false)
const shippingZones = ref([])
const isLoadingZones = ref(false)
const isDropdownOpen = ref(false)
const searchQuery = ref('')

const editForm = reactive({
  shipping_name: '',
  shipping_phone: '',
  shipping_address: '',
  shipping_zone_id: '',
})

onMounted(async () => {
  const orderId = route.query.order_id
  if (orderId) {
    await orderStore.fetchOrderDetail(orderId)
  }
})

// 🌟 Check if order is eligible for editing 🌟
const canEditAddress = computed(() => {
  const order = orderStore.currentOrder
  if (!order) return false
  return ['PENDING', 'PROCESSING'].includes(order.status)
})

const isPaid = computed(() => {
  return orderStore.currentOrder?.payment_status === 'PAID'
})

// 🌟 Fetch Zones for Dropdown 🌟
const fetchZones = async () => {
  if (shippingZones.value.length > 0) return
  try {
    isLoadingZones.value = true
    const response = await shippingZoneService.getAllZones()
    shippingZones.value = (response.data.data || response.data).filter((z) => z.is_active)
  } catch (error) {
    console.error('Failed to fetch zones', error)
  } finally {
    isLoadingZones.value = false
  }
}

// 🌟 Modal Functions 🌟
const openEditModal = async () => {
  const order = orderStore.currentOrder
  if (!order) return

  editForm.shipping_name = order.shipping_name
  editForm.shipping_phone = order.shipping_phone

  // Extract detail from full string if it includes the zone name.
  // We rely on backend validation, but for frontend display, we just show raw address detail.
  // Assuming 'shipping_address' in Order holds the raw detail. If it holds full string, we might need to split it.
  // For simplicity, assigning the raw string from backend.
  editForm.shipping_address = order.shipping_address
  editForm.shipping_zone_id =
    order.shipping_zone_id || order.shippingZone?.id || order.shipping_zone?.id

  showEditModal.value = true
  await fetchZones()
}

const closeEditModal = () => {
  if (isSavingAddress.value) return
  showEditModal.value = false
  isDropdownOpen.value = false
}

const selectedEditZoneName = computed(() => {
  const zone = shippingZones.value.find((z) => z.id === editForm.shipping_zone_id)
  return zone ? zone.name : ''
})

const filteredZones = computed(() => {
  if (!searchQuery.value) return shippingZones.value
  const q = searchQuery.value.toLowerCase()
  return shippingZones.value.filter((z) => z.name.toLowerCase().includes(q))
})

const selectEditZone = (zone) => {
  editForm.shipping_zone_id = zone.id
  isDropdownOpen.value = false
  searchQuery.value = ''
}

const isFormValid = computed(() => {
  return (
    editForm.shipping_name &&
    editForm.shipping_phone &&
    editForm.shipping_address &&
    editForm.shipping_zone_id
  )
})

const submitAddressUpdate = async () => {
  isSavingAddress.value = true

  // Call Store Action
  const result = await orderStore.updateOrderAddress(orderStore.currentOrder.id, editForm)

  isSavingAddress.value = false

  if (result.success) {
    closeEditModal()
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Address Updated',
      text: 'Shipping details and fees have been recalculated.',
      showConfirmButton: false,
      timer: 3000,
    })
  } else {
    Swal.fire('Error', result.error || 'Failed to update address', 'error')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
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
    // យកតម្លៃដើមមុនបញ្ចុះ (Product Price) មកបូកបញ្ចូលគ្នា
    const originalPrice = parseFloat(item.product?.price || item.unit_price)
    return sum + originalPrice * item.quantity
  }, 0)
})

const totalDiscountAmount = computed(() => {
  if (!orderStore.currentOrder?.items) return 0

  // ១. គណនាតម្លៃដែលអតិថិជនបានទិញជាក់ស្តែង (Paid Subtotal) ចេញពី Items
  const paidSubtotal = orderStore.currentOrder.items.reduce((sum, item) => {
    return sum + parseFloat(item.unit_price) * item.quantity
  }, 0)

  // ២. យកតម្លៃដើម (១៩$) ដក តម្លៃជាក់ស្តែង (១៧.១០$) = ទឹកប្រាក់ Discount ពីទំនិញ
  const itemDiscounts = originalSubtotal.value - paidSubtotal

  // ៣. បូកបន្ថែមជាមួយការបញ្ចុះតម្លៃលើវិក្កយបត្រ (បើសិនជាមានគូប៉ុង)
  const orderDiscount = parseFloat(orderStore.currentOrder.discount_amount || 0)

  return itemDiscounts + orderDiscount
})

const clearSelection = () => {
  selectedFile.value = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) {
    clearSelection()
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    Swal.fire('File Too Large', 'Please select an image smaller than 5MB.', 'warning')
    clearSelection()
    return
  }

  selectedFile.value = file

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = URL.createObjectURL(file)
}

const submitReceipt = async () => {
  if (!selectedFile.value || !orderStore.currentOrder) return

  try {
    await orderStore.uploadReceipt(orderStore.currentOrder.id, selectedFile.value)

    if (orderStore.currentOrder) {
      orderStore.currentOrder.payment_status = 'UNPAID'
      orderStore.currentOrder.payment_note = null
    }

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Receipt uploaded successfully!',
      showConfirmButton: false,
      timer: 2000,
    })

    clearSelection()
  } catch (error) {
    Swal.fire('Upload Failed', orderStore.error || 'Could not upload receipt.', 'error')
    console.error(error)
  }
}

const printInvoice = () => {
  window.print()
}
</script>

<style scoped>
@media print {
  @page {
    size: A4 portrait;
    margin: 10mm;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body * {
    visibility: hidden;
  }

  #invoice-content,
  #invoice-content * {
    visibility: visible;
  }

  #invoice-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0 !important;
    padding: 10px !important;
    box-shadow: none !important;
    border: none !important;
    page-break-inside: avoid;
  }

  .print\:hidden {
    display: none !important;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
