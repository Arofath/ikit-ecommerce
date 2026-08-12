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

    <!-- កន្លែង Upload Receipt -->
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
        <p class="text-sm font-bold text-blue-600">Total: ${{ parseFloat(orderStore.currentOrder.grand_total).toFixed(2) }}</p>
      </div>

      <!-- កន្លែង Upload ឯកសារ -->
      <div class="w-full md:w-2/3">
        <h3 class="font-bold text-slate-800 mb-2">2. Upload Payment Receipt</h3>
        <p class="text-sm text-slate-600 mb-4">Please upload a screenshot of your successful transaction to complete your order.</p>

        <!-- 🌟 បង្ហាញសារព្រមានពណ៌ក្រហម ប្រសិនបើ Admin បាន Reject វិក្កយបត្រនេះ 🌟 -->
        <div v-if="orderStore.currentOrder.payment_status === 'INVALID_RECEIPT'" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <h4 class="text-red-700 font-bold flex items-center gap-2 mb-1.5">
            <i class="fas fa-exclamation-triangle"></i> Payment Rejected
          </h4>
          <p class="text-sm text-red-600 leading-relaxed">
            <span class="font-semibold">Reason:</span> {{ orderStore.currentOrder.payment_note || 'Your receipt was rejected. Please check and upload a valid one.' }}
          </p>
        </div>

        <!-- 🌟 បង្ហាញរូបភាពដែល Upload រួច (លុះត្រាតែមានរូបភាព ហើយមិនមែនស្ថិតក្នុងស្ថានភាព INVALID_RECEIPT) 🌟 -->
        <div v-if="orderStore.currentOrder.payment_receipt && orderStore.currentOrder.payment_status !== 'INVALID_RECEIPT'" class="bg-white p-4 rounded-lg border border-emerald-200 flex items-start gap-4">
          <a :href="orderStore.currentOrder.payment_receipt" target="_blank" class="shrink-0">
            <img :src="orderStore.currentOrder.payment_receipt" class="w-20 h-20 object-cover rounded shadow-sm border hover:opacity-80 transition" />
          </a>
          <div>
            <p class="text-emerald-600 font-bold flex items-center gap-1"><i class="fas fa-check-circle"></i> Receipt Uploaded</p>
            <p class="text-sm text-slate-500 mt-1">We are verifying your payment. Your order will be processed shortly.</p>
          </div>
        </div>

        <!-- 🌟 ផ្ទាំង Upload ថ្មី (បង្ហាញពេលមិនទាន់មានរូបភាព ឬពេល Admin Reject) 🌟 -->
        <div v-else>
          <!-- កន្លែងបង្ហាញ Preview រូបភាព -->
          <div v-if="previewUrl" class="mb-4 relative inline-block">
            <div class="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <img :src="previewUrl" alt="Receipt Preview" class="max-h-48 rounded object-contain" />
            </div>
            <!-- ប៊ូតុងខ្វែង (X) សម្រាប់លុបរូបចោលបើជ្រើសរើសខុស -->
            <button 
              @click="clearSelection" 
              class="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 shadow-md cursor-pointer transition-transform hover:scale-110"
              title="Remove image"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <!-- Input File និង ប៊ូតុង Upload -->
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
          <p class="text-slate-600 max-w-62.5 sm:ml-auto">
            {{ orderStore.currentOrder.shipping_address }}
            <!-- 🌟 បន្ថែមទីតាំង Zone ឬ City ចូលក្នុងវិក្កយបត្រ (Backward Compatibility) 🌟 -->
            <template v-if="orderStore.currentOrder.shipping_zone?.name || orderStore.currentOrder.city">
              , {{ orderStore.currentOrder.shipping_zone?.name || orderStore.currentOrder.city }}
            </template>
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
                :class="{
                  'text-emerald-600': orderStore.currentOrder.payment_status === 'PAID',
                  'text-amber-600': orderStore.currentOrder.payment_status === 'UNPAID',
                  'text-red-600': orderStore.currentOrder.payment_status === 'INVALID_RECEIPT'
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

            <div
              v-if="totalDiscountAmount > 0"
              class="flex justify-between text-red-500 font-medium"
            >
              <span>DISCOUNT</span>
              <span>-${{ totalDiscountAmount.toFixed(2) }}</span>
            </div>

            <!-- 🌟 បំបែកថ្លៃដឹកជញ្ជូន (Base & Surcharge) ក្នុងករណីមានអីវ៉ាន់ធំ 🌟 -->
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
            <!-- 🌟 រក្សាទម្រង់ចាស់សម្រាប់វិក្កយបត្រចាស់ៗ ឬគ្មានអីវ៉ាន់ធំ 🌟 -->
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
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import Swal from 'sweetalert2'

const route = useRoute()
const orderStore = useOrderStore()

const fileInputRef = ref(null) 
const selectedFile = ref(null)
const previewUrl = ref(null)   

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
    const originalPrice = item.product?.price || item.unit_price
    return sum + originalPrice * item.quantity
  }, 0)
})

const totalDiscountAmount = computed(() => {
  if (!orderStore.currentOrder) return 0
  return originalSubtotal.value - orderStore.currentOrder.subtotal
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
    
    // 🌟 បន្ទាប់ពី Upload ថ្មីជោគជ័យ យើងប្តូរ Status ក្នុង Frontend មកជា UNPAID ជាបណ្ដោះអាសន្ន 
    // ដើម្បីកុំឱ្យវានៅលោតផ្ទាំង Reject ទារឱ្យ Upload សារជាថ្មីទៀត
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
      timer: 2000
    })
    
    clearSelection() 
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    Swal.fire('Upload Failed', orderStore.error || 'Could not upload receipt.', 'error')
  }
}

const printInvoice = () => {
  window.print()
}
</script>

<style>
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
</style>