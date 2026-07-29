import { defineStore } from 'pinia'
import { cartService } from '@/services/cart.service'
import { useAuthStore } from '@/stores/authStore'

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
    loadGuestCart() {
      const storedCart = localStorage.getItem('guest_cart')
      if (storedCart) {
        this.cart.items = JSON.parse(storedCart)
      } else {
        this.cart.items = []
      }
    },
    saveGuestCart() {
      localStorage.setItem('guest_cart', JSON.stringify(this.cart.items))
    },
    // មុខងារទាញយកកន្ត្រក (ហៅប្រើពេលអតិថិជន Login ចូលភ្លាម ឬបើកវេបសាយ)
    async fetchCart() {
      const authStore = useAuthStore()

      // បើជា Guest ឱ្យទាញទិន្នន័យពី LocalStorage មកបង្ហាញ
      if (!authStore.isAuthenticated) {
        this.loadGuestCart()
        return
      }

      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.getCart()
        if (response.data.success) {
          this.cart = response.data.data
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.isLoading = false
      }
    },

    // មុខងារបន្ថែមទំនិញ
    async addItem(product, quantity = 1) {
      const authStore = useAuthStore()

      // ករណី Guest (មិនទាន់ Login)
      if (!authStore.isAuthenticated) {
        this.loadGuestCart()
        const existingItem = this.cart.items.find((i) => i.product_id === product.id)

        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          this.cart.items.push({
            id: 'local_' + Date.now(), // បង្កើត ID បណ្ដោះអាសន្ន
            product_id: product.id,
            quantity: quantity,
            product: product, // Save Product ទាំងមូលដើម្បីងាយបង្ហាញលើ UI
          })
        }
        this.saveGuestCart()
        return { success: true }
      }

      // ករណី Login រួច
      this.isLoading = true
      this.error = null
      try {
        const response = await cartService.addItem(product.id, quantity)
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

    // មុខងារកែប្រែចំនួនទំនិញ
    async updateQuantity(itemId, quantity) {
      const authStore = useAuthStore()

      // 🌟 បន្ថែមថ្មី៖ ករណី Guest កំពុងកែចំនួន (Update Quantity)
      if (!authStore.isAuthenticated) {
        this.loadGuestCart()
        const itemIndex = this.cart.items.findIndex((i) => i.id === itemId)
        if (itemIndex !== -1) {
          this.cart.items[itemIndex].quantity = quantity
          this.saveGuestCart()
        }
        return { success: true }
      }

      // កូដខាងក្រោមជា Logic ចាស់សម្រាប់អ្នក Login រួច
      const itemIndex = this.cart.items.findIndex((i) => i.id === itemId)
      if (itemIndex === -1) return { success: false, error: 'Item not found' }

      const oldQuantity = this.cart.items[itemIndex].quantity
      this.cart.items[itemIndex].quantity = quantity
      this.error = null

      try {
        const response = await cartService.updateItem(itemId, quantity)
        if (response.data.success) {
          this.cart = response.data.data
          return { success: true }
        }
      } catch (err) {
        this.cart.items[itemIndex].quantity = oldQuantity
        this.handleError(err)
        return { success: false, error: this.error }
      }
    },

    // មុខងារលុបទំនិញ ១ ចេញ
    async removeItem(itemId) {
      const authStore = useAuthStore()

      // 🌟 បន្ថែមថ្មី៖ ករណី Guest ចុចលុបទំនិញពីកន្ត្រក (Remove Item)
      if (!authStore.isAuthenticated) {
        this.loadGuestCart()
        this.cart.items = this.cart.items.filter((i) => i.id !== itemId)
        this.saveGuestCart()
        return { success: true }
      }

      // កូដខាងក្រោមជា Logic ចាស់សម្រាប់អ្នក Login រួច
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
        this.error = 'Failed to load cart. Please try again later.'
      }
    },
  },
})
