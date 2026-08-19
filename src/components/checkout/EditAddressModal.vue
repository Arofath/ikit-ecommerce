<template>
  <div class="fixed inset-0 z-100 flex items-center justify-center print:hidden">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
    <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in-up">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 class="text-lg font-bold text-slate-800">Edit Shipping Address</h3>
        <button @click="closeModal" class="text-slate-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 cursor-pointer">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Receiver Name *</label>
            <input v-model="editForm.shipping_name" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input v-model="editForm.shipping_phone" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div class="relative">
          <label class="block text-sm font-medium text-slate-700 mb-1">City / Province (Shipping Zone) *</label>
          <div
            class="w-full px-3 py-2 border rounded-lg flex justify-between items-center transition-colors"
            :class="isPaid ? 'bg-slate-100 border-slate-200 cursor-not-allowed text-slate-500' : 'bg-white border-slate-300 cursor-pointer hover:border-blue-500'"
            @click="!isPaid ? (isDropdownOpen = !isDropdownOpen) : null"
          >
            <span>{{ selectedEditZoneName || 'Select Shipping Zone' }}</span>
            <i v-if="!isPaid" class="fas fa-chevron-down text-slate-400 text-xs"></i>
            <i v-else class="fas fa-lock text-slate-400 text-xs" title="Locked due to payment"></i>
          </div>

          <p v-if="isPaid" class="text-xs text-amber-600 mt-1.5 flex items-start gap-1">
            <i class="fas fa-info-circle mt-0.5"></i> Cannot change province/city because this order is already paid.
          </p>

          <div v-if="isDropdownOpen && !isPaid" class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
            <div class="p-2 border-b border-slate-100 bg-slate-50">
              <input v-model="searchQuery" type="text" placeholder="Search zone..." class="w-full px-3 py-1.5 border border-slate-200 rounded text-sm outline-none" autofocus />
            </div>
            <ul class="max-h-48 overflow-y-auto py-1">
              <li v-if="isLoadingZones" class="px-4 py-2 text-sm text-center text-slate-500"><i class="fas fa-spinner fa-spin"></i></li>
              <li v-else-if="filteredZones.length === 0" class="px-4 py-2 text-sm text-center text-slate-500">No zone found</li>
              <li v-else v-for="zone in filteredZones" :key="zone.id" @click="selectEditZone(zone)" class="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer" :class="{ 'bg-blue-50 font-bold text-blue-700': editForm.shipping_zone_id === zone.id }">
                {{ zone.name }}
              </li>
            </ul>
          </div>
          <div v-if="isDropdownOpen && !isPaid" @click="isDropdownOpen = false" class="fixed inset-0 z-40"></div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Address Details *</label>
          <textarea v-model="editForm.shipping_address" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="House #, Street..."></textarea>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
        <button @click="closeModal" class="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors cursor-pointer" :disabled="isSavingAddress">Cancel</button>
        <button @click="submitAddressUpdate" class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50" :disabled="isSavingAddress || !isFormValid">
          <i v-if="isSavingAddress" class="fas fa-spinner fa-spin"></i>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { shippingZoneService } from '@/services/shippingZone.service'
import Swal from 'sweetalert2'

const emit = defineEmits(['close'])
const orderStore = useOrderStore()

const isSavingAddress = ref(false)
const shippingZones = ref([])
const isLoadingZones = ref(false)
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const editForm = reactive({
  shipping_name: '',
  shipping_phone: '',
  shipping_address: '',
  shipping_zone_id: '',
})

onMounted(async () => {
  const order = orderStore.currentOrder
  if (order) {
    editForm.shipping_name = order.shipping_name
    editForm.shipping_phone = order.shipping_phone
    editForm.shipping_address = order.shipping_address
    editForm.shipping_zone_id = order.shipping_zone_id || order.shippingZone?.id || order.shipping_zone?.id
  }
  await fetchZones()
})

const isPaid = computed(() => ['PAID', 'COMPLETED'].includes(orderStore.currentOrder?.payment_status))

const fetchZones = async () => {
  try {
    isLoadingZones.value = true
    const response = await shippingZoneService.getAllZones()
    shippingZones.value = (response.data.data || response.data).filter((z) => z.is_active)
  } catch (error) {
    console.error('Failed to fetch zones', error)
  } finally {
    isLoadingZones.value = false
  }
}

const selectedEditZoneName = computed(() => shippingZones.value.find((z) => z.id === editForm.shipping_zone_id)?.name || '')
const filteredZones = computed(() => {
  if (!searchQuery.value) return shippingZones.value
  const q = searchQuery.value.toLowerCase()
  return shippingZones.value.filter((z) => z.name.toLowerCase().includes(q))
})

const selectEditZone = (zone) => {
  editForm.shipping_zone_id = zone.id
  isDropdownOpen.value = false
  searchQuery.value = ''
}

const isFormValid = computed(() => editForm.shipping_name && editForm.shipping_phone && editForm.shipping_address && editForm.shipping_zone_id)

const submitAddressUpdate = async () => {
  isSavingAddress.value = true
  const result = await orderStore.updateOrderAddress(orderStore.currentOrder.id, editForm)
  isSavingAddress.value = false

  if (result.success) {
    closeModal()
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Address Updated', text: 'Shipping details have been recalculated.', showConfirmButton: false, timer: 3000 })
  } else {
    Swal.fire('Error', result.error || 'Failed to update address', 'error')
  }
}

const closeModal = () => {
  if (!isSavingAddress.value) emit('close')
}
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>