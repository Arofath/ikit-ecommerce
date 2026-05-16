import api from './api' // ទាញយក API instance ដែលមានភ្ជាប់ Token រួចជាស្រេច

export const notificationService = {
  // ១. ទាញយកបញ្ជី Notification និងចំនួន Unread
  getNotifications() {
    return api.get('/notifications')
  },

  // ២. សម្គាល់ថាបានអានមួយ (Mark as read)
  markAsRead(id) {
    return api.patch(`/notifications/${id}/read`)
  },

  // ៣. សម្គាល់ថាបានអានទាំងអស់ (Mark all as read)
  markAllAsRead() {
    return api.post('/notifications/read-all')
  },
}
