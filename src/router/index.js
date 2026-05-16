import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { h } from 'vue' // 🌟 បន្ថែមការ Import 'h' ពី vue
import LoginView from '@/view/LoginView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/view/HomeView.vue'
import ProductDetailView from '@/view/ProductDetailView.vue'
import ProductListView from '@/view/ProductListView.vue'
import ProductListTest from '@/view/ProductListTest.vue'
import AuthView from '@/view/auth/AuthView.vue'
import GoogleCallbackView from '@/view/auth/GoogleCallbackView.vue'
import VerifyOtpView from '@/view/auth/VerifyOtpView.vue'
import ProfileView from '@/view/profile/ProfileView.vue'
import CartView from '@/view/CartView.vue'
import WishlistView from '@/view/WishlistView.vue'
import CheckoutView from '@/view/checkout/CheckoutView.vue'
import CheckoutSuccessView from '@/view/checkout/CheckoutSuccessView.vue'
import MyOrdersView from '@/view/profile/MyOrdersView.vue'
import ContactView from '@/view/ContactView.vue'

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
    // ==========================================
    // 🌟 ក្រុមទី ១៖ ទំព័រដែលមាន Header និង Footer
    // ==========================================
    {
      path: '/',
      component: MainLayout,
      children: [
        // Public Routes
        { path: '', name: 'Home', component: HomeView },
        {
          path: 'product/:slug',
          name: 'ProductDetail',
          component: ProductDetailView,
        },
        { path: 'products', name: 'Products', component: ProductListView },
        { path: 'services', name: 'Services', component: ProductListTest },
        { path: 'contact', name: 'Contact', component: ContactView },

        // Protected Routes (តម្រូវឱ្យ Login)
        { path: 'cart', name: 'Cart', component: CartView },
        {
          path: 'wishlist',
          name: 'Wishlist',
          component: WishlistView,
          // meta: { requiresAuth: true }, // តម្រូវឱ្យ Login មុននឹងអាចចូលមើល
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: CheckoutView,
          meta: { requiresAuth: true },
        },
        {
          path: '/checkout/success',
          name: 'CheckoutSuccess',
          component: CheckoutSuccessView,
          meta: { requiresAuth: true },
        },
        {
          path: 'profile',
          name: 'Profile',
          component: ProfileView,
          meta: { requiresAuth: true },
        },
        {
          path: 'my-orders',
          name: 'MyOrders',
          component: MyOrdersView,
          meta: { requiresAuth: true },
        },
      ],
    },

    // ==========================================
    // 🌟 ក្រុមទី ២៖ ទំព័រពេញអេក្រង់ (គ្មាន Header & Footer)
    // ==========================================
    {
      path: '/login', // ត្រូវមានសញ្ញា / ពីមុខ ព្រោះវាចេញមកក្រៅហើយ
      name: 'Login',
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register', // ត្រូវមានសញ្ញា / ពីមុខ
      name: 'Register',
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: '/auth/google/callback',
      name: 'GoogleCallback',
      component: GoogleCallbackView,
      meta: { requiresGuest: true },
    },
    {
      path: '/verify-otp',
      name: 'VerifyOtp',
      component: VerifyOtpView,
      meta: { requiresGuest: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // ប្រសិនបើអតិថិជនចុចប៊ូតុង ថយក្រោយ/ទៅមុខ (Back/Forward) នៅលើ Browser
    // ឱ្យវាត្រឡប់ទៅកន្លែងចាស់ដែលគេធ្លាប់ឈរ
    if (savedPosition) {
      return savedPosition
    }
    // ករណីផ្សេងទៀតទាំងអស់ (ចុច Link, Refresh, ប្តូរ Route) គឺរុញទៅលើគេបង្អស់
    else {
      return { top: 0, behavior: 'smooth' } // បើចង់ឱ្យវាលោតភ្លាមៗ មិនបាច់រអិលទេ អាចលុប behavior ចោលបាន
    }
  },
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
})

export default router
