import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // ១. ទាញយក State ពី LocalStorage (បើមាន) ពេល Refresh Browser
  const isAuthenticated = ref(!!localStorage.getItem('access_token'))
  const user = ref(JSON.parse(localStorage.getItem('user_info') || 'null'))

  // ២. មុខងារសម្រាប់ Update State ពេល Login ជោគជ័យ
  const setAuth = (userData) => {
    user.value = userData
    isAuthenticated.value = true
  }

  // ៣. មុខងារសម្រាប់ Clear State ពេល Logout
  const clearAuth = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    user,
    setAuth,
    clearAuth,
  }
})
