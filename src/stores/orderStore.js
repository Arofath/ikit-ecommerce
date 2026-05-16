import { defineStore } from 'pinia'
import OrderService from '@/services/order.service'
import { useCartStore } from './cartStore' // 🌟 ត្រូវការទាញ Store កន្ត្រកមកប្រើ ដើម្បីលុបវាចោលពេលទិញរួច

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [], // ទុកបញ្ជីវិក្កយបត្រ (ប្រវត្តិទិញ)
    currentOrder: null, // ទុកវិក្កយបត្រលម្អិត (ពេលគាត់ចុចមើល ១ៗ)
    isProcessing: false,
    isLoading: false,
    error: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      total: 0,
    },
  }),

  actions: {
    // ទាញយកប្រវត្តិការបញ្ជាទិញ
    async fetchOrderHistory(status = 'ALL', page = 1) {
      this.isLoading = true
      this.error = null
      try {
        // 🌟 បញ្ជូនទាំង status និង page ទៅកាន់ Service
        const response = await OrderService.getOrders(status, page)

        this.orders = response.data.data.data || [] // Array នៃ Orders

        this.pagination = {
          current_page: response.data.data.meta?.current_page || 1,
          last_page: response.data.data.meta?.last_page || 1,
          total: response.data.data.meta?.total || 0,
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order history'
      } finally {
        this.isLoading = false
      }
    },

    // ទាញយកព័ត៌មានលម្អិតនៃ Order ណាមួយ
    async fetchOrderDetail(id) {
      this.isLoading = true
      this.error = null
      this.currentOrder = null // Clear ទិន្នន័យចាស់សិន
      try {
        const response = await OrderService.getOrderById(id)
        this.currentOrder = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order details'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារ Checkout
    async placeOrder(checkoutData) {
      this.isProcessing = true
      this.error = null
      try {
        const response = await OrderService.checkout(checkoutData)

        const cartStore = useCartStore()
        cartStore.clearCart() // សម្អាតកន្ត្រក

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Checkout failed. Please try again.'
        throw error
      } finally {
        this.isProcessing = false
      }
    },
  },
})
