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

  resendOtp(email) {
    return api.post('/resend-otp', { email })
  },

  forgotPassword(email) {
    return api.post('/forgot-password', { email })
  },

  resetPassword(data) {
    // data ត្រូវមាន: email, otp_code, password, password_confirmation
    return api.post('/reset-password', data)
  },
}

