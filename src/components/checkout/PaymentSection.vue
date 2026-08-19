<template>
  <div>
    <!-- ======================================================
         KHQR Payment
    ======================================================= -->
    <div
      v-if="isKHQR"
      class="mb-8 p-6 sm:p-8 bg-blue-50 border border-blue-100 rounded-xl print:hidden"
    >
      <div class="flex flex-col md:flex-row gap-8 items-start">

        <!-- ==================================================
             1. Scan to Pay (UX/UI ថ្មី)
        =================================================== -->
        <div v-if="!isPaymentPaid" class="w-full md:w-5/12 flex flex-col items-center">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full flex flex-col items-center relative overflow-hidden">
            
            <!-- Amount Badge -->
            <div class="bg-blue-600 text-white w-full text-center py-3 px-4 rounded-xl mb-6 shadow-md shadow-blue-200">
              <p class="text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">Total Amount</p>
              <p class="text-2xl font-black">{{ formatAmount(qrData?.amount) }} <span class="text-lg font-bold">{{ qrData?.currency || 'USD' }}</span></p>
            </div>

            <!-- QR Generated -->
            <div v-if="qrData" class="flex flex-col items-center w-full">
              <div class="p-2 border-2 border-slate-100 rounded-2xl bg-white mb-4 relative">
                <img :src="qrImage" alt="KHQR" class="w-48 h-48 object-cover rounded-xl" />
              </div>

              <!-- Countdown Timer -->
              <div v-if="qrData.expiresAt" class="w-full text-center">
                <div v-if="!isQRExpired" class="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-bold text-sm border border-orange-100">
                  <i class="fas fa-clock animate-pulse"></i>
                  <span>Expires in {{ timeRemaining }}</span>
                </div>

                <div v-else class="w-full flex flex-col items-center">
                  <div class="text-red-500 font-bold text-sm mb-3 flex items-center gap-2">
                    <i class="fas fa-exclamation-circle"></i> QR Code Expired
                  </div>
                  <button @click="generateNewQR" :disabled="isGeneratingQR" class="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-bold transition flex justify-center items-center gap-2 cursor-pointer">
                    <i v-if="isGeneratingQR" class="fas fa-spinner fa-spin"></i>
                    <i v-else class="fas fa-sync-alt"></i>
                    <span>Generate New QR</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Generate QR Button (First Time) -->
            <div v-else class="w-full">
              <button @click="generateQR" :disabled="isGeneratingQR" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-blue-200">
                <i v-if="isGeneratingQR" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-qrcode text-xl"></i>
                <span>Generate KHQR Code</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ==================================================
             2. Payment Status (UX/UI ថ្មី)
        =================================================== -->
        <div :class="isPaymentPaid ? 'w-full' : 'w-full md:w-7/12'">
          
          <!-- Payment Completed -->
          <div v-if="isPaymentPaid" class="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 shadow-sm">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mb-4 shadow-lg shadow-emerald-200">
                <i class="fas fa-check text-4xl"></i>
              </div>
              <h3 class="font-black text-emerald-800 text-2xl mb-2">Payment Successful!</h3>
              <p class="text-emerald-700 font-medium">Thank you! Your payment has been verified. Your order is now processing.</p>
              <!-- <div v-if="paymentResult?.transaction?.hash || orderStore.currentOrder?.payment?.transaction_hash" class="mt-6 bg-white px-4 py-3 rounded-xl border border-emerald-100 text-sm text-emerald-600 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="font-bold">TXN:</span> {{ paymentResult?.transaction?.hash || orderStore.currentOrder?.payment?.transaction_hash }}
              </div> -->
            </div>
          </div>

          <!-- Waiting For Payment (Active Scan State) -->
          <div v-else-if="qrData && !isQRExpired" class="h-full flex flex-col justify-center px-4 py-6 md:py-0">
            <div class="flex items-start gap-5 mb-8">
              <!-- Animated Icon -->
              <div class="relative flex h-14 w-14 shrink-0">
                <span v-if="!isCheckingPayment" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
                <div class="relative inline-flex rounded-full h-14 w-14 bg-white border-2 border-blue-100 text-blue-600 items-center justify-center text-2xl shadow-sm">
                  <i class="fas fa-mobile-alt"></i>
                </div>
              </div>
              <div>
                <h3 class="font-black text-slate-800 text-xl mb-1">Awaiting Payment</h3>
                <p class="text-slate-500 leading-relaxed">Open your Bakong or supported banking app, scan the KHQR code, and complete the transfer.</p>
              </div>
            </div>

            <!-- Auto Polling Status Box -->
            <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div class="flex items-center gap-3 text-sm font-semibold" :class="isCheckingPayment ? 'text-blue-600' : 'text-slate-600'">
                <i class="fas fa-sync-alt" :class="{'fa-spin text-blue-600': isCheckingPayment}"></i>
                <span>{{ isCheckingPayment ? 'Verifying payment...' : (retryAfterSeconds > 0 ? `Auto-check in ${retryAfterSeconds}s` : 'Waiting to verify...') }}</span>
              </div>
              
              <!-- Manual Check (Demoted to Text Link) -->
              <button @click="checkPaymentNow" :disabled="isCheckingPayment || !qrData?.paymentId" class="text-xs font-bold text-blue-600 hover:text-blue-800 underline transition cursor-pointer disabled:text-slate-400 disabled:no-underline">
                Verify Now
              </button>
            </div>
            
            <p v-if="paymentError" class="mt-4 text-xs font-bold text-red-500 text-center bg-red-50 py-2 rounded-lg border border-red-100">
              <i class="fas fa-exclamation-triangle mr-1"></i> {{ paymentError }}
            </p>
          </div>
          
          <!-- State មុនពេលចុច Generate -->
          <div v-else-if="!qrData" class="h-full flex flex-col justify-center items-center text-center opacity-50 px-4">
            <i class="fas fa-qrcode text-6xl text-slate-300 mb-4"></i>
            <h3 class="font-bold text-slate-500 text-lg">Generate QR to proceed</h3>
            <p class="text-sm text-slate-400 mt-2">Click the button on the left to get your unique KHQR code for this order.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================
         COD Payment
    ======================================================= -->
    <div
      v-else-if="orderStore.currentOrder?.payment_method === 'CASH_ON_DELIVERY'"
      class="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-xl print:hidden flex gap-4 items-center"
    >
      <i class="fas fa-money-bill-wave text-emerald-600 text-3xl"></i>
      <div>
        <h3 class="font-bold text-emerald-800">Cash on Delivery (COD)</h3>
        <p class="text-sm text-emerald-700 mt-1">
          Please prepare the payment when your order is delivered to your address.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from 'vue'

import { useOrderStore } from '@/stores/orderStore'
import khqrService from '@/services/khqr.service'
import Swal from 'sweetalert2'

const orderStore = useOrderStore()

// ======================================================
// State
// ======================================================
const qrData = ref(null)
const isGeneratingQR = ref(false)
const isCheckingPayment = ref(false)
const paymentResult = ref(null)
const paymentError = ref('')
const currentTime = ref(Date.now())
const lastCheckedAt = ref(null)
const retryAfterSeconds = ref(0)

// Timers
let expirationTimer = null
let paymentCheckTimer = null
let retryCountdownTimer = null

// ======================================================
// Computed
// ======================================================
const isKHQR = computed(() => {
  return orderStore.currentOrder?.payment_method === 'KHQR'
})

const isQRExpired = computed(() => {
  if (!qrData.value?.expiresAt) {
    return false
  }
  return new Date(qrData.value.expiresAt).getTime() <= currentTime.value
})

const isPaymentPaid = computed(() => {
  return (
    paymentResult.value?.paid === true ||
    orderStore.currentOrder?.payment_status === 'PAID' ||
    orderStore.currentOrder?.payment_status === 'COMPLETED'
  )
})

const qrImage = computed(() => {
  if (!qrData.value?.qr) return ''
  return `https://quickchart.io/qr?text=${encodeURIComponent(qrData.value.qr)}&size=300`
})

// ======================================================
// 🌟 ថ្មី៖ Computed សម្រាប់ Countdown Timer (MM:SS)
// ======================================================
const timeRemaining = computed(() => {
  if (!qrData.value?.expiresAt) return '00:00'
  
  const diff = new Date(qrData.value.expiresAt).getTime() - currentTime.value
  
  if (diff <= 0) return '00:00'
  
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// ======================================================
// Format Amount & Date
// ======================================================
const formatAmount = (amount) => {
  const value = Number(amount)
  if (!Number.isFinite(value)) return '0.00'
  return value.toFixed(2) // ដកសញ្ញា $ ចេញ ព្រោះយើងដាក់ currency ពីក្រោយហើយ
}

// const formatDateTime = (dateString) => {
//   if (!dateString) return ''
//   const date = new Date(dateString)
//   if (Number.isNaN(date.getTime())) return ''
//   return date.toLocaleString()
// }

// ======================================================
// Timers Logic
// ======================================================
const startExpirationTimer = () => {
  stopExpirationTimer()
  expirationTimer = setInterval(() => {
    currentTime.value = Date.now()
    if (isQRExpired.value) {
      stopPaymentPolling()
    }
  }, 1000)
}

const stopExpirationTimer = () => {
  if (expirationTimer) {
    clearInterval(expirationTimer)
    expirationTimer = null
  }
}

const startRetryCountdown = (seconds) => {
  stopRetryCountdown()
  retryAfterSeconds.value = Math.max(0, Number(seconds) || 0)
  if (retryAfterSeconds.value <= 0) return

  retryCountdownTimer = setInterval(() => {
    if (retryAfterSeconds.value > 0) {
      retryAfterSeconds.value--
    }
    if (retryAfterSeconds.value <= 0) {
      stopRetryCountdown()
    }
  }, 1000)
}

const stopRetryCountdown = () => {
  if (retryCountdownTimer) {
    clearInterval(retryCountdownTimer)
    retryCountdownTimer = null
  }
  retryAfterSeconds.value = 0
}

const stopPaymentPolling = () => {
  if (paymentCheckTimer) {
    clearInterval(paymentCheckTimer)
    paymentCheckTimer = null
  }
  stopRetryCountdown()
}

const startPaymentPolling = () => {
  stopPaymentPolling()
  if (!qrData.value?.paymentId || isQRExpired.value) return

  checkPaymentNow()

  paymentCheckTimer = setInterval(() => {
    if (isPaymentPaid.value || isQRExpired.value) {
      stopPaymentPolling()
      return
    }
    checkPaymentNow()
  }, 30 * 1000)
}

// ======================================================
// Actions
// ======================================================
const generateQR = async () => {
  if (!orderStore.currentOrder?.id || isGeneratingQR.value) return

  isGeneratingQR.value = true
  paymentError.value = ''
  paymentResult.value = null
  stopPaymentPolling()

  try {
    const response = await khqrService.generateKHQR(orderStore.currentOrder.id)

    if (!response.data?.success || !response.data?.data) {
      throw new Error(response.data?.message || 'Failed to generate KHQR')
    }

    qrData.value = response.data.data
    currentTime.value = Date.now()
    startExpirationTimer()
    startPaymentPolling()
  } catch (err) {
    console.error('Generate KHQR Error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Unable to Generate QR',
      text: err.response?.data?.message || err.message || 'Failed to generate KHQR.',
    })
  } finally {
    isGeneratingQR.value = false
  }
}

const generateNewQR = async () => {
  stopPaymentPolling()
  paymentResult.value = null
  paymentError.value = ''
  lastCheckedAt.value = null
  qrData.value = null
  currentTime.value = Date.now()
  await generateQR()
}

const checkPaymentNow = async () => {
  if (isCheckingPayment.value || !qrData.value?.paymentId) return

  if (isQRExpired.value) {
    stopPaymentPolling()
    paymentResult.value = { paid: false, expired: true }
    return
  }

  isCheckingPayment.value = true
  paymentError.value = ''

  try {
    const paymentId = qrData.value.paymentId
    const response = await khqrService.checkPayment(paymentId)
    const result = response.data

    lastCheckedAt.value = new Date()

    if (!result?.success) {
      throw new Error(result?.message || 'Failed to check payment.')
    }

    paymentResult.value = result

    if (result.paid === true) {
      stopPaymentPolling()
      orderStore.currentOrder.payment_status = 'PAID'
      if (orderStore.currentOrder.payment) {
        orderStore.currentOrder.payment.status = 'COMPLETED'
      }

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your payment has been verified successfully.',
        confirmButtonText: 'OK',
      })

      if (orderStore.currentOrder?.id && typeof orderStore.fetchOrderDetail === 'function') {
        try {
          await orderStore.fetchOrderDetail(orderStore.currentOrder.id)
        } catch (refreshError) {
          console.warn('Failed to refresh order:', refreshError)
        }
      }
      return
    }

    if (result.expired === true) {
      stopPaymentPolling()
      return
    }

    if (result.skipped === true) {
      const retrySeconds = Number(result.retryAfterSeconds) || 30
      startRetryCountdown(retrySeconds)
      return
    }

    startRetryCountdown(30)
  } catch (err) {
    console.error('Check Payment Error:', err)
    const status = err.response?.status
    const message = err.response?.data?.message || err.message || 'Failed to check payment.'
    paymentError.value = message

    if (status === 404) stopPaymentPolling()
  } finally {
    isCheckingPayment.value = false
  }
}

// ======================================================
// Lifecycle
// ======================================================
onMounted(() => {
  currentTime.value = Date.now()
  if (isKHQR.value) startExpirationTimer()
})

onUnmounted(() => {
  stopExpirationTimer()
  stopPaymentPolling()
})
</script>