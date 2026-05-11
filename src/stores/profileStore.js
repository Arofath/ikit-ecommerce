import { defineStore } from 'pinia'
import { profileService } from '@/services/profile.service'
import { useAuthStore } from '@/stores/authStore'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    isLoading: false,
    error: null,
  }),

  actions: {
    // 🌟 ១. ទាញយក Profile ពី Server (ប្រើពេល Load ទំព័រ Profile ដំបូង)
    async fetchProfile() {
      this.isLoading = true
      this.error = null
      try {
        const response = await profileService.getProfile()
        if (response.data.success) {
          const authStore = useAuthStore()
          authStore.updateUser(response.data.data) // Update ទិន្នន័យទៅ authStore
          return { success: true }
        }
      } catch (err) {
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 ២. កែប្រែទិន្នន័យ Profile
    async updateProfile(profileData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await profileService.updateProfile(profileData)
        if (response.data.success) {
          const authStore = useAuthStore()
          // ដោយសារ Laravel បោះ new UserResource មកវិញ យើងអាច Update ផ្ទាល់បានតែម្តង
          authStore.updateUser(response.data.data)
          return { success: true }
        }
      } catch (err) {
        // ចាប់យក Validation Error ពី Laravel (ឧ. វាយអក្សរវែងពេក)
        if (err.response && err.response.status === 422) {
          return { success: false, validationErrors: err.response.data.errors }
        }
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 ៣. បញ្ចូលរូបភាព Profile ថ្មី
    async uploadImage(file) {
      this.isLoading = true
      this.error = null
      try {
        const response = await profileService.uploadImage(file)
        if (response.data.success) {
          const authStore = useAuthStore()
          authStore.updateUser(response.data.data) // ទាញយករូបភាពថ្មីមកបង្ហាញភ្លាមៗ
          return { success: true }
        }
      } catch (err) {
        if (err.response && err.response.status === 422) {
          return { success: false, validationErrors: err.response.data.errors }
        }
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារជំនួយសម្រាប់ចាប់ Error
    handleError(err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.error = err.response.data.message
      } else {
        this.error = 'Something went wrong. Please try again later.'
      }
    },
  },
})
