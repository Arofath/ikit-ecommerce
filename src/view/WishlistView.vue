<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-800">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">My Wishlist</h1>
          <p class="text-slate-500 mt-1">
            You have saved {{ favoriteStore.totalFavorites }} item(s)
          </p>
        </div>
      </div>

      <div 
        v-if="favoriteStore.favorites.length === 0 && !favoriteStore.isLoading" 
        class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center justify-center"
      >
        <div class="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-red-300 mb-6">
          <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p class="text-slate-500 mb-8 max-w-md">
          Save your favorite items here to buy them later. Start exploring our products!
        </p>
        <router-link 
          to="/products"
          class="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
        >
          Explore Products
        </router-link>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
        <div 
          v-for="item in favoriteStore.favorites" 
          :key="item.id"
          class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
        >
          <button 
            @click.prevent="handleRemoveFavorite(item.product)"
            class="absolute top-2 right-2 cursor-pointer bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full shadow-sm flex items-center justify-center z-10 transition-colors"
            title="Remove from wishlist"
          >
            <i class="fas fa-times"></i>
          </button>

          <router-link :to="'/product/' + item.product?.slug" class="block aspect-square bg-slate-50 rounded-md mb-4 items-center justify-center p-4 overflow-hidden relative">
            <img 
              :src="item.product?.thumbnail || 'https://placehold.co/400x400/f8fafc/94a3b8?text=No+Image'" 
              :alt="item.product?.name" 
              class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </router-link>

          <router-link :to="'/product/' + item.product?.slug" class="flex-1 flex flex-col">
            <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 hover:text-ikit-blue transition-colors">
              {{ item.product?.name }}
            </h3>
            <div class="mt-auto">
              <div class="font-bold text-ikit-red text-base">${{ (item.product?.final_price || item.product?.price).toFixed(2) }}</div>
            </div>
          </router-link>

          <button 
            @click="handleAddToCart(item.product)"
            :disabled="addingProductId === item.product?.id"
            class="mt-4 w-full cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="addingProductId === item.product?.id" class="fas fa-spinner fa-spin"></i>
            <template v-else>
              <i class="fas fa-shopping-cart text-xs"></i> Add to Cart
            </template>
          </button>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'
import Swal from 'sweetalert2'

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const addingProductId = ref(null)

// មុខងារលុបចេញពី Wishlist
const handleRemoveFavorite = async (product) => {
  const result = await favoriteStore.toggleFavorite(product)
  if (result.success) {
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Removed from wishlist', showConfirmButton: false, timer: 1500 })
  }
}

// មុខងារ Add to Cart
const handleAddToCart = async (product) => {
  addingProductId.value = product.id
  const result = await cartStore.addItem(product.id, 1)
  addingProductId.value = null

  if (result.success) {
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Added to cart!', showConfirmButton: false, timer: 1500 })
  } else {
    Swal.fire('Failed', result.error || 'Could not add to cart.', 'error')
  }
}
</script>