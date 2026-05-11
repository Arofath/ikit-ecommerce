import api from './api'

export const cartService = {
  // ១. ទាញយកទិន្នន័យកន្ត្រកបច្ចុប្បន្ន
  getCart() {
    return api.get('/cart')
  },

  // ២. បន្ថែមទំនិញចូលកន្ត្រក (ស្តង់ដារ quantity គឺ 1)
  addItem(productId, quantity = 1) {
    return api.post('/cart/add', { product_id: productId, quantity })
  },

  // ៣. កែប្រែចំនួនទំនិញក្នុងកន្ត្រក (+ ឬ -)
  updateItem(itemId, quantity) {
    return api.put(`/cart/item/${itemId}`, { quantity })
  },

  // ៤. លុបទំនិញណាមួយចេញពីកន្ត្រក
  removeItem(itemId) {
    return api.delete(`/cart/item/${itemId}`)
  },

  // ៥. សម្អាតកន្ត្រកទាំងមូល (Clear Cart)
  clearCart() {
    return api.delete('/cart/clear')
  },
}
