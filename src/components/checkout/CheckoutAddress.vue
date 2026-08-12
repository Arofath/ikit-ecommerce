<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-slate-800">Shipping Address</h2>

      <button
        v-if="addressStore.defaultAddress"
        @click="toggleEditMode"
        class="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
      >
        {{ isEditing ? 'Cancel' : 'Change Address' }}
      </button>
    </div>

    <!-- បង្ហាញអាសយដ្ឋានចាស់ដែលមានស្រាប់ -->
    <div
      v-if="!isEditing && addressStore.defaultAddress"
      class="border-2 border-blue-500 bg-blue-50/50 p-4 rounded-lg"
    >
      <p class="font-bold text-slate-900 text-lg">
        {{ addressStore.defaultAddress.receiver_name }}
      </p>
      <p class="text-slate-700 mt-1">📞 {{ addressStore.defaultAddress.receiver_phone }}</p>
      <p class="text-slate-600 mt-1">📍 {{ addressStore.defaultAddress.full_address }}</p>
      <!-- បង្ហាញសារព្រមានបើអាសយដ្ឋានចាស់មិនទាន់មាន Zone -->
      <p v-if="!matchedDefaultZoneId" class="text-xs text-amber-600 mt-2 flex items-center gap-1">
        <i class="fas fa-exclamation-circle"></i> Please click 'Change Address' to re-select your
        shipping zone.
      </p>
    </div>

    <!-- ទម្រង់វាយអាសយដ្ឋានថ្មី -->
    <div v-else class="space-y-4 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Receiver Name *</label>
          <input
            v-model="form.receiver_name"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <input
            v-model="form.receiver_phone"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          />
        </div>
      </div>

      <!-- 🌟 ប្រអប់ជ្រើសរើស Shipping Zone ពី API -->
      <div class="relative">
        <label class="block text-sm font-medium text-slate-700 mb-1"
          >City / Province (Shipping Zone) *</label
        >

        <div
          @click="isDropdownOpen = !isDropdownOpen"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg cursor-pointer bg-white flex justify-between items-center hover:border-blue-500 transition-colors"
          :class="{ 'ring-2 ring-blue-600 border-blue-600': isDropdownOpen }"
        >
          <span :class="form.shipping_zone_id ? 'text-slate-900 font-medium' : 'text-slate-400'">
            {{ selectedZoneName || 'Select Shipping Zone' }}
          </span>
          <i
            class="fas fa-chevron-down text-slate-400 text-sm transition-transform duration-200"
            :class="{ 'rotate-180': isDropdownOpen }"
          ></i>
        </div>

        <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-40"></div>

        <div
          v-if="isDropdownOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-fade-in"
        >
          <div class="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
            <div class="relative">
              <i
                class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
              ></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search zone..."
                class="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                autofocus
              />
            </div>
          </div>

          <ul class="max-h-60 overflow-y-auto py-1">
            <li v-if="isLoadingZones" class="px-4 py-3 text-sm text-slate-500 text-center">
              <i class="fas fa-spinner fa-spin mr-2"></i> Loading zones...
            </li>
            <li
              v-else-if="filteredZones.length === 0"
              class="px-4 py-3 text-sm text-slate-500 text-center"
            >
              No shipping zone found.
            </li>
            <li
              v-else
              v-for="zone in filteredZones"
              :key="zone.id"
              @click="selectZone(zone)"
              class="px-4 py-2.5 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
              :class="{
                'bg-blue-50 text-blue-700 font-semibold': form.shipping_zone_id === zone.id,
              }"
            >
              <span>{{ zone.name }}</span>
              <i v-if="form.shipping_zone_id === zone.id" class="fas fa-check text-blue-600"></i>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Address Details *</label>
        <textarea
          v-model="form.address_detail"
          rows="2"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
          placeholder="House #, Street..."
        ></textarea>
      </div>

      <div class="flex items-center pt-2">
        <input
          v-model="saveAddress"
          type="checkbox"
          id="save_addr"
          class="w-4 h-4 text-blue-600 rounded cursor-pointer border-slate-300 focus:ring-blue-500"
        />
        <label for="save_addr" class="ml-2 text-sm text-slate-700 cursor-pointer">
          Save this address for next time
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shippingZoneService } from '@/services/shippingZone.service'; // 🌟 Import API Service ថ្មី
import { useAddressStore } from '@/stores/addressStore'
import { useAuthStore } from '@/stores/authStore'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const emit = defineEmits(['update-address'])
const addressStore = useAddressStore()
const authStore = useAuthStore()

const isEditing = ref(false)
const saveAddress = ref(true)

const isDropdownOpen = ref(false)
const searchQuery = ref('')
const shippingZones = ref([]) // 🌟 ផ្ទុកទិន្នន័យពី API
const isLoadingZones = ref(false)

// 🌟 ទាញយកឈ្មោះ Zone ដែលបានរើស
const selectedZoneName = computed(() => {
  const zone = shippingZones.value.find((z) => z.id === form.shipping_zone_id)
  return zone ? zone.name : ''
})

// 🌟 ចម្រាញ់ទិន្នន័យ Zone ពី API
const filteredZones = computed(() => {
  if (!searchQuery.value) return shippingZones.value

  const query = searchQuery.value.toLowerCase()
  return shippingZones.value.filter((z) => z.name.toLowerCase().includes(query))
})

// 🌟 ស្វែងរក Zone ID ស្វ័យប្រវត្តិ សម្រាប់អាសយដ្ឋានចាស់ (Backward Compatibility)
const matchedDefaultZoneId = computed(() => {
  if (!addressStore.defaultAddress || !addressStore.defaultAddress.city) return null
  const oldCityName = addressStore.defaultAddress.city.toLowerCase()
  const matched = shippingZones.value.find((z) => z.name.toLowerCase() === oldCityName)
  return matched ? matched.id : null
})

const selectZone = (zone) => {
  form.shipping_zone_id = zone.id // 🌟 Save ID ជំនួសអោយឈ្មោះ
  isDropdownOpen.value = false
  searchQuery.value = ''
}

const form = reactive({
  receiver_name: '',
  receiver_phone: '',
  shipping_zone_id: '', // 🌟 ដូរពី city ទៅជា shipping_zone_id
  address_detail: '',
})

onMounted(async () => {
  // 🌟 ១. ទាញយកបញ្ជី Shipping Zones ពី Backend ជាមុនសិន
  try {
    isLoadingZones.value = true
    const response = await shippingZoneService.getAllZones()
    // យកតែ Zone ណាដែលកំពុងបើកដំណើរការ (Active) មកបង្ហាញ
    shippingZones.value = (response.data.data || response.data).filter((z) => z.is_active)
  } catch (error) {
    console.error('Failed to load shipping zones:', error)
  } finally {
    isLoadingZones.value = false
  }

  // 🌟 ២. ទាញយកអាសយដ្ឋានចាស់
  await addressStore.fetchAddresses()

  const savedDraft = localStorage.getItem('checkout_draft')

  if (savedDraft) {
    const parsedDraft = JSON.parse(savedDraft)
    form.receiver_name = parsedDraft.receiver_name || authStore.user?.name || ''
    form.receiver_phone = parsedDraft.receiver_phone || authStore.user?.phone_number || ''
    form.shipping_zone_id = parsedDraft.shipping_zone_id || '' // 🌟
    form.address_detail = parsedDraft.address_detail || ''
  } else {
    form.receiver_name = authStore.user?.name || ''
    form.receiver_phone = authStore.user?.phone || ''
  }

  if (!addressStore.defaultAddress) {
    isEditing.value = true
  }

  emitCurrentState()
})

watch(
  () => addressStore.defaultAddress,
  (newAddress) => {
    if (newAddress) {
      isEditing.value = false
      emitCurrentState()
    }
  },
)

const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  emitCurrentState()
}

watch(
  () => [
    form.receiver_name,
    form.receiver_phone,
    form.shipping_zone_id,
    form.address_detail,
    isEditing.value,
    saveAddress.value,
  ],
  () => {
    localStorage.setItem(
      'checkout_draft',
      JSON.stringify({
        receiver_name: form.receiver_name,
        receiver_phone: form.receiver_phone,
        shipping_zone_id: form.shipping_zone_id, // 🌟
        address_detail: form.address_detail,
      }),
    )
    emitCurrentState()
  },
)

const emitCurrentState = () => {
  let isValid
  let finalData

  // 🌟 បង្កើតមុខងារតូចមួយដើម្បីទាញយកទិន្នន័យ Zone ទាំងមូល (មាន Base Cost & Threshold)
  const getZoneData = (id) => shippingZones.value.find((z) => z.id === id) || null

  if (!isEditing.value && addressStore.defaultAddress) {
    isValid = !!matchedDefaultZoneId.value

    finalData = {
      shipping_name: addressStore.defaultAddress.receiver_name,
      shipping_phone: addressStore.defaultAddress.receiver_phone,
      shipping_address: addressStore.defaultAddress.full_address,
      shipping_zone_id: matchedDefaultZoneId.value,
      shipping_zone_data: getZoneData(matchedDefaultZoneId.value), // 🌟 បោះទិន្នន័យ Zone លម្អិតទៅក្រៅ
      is_new: false,
    }
  } else {
    isValid = !!(
      form.receiver_name &&
      form.receiver_phone &&
      form.shipping_zone_id &&
      form.address_detail
    )

    finalData = {
      shipping_name: form.receiver_name,
      shipping_phone: form.receiver_phone,
      shipping_address: form.address_detail,
      shipping_zone_id: form.shipping_zone_id,
      shipping_zone_data: getZoneData(form.shipping_zone_id), // 🌟 បោះទិន្នន័យ Zone លម្អិតទៅក្រៅ
      is_new: true,
      save_to_db: saveAddress.value,
      raw_form: { ...form },
    }
  }

  emit('update-address', { isValid, data: finalData })
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
