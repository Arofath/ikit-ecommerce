<template>
  <section class="mb-12 font-sans">
    <!-- 🌟 ក្បាលចំណងជើង និងប៊ូតុង View All -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg class="w-7 h-7 text-ikit-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          ></path>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">New Arrivals</h2>
      </div>

      <router-link
        :to="{ path: '/products', query: { sort: 'newest' } }"
        class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group"
      >
        View All
        <svg
          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <!-- ប្រើ Loop 5 ដង ដើម្បីបង្កើតប្រអប់សខ្មោចចំនួន ៥ -->
      <div
        v-for="i in 5"
        :key="i"
        class="bg-white border border-slate-100 rounded-lg p-4 animate-pulse"
      >
        <!-- រូបភាព Skeleton -->
        <div class="aspect-square bg-slate-200 rounded-md mb-4 w-full"></div>
        <!-- ឈ្មោះ Brand Skeleton -->
        <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
        <!-- ចំណងជើងទំនិញ Skeleton (2 បន្ទាត់) -->
        <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
        <!-- តម្លៃ Skeleton -->
        <div class="h-5 bg-slate-200 rounded w-1/2 mt-auto"></div>
      </div>
    </div>

    <!-- 🌟 បញ្ជីទំនិញថ្មីៗ (ប្រើ Grid 5 ក្រឡាលើកុំព្យូទ័រ) -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ProductCard 
        v-for="product in products"
        :key="product.id"
        :product="product"
        badgeText="NEW"
        badgeColor="bg-ikit-blue"
      />
      
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import ProductCard from '../common/ProductCard.vue'

// 🌟 ទទួលទិន្នន័យ products ពីទំព័រ HomeView
defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>
