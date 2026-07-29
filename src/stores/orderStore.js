import { defineStore } from 'pinia'
import OrderService from '@/services/order.service'
import { useCartStore } from './cartStore'
import api from '@/services/api'


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
        cartStore.clearCart()

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Checkout failed. Please try again.'
        throw error
      } finally {
        this.isProcessing = false
      }
    },

    async uploadReceipt(orderId, file) {
      this.isProcessing = true
      this.error = null
      try {
        const formData = new FormData()
        formData.append('receipt', file)

        // បាញ់ API ដោយប្រើ multipart/form-data
        const response = await api.post(`/orders/${orderId}/upload-receipt`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // Update វិក្កយបត្របច្ចុប្បន្នឱ្យឃើញរូបភាពភ្លាមៗ
        if (this.currentOrder) {
          this.currentOrder.payment_receipt = response.data.receipt_url
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to upload receipt.'
        throw error
      } finally {
        this.isProcessing = false
      }
    },
  },
})
