<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
      <h2 class="text-xl font-bold text-slate-700">Verifying...</h2>
      <p class="text-sm text-slate-500 mt-2">Please wait a moment while we verify your information.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import api from '@/services/api' // កុំភ្លេចហៅ Axios instance ដែលយើងបាន setup

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  // ១. ចាប់យក Token ពី URL
  const token = route.query.token
  const error = route.query.error

  // បើ Google បាញ់មកថាមាន Error (ឧ. Admin ព្យាយាម Login)
  if (error) {
    // អាចប្រើ SweetAlert ទីនេះក៏បាន
    alert('មិនអាចចូលប្រើប្រាស់បានទេ: ' + error) 
    router.push('/login')
    return
  }

  if (token) {
    try {
      // ២. រក្សាទុក Token បណ្តោះអាសន្នសិន ដើម្បីឱ្យ api.js អាចយកវាកឹបជាប់ក្នុង Header
      localStorage.setItem('access_token', token)

      // ៣. បាញ់ទៅ Backend សុំទិន្នន័យ Profile របស់គាត់ (ឈ្មោះ, Email, Role...)
      // ចំណាំ៖ ប្រាកដថាអ្នកមាន Route GET '/api/user' ក្នុង routes/api.php របស់ Laravel
      const response = await api.get('/me/profile') 
      
      // ចាប់យកទិន្នន័យ (វាអាចជា response.data ផ្ទាល់ ឬ response.data.data អាស្រ័យលើអ្នកសរសេរ Backend)
      const user = response.data.data || response.data 

      // ៤. រក្សាទុកចូលក្នុង Pinia Store ឱ្យបានត្រឹមត្រូវ
      authStore.setAuthData(user, token)

      // ៥. ជោគជ័យ! បញ្ជូនគាត់ទៅទំព័រ Home
      router.push('/')

    } catch (err) {
      console.error('API User:', err)
      localStorage.removeItem('access_token') // លុបចោលវិញបើ Error
      alert('មានបញ្ហាក្នុងការទាញយកព័ត៌មានគណនី។ សូម Login ម្តងទៀត។')
      router.push('/login')
    }
  } else {
    // បើគ្មាន Token ទេ រុញទៅ Login វិញ
    router.push('/login')
  }
})
</script>