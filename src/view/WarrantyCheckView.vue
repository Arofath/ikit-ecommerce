<template>
  <div class="min-h-[70vh] bg-surface-container-lowest flex flex-col items-center py-16 px-4">
    
    <div class="text-center max-w-2xl w-full mx-auto mb-10">
      <span class="material-symbols-outlined text-primary text-5xl mb-4">verified_user</span>
      <h1 class="text-3xl md:text-4xl font-black text-on-surface mb-4">Check Your Warranty Status</h1>
      <p class="text-on-surface-variant text-base">
        Enter your product's Serial Number (S/N) below to check the warranty validity, purchase date, and remaining coverage.
      </p>
    </div>

    <div class="w-full max-w-xl">
      <!-- Search Input -->
      <form @submit.prevent="handleCheck" class="relative flex items-center mb-10">
        <span class="material-symbols-outlined absolute left-5 text-on-surface-variant text-[24px]">barcode_scanner</span>
        <input 
          v-model="serialNumber" 
          type="text" 
          placeholder="Enter Serial Number (e.g., NXK9...)" 
          class="w-full bg-surface-container/50 border border-outline-variant/20 rounded-full py-4 pl-14 pr-32 text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-mono"
          required
        />
        <button 
          type="submit" 
          :disabled="isLoading"
          class="absolute right-2 bg-primary text-on-primary hover:bg-primary/90 px-6 py-2.5 rounded-full font-bold transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          <span v-if="isLoading" class="material-symbols-outlined animate-spin text-[20px]">autorenew</span>
          {{ isLoading ? 'Checking...' : 'Check' }}
        </button>
      </form>

      <!-- Results Area -->
      <div v-if="result" class="bg-surface-container-lowest rounded-3xl shadow-lg border border-outline-variant/10 p-6 md:p-10 transition-all">
        
        <!-- Error / Invalid / Available -->
        <div v-if="['INVALID', 'NO_INFO', 'AVAILABLE'].includes(result.status) || error" class="text-center py-4">
          <span class="material-symbols-outlined text-error text-6xl mb-4">error</span>
          <h3 class="text-xl font-bold text-on-surface mb-2">Notice</h3>
          <p class="text-on-surface-variant text-lg">{{ result?.message || error }}</p>
        </div>

        <!-- No Warranty -->
        <div v-else-if="result.status === 'NO_WARRANTY'" class="text-center py-4">
          <span class="material-symbols-outlined text-slate-400 text-6xl mb-4">info</span>
          <h3 class="text-xl font-bold text-on-surface mb-2">No Warranty Coverage</h3>
          <p class="text-on-surface-variant mb-6">{{ result.message }}</p>
          <div class="bg-surface-container/50 p-4 rounded-xl text-left">
            <p class="font-bold text-on-surface">{{ result.data.product_name }}</p>
            <p class="text-sm font-mono text-on-surface-variant mt-1">S/N: {{ result.data.serial_number }}</p>
          </div>
        </div>

        <!-- Active / Expired -->
        <div v-else-if="['ACTIVE', 'EXPIRED'].includes(result.status)" class="space-y-8">
          <div class="text-center">
            <div 
              class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border-4"
              :class="result.status === 'EXPIRED' ? 'bg-error/10 text-error border-error/20' : 'bg-emerald-50 text-emerald-500 border-emerald-100'"
            >
              <span class="material-symbols-outlined text-5xl">{{ result.status === 'EXPIRED' ? 'gpp_bad' : 'gpp_good' }}</span>
            </div>
            <h2 class="text-3xl font-black uppercase tracking-wider" :class="result.status === 'EXPIRED' ? 'text-error' : 'text-emerald-600'">
              {{ result.status }}
            </h2>
          </div>

          <div class="bg-surface-container/30 rounded-2xl p-6 border border-outline-variant/10">
            <h3 class="font-bold text-lg text-on-surface mb-1">{{ result.data.product_name }}</h3>
            <p class="text-sm text-on-surface-variant font-mono bg-surface-container inline-block px-3 py-1 rounded-lg mb-6">S/N: {{ result.data.serial_number }}</p>
            
            <div class="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p class="text-on-surface-variant font-medium mb-1">Purchase Date</p>
                <p class="font-bold text-base">{{ formatDate(result.data.purchase_date) }}</p>
              </div>
              <div>
                <p class="text-on-surface-variant font-medium mb-1">Expiry Date</p>
                <p class="font-bold text-base" :class="result.status === 'EXPIRED' ? 'text-error' : 'text-on-surface'">
                  {{ formatDate(result.data.expiry_date) }}
                </p>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-outline-variant/10 flex justify-between items-center">
              <span class="font-medium text-on-surface-variant">Warranty Term: <span class="font-bold text-on-surface">{{ result.data.duration_months }} Months</span></span>
              
              <span v-if="result.status === 'ACTIVE'" class="font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                {{ result.data.days_remaining }} Days Left
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { frontWarrantyService } from '@/services/warranty.service'

const serialNumber = ref('')
const isLoading = ref(false)
const result = ref(null)
const error = ref(null)

const handleCheck = async () => {
  if (!serialNumber.value.trim()) return
  
  isLoading.value = true
  result.value = null
  error.value = null
  
  try {
    const response = await frontWarrantyService.checkWarranty(serialNumber.value)
    result.value = response.data
  } catch (err) {
    if (err.response?.data) {
      result.value = err.response.data
    } else {
      error.value = 'មានបញ្ហាក្នុងការតភ្ជាប់ មិនអាចត្រួតពិនិត្យបានទេ។'
    }
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Intl.DateTimeFormat('en-GB', { 
    day: '2-digit', month: 'long', year: 'numeric' 
  }).format(new Date(dateString))
}
</script>