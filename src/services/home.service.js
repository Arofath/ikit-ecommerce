import api from './api' // 🌟 Import Axios ចេញពី api.js ដែលយើងទើបបង្កើត

export const homeService = {
  // មុខងារសម្រាប់ទាញទិន្នន័យទំព័រដើម
  getHomeData() {
    return api.get('/home')
  },
}
