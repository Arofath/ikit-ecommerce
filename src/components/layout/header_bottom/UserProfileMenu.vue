<template>
  <div class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 hover:bg-black/10 p-1.5 pr-3 rounded-lg transition cursor-pointer focus:outline-none"
    >
      <div
        class="w-8 h-8 bg-linear-to-r from-ikit-blue to-blue-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden"
      >
        <img
          v-if="authStore.user?.profile?.profile_image"
          :src="authStore.user.profile.profile_image"
          alt="Profile"
          class="w-full h-full object-cover"
        />
        <span v-else>{{ authStore.user?.name?.charAt(0).toUpperCase() || 'U' }}</span>
      </div>

      <span class="hidden sm:block text-sm font-medium text-white truncate max-w-25">
        {{ authStore.user?.name || 'Account' }}
      </span>

      <svg
        class="w-4 h-4 text-slate-500 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
      >
        <div class="sm:hidden px-4 py-2 border-b border-slate-100 mb-1">
          <p class="text-sm font-bold text-slate-800 truncate">{{ authStore.user?.name }}</p>
          <p class="text-xs text-slate-500 truncate">{{ authStore.user?.email }}</p>
        </div>

        <router-link
          to="/profile"
          @click="closeMenu"
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-ikit-blue transition-colors"
        >
          <i class="far fa-user w-4 text-center"></i> My Profile
        </router-link>

        <router-link
          to="/my-orders"
          @click="closeMenu"
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-ikit-blue transition-colors"
        >
          <i class="fas fa-box w-4 text-center"></i> My Orders
        </router-link>

        <div class="h-px bg-slate-100 my-1"></div>

        <button
          @click="onLogoutClick"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
        >
          <i class="fas fa-sign-out-alt w-4 text-center"></i> Logout
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const { isOpen } = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['toggle', 'close', 'logout'])

const toggleMenu = () => {
  emit('toggle')
}

const closeMenu = () => {
  emit('close')
}

const onLogoutClick = () => {
  emit('logout')
}
</script>
