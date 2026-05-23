import { defineStore } from 'pinia'
import { homeService } from '@/services/home.service'

export const useHomeStore = defineStore('home', {
  state: () => ({
    recommendedProducts: [],
    newArrivals: [],
    brands: [],
    popularCategories: [],
    discountProducts: [],
    sidebarCategories: [],
    slideshows: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    // 🌟 បន្ថែមប៉ារ៉ាម៉ែត្រ forceRefresh សម្រាប់ករណីយើងចង់បង្ខំឱ្យវាហៅ API ថ្មី (ឧ. Pull to refresh)
    async fetchHomeData(forceRefresh = false) {
      if (!forceRefresh && this.recommendedProducts.length > 0) {
        // console.log('📦 ទិន្នន័យទាញចេញពី Cache (Pinia) មិនមានការហៅ API ទេ!')
        return
      }

      // ចាប់ផ្តើមដំណើរការទាញទិន្នន័យពិតប្រាកដ
      this.isLoading = true
      this.error = null

      try {
        const response = await homeService.getHomeData()

        // ចាប់យកទិន្នន័យពី JSON Response
        const payload = response.data.data

        this.recommendedProducts = payload.recommended
        this.newArrivals = payload.new_arrivals
        this.discountProducts = payload.discount_products || []
        this.brands = payload.top_brands
        this.popularCategories = payload.popular_categories
        this.sidebarCategories = payload.sidebar_categories
        this.slideshows = payload.slideshows

        console.log('🌐 ទាញទិន្នន័យជោគជ័យពី Backend API!')
      } catch (err) {
        console.error('Failed to load homepage data:', err)
        this.error = 'មានបញ្ហាក្នុងការទាញទិន្នន័យ សូមពិនិត្យមើលអ៊ីនធឺណិតរបស់អ្នក!'
      } finally {
        this.isLoading = false
      }
    },
  },
})
