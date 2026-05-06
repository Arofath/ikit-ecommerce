<template>
  <div class="mt-12 mb-16" v-if="product">
    
    <!-- 🌟 ក្បាល Tabs (ធ្វើឱ្យ Dynamic ផ្អែកលើ Array ដែលយើងត្រងរួច) -->
    <div class="flex items-center gap-8 border-b border-slate-200 overflow-x-auto custom-scrollbar">
      <button 
        v-for="tab in dynamicTabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="py-4 text-sm font-bold whitespace-nowrap transition-colors relative"
        :class="activeTab === tab.id ? 'text-ikit-blue' : 'text-slate-500 hover:text-slate-800'"
      >
        {{ tab.name }}
        <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-ikit-blue"></span>
      </button>
    </div>

    <!-- 🌟 សាច់រឿងរបស់ Tab (Content Area) -->
    <div class="py-8">
      
      <!-- Content: Overview -->
      <div v-if="product.description" v-show="activeTab === 'overview'" class="prose max-w-none text-slate-600">
        <!-- ដោយសារទិន្នន័យពី DB ជា Text ធម្មតា មិនមែន HTML យើងប្រើ whitespace-pre-wrap ដើម្បីរក្សាការចុះបន្ទាត់ -->
        <div class="whitespace-pre-wrap leading-relaxed">{{ product.description }}</div>
      </div>

<!-- Content: Specifications -->
      <div v-if="formattedSpecs.length > 0" v-show="activeTab === 'specs'" class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 border-collapse">
          <tbody>
            <!-- 🌟 ប្តូរមក Loop ប្រើ formattedSpecs ដែលយើងបានតម្រៀបរួចរាល់ -->
            <tr v-for="spec in formattedSpecs" :key="spec.id" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
              <th class="py-4 px-4 bg-slate-50 font-bold text-slate-800 w-1/3 md:w-1/4">{{ spec.spec_key }}</th>
              <td class="py-4 px-4">{{ spec.spec_value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Content: Reviews (ដាក់ Static សិន) -->
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
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue'

// 🌟 ទទួលទិន្នន័យពី ProductDetailView
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const formattedSpecs = computed(() => {
  if (!props.product?.specs || props.product.specs.length === 0) return [];

  // ១. កំណត់ពាក្យគន្លឹះ និងលំដាប់អាទិភាព (Priority List)
  // លេខ Index កាន់តែតូច វាកាន់តែលោតទៅលើគេ
  const priorityKeywords = [
    'cpu', 'processor',        // អាទិភាពលេខ ០
    'vga', 'graphic', 'gpu',   // អាទិភាពលេខ ១
    'ram', 'memory',           // អាទិភាពលេខ ២
    'storage', 'ssd', 'hdd',   // អាទិភាពលេខ ៣
    'display', 'screen',       // អាទិភាពលេខ ៤
    'os', 'operating system',  // អាទិភាពលេខ ៥
    'keyboard',                // អាទិភាពលេខ ៦
    'battery',                 // អាទិភាពលេខ ៧
    'weight'                   // អាទិភាពលេខ ៨
  ];

  // មុខងារជំនួយសម្រាប់រកពិន្ទុអាទិភាព
  const getPriorityScore = (key) => {
    const lowerKey = key.toLowerCase();
    // រកមើលថាតើ key នេះមានពាក្យគន្លឹះខាងលើដែរឬទេ
    const index = priorityKeywords.findIndex(keyword => lowerKey.includes(keyword));
    
    // បើរកឃើញ អោយពិន្ទុតាម Index, បើរកមិនឃើញ (ឧ. Color, Material) អោយពិន្ទុ 99 ធ្លាក់ទៅក្រោមគេ
    return index !== -1 ? index : 99; 
  };

  // ២. ចម្លង Array ចាស់ រួចតម្រៀបវាឡើងវិញ
  return [...props.product.specs].sort((a, b) => {
    const scoreA = getPriorityScore(a.spec_key);
    const scoreB = getPriorityScore(b.spec_key);

    // បើពិន្ទុអាទិភាពខុសគ្នា យកអាណាពិន្ទុតូចទៅលើគេ
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    
    // បើពិន្ទុស្មើគ្នា (ឧទាហរណ៍ ពិន្ទុ 99 ដូចគ្នា) យើងយក sort_order ដើមរបស់ Admin មកប្រើជាការកាត់សេចក្តី
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
})

// 🌟 បង្កើត Tabs ដោយស្វ័យប្រវត្តិ ផ្អែកលើទិន្នន័យជាក់ស្តែង
const dynamicTabs = computed(() => {
  const tabs = [];
  
  // បើមាន Description ទើបបង្កើត Tab Overview
  if (props.product?.description) {
    tabs.push({ id: 'overview', name: 'Overview' });
  }
  
  // បើមាន Specs ទើបបង្កើត Tab Specifications
  if (props.product?.specs && props.product.specs.length > 0) {
    tabs.push({ id: 'specs', name: 'Specifications' });
  }
  
  // Tab Review គឺតែងតែមានជានិច្ច
  tabs.push({ id: 'reviews', name: 'Reviews (124)' });
  
  return tabs;
})

// តម្កល់អថេរសម្រាប់ចំណាំថា Tab មួយណាកំពុងបើក
const activeTab = ref('')

// 🌟 ប្រើ Watch ដើម្បីកំណត់ Tab ទី១ ឱ្យ Active ដោយស្វ័យប្រវត្តិ
// ទោះបីជា Overview ត្រូវលាក់ក៏ដោយ ក៏វាចាប់យក Specs ធ្វើជា Tab ទី១ ជំនួសវិញដែរ
watch(
  () => dynamicTabs.value,
  (newTabs) => {
    // បើមាន Tab ហើយ activeTab នៅទទេ ឬ activeTab នោះរកលែងឃើញក្នុង Array ថ្មី
    if (newTabs.length > 0 && !newTabs.find(t => t.id === activeTab.value)) {
      activeTab.value = newTabs[0].id; // យក Tab ទី១ មកបើកបង្ហាញមុនគេ
    }
  },
  { immediate: true } // ដំណើរការភ្លាមៗពេល Component បង្ហាញខ្លួន
)
</script>