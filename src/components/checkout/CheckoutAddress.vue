<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-slate-800">Shipping Address</h2>

<button
        v-if="addressStore.defaultAddress"
        @click="isEditing ? toggleEditMode() : editCurrentAddress()"
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

       <!-- 🌟 ផែនទីជ្រើសរើសទីតាំងពិតប្រាកដ -->
       <div v-if="isEditing || !addressStore.defaultAddress" class="space-y-2">
         <label class="block text-sm font-medium text-slate-700 mb-1">Select Location on Map</label>
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              v-model="mapSearchQuery"
              type="text"
              placeholder="Search your address..."
              class="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              @keydown.enter.prevent="searchMapLocation"
              @input="onMapSearchInput"
            />
            <button
              v-if="mapSearchQuery"
              @click="searchMapLocation"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 text-xs font-medium"
            >
              Search
            </button>
          </div>
         <div v-if="isSearchingMap" class="text-xs text-slate-500">Searching...</div>
         <div v-if="mapSearchResults.length > 0 && !isSearchingMap" class="bg-white border border-slate-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
           <div
             v-for="(result, index) in mapSearchResults"
             :key="index"
             @click="selectMapSearchResult(result)"
             class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-100 last:border-b-0"
           >
             {{ result.display_name }}
           </div>
         </div>
           <div ref="mapContainer" class="w-full h-64 rounded-lg border border-slate-200 overflow-hidden relative z-10 bg-slate-100 cursor-crosshair"></div>
           <p v-if="selectedMapAddress" class="text-xs text-slate-500 truncate">Selected: {{ selectedMapAddress }}</p>
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
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const emit = defineEmits(['update-address'])
const addressStore = useAddressStore()
const authStore = useAuthStore()

const isEditing = ref(false)
const saveAddress = ref(true)

const isDropdownOpen = ref(false)
const searchQuery = ref('')
const shippingZones = ref([]) // 🌟 ផ្ទុកទិន្នន័យពី API
const isLoadingZones = ref(false)

// 🌟 Map related refs
const mapContainer = ref(null)
const map = ref(null)
const mapMarker = ref(null)
const mapSearchQuery = ref('')
const mapSearchResults = ref([])
const selectedMapAddress = ref('')
const isSearchingMap = ref(false)
const searchTimeout = ref(null)
const isSelectingMapResult = ref(false)

const editAddressId = ref(null)

const editCurrentAddress = () => {
  if (addressStore.defaultAddress) {
    // ចាប់យកទិន្នន័យចាស់មកញាត់ចូល Form
    form.receiver_name = addressStore.defaultAddress.receiver_name
    form.receiver_phone = addressStore.defaultAddress.receiver_phone
    form.shipping_zone_id = addressStore.defaultAddress.shipping_zone_id
    form.address_detail = addressStore.defaultAddress.address_detail
    
    editAddressId.value = addressStore.defaultAddress.id // ចំណាំ ID ទុក
    isEditing.value = true
    emitCurrentState()
  }
}


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
// 🌟 កែប្រែកន្លែងនេះ 🌟
const matchedDefaultZoneId = computed(() => {
  if (!addressStore.defaultAddress) return null

  // អាទិភាពទី ១៖ បើមាន ID ស្រាប់ពី Database គឺយកវាប្រើតែម្តង (សម្រាប់ទិន្នន័យថ្មី)
  if (addressStore.defaultAddress.shipping_zone_id) {
    return addressStore.defaultAddress.shipping_zone_id
  }

  // អាទិភាពទី ២៖ (សម្រាប់ទិន្នន័យចាស់) ឆែកតាមឈ្មោះទីក្រុង
  if (addressStore.defaultAddress.city) {
    const oldCityName = addressStore.defaultAddress.city.toLowerCase()
    const matched = shippingZones.value.find((z) => z.name.toLowerCase() === oldCityName)
    return matched ? matched.id : null
  }

  return null
})

const selectZone = (zone) => {
  form.shipping_zone_id = zone.id // 🌟 Save ID ជំនួសអោយឈ្មោះ
  isDropdownOpen.value = false
  searchQuery.value = ''
}

// 🌟 Map functions
const initMap = () => {
  if (!mapContainer.value || map.value) return

  try {
    if (L.Icon.Default && L.Icon.Default.prototype && L.Icon.Default.prototype._getIconUrl) {
      delete L.Icon.Default.prototype._getIconUrl
    }
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

    map.value = L.map(mapContainer.value).setView([12.5657, 104.9910], 7)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value)

    map.value.on('click', async (e) => {
      const { lat, lng } = e.latlng
      await reverseGeocodeAndSelect(lat, lng)
    })
  } catch (error) {
    console.error('Failed to initialize map:', error)
  }
}

const searchMapLocation = async () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
    searchTimeout.value = null
  }

  if (!mapSearchQuery.value.trim() || !map.value) return

  isSearchingMap.value = true
  mapSearchResults.value = []

   try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: mapSearchQuery.value,
        format: 'json',
        limit: 5,
        countrycodes: 'kh',
        addressdetails: 1,
        'accept-language': 'en'
      },
      headers: {
        'User-Agent': 'IKitShop/1.0'
      }
    })

    mapSearchResults.value = response.data
  } catch (error) {
    console.error('Map search failed:', error)
  } finally {
    isSearchingMap.value = false
  }
}

const onMapSearchInput = () => {
  if (isSelectingMapResult.value) return

  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    searchMapLocation()
  }, 400)
}

const selectMapSearchResult = async (result) => {
  if (!map.value) return

  isSelectingMapResult.value = true
  const lat = parseFloat(result.lat)
  const lon = parseFloat(result.lon)

  map.value.setView([lat, lon], 16)

  if (mapMarker.value) {
    mapMarker.value.setLatLng([lat, lon])
  } else {
    mapMarker.value = L.marker([lat, lon]).addTo(map.value)
  }

  mapSearchResults.value = []
  mapSearchQuery.value = result.display_name
  selectedMapAddress.value = result.display_name

  await matchAndFillAddress(result)
  isSelectingMapResult.value = false
}

const reverseGeocodeAndSelect = async (lat, lng) => {
  if (mapMarker.value) {
    mapMarker.value.setLatLng([lat, lng])
  } else if (map.value) {
    mapMarker.value = L.marker([lat, lng]).addTo(map.value)
  }

   try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon: lng,
        format: 'json',
        addressdetails: 1,
        'accept-language': 'en'
      },
      headers: {
        'User-Agent': 'IKitShop/1.0'
      }
    })

    const data = response.data
    selectedMapAddress.value = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    mapSearchQuery.value = data.display_name || ''

    await matchAndFillAddress(data)
  } catch (error) {
    console.error('Reverse geocoding failed:', error)
    selectedMapAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  }
}

const matchAndFillAddress = (geoData) => {
  const addr = geoData.address || {}
  const city = addr.city || addr.town || addr.village || addr.county || addr.state || addr.province || ''
  const street = addr.road || addr.neighbourhood || addr.suburb || ''
  const district = addr.district || addr.county || ''

  const normalize = (str) => (str || '').toLowerCase().replace(/\s+/g, ' ').trim()

  const matchedZone = shippingZones.value.find((z) => {
    const zoneName = normalize(z.name)
    const cityName = normalize(city)
    const districtName = normalize(district)
    if (!zoneName) return false
    if (cityName && (cityName.includes(zoneName) || zoneName.includes(cityName))) return true
    if (districtName && (districtName.includes(zoneName) || zoneName.includes(districtName))) return true
    return false
  })

  if (!matchedZone && geoData.display_name) {
    const displayLower = normalize(geoData.display_name)
    const fallbackZone = shippingZones.value.find((z) => {
      const zoneName = normalize(z.name)
      return zoneName && displayLower.includes(zoneName)
    })
    if (fallbackZone) {
      form.shipping_zone_id = fallbackZone.id
    }
  } else if (matchedZone) {
    form.shipping_zone_id = matchedZone.id
  }

  if (geoData.display_name) {
    form.address_detail = geoData.display_name
  } else {
    const addressParts = [street, district, city].filter(Boolean)
    if (addressParts.length > 0) {
      form.address_detail = addressParts.join(', ')
    }
  }
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
        isEditing.value = false // បិទ Form វាយបញ្ចូល
      } else {
        isEditing.value = true  // បើក Form បើអត់ទាន់មានអាសយដ្ឋានចាស់
      }
      emitCurrentState()
    },
    { immediate: true } // 🌟 មុខងារពិសេស៖ បញ្ជាឱ្យវាធ្វើការតាមដានរហូត តាំងពីពេលបើក Component ភ្លាមៗ
  )

  // 🌟 Initialize map when edit form becomes visible
  watch(isEditing, (editing) => {
    if (editing) {
      nextTick(() => {
        initMap()
      })
    } else {
      if (map.value) {
        map.value.remove()
        map.value = null
      }
    }
  }, { immediate: true })

  const toggleEditMode = () => {
    isEditing.value = !isEditing.value
    if (!isEditing.value) {
      editAddressId.value = null 
    }
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

function emitCurrentState() {
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
      shipping_zone_data: getZoneData(form.shipping_zone_id), 
      
      // 🌟 រៀបចំឱ្យស្អាត លុប is_new ទី ២ ចោល 🌟
      is_new: !editAddressId.value, 
      is_update: !!editAddressId.value,
      address_id: editAddressId.value,
      
      save_to_db: saveAddress.value,
      raw_form: { ...form },
    }
  }

  emit('update-address', { isValid, data: finalData })
}

// 🌟 Cleanup map on unmount
onUnmounted(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
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
