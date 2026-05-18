<template>
  <div class="min-h-screen bg-slate-50">
    
    <div class="bg-[#006adc] text-white py-16 lg:py-24 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-center">
        <h1 class="text-3xl md:text-5xl font-black mb-6 tracking-tight">
          Professional IT Services & Solutions
        </h1>
        <p class="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          From expert computer repairs to complete security camera installations, our technical team is here to keep your tech running smoothly.
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-16 lg:py-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">What We Offer</h2>
        <div class="h-1.5 w-20 bg-[#006adc] mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div class="w-14 h-14 bg-blue-50 text-[#006adc] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#006adc] group-hover:text-white transition-colors duration-300">
            <span class="material-symbols-outlined text-[32px]">{{ service.icon }}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#006adc] transition-colors">{{ service.title }}</h3>
          <p class="text-slate-500 text-sm leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white border-t border-slate-200 py-16 lg:py-20">
      <div class="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div class="space-y-6">
            <h2 class="text-3xl font-bold text-slate-800 mb-6">Why Choose Our Services?</h2>
            
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-lg">Expert Technicians</h4>
                <p class="text-slate-500 text-sm mt-1">Our team consists of certified professionals with years of hands-on experience.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined">speed</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-lg">Fast Turnaround Time</h4>
                <p class="text-slate-500 text-sm mt-1">We understand how important your devices are, so we aim for the quickest fixes without compromising quality.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined">shield</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-lg">Service Warranty</h4>
                <p class="text-slate-500 text-sm mt-1">All our repair and installation services come with a warranty for your peace of mind.</p>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 rounded-3xl p-8 lg:p-12 text-center border border-slate-200 shadow-inner">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
              <span class="material-symbols-outlined text-[#006adc] text-[40px]">support_agent</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-4">Need Technical Help?</h3>
            <p class="text-slate-500 mb-8">
              Describe your issue or request a quote for our installation services. Our team will get back to you immediately!
            </p>
            <router-link 
              to="/contact" 
              class="inline-flex items-center gap-2 px-8 py-4 bg-[#006adc] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-200 hover:-translate-y-0.5"
            >
              Contact Us Now
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </router-link>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// បង្កើត Array សម្រាប់ផ្ទុកសេវាកម្ម ដើម្បីងាយស្រួលកែប្រែ ឬថែមថយនៅថ្ងៃក្រោយ
const services = [
  {
    id: 1,
    title: 'Computer & Laptop Repair',
    description: 'Hardware replacement, software troubleshooting, virus removal, thermal paste repasting, and system upgrades.',
    icon: 'computer'
  },
  {
    id: 2,
    title: 'CCTV Camera Installation',
    description: 'Professional security camera setup for homes and businesses, including wiring, DVR setup, and remote mobile viewing.',
    icon: 'videocam'
  },
  {
    id: 3,
    title: 'Network & Wi-Fi Setup',
    description: 'Router configuration, LAN cabling, and extending Wi-Fi coverage for seamless and high-speed connectivity.',
    icon: 'router'
  },
  {
    id: 4,
    title: 'IT Maintenance Support',
    description: 'Regular check-ups, data backup solutions, and technical support for your office equipment and infrastructure.',
    icon: 'home_repair_service'
  }
]
</script>