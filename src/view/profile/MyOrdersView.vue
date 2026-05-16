<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-8">My Orders</h1>

    <div class="flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.value"
        @click="changeTab(tab.value)"
        class="px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border cursor-pointer"
        :class="activeTab === tab.value 
          ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="orderStore.isLoading" class="py-20 text-center text-slate-500">
      <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
      <p>Loading your orders...</p>
    </div>

    <div v-else-if="orderStore.orders && orderStore.orders.length > 0" class="space-y-4">
      <OrderCard 
        v-for="order in orderStore.orders" 
        :key="order.id" 
        :order="order" 
      />
    </div>

    <div v-else class="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <div class="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
        <i class="fas fa-box-open"></i>
      </div>
      <h3 class="text-xl font-bold text-slate-800 mb-2">No orders found</h3>
      <p class="text-slate-500 mb-6 max-w-md mx-auto">
        {{ activeTab === 'ALL' ? "You haven't placed any orders yet." : `You don't have any orders with status "${activeTab}".` }}
      </p>
      <router-link to="/products" class="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
        Start Shopping
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'; // 🌟 ថែម watch
import { useRoute } from 'vue-router'; // 🌟 ថែម useRoute
import { useOrderStore } from '@/stores/orderStore';
import OrderCard from '@/components/order/OrderCard.vue';

const route = useRoute(); // 🌟 ប្រកាស route
const orderStore = useOrderStore();
const activeTab = ref('ALL');

// បញ្ជី Tabs សម្រាប់ Filter
const tabs = ref([
  { label: 'All Orders', value: 'ALL' }, // 🌟 ដូរពី '' ទៅ 'ALL' ដើម្បីឱ្យស៊ីគ្នានឹង Default
  { label: 'Pending', value: 'PENDING' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Shipped', value: 'SHIPPED' },
  { label: 'Completed', value: 'COMPLETED' }, 
  { label: 'Cancelled', value: 'CANCELLED' }
]);

// ពេលទំព័របើកដំបូង
onMounted(() => {
  // 🌟 ១. ឆែកមើលថាតើមានភ្ជាប់ ?status=... មកពី URL ដែរឬទេ (ពេលចុចពី Notification)
  if (route.query.status) {
    activeTab.value = route.query.status;
  }
  
  // ទាញយកទិន្នន័យទៅតាម Tab ដែលកំពុង Active
  orderStore.fetchOrderHistory(activeTab.value); 
});

// 🌟 ២. ចាប់មើល URL: ក្រែងលោ User កំពុងឈរលើទំព័រ My Orders នេះស្រាប់ ហើយគាត់ចុច Notification មួយទៀត
watch(() => route.query.status, (newStatus) => {
  if (newStatus) {
    activeTab.value = newStatus;
    orderStore.fetchOrderHistory(newStatus);
  }
});

// ពេលគាត់ចុចដូរ Tab ដោយផ្ទាល់ដៃ
const changeTab = (statusValue) => {
  activeTab.value = statusValue;
  orderStore.fetchOrderHistory(statusValue); 
};
</script>

<style scoped>
/* លាក់របារ Scroll ខាងក្រោម តែនៅតែអូសបាន (សម្រាប់ Mobile) */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>