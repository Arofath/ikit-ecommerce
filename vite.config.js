import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174, // បង្ខំឱ្យ E-commerce រត់លើលេខ 5174 ជានិច្ច
    strictPort: true, // បើ 5174 មានគេកំពុងប្រើ វាឱ្យលោត Error តែម្តង (មិនព្រមប្តូរលេខទេ)
  },
})
