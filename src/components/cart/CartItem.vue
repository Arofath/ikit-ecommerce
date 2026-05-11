<template>
  <div
    class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 relative transition-all hover:shadow-md"
  >
    <div class="w-full sm:w-32 h-32 bg-slate-100 rounded-xl shrink-0 overflow-hidden">
      <img
        :src="item.product?.thumbnail || 'https://placehold.co/400x400/f8fafc/94a3b8?text=No+Image'"
        :alt="item.product?.name"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex-1 w-full flex flex-col justify-between">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="text-lg font-bold text-slate-800 line-clamp-2">
            {{ item.product?.name }}
          </h3>
          <p class="text-sm text-slate-500 mt-1">SKU: {{ item.product?.sku }}</p>
        </div>

        <div class="text-right">
          <span class="text-lg font-bold text-blue-600">
            ${{ (item.product?.final_price || item.product?.price).toFixed(2) }}
          </span>
          <p
            v-if="item.product?.discount_percent > 0"
            class="text-xs text-slate-400 line-through mt-0.5"
          >
            ${{ item.product?.price.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div
          class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 h-10 w-28 shrink-0"
        >
          <button
            @click="handleUpdateQuantity(item.quantity - 1)"
            :disabled="item.quantity <= 1"
            class="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <i class="fas fa-minus text-xs"></i>
          </button>

          <div
            class="w-10 h-full flex items-center justify-center font-semibold text-slate-700 bg-white border-x border-slate-200"
          >
            {{ item.quantity }}
          </div>

          <button
            @click="handleUpdateQuantity(item.quantity + 1)"
            class="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <i class="fas fa-plus text-xs"></i>
          </button>
        </div>

        <button
          @click="handleRemoveItem"
          class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
          title="Remove Item"
        >
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
let debounceTimer = null

const handleUpdateQuantity = (newQuantity) => {
  // 🌟 បំប្លែងទៅជាលេខគត់ និងការពារកុំឱ្យមានការបញ្ចូលទិន្នន័យខុស (NaN)
  const qty = parseInt(newQuantity)
  if (isNaN(qty) || qty < 1) return

  const oldQuantity = props.item.quantity

  const storeItem = cartStore.cartItems.find((i) => i.id === props.item.id)
  if (storeItem) {
    storeItem.quantity = qty
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(async () => {
    // ផ្ញើតែតួលេខសុទ្ធទៅកាន់ Laravel Backend
    const result = await cartStore.updateQuantity(props.item.id, qty)

    if (!result.success) {
      if (storeItem) storeItem.quantity = oldQuantity
      Swal.fire({
        icon: 'warning',
        title: 'Stock Limit Reached',
        text: result.error || 'Cannot update quantity.',
        confirmButtonColor: '#2563eb',
      })
    }
  }, 500)
}

const handleRemoveItem = async () => {
  const confirm = await Swal.fire({
    title: 'Remove item?',
    text: 'Are you sure you want to remove this item from your cart?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Yes, remove it!',
  })

  if (confirm.isConfirmed) {
    await cartStore.removeItem(props.item.id)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Item removed',
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
</script>
