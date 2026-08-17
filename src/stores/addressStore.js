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
      // ឆែកមើលបើមិនមែនជា Array ឬគ្មានទិន្នន័យ ឱ្យ return null
      if (!Array.isArray(state.addresses) || state.addresses.length === 0) return null

      // 🌟 យកអាសយដ្ឋានដែលកំណត់ជា Default មុនគេ។
      // បើគាត់មិនធ្លាប់ Set Default ទេ យើងយកអាសយដ្ឋាននៅខាងលើគេ (index 0) ដែលជាអាសយដ្ឋានចុងក្រោយបំផុត។
      return state.addresses.find((address) => address.is_default === true) || state.addresses[0]
    },
  },

  actions: {
    async fetchAddresses() {
      this.isLoading = true
      try {
        const response = await AddressService.getAddresses()

        // 🌟 ដំណោះស្រាយការទាញយក Data ដែលត្រួតគ្នាជាច្រើនជាន់ (Bulletproof Extraction)
        let rawData = response.data

        if (Array.isArray(rawData)) {
          this.addresses = rawData
        } else if (rawData?.data && Array.isArray(rawData.data)) {
          this.addresses = rawData.data
        } else if (rawData?.data?.data && Array.isArray(rawData.data.data)) {
          // នេះគឺជាករណីជាក់ស្តែងក្នុងរូបភាពរបស់អ្នក!
          this.addresses = rawData.data.data
        } else {
          this.addresses = []
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load addresses'
      } finally {
        this.isLoading = false
      }
    },

    // 🌟 មុខងារថ្មី៖ កែប្រែអាសយដ្ឋាន
    async updateExistingAddress(id, addressData) {
      this.isLoading = true
      try {
        // សន្មតថា AddressService របស់អ្នកមានមុខងារ updateAddress
        // ឧ. updateAddress: (id, data) => api.put(`/addresses/${id}`, data)
        const response = await AddressService.updateAddress(id, addressData)

        await this.fetchAddresses() // ទាញទិន្នន័យសាជាថ្មី ដើម្បី Update UI
        return response.data
      } catch (error) {
        throw error
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
