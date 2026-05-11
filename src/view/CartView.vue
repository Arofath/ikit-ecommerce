<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-800">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">Shopping Cart</h1>
          <p class="text-slate-500 mt-1">
            You have {{ cartStore.totalItems }} item(s) in your cart
          </p>
        </div>
      </div>

      <div
        v-if="cartStore.cartItems.length === 0 && !cartStore.isLoading"
        class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center justify-center"
      >
        <div class="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
          <i class="fas fa-shopping-cart text-5xl"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-slate-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our amazing products and start shopping!
        </p>
        <router-link
          to="/products"
          class="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
        >
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          
          <CartItem 
            v-for="item in cartStore.cartItems" 
            :key="item.id" 
            :item="item" 
          />

          <div class="flex justify-start pt-4">
            <button
              @click="handleClearCart"
              class="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <i class="fas fa-times"></i> Clear Cart
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartItem from '@/components/cart/CartItem.vue'
import OrderSummary from '@/components/cart/OrderSummary.vue'
import Swal from 'sweetalert2'

const cartStore = useCartStore()

const handleClearCart = async () => {
  const confirm = await Swal.fire({
    title: 'Clear entire cart?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Yes, clear it!',
  })

  if (confirm.isConfirmed) {
    await cartStore.clearCart()
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success', title: 'Cart cleared', showConfirmButton: false, timer: 1500,
    })
  }
}
</script>