<template>
  <router-link
    :to="'/product/' + product.slug"
    class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
  >
<span
      v-if="badgeText"
      class="absolute top-3 left-3 text-white text-[10px] tracking-wider font-bold px-2 py-1 rounded z-10"
      :class="badgeColor"
    >
      {{ badgeText }}
    </span>

    <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
      <img
        :src="product.thumbnail ? product.thumbnail.image_path : '/default-placeholder.png'"
        :alt="product.name"
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
      />
      
      <button
        @click.prevent="addToCart"
        :disabled="isAdding"
        class="absolute cursor-pointer -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md z-20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <i v-if="isAdding" class="fas fa-spinner fa-spin"></i>
        <span v-else>Add to Cart</span>
      </button>
    </div>

    <span
      v-if="product.brand"
      class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
    >
      {{ product.brand.name }}
    </span>

    <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-ikit-blue transition-colors mt-auto">
      {{ product.name }}
    </h3>

    <div class="font-bold text-ikit-red text-base">${{ product.price }}</div>
  </router-link>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

const props = defineProps({
  product: { type: Object, required: true },
  badgeText: { type: String, default: '' }, // 🌟 ដូរពី badgeType មកជា badgeText វិញទើបត្រឹមត្រូវ
  badgeColor: { type: String, default: 'bg-ikit-blue' }
})

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const isAdding = ref(false) // 🌟 State Loading ដាច់ដោយឡែកសម្រាប់ Card នីមួយៗ

// 🌟 មុខងារ Add to Cart
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
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login')
      }
    })
    return
  }

  isAdding.value = true
  const result = await cartStore.addItem(props.product.id, 1)
  isAdding.value = false

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