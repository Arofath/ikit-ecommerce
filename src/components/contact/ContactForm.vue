<template>
  <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h3 class="text-xl font-bold text-slate-800 mb-6">Send us a Message</h3>

    <div v-if="contactStore.error" class="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-start gap-2 border border-red-100">
      <span class="material-symbols-outlined text-[20px]">error</span>
      {{ contactStore.error }}
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006adc]/20 focus:border-[#006adc] outline-none transition-all text-sm" placeholder="John Doe">
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006adc]/20 focus:border-[#006adc] outline-none transition-all text-sm" placeholder="john@example.com">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
          <input v-model="form.phone" type="tel" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006adc]/20 focus:border-[#006adc] outline-none transition-all text-sm" placeholder="+855 12 345 678">
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Subject *</label>
          <input v-model="form.subject" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006adc]/20 focus:border-[#006adc] outline-none transition-all text-sm" placeholder="How can we help?">
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
        <textarea v-model="form.message" rows="5" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006adc]/20 focus:border-[#006adc] outline-none transition-all text-sm resize-none" placeholder="Write your message here..."></textarea>
      </div>

      <button 
        type="submit" 
        :disabled="contactStore.isLoading"
        class="w-full sm:w-auto px-8 py-3 bg-[#006adc] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      >
        <span v-if="contactStore.isLoading" class="material-symbols-outlined animate-spin text-[20px]">refresh</span>
        <span v-else class="material-symbols-outlined text-[20px]">send</span>
        {{ contactStore.isLoading ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useContactStore } from '@/stores/contactStore'
import Swal from 'sweetalert2'

const contactStore = useContactStore()

// State សម្រាប់ផ្ទុកទិន្នន័យពី Form
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// ពេលគាត់វាយអក្សរថ្មី លុប Error ចាស់ចោល
watch(form, () => {
  if (contactStore.error) contactStore.clearError()
}, { deep: true })

const handleSubmit = async () => {
  const result = await contactStore.submitContact(form)
  
  if (result.success) {
    // បង្ហាញ SweetAlert ពេលផ្ញើជោគជ័យ
    Swal.fire({
      icon: 'success',
      title: 'Sent Successfully!',
      text: result.message,
      confirmButtonColor: '#006adc',
      customClass: { popup: 'rounded-2xl' }
    })
    
    // Clear Form មកទទេវិញ
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  }
}
</script>