import api from './api' // 🌟 Import Axios ចេញពី api.js ដែលយើងទើបបង្កើត

export const productService = {
  getProductDetail(slug) {
    return api.get(`/products/${slug}`)
  },
}
