<template>
  <div class="min-h-screen bg-slate-50 py-10 px-4 font-sans">
    <div class="max-w-5xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">My Profile</h1>
        <p class="text-slate-500 mt-1">Manage your account information here</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
            <div class="relative inline-block group mb-4">
              <div
                class="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-md bg-slate-100 mx-auto relative"
              >
                <img :src="userProfileImage" alt="Profile" class="w-full h-full object-cover" />

                <div
                  v-if="profileStore.isUploadingImage"
                  class="absolute inset-0 bg-black/50 flex items-center justify-center text-white z-10"
                >
                  <i class="fas fa-spinner fa-spin text-2xl"></i>
                </div>

                <div
                  v-else
                  @click="triggerImageUpload"
                  class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                >
                  <i class="fas fa-camera text-2xl mb-1"></i>
                  <span class="text-xs font-medium">Update</span>
                </div>
              </div>

              <input
                type="file"
                ref="fileInput"
                @change="handleImageChange"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                class="hidden"
              />
            </div>

            <h2 class="text-xl font-bold text-slate-800 mb-1">{{ authStore.user?.name }}</h2>
            <p class="text-sm text-slate-500">{{ authStore.user?.email }}</p>
          </div>
        </div>

        <div class="md:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
            >
              <h3 class="text-lg font-bold text-slate-800">
                <i class="far fa-id-card text-blue-600 mr-2"></i>Account Details
              </h3>
            </div>

            <form @submit.prevent="handleUpdateProfile" class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    :value="authStore.user?.email"
                    type="email"
                    disabled
                    class="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    v-model="profileForm.phone_number"
                    type="text"
                    placeholder="Enter phone number"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">
                    {{ errors.phone_number[0] }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    v-model="profileForm.gender"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input
                    v-model="profileForm.date_of_birth"
                    type="date"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <textarea
                  v-model="profileForm.address"
                  rows="2"
                  placeholder="House number, street, village, district..."
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                ></textarea>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea
                  v-model="profileForm.bio"
                  rows="3"
                  placeholder="Tell us a bit about yourself..."
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                ></textarea>
              </div>

              <div class="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  :disabled="profileStore.isLoading"
                  class="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <i v-if="profileStore.isLoading" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-save"></i>
                  <span>{{ profileStore.isLoading ? 'Saving...' : 'Save Changes' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'
import Swal from 'sweetalert2'
import { computed, onMounted, reactive, ref } from 'vue'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const fileInput = ref(null)
const errors = ref({})

// 🌟 លុបពាក្យ 'position' ចេញពី Form
const profileForm = reactive({
  name: '',
  phone_number: '',
  gender: '',
  date_of_birth: '',
  address: '',
  bio: '',
})

const initFormData = () => {
  if (authStore.user) {
    profileForm.name = authStore.user.name || ''
    profileForm.phone_number = authStore.user.phone_number || ''
    profileForm.gender = authStore.user.profile?.gender || ''
    profileForm.date_of_birth = authStore.user.profile?.date_of_birth || ''
    profileForm.address = authStore.user.profile?.address || ''
    profileForm.bio = authStore.user.profile?.bio || ''
  }
}

onMounted(() => {
  initFormData()
})

const userProfileImage = computed(() => {
  const profileImg = authStore.user?.profile?.profile_image
  if (profileImg) return profileImg

  const name = authStore.user?.name || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`
})

const triggerImageUpload = () => {
  fileInput.value.click()
}

const handleImageChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    Swal.fire('File Too Large', 'Please select an image smaller than 2MB', 'warning')
    return
  }

  const result = await profileStore.uploadImage(file)

  if (result.success) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Profile image updated!',
      showConfirmButton: false,
      timer: 2000,
    })
  } else {
    Swal.fire('Error', result.error || 'Unable to upload image.', 'error')
  }

  event.target.value = ''
}

const handleUpdateProfile = async () => {
  errors.value = {}
  const result = await profileStore.updateProfile(profileForm)

  if (result.success) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Information saved!',
      showConfirmButton: false,
      timer: 2000,
    })
  } else if (result.validationErrors) {
    errors.value = result.validationErrors
  } else {
    Swal.fire('Error', result.error, 'error')
  }
}
</script>
