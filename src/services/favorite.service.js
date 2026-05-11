import api from './api'

export const favoriteService = {
  // ១. ទាញយកបញ្ជីទំនិញ Favorite ទាំងអស់
  getFavorites() {
    return api.get('/favorites')
  },

  // ២. ចុច Add ឬ Remove ក្នុងពេលតែមួយ (Toggle)
  toggleFavorite(productId) {
    return api.post('/favorites/toggle', { product_id: productId })
  },
}
