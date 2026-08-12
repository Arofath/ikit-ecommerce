import api from './api' // file axios របស់អ្នក

export const shippingZoneService = {
  getAllZones() {
    return api.get('/shipping-zones')
  },
}
