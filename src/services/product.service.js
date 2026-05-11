import api from './api'

export const productService = {
  getProducts(params = {}) {
    return api.get(`/products`, { params: params })
  },

  getProductDetail(slug) {
    return api.get(`/products/${slug}`)
  },

  getRelatedProducts(slug) {
    return api.get(`/products/${slug}/related`)
  },
}
