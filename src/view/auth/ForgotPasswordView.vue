<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
      
      <div class="flex items-center gap-2 mb-6 justify-center">
        <div class="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
          <i class="fa-solid fa-store"></i>
        </div>
        <span class="text-2xl font-bold text-slate-800">IKIT Shop</span>
      </div>

      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-2">Reset Password</h2>
        <p class="text-sm text-slate-500">
          {{ currentStep === 1 ? 'Enter your email to receive a 6-digit OTP code.' : 'Enter the OTP and set your new password.' }}
        </p>
      </div>

      <div v-if="authStore.error" class="mb-6 p-4 rounded-xl flex items-start gap-3 text-sm font-medium" :class="isSocialError ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-red-50 text-red-700 border border-red-200'">
        <i class="mt-0.5" :class="isSocialError ? 'fas fa-info-circle' : 'fas fa-exclamation-circle'"></i>
        <p class="leading-tight">{{ authStore.error }}</p>
      </div>

      <form v-if="currentStep === 1" @submit.prevent="handleRequestOtp" class="space-y-5 animate-fade-in">
        <div class="relative">
          <i class="far fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="email" 
            v-model="email" 
            required 
            placeholder="Email Address" 
            class="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        
        <button 
          type="submit" 
          :disabled="authStore.isLoading" 
          class="w-full py-3.5 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-2"
        >
          <span v-if="authStore.isLoading" class="animate-spin"><i class="fas fa-spinner"></i></span>
          <span>{{ authStore.isLoading ? 'Sending...' : 'Send OTP' }}</span>
        </button>

        <div class="text-center pt-2">
          <router-link to="/login" class="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            <i class="fas fa-arrow-left mr-1"></i> Back to Login
          </router-link>
        </div>
      </form>

      <form v-if="currentStep === 2" @submit.prevent="handleResetPassword" class="space-y-4 animate-fade-in">
        
        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Enter 6-Digit OTP</label>
          <input 
            type="text" 
            v-model="resetForm.otp_code" 
            required 
            maxlength="6" 
            placeholder="• • • • • •"
            class="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-center tracking-[0.5em] text-xl font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-300" 
          />
        </div>

        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            :type="showPwd ? 'text' : 'password'" 
            v-model="resetForm.password" 
            required 
            minlength="8" 
            placeholder="New Password (min. 8 chars)"
            class="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" 
          />
          <button type="button" @click="showPwd = !showPwd" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
            <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            :type="showConfirmPwd ? 'text' : 'password'" 
            v-model="resetForm.password_confirmation" 
            required 
            minlength="8" 
            placeholder="Confirm New Password"
            class="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" 
          />
          <button type="button" @click="showConfirmPwd = !showConfirmPwd" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
            <i :class="showConfirmPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading" 
          class="w-full py-3.5 mt-4 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-2"
        >
          <span v-if="authStore.isLoading" class="animate-spin"><i class="fas fa-spinner"></i></span>
          <span>{{ authStore.isLoading ? 'Resetting...' : 'Confirm Reset Password' }}</span>
        </button>
        
        <div class="text-center pt-2">
          <button type="button" @click="currentStep = 1" class="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            <i class="fas fa-envelope mr-1"></i> Resend to different email
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const currentStep = ref(1)
const email = ref('')
const isSocialError = ref(false)
const showPwd = ref(false)
const showConfirmPwd = ref(false)

const resetForm = reactive({
  otp_code: '',
  password: '',
  password_confirmation: ''
})

// មុខងារសុំ OTP
const handleRequestOtp = async () => {
  isSocialError.value = false
  const result = await authStore.forgotPassword(email.value)
  
  if (result.success) {
    currentStep.value = 2
  } else if (result.isSocialLogin) {
    isSocialError.value = true
  }
}

// មុខងារ Submit យកលេខសម្ងាត់ថ្មី
const handleResetPassword = async () => {
  if (resetForm.password !== resetForm.password_confirmation) {
    authStore.error = "Passwords do not match!"
    return
  }

  const payload = {
    email: email.value,
    ...resetForm
  }

  const result = await authStore.resetPassword(payload)
  
  if (result.success) {
    alert(result.message) 
    router.push('/login') 
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>