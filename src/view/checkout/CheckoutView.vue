<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-8 space-y-6">
        
        <CheckoutAddress @update-address="handleAddressUpdate" />

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          <div class="border-2 border-blue-500 bg-blue-50 p-4 rounded-lg">
            <p class="font-bold">💵 Cash On Delivery (COD)</p>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CheckoutAddress from '@/components/checkout/CheckoutAddress.vue';
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'; // 🌟 Import Component ថ្មី
import { useAddressStore } from '@/stores/addressStore';
import { useOrderStore } from '@/stores/orderStore';

const router = useRouter();
const addressStore = useAddressStore();
const orderStore = useOrderStore();

const isAddressValid = ref(false);
const checkoutAddressData = ref(null);
const shippingFee = ref(0);

onMounted(() => {
  addressStore.fetchAddresses(); 
});

const handleAddressUpdate = (payload) => {
  isAddressValid.value = payload.isValid;
  checkoutAddressData.value = payload.data;

  // 🌟 គណនាថ្លៃដឹកជញ្ជូនឱ្យតែមានឈ្មោះខេត្ត (ទោះ Form មិនទាន់ Valid ក៏ដោយ)
  let city = payload.data?.city || '';

  if (city.toLowerCase() === 'phnom penh') {
    shippingFee.value = 2.00;
  } else if (city) {
    shippingFee.value = 2.50; // បើមានរើសខេត្តផ្សេង គឺ ២.៥០$
  } else {
    shippingFee.value = 0; // បើអត់ទាន់រើសខេត្តទេ
  }
};

// មុខងារនេះនឹងដំណើរការនៅពេល Component CheckoutSummary ចុចប៊ូតុង Place Order
// មុខងារពេលចុចប៊ូតុង Place Order
const processCheckout = async () => {
  if (!isAddressValid.value || !checkoutAddressData.value) return;

  try {
    const addrData = checkoutAddressData.value;

    if (addrData.is_new && addrData.save_to_db) {
      await addressStore.createNewAddress({
        ...addrData.raw_form,
        is_default: true
      });
    }

    const orderPayload = {
      shipping_name: addrData.shipping_name,
      shipping_phone: addrData.shipping_phone,
      city: addrData.city, 
      shipping_address: addrData.shipping_address,
      payment_method: 'CASH_ON_DELIVERY'
    };

    const result = await orderStore.placeOrder(orderPayload);
    
    // 🌟 បន្ថែមបន្ទាត់នេះ៖ លុបទិន្នន័យ Draft ចោលពេល Order ជោគជ័យ
    localStorage.removeItem('checkout_draft');

    router.push(`/checkout/success?order_id=${result.order_id}`);

  } catch (error) {
    console.error('Checkout failed:', error);
  }
};
</script>