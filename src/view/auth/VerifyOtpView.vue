<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
    <div class="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 to-blue-800"></div>

      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 text-3xl">
        <i class="fas fa-envelope-open-text"></i>
      </div>

      <h2 class="text-2xl font-bold text-slate-800 mb-2">Verify OTP</h2>
      <p class="text-slate-500 text-sm mb-6 leading-relaxed">
        Enter the OTP sent to<br/>
        <span class="font-semibold text-slate-700">{{ email }}</span>
      </p>

      <form @submit.prevent="handleVerifyOtp">
        <div class="flex justify-center gap-2 mb-6">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            ref="otpInputs"
            v-model="otpDigits[index]"
            @input="handleOtpInput($event, index)"
            @keydown="handleOtpKeydown($event, index)"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="w-12 h-14 text-center text-xl font-bold border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading || otpValue.length < 6"
          class="w-full py-3.5 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.isLoading">Verifying...</span>
          <span v-else>Verify OTP</span>
        </button>
      </form>

      <div class="mt-8 text-sm text-slate-500">
        <span>Didn't get the code?</span>
        <button 
          @click="handleResendOtp" 
          :disabled="isResending"
          class="text-blue-600 font-semibold hover:underline disabled:text-slate-400 disabled:no-underline ml-1"
        >
          <span v-if="isResending">Resending...</span>
          <span v-else>Resend Code</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/auth.service' // កុំភ្លេចបន្ថែមមុខងារ verifyOtp និង resendOtp ក្នុងនេះ
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 🌟 ទាញយក Email ពី URL
const email = ref(route.query.email || '')

// 🌟 គ្រប់គ្រងប្រអប់លេខកូដទាំង ៦
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([]) // សម្រាប់គ្រប់គ្រងការ Focus
const isResending = ref(false)

// ប្រមូលលេខកូដទាំង ៦ បញ្ចូលគ្នា
const otpValue = computed(() => otpDigits.value.join(''))

// មុខងារជួយឱ្យលោតទៅប្រអប់បន្ទាប់ដោយស្វ័យប្រវត្តិពេលវាយលេខ
const handleOtpInput = (event, index) => {
  const value = event.target.value
  
  // បើវាយលេខ (មិនមែនលុប) ហើយមានប្រអប់បន្ទាប់
  if (value && index < 5) {
    otpInputs.value[index + 1].focus()
  }
}

// មុខងារជួយឱ្យលោតមកប្រអប់មុនវិញពេលចុច Backspace
const handleOtpKeydown = (event, index) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1].focus()
  }
}

// 🌟 មុខងារបញ្ជាក់លេខកូដ
const handleVerifyOtp = async () => {
  // ហៅមុខងារ verify ពី Store (យើងនឹងសរសេរបន្ទាប់)
  const result = await authStore.verifyOtp(email.value, otpValue.value)

  if (result.success) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Account verified successfully!',
      showConfirmButton: false,
      timer: 2000
    })
    router.push('/')
  } else {
    Swal.fire('Failure', result.error || 'Invalid or expired OTP.', 'error')
    // លុបលេខកូដចោល ដើម្បីឱ្យគាត់វាយថ្មី
    otpDigits.value = ['', '', '', '', '', '']
    otpInputs.value[0].focus()
  }
}

// 🌟 មុខងារសុំលេខកូដថ្មី
const handleResendOtp = async () => {
  isResending.value = true
  try {
    await authService.resendOtp(email.value) // តម្រូវឱ្យសរសេរមុខងារនេះក្នុង auth.service.js
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'New OTP sent!',
      showConfirmButton: false,
      timer: 2000
    })
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    Swal.fire('Failure', 'Unable to send OTP. Please try again.', 'error')
  } finally {
    isResending.value = false
  }
}

// បើចូលមកទំព័រនេះដោយគ្មាន Email ក្នុង URL ឱ្យគាត់ត្រឡប់ទៅ Login វិញ
onMounted(() => {
  if (!email.value) {
    router.push('/login')
  } else {
    // ដាក់ Focus លើប្រអប់ទី ១ ភ្លាមៗ
    setTimeout(() => {
      if(otpInputs.value[0]) otpInputs.value[0].focus()
    }, 100)
  }
})
</script>