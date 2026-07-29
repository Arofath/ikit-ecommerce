import api from './api' // file axios របស់អ្នក

export const frontWarrantyService = {
  checkWarranty(serialNumber) {
    return api.get('/warranty-check', {
      params: { serial_number: serialNumber },
    })
  },
}
