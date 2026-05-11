<template>
  <!-- 🌟 ១. ជួសជុលបញ្ហា Z-Index (relative z-40) -->
  <div
    class="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col lg:h-112.5 relative z-40"
  >
    <button
      @click="toggleMobileCategory"
      class="bg-ikit-blue text-white font-bold py-3 px-4 flex items-center justify-between w-full shrink-0 cursor-pointer lg:cursor-default"
    >
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <span>SHOP BY CATEGORY</span>
      </div>
      <svg
        class="w-5 h-5 lg:hidden transition-transform duration-300"
        :class="isOpen ? 'rotate-180' : ''"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <ul v-if="isLoading" class="divide-y divide-slate-100 overflow-hidden grow block">
      <li v-for="i in 9" :key="i" class="py-3 px-4 flex justify-between items-center animate-pulse">
        <div class="h-4 bg-slate-200 rounded w-2/3"></div>
        <div class="w-4 h-4 bg-slate-200 rounded-full"></div>
      </li>
    </ul>

    <!-- 🌟 ២. ជួសជុលបញ្ហា Overflow (lg:overflow-visible) -->
    <ul
      v-else
      :class="[
        isOpen ? 'block' : 'hidden',
        'lg:block divide-y divide-slate-100 overflow-y-auto lg:overflow-visible grow custom-scrollbar max-h-75 lg:max-h-full',
      ]"
    >
      <li v-for="cat in categories" :key="cat.id" class="group relative">
        <div
          @click="handleCategoryClick(cat)"
          class="py-3 px-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors"
        >
          <span
            class="text-sm text-slate-700 font-medium group-hover:text-ikit-blue transition-all"
          >
            {{ cat.name }}
          </span>
          <svg
            v-if="cat.children && cat.children.length > 0"
            :class="activeSub === cat.id ? 'rotate-90 text-ikit-blue' : 'text-slate-400'"
            class="w-4 h-4 group-hover:text-ikit-blue transition-all duration-300 transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        <template v-if="cat.children && cat.children.length > 0">
          <div class="hidden lg:group-hover:block absolute left-full top-0 z-50 pl-1 w-64">
            <div class="bg-white border border-slate-200 shadow-md rounded-sm overflow-hidden">
              <ul class="divide-y divide-slate-100">
                <li v-for="sub in cat.children" :key="sub.id">
                  <router-link
                    :to="{ path: '/products', query: { category: sub.slug } }"
                    class="flex items-center justify-between px-4 py-3 text-sm text-slate-600 hover:text-ikit-blue hover:bg-slate-50 transition-colors"
                  >
                    <span>{{ sub.name }}</span>
                    <svg
                      class="w-3 h-3 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <ul
            v-show="activeSub === cat.id"
            class="lg:hidden bg-slate-50 px-4 py-2 border-l-4 border-ikit-blue space-y-1 shadow-inner"
          >
            <li v-for="sub in cat.children" :key="sub.id">
              <router-link
                :to="{ path: '/products', query: { category: sub.slug } }"
                class="block py-2 text-sm text-slate-600 hover:text-ikit-blue transition-colors"
              >
                &rarr; {{ sub.name }}
              </router-link>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

// State សម្រាប់គ្រប់គ្រង UI
const isOpen = ref(false)
const activeSub = ref(null)

const toggleMobileCategory = () => (isOpen.value = !isOpen.value)
const toggleSub = (id) => {
  activeSub.value = activeSub.value === id ? null : id
}

const handleCategoryClick = (cat) => {
  if (cat.children && cat.children.length > 0) {
    toggleSub(cat.id) // បើមានកូន គឺគ្រាន់តែពន្លាវា (Dropdown)
  } else {
    // បើគ្មានកូនទេ គឺបញ្ជូនទៅទំព័រ Product តែម្តង
    router.push({ path: '/products', query: { category: cat.slug } })
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}
</style>
