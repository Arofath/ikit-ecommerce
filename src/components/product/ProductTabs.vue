<template>
  <div class="mt-12 mb-16">
    
    <!-- 🌟 ក្បាល Tabs (បញ្ជីជ្រើសរើស) -->
    <div class="flex items-center gap-8 border-b border-slate-200 overflow-x-auto custom-scrollbar">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="activeTab = tab.id"
        class="py-4 text-sm font-bold whitespace-nowrap transition-colors relative"
        :class="activeTab === tab.id ? 'text-ikit-blue' : 'text-slate-500 hover:text-slate-800'"
      >
        {{ tab.name }}
        <!-- បន្ទាត់ពណ៌ខៀវខាងក្រោម ពេល Tab នោះត្រូវជ្រើសរើស -->
        <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-ikit-blue"></span>
      </button>
    </div>

    <!-- 🌟 សាច់រឿងរបស់ Tab (Content Area) -->
    <div class="py-8">
      
      <!-- Content: Overview -->
      <div v-show="activeTab === 'overview'" class="prose max-w-none text-slate-600">
        <h3 class="text-xl font-bold text-slate-800 mb-4">The Ultimate Play</h3>
        <p class="mb-6">
          Raise your game with the cutting-edge ASUS ROG Strix G15. Powered by the latest AMD Ryzen processors and NVIDIA GeForce RTX 40-Series graphics, it delivers desktop-level performance in a portable chassis. The ultra-fast 240Hz display ensures silky-smooth visuals, giving you the competitive edge in fast-paced esports titles.
        </p>
        <img src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Laptop Gaming" class="w-full rounded-xl mb-6" />
        <h4 class="text-lg font-bold text-slate-800 mb-2">Advanced Cooling</h4>
        <p>
          ROG Intelligent Cooling philosophy mixes the right features and system settings to ensure the best experience for each chassis and components. Liquid metal compound on the CPU improves heat transfer, while redesigned fans maximize airflow.
        </p>
      </div>

      <!-- Content: Specifications -->
      <div v-show="activeTab === 'specs'" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 border-collapse">
          <tbody>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800 w-1/3 md:w-1/4">Processor</th>
              <td class="py-4 px-4">AMD Ryzen™ 9 7945HX Mobile Processor (16-core/32-thread, 64MB L3 cache, up to 5.4 GHz max boost)</td>
            </tr>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">Graphics</th>
              <td class="py-4 px-4">NVIDIA® GeForce RTX™ 4070 Laptop GPU, 8GB GDDR6</td>
            </tr>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">Display</th>
              <td class="py-4 px-4">15.6-inch, WQHD (2560 x 1440) 16:9, IPS-level, Anti-glare display, DCI-P3:100%, Refresh Rate:240Hz, Response Time:3ms</td>
            </tr>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">Memory</th>
              <td class="py-4 px-4">16GB DDR5-4800 SO-DIMM (Max Capacity: 32GB)</td>
            </tr>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">Storage</th>
              <td class="py-4 px-4">1TB PCIe® 4.0 NVMe™ M.2 SSD</td>
            </tr>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">I/O Ports</th>
              <td class="py-4 px-4">
                1x 3.5mm Combo Audio Jack<br>
                1x HDMI 2.1 FRL<br>
                2x USB 3.2 Gen 1 Type-A<br>
                1x USB 3.2 Gen 2 Type-C support DisplayPort™ / power delivery / G-SYNC<br>
                1x RJ45 LAN port
              </td>
            </tr>
            <tr>
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800">Operating System</th>
              <td class="py-4 px-4">Windows 11 Home</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Content: Reviews (គំរូសាមញ្ញ) -->
      <div v-show="activeTab === 'reviews'" class="text-slate-600">
        <div class="flex items-center gap-4 mb-8">
          <div class="text-4xl font-black text-slate-800">4.9</div>
          <div class="flex flex-col">
            <div class="flex items-center text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <span class="text-sm">Based on 124 reviews</span>
          </div>
          <button class="ml-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm">Write a Review</button>
        </div>
        
        <!-- មតិមួយ -->
        <div class="border-b border-slate-100 pb-6 mb-6">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-10 h-10 bg-ikit-blue text-white rounded-full flex items-center justify-center font-bold">JD</div>
            <div>
              <div class="font-bold text-slate-800 text-sm">John Doe</div>
              <div class="text-xs text-slate-400">2 days ago</div>
            </div>
          </div>
          <div class="flex items-center text-yellow-400 mb-2">
            <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          </div>
          <p class="text-sm">Absolutely a beast! The screen is incredibly fast and colors are vibrant. Highly recommended for heavy gaming.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ref([
  { id: 'overview', name: 'Overview' },
  { id: 'specs', name: 'Specifications' },
  { id: 'reviews', name: 'Reviews (124)' }
])

const activeTab = ref(tabs.value[0].id)
</script>