import { defineStore } from 'pinia'
// 🌟 ទាញយក service ដែលយើងទើបបង្កើត
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // ទាញ User ចេញពី localStorage ហើយបំប្លែងពី String មកជា Object វិញ
    user: JSON.parse(localStorage.getItem('user_info')) || null,
    token: localStorage.getItem('access_token') || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    // 🌟 ១. មុខងារសម្រាប់ Local Login (សម្រាប់តែ Customer ប៉ុណ្ណោះ)
    async login(email, password) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(email, password)

        // ក. ករណីវាយ Password ត្រូវ និងមាន Token (អាចជា Customer, ឬ Admin ដែល Bypass OTP)
        if (response.data.success && response.data.data.token) {
          const { user, token } = response.data.data

          // 🛡️ របាំងសុវត្ថិភាពទី ១៖ បិទមិនឱ្យ Admin និង Role ផ្សេងៗចូល
          if (user.role !== 'customer') {
            this.error =
              'This account does not have permission to log in here. Please use the appropriate login portal.'
            return { success: false, error: this.error }
          }

          // បើជា Customer ពិតប្រាកដ ទើបអនុញ្ញាតឱ្យ Save និង Login
          this.setAuthData(user, token)
          return { success: true }
        }

        // ខ. ករណី Admin វាយត្រូវ តែទាមទារ 2FA (ជាប់ OTP)
        // Backend បោះ requires_2fa មក តែអត់មាន Token ទេ
        if (response.data.success && response.data.data.requires_2fa) {
          this.error =
            'This account requires two-factor authentication. Please complete the verification process.'
          return { success: false, error: this.error }
        }
      } catch (err) {
        // ចាប់ Error ពី Backend ដូចជា Password ខុស ឬ Email មិនត្រឹមត្រូវ
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'There was an error connecting to the server. Please try again later.'
        }
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារសម្រាប់ Register ថ្មី
    async register(userData) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.register(userData)

        // ក. ករណី Bypass OTP (មាន Token និង User ត្រឡប់មកវិញ)
        if (response.data.success && response.data.data.token) {
          const { user, token } = response.data.data
          this.setAuthData(user, token) // រក្សាទុក និងចាត់ទុកថា Login រួចរាល់
          return { success: true, requiresOtp: false }
        }

        // ខ. ករណីធម្មតា (ត្រូវ Verify OTP) - អត់មាន Token ទេ តែមាន email និង user_id
        if (response.data.success && response.data.data.email) {
          return {
            success: true,
            requiresOtp: true,
            email: response.data.data.email,
          }
        }

        return { success: false, error: 'Registration Failed' }
      } catch (err) {
        // ចាប់ Error Validation ពី Laravel (ឧ. Email ជាន់គ្នា, លេខទូរស័ព្ទជាន់គ្នា)
        if (err.response && err.response.status === 422) {
          return { success: false, validationErrors: err.response.data.errors }
        } else if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'There was an error connecting to the server. Please try again later.'
        }
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async verifyOtp(email, otp) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.verifyOtp(email, otp)

        // ប្រសិនបើកូដត្រឹមត្រូវ Backend នឹងបោះ Token និងព័ត៌មាន User មកឱ្យ
        if (response.data.success && response.data.data.token) {
          const { user, token } = response.data.data

          // រក្សាទុក Token និង User រួចចាត់ទុកថា Login បានជោគជ័យ
          this.setAuthData(user, token)
          return { success: true }
        }

        return { success: false, error: 'Verification Failed' }
      } catch (err) {
        // ចាប់ Error ពេលវាយកូដខុស ឬកូដផុតកំណត់
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server។ សូមព្យាយាមម្តងទៀត។'
        }
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារថ្មីសម្រាប់ Update តែទិន្នន័យ User (មិនប៉ះពាល់ Token)
    updateUser(user) {
      this.user = user
      // Update ចូល localStorage ដើម្បីកុំឱ្យបាត់ពេល Refresh
      localStorage.setItem('user_info', JSON.stringify(user))
    },

    // 🌟 ២. មុខងាររក្សាទុកទិន្នន័យពេល Login ជោគជ័យ
    setAuthData(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('access_token', token)
      localStorage.setItem('user_info', JSON.stringify(user)) // ត្រូវ stringify ព្រោះវាជា Object
    },

    // 🌟 ៣. មុខងារសម្អាតទិន្នន័យ (ហៅនៅពេល Logout ឬពេល Token ផុតកំណត់ក្នុង api.js)
    clearAuthData() {
      this.user = null
      this.token = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_info')
    },

    // 🌟 ៤. មុខងារ Logout
    async logout() {
      try {
        await authService.logout() // ប្រាប់ Backend ឱ្យលុប Token នោះចោល
      } catch (e) {
        console.error('Logout failed on server')
      } finally {
        // ទោះ Backend ជោគជ័យឬបរាជ័យ ក៏ត្រូវលុបនៅ Frontend ចោលដែរ
        this.clearAuthData()
      }
    },
  },
})
