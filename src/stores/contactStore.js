import { defineStore } from 'pinia'
import { ref } from 'vue'
import { contactService } from '@/services/contact.service'

export const useContactStore = defineStore('contact', () => {
  // State
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const submitContact = async (formData) => {
    isLoading.value = true
    error.value = null

    try {
      // ហៅ Service ដើម្បីបាញ់ទៅ Backend
      const response = await contactService.submitContactForm(formData)

      return {
        success: true,
        message: response.data.message || 'Message sent successfully',
      }
    } catch (err) {
      // ចាប់យក Error ពី Backend (ឧទាហរណ៍ Validation Error)
      if (err.response && err.response.data) {
        error.value = err.response.data.message || 'Failed to send message.'
      } else {
        error.value = 'Network error or server is down.'
      }

      console.error('Contact Form Error:', err)

      return {
        success: false,
        message: error.value,
      }
    } finally {
      // ទោះជោគជ័យ ឬបរាជ័យ ក៏ត្រូវបិទ Loading វិញ
      isLoading.value = false
    }
  }

  // Clear Error (ពេលគេវាយអក្សរថ្មីឱ្យបាត់ Error ចាស់)
  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    submitContact,
    clearError,
  }
})
