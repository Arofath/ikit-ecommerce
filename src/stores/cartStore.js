import { defineStore } from 'pinia'
import { cartService } from '@/services/cart.service'

export const useCartStore = defineStore('cart', {
  // 🌟 ១. State (កន្លែងផ្ទុកទិន្នន័យ)
  state: () => ({
    cart: {
      total_items: 0,
      total_cart_price: 0,
      items: [],
    },
    isLoading: false,
    error: null,
  }),

  // 🌟 ២. Getters (សម្រាប់ទាញទិន្នន័យយកទៅប្រើលឿនៗ)
  // 🌟 ២. Getters (សម្រាប់ទាញទិន្នន័យយកទៅប្រើលឿនៗ)
  getters: {
    cartItems: (state) => state.cart?.items || [],

    // 🌟 កែប្រែ៖ គណនាចំនួនសរុបភ្លាមៗផ្អែកលើទិន្នន័យលើអេក្រង់
    totalItems: (state) => {
      if (!state.cart?.items) return 0
      return state.cart.items.reduce((total, item) => total + item.quantity, 0)
    },

    // 🌟 កែប្រែ៖ គណនាតម្លៃសរុបភ្លាមៗ (Quantity * Price)
    totalPrice: (state) => {
      if (!state.cart?.items) return 0
      return state.cart.items.reduce((total, item) => {
        // ទាញយកតម្លៃបញ្ចុះ បើគ្មានទេយយកតម្លៃដើម
        const price = item.product?.final_price || item.product?.price || 0
        return total + price * item.quantity
      }, 0)
    },
  },

  // 🌟 ៣. Actions (មុខងារបញ្ជាទៅកាន់ Service)
  actions: {
    // មុខងារទាញយកកន្ត្រក (ហៅប្រើពេលអតិថិជន Login ចូលភ្លាម ឬបើកវេបសាយ)
    async fetchCart() {
      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.getCart()
        if (response.data.success) {
          this.cart = response.data.data // ផ្ទុកទិន្នន័យពី CartResource
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារបន្ថែមទំនិញ
    async addItem(productId, quantity = 1) {
      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.addItem(productId, quantity)
        if (response.data.success) {
          this.cart = response.data.data // Update ទិន្នន័យថ្មីភ្លាមៗ
          return { success: true }
        }
      } catch (err) {
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារកែប្រែចំនួនទំនិញ
    async updateQuantity(itemId, quantity) {
      // ១. ស្វែងរកទំនិញនៅក្នុង State បច្ចុប្បន្ន
      const itemIndex = this.cart.items.findIndex((i) => i.id === itemId)
      if (itemIndex === -1) return { success: false, error: 'Item not found' }

      // ២. រក្សាទុកលេខចាស់សិន ក្រែងលោមាន Error ពេលបាញ់ API
      const oldQuantity = this.cart.items[itemIndex].quantity

      // ៣. កែប្រែលទិន្នន័យក្នុង Store ភ្លាមៗ (ធ្វើឱ្យ UI លោតភ្លាមៗមិនចាំបាច់រង់ចាំ API)
      this.cart.items[itemIndex].quantity = quantity

      this.error = null

      try {
        // ៤. បាញ់ API ទៅ Backend ដោយស្ងាត់ៗ
        const response = await cartService.updateItem(itemId, quantity)

        if (response.data.success) {
          // ៥. ពេល Backend ឆ្លើយថា OK, យើង Update ទិន្នន័យកន្ត្រកទាំងមូលជាការស្រេច
          this.cart = response.data.data
          return { success: true }
        }
      } catch (err) {
        // ៦. ករណី Backend ឆ្លើយថា Error (ឧទាហរណ៍៖ ទិញលើសស្តុក)
        // យើងត្រូវទាញលេខកន្ត្រក ត្រឡប់ទៅលេខចាស់វិញភ្លាមៗ
        this.cart.items[itemIndex].quantity = oldQuantity

        this.handleError(err)
        return { success: false, error: this.error }
      }
    },

    // មុខងារលុបទំនិញ ១ ចេញ
    async removeItem(itemId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.removeItem(itemId)
        if (response.data.success) {
          this.cart = response.data.data
          return { success: true }
        }
      } catch (err) {
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារសម្អាតកន្ត្រក (ឧ. ប្រើពេល Checkout រួច)
    async clearCart() {
      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.clearCart()
        if (response.data.success) {
          // Reset ទៅជាទទេវិញ
          this.cart = { total_items: 0, total_cart_price: 0, items: [] }
          return { success: true }
        }
      } catch (err) {
        this.handleError(err)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារសម្រាប់ចាប់ Error ទូទៅ
    handleError(err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.error = err.response.data.message
      } else {
        this.error = 'មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server។'
      }
    },
  },
})
