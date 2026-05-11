import api from './api'

export const authService = {
  login(email, password) {
    return api.post('/login', { email, password })
  },

  register(userData) {
    return api.post('/register', userData)
  },

  getGoogleLoginUrl() {
    return api.get('/auth/google/redirect')
  },

  logout() {
    return api.post('/logout')
  },

  verifyOtp(email, otp) {
    return api.post('/verify-otp', { email: email, otp_code: otp })
  },

  // 🌟 បន្ថែមថ្មី: សម្រាប់សុំកូដ OTP ថ្មី
  resendOtp(email) {
    return api.post('/resend-otp', { email })
  },
}

