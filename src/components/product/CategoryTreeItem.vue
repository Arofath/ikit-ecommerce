<template>
  <div class="mt-2 first:mt-0 font-sans">
    
    <div class="flex items-center justify-between group">
      <label class="flex items-center gap-3 cursor-pointer flex-1">
        <input 
          type="checkbox" 
          :value="category.slug" 
          :checked="modelValue.includes(category.slug)"
          @change="onChange"
          class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer" 
        />
        <span 
          class="text-slate-600 text-sm group-hover:text-ikit-blue transition-colors" 
          :class="{'font-bold text-ikit-blue': modelValue.includes(category.slug)}"
        >
          {{ category.name }}
        </span>
      </label>

      <button 
        v-if="category.children && category.children.length > 0" 
        @click.prevent="toggleExpand" 
        class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-ikit-blue hover:bg-slate-100 rounded-md transition-colors"
      >
        <svg v-if="!isExpanded" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
      </button>
    </div>

    <div v-show="isExpanded" v-if="category.children && category.children.length > 0" class="pl-6 border-l-2 border-slate-100 ml-2 mt-2 space-y-2">
      <CategoryTreeItem 
        v-for="child in category.children" 
        :key="child.slug" 
        :category="child" 
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" 
      />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Array, // សម្រាប់ទទួលយក Array នៃ Category ជម្រើស
    required: true
  }
})

// ប្រកាសបញ្ជូនទិន្នន័យទៅកាន់ Component មេវិញ
const emit = defineEmits(['update:modelValue'])

// State សម្រាប់កំណត់ការបត់ ឬ ពន្លា
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// មុខងារនេះចាំធ្វើការរាល់ពេលគេចុច Checkbox
const onChange = (event) => {
  const isChecked = event.target.checked
  const newValue = [...props.modelValue] // Copy Array ចាស់សិន

  if (isChecked) {
    newValue.push(props.category.slug) // បញ្ចូលថ្មី
  } else {
    const index = newValue.indexOf(props.category.slug)
    if (index > -1) newValue.splice(index, 1) // លុបចេញវិញពេលគេដក Tick
  }
  
  // បាញ់ទិន្នន័យត្រឡប់ទៅ Component មេ
  emit('update:modelValue', newValue)
}
</script>