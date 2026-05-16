import api from './api'

export default {
  // 🌟 ទាញយកប្រវត្តិទិញ (អាចបញ្ជូនលេខទំព័របាន)
  getOrders(status = 'ALL', page = 1) {
    return api.get('/orders', {
      params: {
        status: status,
        page: page,
      },
    })
  },
  // 🌟 មើលវិក្កយបត្រលម្អិត
  getOrderById(id) {
    return api.get(`/orders/${id}`)
  },
  // 🌟 បញ្ជាទិញ
  checkout(data) {
    return api.post('/orders/checkout', data)
  },
}
