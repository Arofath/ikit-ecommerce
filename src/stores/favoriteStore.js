import { defineStore } from 'pinia'
import { favoriteService } from '@/services/favorite.service'

export const useFavoriteStore = defineStore('favorite', {
  // 🌟 ១. State (កន្លែងផ្ទុកទិន្នន័យ)
  state: () => ({
    favorites: [],
    isLoading: false,
    error: null,
  }),

  // 🌟 ២. Getters (សម្រាប់ទាញទិន្នន័យយកទៅប្រើលឿនៗ)
  getters: {
    // រាប់ចំនួនទំនិញក្នុង Favorite (ឧ. សម្រាប់បង្ហាញលើ Header)
    totalFavorites: (state) => state.favorites.length,

    // ឆែកមើលថាតើ Product ID ណាមួយស្ថិតក្នុង Favorite ដែរឬទេ (ត្រឡប់ជា true / false)
    isFavorite: (state) => {
      return (productId) => state.favorites.some((fav) => fav.product_id === productId)
    },
  },

  // 🌟 ៣. Actions (មុខងារបញ្ជាទៅកាន់ Service)
  actions: {
    // មុខងារទាញយកបញ្ជី Favorite (ហៅប្រើពេល Login ចូល)
    async fetchFavorites() {
      this.isLoading = true
      this.error = null
      try {
        const response = await favoriteService.getFavorites()
        if (response.data.success) {
          this.favorites = response.data.data
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារ Toggle Favorite (Optimistic Update - ដើរលឿនភ្លាមៗ)
    async toggleFavorite(product) {
      // ១. រក្សាទុកទិន្នន័យចាស់សិន ក្រែងលោ API Error
      const oldFavorites = [...this.favorites]

      // ២. ស្វែងរកទីតាំងរបស់ទំនិញនេះក្នុង State
      const existingIndex = this.favorites.findIndex((fav) => fav.product_id === product.id)

      let isNowFavorite = false

      // ៣. Update លើអេក្រង់ភ្លាមៗដោយមិនបាច់ចាំ API
      if (existingIndex !== -1) {
        // បើមានហើយ -> លុបចេញ
        this.favorites.splice(existingIndex, 1)
        isNowFavorite = false
      } else {
        // បើមិនទាន់មាន -> បន្ថែមចូល (បង្កើត Object បណ្តោះអាសន្ន)
        this.favorites.unshift({
          id: 'temp-' + Date.now(),
          product_id: product.id,
          product: product,
        })
        isNowFavorite = true
      }

      this.error = null

      try {
        // ៤. បាញ់ API ទៅ Backend ដោយស្ងាត់ៗ
        const response = await favoriteService.toggleFavorite(product.id)

        if (response.data.success) {
          // 🌟 ប្រសិនបើ Add ចូល Favorite ជោគជ័យ យើងយកទិន្នន័យពិតពី Database (ដែលមានរូបភាព) មកជំនួសរបស់បណ្តោះអាសន្ន
          if (response.data.is_favorite && response.data.data) {
            const index = this.favorites.findIndex((fav) => fav.product_id === product.id)
            if (index !== -1) {
              this.favorites[index] = response.data.data
            }
          }
          return { success: true, is_favorite: response.data.is_favorite }
        }
      } catch (err) {
        // ៥. បើ API Error ត្រូវទាញទិន្នន័យត្រឡប់មកដើមវិញ
        this.favorites = oldFavorites
        this.handleError(err)
        return { success: false, error: this.error }
      }
    },

    // មុខងារសម្រាប់ចាប់ Error ទូទៅ
    handleError(err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.error = err.response.data.message
      } else {
        this.error = 'មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server។'
      }
    },
  },
})
