<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    <div class="flex flex-col lg:flex-row gap-8">
      <product-filter-sidebar />
      <main class="w-full lg:w-3/4">
        <div
          class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
        >
          <button
            class="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-300 py-2 px-4 rounded-lg font-medium text-sm text-slate-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            Filter
          </button>

          <p class="text-sm text-slate-500 hidden sm:block">
            <template v-if="productStore.isListLoading"> Loading... </template>
            <template v-else-if="productStore.pagination && productStore.pagination.total > 0">
              Showing
              <span class="font-bold text-slate-800">{{ productStore.pagination.from || 0 }}</span>
              -
              <span class="font-bold text-slate-800">{{ productStore.pagination.to || 0 }}</span> of
              <span class="font-bold text-slate-800">{{ productStore.pagination.total }}</span>
              results
            </template>
            <template v-else> No results found </template>
          </p>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <span class="text-sm text-slate-500 whitespace-nowrap">Sort By:</span>
            <select
              v-model="selectedSort"
              @change="applySort"
              class="w-full sm:w-auto border border-slate-300 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue cursor-pointer bg-white"
            >
              <option value="default">Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div
          v-if="productStore.isListLoading"
          class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="i in 12"
            :key="i"
            class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse flex flex-col h-75"
          >
            <div class="aspect-square bg-slate-200 rounded-md mb-4 w-full"></div>
            <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
            <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-slate-200 rounded w-2/3 mb-4 mt-auto"></div>
          </div>
        </div>

        <div
          v-else-if="productStore.products.length > 0"
          class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <router-link
            v-for="product in productStore.products"
            :key="product.id"
            :to="'/product/' + product.slug"
            class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
          >
            <div
              class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative"
            >
              <img
                :src="
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : '/default-placeholder.png'
                "
                :alt="product.name"
                class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <button
                @click.prevent="handleAddToCart(product)"
                :disabled="addingProductId === product.id"
                class="absolute cursor-pointer -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md z-20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <i v-if="addingProductId === product.id" class="fas fa-spinner fa-spin"></i>
                <span v-else>Add to Cart</span>
              </button>
            </div>

            <span
              v-if="product.brand"
              class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
            >
              {{ product.brand.name }}
            </span>

            <h3
              class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-ikit-blue transition-colors mt-auto"
            >
              {{ product.name }}
            </h3>

            <div class="flex items-center gap-2">
              <div class="font-bold text-ikit-red text-base">${{ product.final_price }}</div>
              <div v-if="product.discount_percent > 0" class="text-xs text-slate-400 line-through">
                ${{ product.price }}
              </div>
            </div>
          </router-link>
        </div>

        <div v-else class="text-center py-20 text-slate-500">
          <svg
            class="w-16 h-16 mx-auto text-slate-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p>No products found</p>
        </div>
        <product-pagination
          v-if="
            !productStore.isListLoading &&
            productStore.products.length > 0 &&
            productStore.pagination
          "
          :currentPage="productStore.pagination.current_page"
          :lastPage="productStore.pagination.last_page"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductFilterSidebar from '@/components/product/ProductFilterSidebar.vue'
import ProductPagination from '@/components/product/ProductPagination.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const selectedSort = ref('default')
const addingProductId = ref(null)

// 🌟 មុខងារនៅពេលគេជ្រើសរើសការតម្រៀបថ្មី
const applySort = () => {
  const currentQuery = { ...route.query }

  // បើគេរើស default លុប sort ពី URL, ផ្ទុយទៅវិញបញ្ចូលវាទៅក្នុង URL
  if (selectedSort.value !== 'default') {
    currentQuery.sort = selectedSort.value
  } else {
    delete currentQuery.sort
  }

  // 🌟 សំខាន់៖ រាល់ពេលប្តូរការតម្រៀប ត្រូវលុប Page ចោលដើម្បីឱ្យរត់មកទំព័រទី១វិញ
  delete currentQuery.page

  // បញ្ជាឱ្យរត់ទៅ URL ថ្មី
  router.push({ query: currentQuery })
}

// 🌟 មុខងារសម្រាប់ទាញទិន្នន័យ ដោយអាន Parameter ពី URL
const fetchProductsByUrl = () => {
  // route.query នឹងចាប់យកអ្វីៗដែលនៅក្រោយសញ្ញា ? (ឧ. ?category=monitor&sort=newest)
  const queryParams = route.query
  productStore.fetchProductList(queryParams)
}

const handleAddToCart = async (product) => {
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

  // 🌟 ៣. កំណត់ ID ទំនិញដែលកំពុងវិល Loading រួចបាញ់ API
  addingProductId.value = product.id
  const result = await cartStore.addItem(product.id, 1) // យក product.id មកប្រើផ្ទាល់
  addingProductId.value = null // បិទ Loading វិញ

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

// ពេលចូលមកដល់ទំព័រភ្លាម
onMounted(() => {
  selectedSort.value = route.query.sort || 'default'
  fetchProductsByUrl()
})

// ពេល URL ផ្លាស់ប្តូរ (ឧ. អតិថិជនចុចពី Home Page ម្តងទៀត ឬប្តូរ Filter)
watch(
  () => route.query,
  () => {
    selectedSort.value = route.query.sort || 'default'
    fetchProductsByUrl()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)
</script>
