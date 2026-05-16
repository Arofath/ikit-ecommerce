import { defineStore } from 'pinia'
import { notificationService } from '@/services/notification.service'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    // ១. ទាញយកទិន្នន័យពី Backend
    async fetchNotifications() {
      this.isLoading = true
      this.error = null
      try {
        const response = await notificationService.getNotifications()
        this.notifications = response.data.data.data // (data.data មកពី Pagination)
        this.unreadCount = response.data.unread_count
      } catch (err) {
        this.error = 'Failed to load notifications'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    // ២. ចុចអាន ១ ដំណឹង
    async markAsRead(id) {
      // ស្វែងរក Notification ហ្នឹងក្នុង State
      const notif = this.notifications.find((n) => n.id === id)

      // បើវាមិនទាន់អាន ទើបយើងធ្វើការអាប់ដេត
      if (notif && notif.read_at === null) {
        // Optimistic UI Update (ប្តូរ State ភ្លាមៗឱ្យលឿន)
        notif.read_at = new Date().toISOString()
        if (this.unreadCount > 0) this.unreadCount--

        try {
          // បាញ់ API ទៅប្រាប់ Backend ជាក្រោយ
          await notificationService.markAsRead(id)
        } catch (err) {
          // បើ Error យើងទាញវាមកវិញ (Revert)
          notif.read_at = null
          this.unreadCount++
          console.error('Failed to mark as read', err)
        }
      }
    },

    // ៣. ចុចអានទាំងអស់
    async markAllAsRead() {
      if (this.unreadCount === 0) return

      // Optimistic UI Update
      this.notifications.forEach((n) => {
        if (n.read_at === null) n.read_at = new Date().toISOString()
      })
      this.unreadCount = 0

      try {
        await notificationService.markAllAsRead()
      } catch (err) {
        console.error('Failed to mark all as read', err)
        // បើ Error គួរតែទាញ Data មកវិញដើម្បីសុវត្ថិភាព
        this.fetchNotifications()
      }
    },
  },
})
