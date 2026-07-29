<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-6">
        <CheckoutAddress @update-address="handleAddressUpdate" />

        <!-- 🌟 កែប្រែ UI ផ្នែកជ្រើសរើសវិធីសាស្រ្តបង់ប្រាក់ -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div class="space-y-4">
            <!-- ជម្រើស COD -->
            <label 
              class="flex items-center p-4 border rounded-lg cursor-pointer transition-colors"
              :class="[
                !isPhnomPenh ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-blue-50',
                paymentMethod === 'CASH_ON_DELIVERY' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
              ]"
            >
              <input 
                type="radio" 
                v-model="paymentMethod" 
                value="CASH_ON_DELIVERY" 
                :disabled="!isPhnomPenh"
                class="mr-3 cursor-pointer disabled:cursor-not-allowed"
              >
              <div>
                <span class="font-bold block text-slate-800">💵 Cash On Delivery (COD)</span>
                <span v-if="!isPhnomPenh" class="text-xs text-red-500 font-medium">Available in Phnom Penh only</span>
                <span v-else class="text-xs text-slate-500">Pay when you receive the product</span>
              </div>
            </label>

            <!-- ជម្រើស Bank Transfer -->
            <label 
              class="flex items-center p-4 border rounded-lg cursor-pointer transition-colors"
              :class="paymentMethod === 'BANK_TRANSFER' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-blue-50'"
            >
              <input type="radio" v-model="paymentMethod" value="BANK_TRANSFER" class="mr-3 cursor-pointer">
              <div>
                <span class="font-bold block text-slate-800">🏦 Bank Transfer (KHQR)</span>
                <span class="text-xs text-slate-500">Scan QR Code and upload receipt on the next step</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4">
        <CheckoutSummary
          :is-address-valid="isAddressValid"
          :shipping-fee="shippingFee"
          @submit-order="processCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckoutAddress from '@/components/checkout/CheckoutAddress.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'
import { useAddressStore } from '@/stores/addressStore'
import { useOrderStore } from '@/stores/orderStore'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const addressStore = useAddressStore()
const orderStore = useOrderStore()

const isAddressValid = ref(false)
const checkoutAddressData = ref(null)
const shippingFee = ref(0)

// 🌟 State ថ្មីសម្រាប់វិធីបង់ប្រាក់
const paymentMethod = ref('CASH_ON_DELIVERY')

// 🌟 គណនាថាតើជាខេត្តភ្នំពេញឬអត់
const isPhnomPenh = computed(() => {
  const city = checkoutAddressData.value?.city || ''
  return city.toLowerCase() === 'phnom penh'
})

onMounted(() => {
  addressStore.fetchAddresses()
})

const handleAddressUpdate = (payload) => {
  isAddressValid.value = payload.isValid
  checkoutAddressData.value = payload.data

  let city = payload.data?.city || ''

  if (city.toLowerCase() === 'phnom penh') {
    shippingFee.value = 2.0
  } else if (city) {
    shippingFee.value = 2.5
    // 🌟 បើមិនមែនភ្នំពេញ បង្ខំឱ្យដូរទៅ Bank Transfer
    paymentMethod.value = 'BANK_TRANSFER'
  } else {
    shippingFee.value = 0
  }
}

// មុខងារពេលចុចប៊ូតុង Place Order
const processCheckout = async () => {
  if (!isAddressValid.value || !checkoutAddressData.value) return

  try {
    const addrData = checkoutAddressData.value

    if (addrData.is_new && addrData.save_to_db) {
      await addressStore.createNewAddress({
        ...addrData.raw_form,
        is_default: true,
      })
    }

    // 🌟 កន្លែងដែលត្រូវកែប្រែ 🌟
    const orderPayload = {
      shipping_name: addrData.shipping_name,
      shipping_phone: addrData.shipping_phone,
      city: addrData.city,
      shipping_address: addrData.shipping_address,
      
      payment_method: paymentMethod.value, 
    }

    const result = await orderStore.placeOrder(orderPayload)

    // លុបទិន្នន័យ Draft ចោលពេល Order ជោគជ័យ
    localStorage.removeItem('checkout_draft')

    router.push(`/checkout/success?order_id=${result.order_id}`)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Checkout Failed',
      text: orderStore.error || 'Something went wrong.',
    })
    console.error('Checkout failed:', error)
  }
}
</script>