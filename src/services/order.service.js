import api from './api'

export default {
  // ទាញយកប្រវត្តិទិញ
  getOrders(status = 'ALL', page = 1) {
    return api.get('/orders', {
      params: {
        status,
        page,
      },
    })
  },

  // មើលវិក្កយបត្រលម្អិត
  getOrderById(id) {
    return api.get(`/orders/${id}`)
  },

  // បញ្ជាទិញ
  checkout(data) {
    return api.post('/orders/checkout', data)
  },

  // Update Order Address
  updateOrderAddress(id, data) {
    return api.put(`/orders/${id}/address`, data)
  },

}
