import api from './api'

export default {
  // ទាញយកអាសយដ្ឋានទាំងអស់
  getAddresses() {
    return api.get('/addresses')
  },
  // បញ្ចូលអាសយដ្ឋានថ្មី
  addAddress(data) {
    return api.post('/addresses', data)
  },

  setAsDefault(id) {
    return api.patch(`/addresses/${id}/set-default`)
  },
 
  deleteAddress(id) {
    return api.delete(`/addresses/${id}`)
  },
}
