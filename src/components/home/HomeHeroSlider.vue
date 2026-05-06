<template>
  <!-- 🌟 ១. បង្ហាញ Skeleton ពេលកំពុង Loading -->
  <div
    v-if="isLoading"
    class="bg-slate-200 rounded-lg h-50 sm:h-75 md:h-112.5 animate-pulse shadow-sm"
  ></div>

  <!-- 🌟 ២. ផ្ទៃ Slider ពិតប្រាកដ (Image Only) -->
  <div
    v-else-if="slides.length > 0"
    class="bg-slate-100 rounded-lg w-full h-50 sm:h-75 lg:h-112.5 relative overflow-hidden flex items-center group shadow-sm"
    @mouseenter="pauseSlide"
    @mouseleave="startSlide"
  >
    <!-- 🌟 Loop បង្ហាញ Slide នីមួយៗ -->
    <transition-group name="fade">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        v-show="currentIndex === index"
        class="absolute inset-0 w-full h-full"
      >
        <component
          :is="slide.link_url ? 'a' : 'div'"
          :href="slide.link_url ? slide.link_url : null"
          class="w-full h-full block"
          :class="slide.link_url ? 'cursor-pointer' : 'cursor-default'"
        >
          <img
            :src="slide.image_path"
            alt="Promotional Banner"
            class="h-full w-full object-cover object-center"
          />
        </component>
      </div>
    </transition-group>

    <!-- (កូដប៊ូតុងឆ្វេងស្តាំ និងចំណុច Dots រក្សាទុកដដែល) -->

    <!-- 🌟 ប៊ូតុងឆ្វេង/ស្តាំ (បង្ហាញពេល Hover លើកុំព្យូទ័រ) -->
    <button
      @click="prevSlide"
      class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>

    <!-- 🌟 ចំណុចតូចៗខាងក្រោម (Pagination Dots) -->
    <div class="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
      <span
        v-for="(slide, index) in slides"
        :key="'dot-' + slide.id"
        @click="goToSlide(index)"
        :class="
          currentIndex === index
            ? 'w-8 bg-ikit-blue'
            : 'w-2.5 bg-white hover:bg-slate-200 opacity-80'
        "
        class="h-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const currentIndex = ref(0)
let intervalId = null

const nextSlide = () => {
  if (props.slides.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length
  }
}

const prevSlide = () => {
  if (props.slides.length > 0) {
    currentIndex.value = currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startSlide = () => {
  if (props.slides.length > 1) {
    intervalId = setInterval(nextSlide, 5000)
  }
}

const pauseSlide = () => {
  clearInterval(intervalId)
}

onMounted(() => {
  startSlide()
})

onUnmounted(() => {
  pauseSlide()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
