<template>
  <div class="flex flex-col" v-if="product">
    <!-- ម៉ាក និង ចំណាត់ថ្នាក់ (Rating) -->
    <div class="flex items-center justify-between mb-2">
      <router-link
        v-if="product.brand"
        :to="'/brand/' + product.brand.slug"
        class="text-ikit-blue font-bold text-sm tracking-wider uppercase hover:underline"
      >
        {{ product.brand.name }}
      </router-link>
      <span v-else class="text-ikit-blue font-bold text-sm tracking-wider uppercase"
        >IKIT COMPUTER</span
      >

      <div class="flex items-center gap-1 text-sm">
        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <span class="font-bold text-slate-800">4.9</span>
        <span class="text-slate-400 underline cursor-pointer">(124 Reviews)</span>
      </div>
    </div>

    <!-- ចំណងជើង -->
    <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
      {{ product.name }}
    </h1>

    <!-- បង្ហាញ SKU សម្រាប់ងាយស្រួលរក -->
    <div v-if="product.sku" class="text-sm text-slate-500 mb-4 font-mono">
      SKU: {{ product.sku }}
    </div>

    <!-- តម្លៃ និង ស្ថានភាពស្តុក -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <div class="text-3xl font-black text-ikit-red">${{ formatPrice(product.final_price) }}</div>

      <!-- បង្ហាញតម្លៃចាស់ លុះត្រាតែមានការបញ្ចុះតម្លៃ -->
      <div
        v-if="product.discount_percent > 0"
        class="text-lg text-slate-400 line-through font-medium"
      >
        ${{ formatPrice(product.price) }}
      </div>

      <!-- ស្ថានភាព Stock: យើងអាចប្រើ current_stock ឬ is_active មកកំណត់ -->
      <div
        class="ml-auto text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
        :class="
          product.current_stock > 0 || product.is_active
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        "
      >
        <div
          class="w-2 h-2 rounded-full"
          :class="
            product.current_stock > 0 || product.is_active
              ? 'bg-green-500 animate-pulse'
              : 'bg-red-500'
          "
        ></div>
        {{ product.current_stock > 0 || product.is_active ? 'In Stock' : 'Out of Stock' }}
      </div>
    </div>

    <!-- ចំណុចពិសេស (Key Features) - ទាញយកពី Specs ដែលមាន sort_order ពី 1 ដល់ 4 (ជាការបង្ហាញសង្ខេប) -->
<!-- 🌟 ករណីទី ១៖ បង្ហាញចំណុចពិសេស (Key Features) ទាំង ៦ ប្រសិនបើមាន -->
    <ul v-if="smartShortSpecs.length > 0" class="space-y-2 text-sm text-slate-600 mb-8 list-disc list-inside">
      <li 
        v-for="spec in smartShortSpecs" 
        :key="spec.key"
        class="truncate" 
        :title="spec.value"
      >
        <strong>{{ spec.key }}:</strong> {{ spec.value }}
      </li>
    </ul>
    
    <!-- 🌟 ករណីទី ២៖ បើគ្មាន Specs ទេ យើងយក Description មកកាត់បង្ហាញត្រឹម ៤ បន្ទាត់ជំនួសវិញ -->
    <p v-else-if="product.description" class="text-sm text-slate-600 mb-8 line-clamp-4 leading-relaxed">
      {{ product.description }}
    </p>

    <!-- 🌟 ករណីទី ៣ (ការពារទុកមុន)៖ Admin ភ្លេចបញ្ចូលទាំង Specs ភ្លេចទាំង Description -->
    <div v-else class="text-sm text-slate-500 italic mb-8 p-4 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex items-center gap-2">
      <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      No key features or description available for this product.
    </div>

    <div class="border-t border-slate-200 mb-6"></div>

    <!-- ប៊ូតុង Add to Cart / Buy Now -->
    <div class="mb-8">
      <div class="flex flex-wrap items-center gap-4 mb-8">
        
        <div class="flex items-center border-2 border-slate-200 rounded-lg h-12 w-32" :class="{'opacity-50 pointer-events-none': product.current_stock <= 0}">
          <button
            @click="quantity > 1 ? quantity-- : null"
            class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-ikit-blue hover:bg-slate-50 transition-colors"
          >
            -
          </button>
          <input
            type="text"
            :value="quantity"
            class="w-full h-full text-center font-bold text-slate-800 outline-none"
            readonly
          />
          <button
            @click="quantity < product.current_stock ? quantity++ : null"
            class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-ikit-blue hover:bg-slate-50 transition-colors"
          >
            +
          </button>
        </div>

        <button
          @click="addToCart"
          :disabled="product.current_stock <= 0 || isAdding"
          :class="product.current_stock > 0 ? 'bg-white border-ikit-blue text-ikit-blue hover:bg-ikit-blue hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'"
          class="flex-1 h-12 border-2 font-bold cursor-pointer rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <i v-if="isAdding" class="fas fa-spinner fa-spin"></i>
          <template v-else>
            <svg v-if="product.current_stock > 0" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ product.current_stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </template>
        </button>

        <button
          class="h-12 w-12 border-2 border-slate-200 text-slate-500 hover:text-ikit-red hover:border-ikit-red hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>

      <button
        @click="buyNow"
        :disabled="product.current_stock <= 0"
        :class="product.current_stock > 0 ? 'bg-ikit-red hover:bg-red-700 text-white transform hover:-translate-y-0.5' : 'bg-slate-300 text-slate-500 cursor-not-allowed'"
        class="w-full h-14 cursor-pointer font-extrabold rounded-lg shadow-md transition-all text-lg mb-6"
      >
        BUY NOW
      </button>
    </div>

    <!-- ទំនុកចិត្ត (Trust Info) -->
    <div class="flex items-center gap-6 text-xs text-slate-500 font-medium">
      <div class="flex items-center gap-1.5">
        <svg class="w-5 h-5 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
        {{ product.warranty ? product.warranty.name : '1 Year Warranty' }}
      </div>
      <div class="flex items-center gap-1.5">
        <svg class="w-5 h-5 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          ></path>
        </svg>
        Free Delivery (Phnom Penh)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

// ទទួលយកទិន្នន័យពី ProductDetailView
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const quantity = ref(1)
const isAdding = ref(false)

// មុខងារសម្រាប់ធ្វើទម្រង់តម្លៃ (ឧ. 1299 -> 1,299.00)
const formatPrice = (price) => {
  if (!price) return '0.00'
  return Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// ជំនួស shortSpecs ចាស់ ដោយ smartShortSpecs នេះ
const smartShortSpecs = computed(() => {
  if (!props.product || !props.product.specs || props.product.specs.length === 0) return [];

  const rawSpecs = props.product.specs;
  const result = [];

  const findSpec = (keywords) => {
    return rawSpecs.find(s => 
      keywords.some(k => s.spec_key.toLowerCase() === k.toLowerCase())
    );
  };

  const targetSpecs = [
    { label: 'Processor', keywords: ['CPU', 'Processor'] },
    { label: 'RAM', keywords: ['RAM', 'Memory'] },
    { label: 'Storage', keywords: ['Storage', 'SSD', 'HDD', 'Hard Drive'] },
    { label: 'Graphics', keywords: ['Graphic', 'Graphics', 'VGA', 'GPU'] },
    { label: 'Display', keywords: ['Display', 'Screen'] },
    { label: 'OS', keywords: ['OS', 'Operating System'] }
  ];

  targetSpecs.forEach(target => {
    const found = findSpec(target.keywords);
    if (found) {
      result.push({ key: target.label, value: found.spec_value });
    }
  });

  // ==========================================
  // 🌟 ការពារករណីជាទំនិញប្រភេទផ្សេង (Monitor, Accessories)
  // ==========================================
  // ប្រសិនបើកូដរក CPU, RAM មិនឃើញសោះ (result.length ស្មើ 0)
  if (result.length === 0) {
    // យើងគ្រាន់តែកាត់យកទិន្នន័យ ៥ បន្ទាត់ដំបូងគេបង្អស់មកបង្ហាញ
    return rawSpecs.slice(0, 5).map(spec => ({
      key: spec.spec_key,
      value: spec.spec_value
    }));
  }

  return result;
})

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    Swal.fire({
      title: 'Please Login',
      text: 'You need to have an account to purchase items!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Go to Login Page',
      cancelButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) router.push('/login') 
    })
    return 
  }

  isAdding.value = true
  const result = await cartStore.addItem(props.product.id, quantity.value)
  isAdding.value = false

  if (result.success) {
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success', title: 'Successfully added to cart!', showConfirmButton: false, timer: 1500
    })
    // Reset ចំនួនមកលេខ ១ វិញបន្ទាប់ពី Add ជោគជ័យ
    quantity.value = 1
  } else {
    Swal.fire('Failed', result.error || 'Could not add to cart.', 'error')
  }
}

const buyNow = () => {
  console.log(`ទិញ ${props.product.name} ភ្លាមៗ`)
  // ថ្ងៃក្រោយអាចលោតទៅទំព័រ Checkout តែម្តង
}
</script>
