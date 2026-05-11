import api from './api'

export const categoryService = {
  getStorefrontCategories() {
    return api.get('/categories')
  },
}
