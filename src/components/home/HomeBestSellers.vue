<template>
  <section class="mb-12 font-sans">
    
    <!-- 🌟 ក្បាលចំណងជើង (ពណ៌ក្រហម) និងប៊ូតុង View All -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <!-- Icon ភ្លើង (Fire) តំណាងឱ្យ Hot/Best Seller -->
        <svg class="w-7 h-7 text-ikit-red" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.58 10.962c-.084-.366-.46-.53-.787-.334-1.743 1.054-2.83 2.112-3.172 3.654-.15.68-.066 1.396.166 2.086.136.402-.34.726-.645.412-1.73-1.782-2.195-4.22-1.285-6.52.12-.303-.18-.61-.462-.486-2.222.983-3.834 3.19-4.27 5.76-.088.513-.082 1.033.003 1.545.093.565-.584.887-.965.438-1.727-2.03-1.92-5.01-.527-7.234.183-.292-.093-.656-.414-.526-2.585.99-4.32 3.54-4.222 6.37.042 1.2.368 2.378.966 3.424 1.485 2.593 4.296 4.333 7.373 4.453 3.616.14 6.883-1.986 8.358-5.32.783-1.768.918-3.792.29-5.632-.146-.43-.728-.53-.94-.132z"/>
          <path d="M13.25 4.606c.092-.37.5-.503.784-.247 2.052 1.83 3.253 4.412 3.253 7.14 0 .34-.02.682-.055 1.018-.04.407.456.63.748.337 1.258-1.257 1.954-2.96 1.954-4.8 0-.48-.052-.958-.15-1.425-.09-.42.348-.71.74-.53 2.583 1.18 4.29 3.82 4.29 6.776 0 4.143-3.358 7.5-7.5 7.5-4.142 0-7.5-3.357-7.5-7.5 0-2.83 1.564-5.358 4.027-6.593.4-.2.838.163.686.582-.672 1.85-.456 3.99.646 5.626.248.37.828.182.802-.26-.062-.976.22-1.97.802-2.812.59-1.026 1.41-1.896 2.36-2.56z"/>
        </svg>
        <h2 class="text-2xl font-bold text-slate-800">Best Sellers</h2>
      </div>

      <a href="#" class="text-sm font-medium text-ikit-blue hover:text-ikit-dark flex items-center gap-1 group">
        View All 
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>

    <!-- 🌟 បញ្ជីទំនិញលក់ដាច់ (Grid 5 ក្រឡាដូចគ្នា) -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      <!-- លូកយកទិន្នន័យ Best Sellers មកបង្ហាញ -->
      <div 
        v-for="(product, index) in bestProducts" 
        :key="index" 
        class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full"
      >
        <!-- 🌟 បន្ថែមផ្លាក Rating ជាការទាក់ទាញ -->
        <span class="absolute top-3 left-3 bg-yellow-400 text-slate-900 flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded z-10">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          4.9
        </span>
        
        <!-- រូបភាពទំនិញ -->
        <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
           <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
           <button class="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md">
             Add to Cart
           </button>
        </div>

        <!-- ព័ត៌មានទំនិញ -->
        <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 hover:text-ikit-blue cursor-pointer transition-colors mt-auto">
          {{ product.name }}
        </h3>
        <div class="font-bold text-ikit-red text-base">
          {{ product.price }}
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// ទិន្នន័យគំរូសម្រាប់ទំនិញលក់ដាច់ (មាន ៥ ទំនិញ)
const bestProducts = ref([
  { name: 'Apple MacBook Air M2 13-inch', price: '$999.00', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'ASUS TUF Gaming A15', price: '$899.00', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Dell XPS 15 OLED Laptop', price: '$1,899.00', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Logitech G Pro X Superlight', price: '$129.00', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Sony WH-1000XM5 Wireless Headphones', price: '$348.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
])
</script>