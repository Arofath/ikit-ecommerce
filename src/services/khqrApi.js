import axios from 'axios'

const NODE_API_URL = import.meta.env.VITE_NODE_API_BASE_URL || 'http://localhost:3001'

const khqrApi = axios.create({
  baseURL: `${NODE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

khqrApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default khqrApi
