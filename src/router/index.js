import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { h } from 'vue' // 🌟 បន្ថែមការ Import 'h' ពី vue
import LoginView from '@/view/LoginView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/view/HomeView.vue'
import ProductDetailView from '@/view/ProductDetailView.vue'

// 🌟 ១. ជួសជុល Warning ទី ២៖ ប្រើមុខងារ h() ជំនួសឲ្យ template
const DummyView = (name) => ({
  render: () =>
    h(
      'div',
      { style: 'padding: 50px; text-align: center; font-size: 24px;' },
      `ទំព័រ ${name} (កំពុងសាងសង់)`,
    ),
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // 🌟 កែប្រែសំបកក្រៅបណ្ដោះអាសន្នទីនេះផងដែរ
      component: MainLayout,
      children: [
        // Public Routes
        { path: '', name: 'Home', component: HomeView },
        {
          path: '/product/:slug',
          name: 'ProductDetail',
          component: ProductDetailView,
        },
        { path: 'products', name: 'Products', component: DummyView('Products') },
        { path: 'cart', name: 'Cart', component: DummyView('Cart') },

        // Guest Routes
        {
          path: 'login',
          name: 'Login',
          component: DummyView('Login'),
          meta: { requiresGuest: true },
        },
        {
          path: 'register',
          name: 'Register',
          component: DummyView('Register'),
          meta: { requiresGuest: true },
        },

        // Protected Routes
        {
          path: 'checkout',
          name: 'Checkout',
          component: DummyView('Checkout'),
          meta: { requiresAuth: true },
        },
        {
          path: 'profile',
          name: 'Profile',
          component: DummyView('Profile'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

// ==========================================
// 🛡️ Route Guard (អ្នកយាមទ្វារដ៏វៃឆ្លាត)
// ==========================================
// 🌟 ២. ជួសជុល Warning ទី ១៖ លុបពាក្យ next ចេញពីវង់ក្រចក
router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  if (requiresAuth && !authStore.isAuthenticated) {
    // 🌟 ប្រើពាក្យ return ជំនួសឲ្យ next(...)
    return { name: 'Login', query: { redirect: to.fullPath } }
  } else if (requiresGuest && authStore.isAuthenticated) {
    // 🌟 ប្រើពាក្យ return ជំនួសឲ្យ next(...)
    return { name: 'Home' }
  }

  // បើមិនជាប់លក្ខខណ្ឌខាងលើទេ យើងមិនបាច់សរសេរអ្វីទាំងអស់ (ស្មើនឹង next() ពីមុន)
  // ទំព័រវានឹងលោតចូលដោយស្វ័យប្រវត្តិ
})

export default router
