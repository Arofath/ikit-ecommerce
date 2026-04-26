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

      // លុបទិន្នន័យចាស់ចោល ដើម្បីឱ្យប្រាកដថាប្រព័ន្ធស្អាត
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_info')

      // 🌟 ចំណុចសំខាន់៖ យើងមិនប្រើ window.location.href = '/login' នៅទីនេះទេ!
      // យើងទុកឱ្យ Component (ឧទាហរណ៍៖ ទំព័រ Checkout ឬ Profile) ជាអ្នកចាត់ចែង
      // បើភ្ញៀវចូលមើលទំព័រហាមឃាត់ ចាំ Component នោះបញ្ជូនគាត់ទៅ Login ដោយខ្លួនឯង។
    }

    return Promise.reject(error)
  },
)

export default api
