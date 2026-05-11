import api from './api'

export const profileService = {
  // ១. ទាញយកទិន្នន័យ Profile បច្ចុប្បន្ន
  getProfile() {
    return api.get('/me/profile')
  },

  // ២. កែប្រែព័ត៌មាន Profile (Name, Gender, DOB, Address, etc.)
  updateProfile(data) {
    return api.put('/me/profile', data)
  },

  // ៣. បញ្ចូលរូបភាព Profile
  uploadImage(imageFile) {
    const formData = new FormData()
    formData.append('image', imageFile)

    // យើងត្រូវប្រាប់ Axios ថាវាមិនមែនជា JSON ទេ តែវាជា File (multipart/form-data)
    return api.post('/me/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
