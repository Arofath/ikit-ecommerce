<template>
  <div class="h-full flex flex-col justify-center px-6 md:px-12 pt-16 md:pt-0 bg-white">
    <div class="flex items-center gap-2 mb-8">
      <div
        class="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-xl"
      >
        <i class="fa-solid fa-store"></i>
      </div>
      <span class="text-2xl font-bold text-slate-800">IKIT Shop</span>
    </div>

    <h1 class="text-3xl font-bold text-blue-600 mb-2">Welcome Back!</h1>
    <p class="text-sm text-slate-500 mb-6">Sign in to access your account</p>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div class="relative">
        <i class="far fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          v-model="loginForm.email"
          type="email"
          placeholder="Email"
          required
          class="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      <div class="relative">
        <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          v-model="loginForm.password"
          :type="showPwd ? 'text' : 'password'"
          placeholder="Password"
          required
          class="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        <button
          type="button"
          @click="showPwd = !showPwd"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
        >
          <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>

      <div class="flex justify-end">
        <a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >Forgot password?</a
        >
      </div>

      <button
        type="submit"
        :disabled="authStore.isLoading"
        class="w-full py-3.5 mt-2 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        <span v-if="authStore.isLoading">Logging in...</span>
        <span v-else>SIGN IN</span>
      </button>

      <div class="flex items-center my-4 text-slate-400 text-sm">
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="px-4">or</span>
        <div class="flex-1 h-px bg-slate-200"></div>
      </div>

      <button 
        type="button" 
        @click="$emit('google-login')" 
        :disabled="isGoogleLoading"
        class="w-full py-3 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg v-if="isGoogleLoading" class="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <svg v-else class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        
        <span v-if="isGoogleLoading">Connecting...</span>
        <span v-else>Continue with Google</span>
      </button>
    </form>

    <div class="md:hidden mt-8 pt-6 border-t border-slate-200 text-center">
      <p class="text-sm text-slate-500 mb-2">Don't have an account?</p>
      <button @click="$emit('switch-to-register')" class="text-blue-600 font-semibold text-sm">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

defineProps({
  isGoogleLoading: {
    type: Boolean,
    default: false
  }
})

// ប្រកាសសិទ្ធិបាញ់សញ្ញាទៅមេ
defineEmits(['switch-to-register', 'google-login'])

const showPwd = ref(false)
const loginForm = reactive({ email: '', password: '' })

const handleLogin = async () => {
  const result = await authStore.login(loginForm.email, loginForm.password)

  if (result.success) {
    // 🌟 ឆែកមើលថាតើមាន URL ដែលគាត់ចង់ទៅមុនពេលត្រូវរុញមកទីនេះដែរឬទេ?
    const redirectPath = route.query.redirect || '/'

    // បាញ់គាត់ទៅទំព័រនោះវិញ
    router.push(redirectPath)
  } else {
    alert(result.error)
  }
}
</script>
