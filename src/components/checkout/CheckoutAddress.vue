<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-slate-800">Shipping Address</h2>

      <button
        v-if="addressStore.defaultAddress"
        @click="toggleEditMode"
        class="text-blue-600 text-sm font-medium hover:underline"
      >
        {{ isEditing ? 'Cancel' : 'Change Address' }}
      </button>
    </div>

    <div
      v-if="!isEditing && addressStore.defaultAddress"
      class="border-2 border-blue-500 bg-blue-50/50 p-4 rounded-lg"
    >
      <p class="font-bold text-slate-900 text-lg">
        {{ addressStore.defaultAddress.receiver_name }}
      </p>
      <p class="text-slate-700 mt-1">📞 {{ addressStore.defaultAddress.receiver_phone }}</p>
      <p class="text-slate-600 mt-1">📍 {{ addressStore.defaultAddress.full_address }}</p>
    </div>

    <div v-else class="space-y-4 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Receiver Name *</label>
          <input
            v-model="form.receiver_name"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <input
            v-model="form.receiver_phone"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>
      <div class="relative">
        <label class="block text-sm font-medium text-slate-700 mb-1">City / Province *</label>

        <div
          @click="isDropdownOpen = !isDropdownOpen"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg cursor-pointer bg-white flex justify-between items-center hover:border-blue-500 transition-colors"
          :class="{ 'ring-2 ring-blue-600 border-blue-600': isDropdownOpen }"
        >
          <span :class="form.city ? 'text-slate-900 font-medium' : 'text-slate-400'">
            {{ form.city || 'Select City / Province' }}
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
                placeholder="Search province..."
                class="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                autofocus
              />
            </div>
          </div>

          <ul class="max-h-60 overflow-y-auto py-1">
            <li
              v-if="filteredProvinces.length === 0"
              class="px-4 py-3 text-sm text-slate-500 text-center"
            >
              No province found.
            </li>
            <li
              v-for="(province, index) in filteredProvinces"
              :key="index"
              @click="selectProvince(province)"
              class="px-4 py-2.5 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
              :class="{ 'bg-blue-50 text-blue-700 font-semibold': form.city === province.name_en }"
            >
              <span>
                {{ province.name_en }}
                <!-- <span class="text-slate-500 font-normal ml-1">({{ province.name_kh }})</span> -->
              </span>
              <i v-if="form.city === province.name_en" class="fas fa-check text-blue-600"></i>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Address Details *</label>
        <textarea
          v-model="form.address_detail"
          rows="2"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
          placeholder="House #, Street..."
        ></textarea>
      </div>

      <div class="flex items-center pt-2">
        <input
          v-model="saveAddress"
          type="checkbox"
          id="save_addr"
          class="w-4 h-4 text-blue-600 rounded cursor-pointer"
        />
        <label for="save_addr" class="ml-2 text-sm text-slate-700 cursor-pointer">
          Save this address for next time
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cambodiaProvinces } from '@/constants/provinces'
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

// មុខងារចម្រាញ់ (Filter) រកខេត្តតាមអក្សរដែលបានវាយ (ទាំងខ្មែរ ទាំងអង់គ្លេស)
const filteredProvinces = computed(() => {
  if (!searchQuery.value) return cambodiaProvinces

  const query = searchQuery.value.toLowerCase()
  return cambodiaProvinces.filter(
    (p) => p.name_en.toLowerCase().includes(query) || p.name_kh.includes(query),
  )
})

// មុខងារពេលភ្ញៀវចុចជ្រើសរើសខេត្ត
const selectProvince = (province) => {
  form.city = province.name_en // Save ឈ្មោះអង់គ្លេសចូល form
  isDropdownOpen.value = false // បិទ Dropdown វិញ
  searchQuery.value = '' // លុបអក្សរដែល Search ចោលវិញ
}

const form = reactive({
  receiver_name: '',
  receiver_phone: '',
  city: '',
  address_detail: '',
})

onMounted(() => {
  // ឆែកមើលថាតើគាត់មានវាយទិន្នន័យទុកចោលទេ?
  const savedDraft = localStorage.getItem('checkout_draft');

  if (savedDraft) {
    // បើមាន ទាញយកមកបំពេញវិញ
    const parsedDraft = JSON.parse(savedDraft);
    form.receiver_name = parsedDraft.receiver_name || authStore.user?.name || '';
    form.receiver_phone = parsedDraft.receiver_phone || authStore.user?.phone_number || '';
    form.city = parsedDraft.city || '';
    form.address_detail = parsedDraft.address_detail || '';
  } else {
    // បើអត់មានទេ ទាញចេញពី Profile ធម្មតា
    form.receiver_name = authStore.user?.name || '';
    form.receiver_phone = authStore.user?.phone || '';
  }

  // បើអត់មានអាសយដ្ឋាន Default ទេ បើក Form អោយគាត់
  if (!addressStore.defaultAddress) {
    isEditing.value = true;
  }
  
  emitCurrentState();
});

watch(() => addressStore.defaultAddress, (newAddress) => {
  if (newAddress) {
    isEditing.value = false; // បិទ Form ប្តូរទៅបង្ហាញអាសយដ្ឋានចាស់វិញ
    emitCurrentState();
  }
});

const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  emitCurrentState()
}

// 🌟 កន្លែងនេះបាន Update ដើម្បីការពារកុំអោយមាន Error Maximum Call Stack
watch(
  () => [
    form.receiver_name, form.receiver_phone, form.city, form.address_detail, isEditing.value, saveAddress.value
  ],
  () => { 
    // រក្សាទុកទិន្នន័យទៅក្នុង Browser 
    localStorage.setItem('checkout_draft', JSON.stringify({
      receiver_name: form.receiver_name,
      receiver_phone: form.receiver_phone,
      city: form.city,
      address_detail: form.address_detail
    }));

    emitCurrentState(); 
  }
);

const emitCurrentState = () => {
  // eslint-disable-next-line no-useless-assignment
  let isValid = false;
  // eslint-disable-next-line no-useless-assignment
  let finalData = null;

  if (!isEditing.value && addressStore.defaultAddress) {
    isValid = true;
    finalData = {
      shipping_name: addressStore.defaultAddress.receiver_name,
      shipping_phone: addressStore.defaultAddress.receiver_phone,
      shipping_address: addressStore.defaultAddress.full_address,
      city: addressStore.defaultAddress.city, // <--- បញ្ជូន City ចេញទៅក្រៅ
      is_new: false 
    };
  } else {
    isValid = !!(form.receiver_name && form.receiver_phone && form.city && form.address_detail);
    
    // 🌟 បើទោះជា Form វាយមិនទាន់ពេញ (isValid = false) ក៏យើងត្រូវបញ្ជូន City ទៅដែរ 
    // ដើម្បីអោយទំព័រមេអាចគណនាថ្លៃដឹកជញ្ជូនបាន
    finalData = {
      shipping_name: form.receiver_name,
      shipping_phone: form.receiver_phone,
      shipping_address: `${form.address_detail}, ${form.city}`,
      city: form.city, // <--- បញ្ជូន City ចេញទៅក្រៅ
      is_new: true,
      save_to_db: saveAddress.value,
      raw_form: { ...form }
    };
  }

  emit('update-address', { isValid, data: finalData });
};
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
