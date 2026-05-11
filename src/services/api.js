import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ១. Request Interceptor (បញ្ជូន Token បើមាន)
api.interceptors.request.use(
  (config) => {
    // វានឹងស្វែងរក Token។ បើភ្ញៀវអត់ទាន់ Login វាគ្រាន់តែបញ្ជូន Request ទទេធម្មតា
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// ២. Response Interceptor (ចាប់ Error 401 ដោយសន្តិវិធី)
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Guest user or token expired.')

      // ១. លុបក្នុង LocalStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_info')

      // 🌟 ២. ហៅ Pinia Store មកលុប State ចោលភ្លាមៗ ដើម្បីឱ្យ Header លោតដូររូបរាង
      import('@/stores/authStore')
        .then(({ useAuthStore }) => {
          const authStore = useAuthStore()
          authStore.clearAuthData() // យើងនឹងបង្កើតមុខងារនេះក្នុង Store ពេលក្រោយ
        })
        .catch((err) => console.error('Error loading auth store', err))
    }

    return Promise.reject(error)
  },
)

export default api
