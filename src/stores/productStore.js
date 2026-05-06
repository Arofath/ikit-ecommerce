// src/stores/product.store.js
import { defineStore } from 'pinia'
import { productService } from '@/services/product.service'

export const useProductStore = defineStore('product', {
  state: () => ({
    // 🌟 ទុកទិន្នន័យ Product ដែលកំពុងមើលបច្ចុប្បន្ន
    currentProduct: null,

    // 🌟 សម្រាប់គ្រប់គ្រង UI
    isLoading: false,
    error: null,
  }),

  getters: {
    hasProduct: (state) => !!state.currentProduct,

    // 🌟 ១. ជួសជុល Getter សម្រាប់រូបភាព
    galleryImages: (state) => {
      if (!state.currentProduct) return []

      // ដោយសារ JSON របស់អ្នកអោយមកជា Array of Strings ស្រាប់: ["https://...", "https://..."]
      if (state.currentProduct.images && state.currentProduct.images.length > 0) {
        // យើងគ្រាន់តែ Return វាផ្ទាល់តែម្តង មិនបាច់ Map រក image_path ទៀតទេ
        return state.currentProduct.images
      }

      // បើគ្មានរូបសោះ ដាក់រូបភាព Default នេះ (ព្រោះ API អត់មានពាក្យ thumbnail ទេ)
      return ['/default-placeholder.png']
    },

    mainCategory: (state) => {
      if (!state.currentProduct || !state.currentProduct.categories) return null
      return state.currentProduct.categories[0]
    },
  },

  actions: {
    async fetchProductBySlug(slug) {
      this.currentProduct = null
      this.isLoading = true
      this.error = null

      try {
        const response = await productService.getProductDetail(slug)

        // 🌟 ២. បន្ថែម Console.log នៅទីនេះដើម្បីត្រួតពិនិត្យទិន្នន័យ
        console.log('✅ API Response Data:', response.data)

        this.currentProduct = response.data.data
      } catch (err) {
        console.error('❌ Failed to load product detail:', err)
        // បន្ថែម Console ឱ្យលម្អិតជាងមុន ងាយស្រួលរកកំហុស
        console.log('Error Details:', err.response || err.message)

        if (err.response && err.response.status === 404) {
          this.error = 'រកមិនឃើញទំនិញដែលអ្នកកំពុងស្វែងរកទេ!'
        } else {
          this.error = 'មានបញ្ហាក្នុងការទាញទិន្នន័យ! សូមព្យាយាមម្តងទៀត។'
        }
      } finally {
        this.isLoading = false
      }
    },

    clearProduct() {
      this.currentProduct = null
      this.error = null
    },
  },
})
