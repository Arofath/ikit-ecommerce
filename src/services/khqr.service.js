import axios from 'axios'

const KHQR_API_URL = import.meta.env.VITE_KHQR_API_BASE_URL || 'http://localhost:3001'

const khqrApi = axios.create({
  baseURL: `${KHQR_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default {
  generateKHQR(orderId) {
    return khqrApi.post('/khqr/generate', { orderId })
  },
  // 🌟 ថែម Function សម្រាប់ឆែក Payment Status
  checkPayment(paymentId) {
    // ត្រូវប្រាកដថាប្រើ "payments" ឱ្យត្រូវនឹង Route ក្នុង Node.js
    return khqrApi.get(`/payments/${paymentId}/check`)
  },
}
