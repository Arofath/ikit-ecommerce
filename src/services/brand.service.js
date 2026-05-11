import api from './api'

export const brandService = {
  getStorefrontBrands() {
    return api.get('/brands')
  },
}
