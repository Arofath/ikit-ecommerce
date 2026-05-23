<template>
  <div class="bg-ikit-blue text-white top-0 z-40 shadow-md font-sans relative">
    <div class="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between h-14">
      <nav class="hidden lg:flex items-center gap-8 text-sm font-medium">
        <router-link
          to="/"
          exact-active-class="!border-white !opacity-100 font-bold"
          class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100"
          >Home</router-link
        >
        <router-link
          to="/products"
          exact-active-class="!border-white !opacity-100 font-bold"
          class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100"
          >Products</router-link
        >
        <router-link
          to="/services"
          exact-active-class="!border-white !opacity-100 font-bold"
          class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100"
          >Services</router-link
        >
        <router-link
          to="/contact"
          exact-active-class="!border-white !opacity-100 font-bold"
          class="hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-4 opacity-90 hover:opacity-100"
          >Contact Us</router-link
        >
        </nav>

      <button
        @click="toggleMobileMenu"
        class="lg:hidden p-2 -ml-2 hover:bg-black/10 rounded-lg transition-colors"
      >
        <svg v-if="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div class="flex items-center gap-2 sm:gap-4">
        <router-link
          to="/wishlist"
          exact-active-class="bg-black/10 text-red-200"
          class="relative hover:bg-black/10 p-2 rounded-lg transition cursor-pointer group"
        >
          <svg class="w-6 h-6 group-hover:text-red-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span v-if="favoriteStore.totalFavorites > 0" class="absolute top-0 right-0 min-w-4 h-4 px-1 bg-ikit-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-ikit-blue">
            {{ favoriteStore.totalFavorites }}
          </span>
        </router-link>

        <router-link
          to="/cart"
          class="relative flex items-center gap-2 bg-white text-ikit-blue hover:bg-slate-100 px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
        >
          <div class="relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-ikit-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
              {{ cartStore.totalItems }}
            </span>
          </div>
          <span class="hidden sm:block text-sm font-extrabold">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </router-link>

        <div class="w-px h-6 bg-blue-400/50 hidden sm:block mx-1"></div>

        <router-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="flex items-center gap-2 hover:bg-black/10 p-2 rounded-lg transition cursor-pointer"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          <span class="hidden sm:block text-sm font-medium">Sign In</span>
        </router-link>

        <div v-else class="flex items-center gap-1 sm:gap-3">
          <div class="relative">
             <button
              @click="toggleNotification"
              class="relative hover:bg-black/10 p-2 rounded-lg transition cursor-pointer group focus:outline-none"
            >
              <svg
                class="w-6 h-6 group-hover:text-blue-100 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span
                v-if="notificationStore.unreadCount > 0"
                class="absolute top-1 right-1 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-ikit-blue"
              >
                {{ notificationStore.unreadCount }}
              </span>
            </button>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="isNotificationOpen" class="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 text-slate-800">
                  <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 class="font-bold text-sm">Notifications</h3>
                  <button
                    v-if="notificationStore.unreadCount > 0"
                    @click="notificationStore.markAllAsRead"
                    class="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>

                <div class="max-h-80 overflow-y-auto">
                  <div v-if="notificationStore.notifications.length === 0" class="p-8 text-center text-slate-500">
                    <span class="material-symbols-outlined text-4xl opacity-20 mb-2 block">notifications_off</span>
                    <p class="text-sm">No new notifications.</p>
                  </div>

                  <template v-else>
                    <div
                      v-for="notif in notificationStore.notifications.slice(0, 5)"
                      :key="notif.id"
                      @click="handleNotificationClick(notif)"
                      class="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors relative"
                      :class="!notif.read_at ? 'bg-blue-50/30' : ''"
                    >
                      <div class="flex gap-3">
                        <div class="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5" :class="!notif.read_at ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'">
                          <i class="fas fa-box text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm text-slate-800" :class="!notif.read_at ? 'font-bold' : 'font-medium'">
                            {{ notif.data.message }}
                          </p>
                          <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <i class="far fa-clock"></i> {{ formatTime(notif.created_at) }}
                          </p>
                        </div>
                        <div v-if="!notif.read_at" class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      </div>
                    </div>
                  </template>
                </div>

                <div v-if="notificationStore.notifications.length > 0" class="p-2 bg-slate-50/50 border-t border-slate-100 text-center">
                  <router-link to="/my-orders" @click="isNotificationOpen = false" class="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                    View All Orders
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <UserProfileMenu 
            :is-open="isDropdownOpen" 
            @toggle="toggleProfile" 
            @close="isDropdownOpen = false" 
            @logout="handleLogout" 
          />

        </div>
      </div>
    </div>

    <div
      v-show="isMobileMenuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col font-medium text-slate-700"
    >
      <router-link @click="closeMobileMenu" to="/" exact-active-class="bg-slate-50 text-ikit-blue font-bold border-l-4 !border-ikit-blue" class="px-6 py-4 border-b border-slate-100 border-l-4 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Home</router-link>
      <router-link @click="closeMobileMenu" to="/products" exact-active-class="bg-slate-50 text-ikit-blue font-bold border-l-4 !border-ikit-blue" class="px-6 py-4 border-b border-slate-100 border-l-4 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Products</router-link>
      <router-link @click="closeMobileMenu" to="/services" exact-active-class="bg-slate-50 text-ikit-blue font-bold border-l-4 !border-ikit-blue" class="px-6 py-4 border-b border-slate-100 border-l-4 hover:bg-slate-50 hover:text-ikit-blue transition-colors">Services</router-link>
      <router-link @click="closeMobileMenu" to="/contact" exact-active-class="bg-slate-50 text-ikit-blue font-bold border-l-4 !border-ikit-blue" class="px-6 py-4 border-l-4 border-transparent hover:bg-slate-50 hover:text-ikit-blue transition-colors">Contact Us</router-link>
    </div>
  </div>
</template>

<script setup>
// 🌟 កុំភ្លេច Import Component ថ្មីមកប្រើផងណា
import UserProfileMenu from './header_bottom/UserProfileMenu.vue'

import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useNotificationStore } from '@/stores/notificationStore'
import Swal from 'sweetalert2'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const notificationStore = useNotificationStore()
const isNotificationOpen = ref(false)

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleNotification = () => {
  isNotificationOpen.value = !isNotificationOpen.value
  if (isNotificationOpen.value) isDropdownOpen.value = false
}

const toggleProfile = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) isNotificationOpen.value = false
}

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

const handleNotificationClick = async (notif) => {
  isNotificationOpen.value = false

  if (!notif.read_at) {
    await notificationStore.markAsRead(notif.id)
  }

  if (notif.data && notif.data.type === 'status_update' && notif.data.status) {
    router.push({
      path: '/my-orders',
      query: { status: notif.data.status },
    })
  } else if (notif.data && notif.data.order_id) {
    router.push(`/checkout/success?order_id=${notif.data.order_id}`)
  } else {
    router.push('/my-orders')
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  isDropdownOpen.value = false 

  Swal.fire({
    title: 'Are you sure you want to log out?',
    text: 'You can log back in at any time!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2563eb', 
    cancelButtonColor: '#ef4444', 
    confirmButtonText: 'Yes, log me out!',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'rounded-2xl', 
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      await authStore.logout()

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Logged out successfully!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })

      if (route.meta.requiresAuth) {
        router.push('/')
      }
    }
  })
}

let pollingTimer = null

onMounted(() => {
  if (authStore.isAuthenticated) {
    cartStore.fetchCart()
    favoriteStore.fetchFavorites()
    notificationStore.fetchNotifications()

    pollingTimer = setInterval(() => {
      if (authStore.isAuthenticated) {
        notificationStore.fetchNotifications()
      }
    }, 60000)
  }
})

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth && pollingTimer) {
      clearInterval(pollingTimer)
    }

    if (isAuth) {
      cartStore.fetchCart()
      favoriteStore.fetchFavorites()
      notificationStore.fetchNotifications()
    } else {
      cartStore.cart = { total_items: 0, total_cart_price: 0, items: [] }
      favoriteStore.favorites = []
      notificationStore.notifications = [] 
      notificationStore.unreadCount = 0
    }
  },
)
</script>