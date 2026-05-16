<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
    
    <div class="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
      <div>
        <h3 class="font-bold text-slate-800">Order <span class="text-blue-600">#{{ order.order_number }}</span></h3>
        <p class="text-xs text-slate-500 mt-1">{{ formatDate(order.created_at) }}</p>
      </div>
      <div>
        <span 
          class="px-3 py-1 text-xs font-bold uppercase rounded-full"
          :class="statusColorClass"
        >
          {{ order.status }}
        </span>
      </div>
    </div>

    <div class="px-5 py-5 flex items-center justify-between gap-4">
      
      <div class="flex-1 min-w-0">
        
        <div v-if="order.items?.length === 1" class="flex items-center gap-4">
          <div class="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
            <img 
              v-if="firstItem?.product?.thumbnail" 
              :src="firstItem.product.thumbnail" 
              alt="Product"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
              <i class="fas fa-box"></i>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <p class="font-medium text-slate-800 truncate">{{ firstItem?.product_name || firstItem?.product?.name || 'Unknown Product' }}</p>
            <p class="text-sm text-slate-500 mt-0.5">Qty: {{ firstItem?.quantity || 1 }}</p>
          </div>
        </div>

        <div v-else class="flex flex-col gap-3">
          <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            
            <div 
              v-for="item in order.items?.slice(0, 4)" 
              :key="item.id" 
              class="w-14 h-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative"
            >
              <img 
                v-if="item.product?.thumbnail" 
                :src="item.product.thumbnail" 
                alt="Product"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                <i class="fas fa-box"></i>
              </div>
              
              <div class="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-medium">
                x{{ item.quantity }}
              </div>
            </div>

            <div 
              v-if="order.items?.length > 4" 
              class="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 text-slate-500 font-bold text-sm"
            >
              +{{ order.items.length - 4 }}
            </div>
          </div>
          
          <p class="font-medium text-slate-800 text-sm truncate">
            {{ firstItem?.product_name || firstItem?.product?.name }} 
            <span class="text-slate-500 font-normal">and {{ order.items.length - 1 }} other item(s)</span>
          </p>
        </div>
      </div>

      <div class="text-right shrink-0 border-l border-slate-100 pl-4 sm:pl-6 ml-2">
        <p class="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Total Amount</p>
        <p class="font-bold text-blue-600 text-lg">${{ parseFloat(order.grand_total).toFixed(2) }}</p>
      </div>

    </div>

    <div class="px-5 py-3 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
      <router-link 
        :to="`/checkout/success?order_id=${order.id}`" 
        class="px-5 py-2 text-sm font-bold text-blue-600 bg-blue-100/50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        View Details
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

// ចាប់យកទំនិញទី១ សម្រាប់យកឈ្មោះមកបង្ហាញ
const firstItem = computed(() => {
  return props.order.items && props.order.items.length > 0 ? props.order.items[0] : null;
});

// Format ថ្ងៃខែ
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
  });
};

// កំណត់ពណ៌ Badge តាម Status
const statusColorClass = computed(() => {
  const status = props.order.status?.toUpperCase() || '';
  if (status === 'PENDING') return 'bg-amber-100 text-amber-700';
  if (status === 'PROCESSING') return 'bg-blue-100 text-blue-700';
  if (status === 'SHIPPED') return 'bg-indigo-100 text-indigo-700'; // 🌟 បន្ថែមពណ៌សម្រាប់ Shipped
  if (status === 'COMPLETED') return 'bg-emerald-100 text-emerald-700'; // 🌟 ប្រើ COMPLETED តាម Backend
  if (status === 'CANCELLED') return 'bg-red-100 text-red-700';
  return 'bg-slate-100 text-slate-700';
});
</script>

<style scoped>
/* លាក់របារ Scroll ខាងក្រោម តែនៅតែអូសឆ្វេងស្តាំបាន (សម្រាប់ Mobile) */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>