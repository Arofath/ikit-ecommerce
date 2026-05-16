import api from './api' // ទាញយកការកំណត់ Axios ដែលមានស្រាប់

export const contactService = {
  submitContactForm(contactData) {
    return api.post('/contacts', contactData)
  },
}
