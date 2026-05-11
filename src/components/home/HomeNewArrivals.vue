<template>
  <section class="mb-12 font-sans">
    <!-- 🌟 ក្បាលចំណងជើង និងប៊ូតុង View All -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          ></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">New Arrivals</h2>
      </div>

      <router-link
        :to="{ path: '/products', query: { sort: 'newest' } }"
        class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group"
      >
        View All
        <svg
          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </router-link>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <!-- ប្រើ Loop 5 ដង ដើម្បីបង្កើតប្រអប់សខ្មោចចំនួន ៥ -->
      <div
        v-for="i in 5"
        :key="i"
        class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse"
      >
        <!-- រូបភាព Skeleton -->
        <div class="aspect-square bg-slate-200 rounded-md mb-4 w-full"></div>
        <!-- ឈ្មោះ Brand Skeleton -->
        <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
        <!-- ចំណងជើងទំនិញ Skeleton (2 បន្ទាត់) -->
        <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
        <!-- តម្លៃ Skeleton -->
        <div class="h-5 bg-slate-200 rounded w-1/2 mt-auto"></div>
      </div>
    </div>

    <!-- 🌟 បញ្ជីទំនិញថ្មីៗ (ប្រើ Grid 5 ក្រឡាលើកុំព្យូទ័រ) -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <!-- លូកយកទិន្នន័យពី props `products` មកបង្ហាញ -->
      <router-link
        v-for="product in products"
        :key="product.id"
        :to="'/product/' + product.slug"
        class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
      >
        <!-- 🌟 ផ្លាក NEW ពណ៌ខៀវ -->
        <span
          class="absolute top-3 left-3 bg-ikit-blue text-white text-[10px] font-bold px-2 py-1 rounded z-10"
        >
          NEW
        </span>

        <!-- រូបភាពទំនិញ -->
        <div
          class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative"
        >
          <img
            :src="product.thumbnail ? product.thumbnail.image_path : '/default-placeholder.png'"
            :alt="product.name"
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
          <!-- ប៊ូតុង Add to Cart (លេចឡើងពេល Hover) -->
          <button
            @click.prevent="handleAddToCart(product)"
            :disabled="addingProductId === product.id"
            class="absolute cursor-pointer -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md z-20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <i v-if="addingProductId === product.id" class="fas fa-spinner fa-spin"></i>
            <span v-else>Add to Cart</span>
          </button>
        </div>

        <!-- ព័ត៌មានទំនិញ -->
        <span
          v-if="product.brand"
          class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
        >
          {{ product.brand.name }}
        </span>

        <h3
          class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 hover:text-ikit-blue cursor-pointer transition-colors mt-auto"
        >
          {{ product.name }}
        </h3>

        <!-- តម្លៃ (ថែមសញ្ញា $ ពីមុខ) -->
        <div class="font-bold text-ikit-red text-base">${{ product.price }}</div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

// 🌟 ទទួលទិន្នន័យ products ពីទំព័រ HomeView
defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

// អថេរសម្រាប់ចំណាំ ID ទំនិញដែលកំពុងចុច ដើម្បីឱ្យវាវិល Loading ត្រូវប៊ូតុង
const addingProductId = ref(null)

const handleAddToCart = async (product) => {
  // ១. ឆែកមើលថាគាត់បាន Login ហើយឬនៅ?
  if (!authStore.isAuthenticated) {
    Swal.fire({
      title: 'Please Login',
      text: 'You need to have an account to purchase items!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Go to Login Page',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login')
      }
    })
    return
  }

  // ២. បើកសញ្ញា Loading និងបាញ់ API ទៅ Backend
  addingProductId.value = product.id
  const result = await cartStore.addItem(product.id, 1)
  addingProductId.value = null // បិទ Loading វិញពេលដើរចប់

  // ៣. បង្ហាញលទ្ធផល
  if (result.success) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Successfully added to cart!',
      showConfirmButton: false,
      timer: 1500,
    })
  } else {
    Swal.fire('Failed', result.error || 'Could not add to cart.', 'error')
  }
}
</script>
