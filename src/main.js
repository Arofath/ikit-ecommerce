import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// ប្រាប់ Browser កុំឱ្យចងចាំទីតាំង Scroll
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
