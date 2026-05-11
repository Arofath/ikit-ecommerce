<template>
  <div class="bg-slate-50 flex items-center justify-center min-h-screen font-sans px-4">
    <div
      class="relative overflow-hidden bg-white w-full max-w-237.5 min-h-screen md:min-h-162.5 md:rounded-2xl md:shadow-2xl md:h-162.5"
    >
      <div
        :class="[
          'absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-700 ease-in-out',
          /* បន្ថែម pointer-events-auto ពេលវា Active និង pointer-events-none ពេលវាលាក់ */
          isRightPanelActive
            ? 'md:translate-x-full md:opacity-100 z-10 block pointer-events-auto'
            : 'md:opacity-0 md:z-0 hidden md:block pointer-events-none',
        ]"
      >
        <RegisterForm
          :is-google-loading="isGoogleLoading"
          @switch-to-login="router.push('/login')"
          @google-login="handleGoogleLogin"
        />
      </div>

      <div
        :class="[
          'absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-700 ease-in-out z-20',
          /* បន្ថែម pointer-events-none ពេលវាលាក់ និង pointer-events-auto ពេលវា Active */
          isRightPanelActive
            ? 'md:translate-x-full md:opacity-0 hidden md:block pointer-events-none'
            : 'opacity-100 block pointer-events-auto',
        ]"
      >
        <LoginForm
          :is-google-loading="isGoogleLoading"
          @switch-to-register="router.push('/register')"
          @google-login="handleGoogleLogin"
        />
      </div>

      <div
        :class="[
          'hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50',
          isRightPanelActive ? '-translate-x-full' : '',
        ]"
      >
        <div
          :class="[
            'bg-linear-to-br from-blue-500 via-blue-700 to-blue-900 relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out',
            isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0',
          ]"
        >
          <div
            :class="[
              'absolute top-0 flex flex-col justify-center items-center h-full w-1/2 text-center px-10 transition-transform duration-700 ease-in-out',
              isRightPanelActive ? 'translate-x-0' : 'translate-x-[-20%]',
            ]"
          >
            <h2 class="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
            <p class="text-white/90 mb-8 leading-relaxed">
              Already have an account?<br />Sign in to continue shopping with us.
            </p>
            <button
              @click="router.push('/login')"
              class="px-10 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-colors cursor-pointer"
            >
              SIGN IN
            </button>
          </div>

          <div
            :class="[
              'absolute top-0 right-0 flex flex-col justify-center items-center h-full w-1/2 text-center px-10 transition-transform duration-700 ease-in-out',
              isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0',
            ]"
          >
            <h2 class="text-4xl font-bold text-white mb-4">New Here?</h2>
            <p class="text-white/90 mb-8 leading-relaxed">
              Create an account and discover<br />amazing products at IKIT Shop.
            </p>
            <button
              @click="router.push('/register')"
              class="px-10 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-colors cursor-pointer"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'

import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const route = useRoute()
const router = useRouter()

const isGoogleLoading = ref(false)

const isRightPanelActive = ref(route.path === '/register')

watch(
  () => route.path,
  (newPath) => {
    isRightPanelActive.value = newPath === '/register'
  },
)

const handleGoogleLogin = async () => {
  if (isGoogleLoading.value) return

  try {
    isGoogleLoading.value = true
    const res = await authService.getGoogleLoginUrl()
    if (res.data && res.data.url) {
      window.location.href = res.data.url
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    alert('Failed to connect to Google.')
    isGoogleLoading.value = false
  }
}
</script>
