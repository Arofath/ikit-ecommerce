import { defineStore } from 'pinia'
import AddressService from '@/services/address.service'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    defaultAddress: (state) => {
      if (!Array.isArray(state.addresses)) return null

      return state.addresses.find((address) => address.is_default === true) || null
    },
  },

  actions: {
    async fetchAddresses() {
      this.isLoading = true
      try {
        const response = await AddressService.getAddresses()
        console.log(response.data)
        this.addresses = response.data?.data || response.data || []
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load addresses'
      } finally {
        this.isLoading = false
      }
    },

    async createNewAddress(addressData) {
      this.isLoading = true
      try {
        const response = await AddressService.addAddress(addressData)
        await this.fetchAddresses() // Update លើអេក្រង់ឡើងវិញ
        return response.data
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារថ្មី៖ កំណត់ជា Default
    async setAddressAsDefault(id) {
      this.isLoading = true
      try {
        await AddressService.setAsDefault(id)
        await this.fetchAddresses() // ទាញទិន្នន័យសាជាថ្មី ដើម្បីឱ្យវា Update UI
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារថ្មី៖ លុបអាសយដ្ឋាន
    async removeAddress(id) {
      this.isLoading = true
      try {
        await AddressService.deleteAddress(id)
        // លុបចេញពី State ដោយមិនបាច់ហៅ API fetch ម្តងទៀត (ដើម្បិលឿន)
        this.addresses = this.addresses.filter((addr) => addr.id !== id)
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
