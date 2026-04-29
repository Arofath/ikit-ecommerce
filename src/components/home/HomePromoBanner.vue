<template>
  <section class="mb-12 font-sans">
    <!-- 🌟 ប្រអប់ Banner ទាំងមូល (ប្រើ relative ដើម្បីដាក់អក្សរលើរូប) -->
    <div class="relative w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
      
      <!-- រូបភាពផ្ទៃខាងក្រោយ -->
      <img 
        src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        alt="Promo Banner" 
        class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
      />
      
      <!-- Gradient ពណ៌ខៀវងងឹត ដើម្បីឱ្យអក្សរពណ៌សលេចធ្លោ -->
      <div class="absolute inset-0 bg-linear-to-r from-slate-900/90 md:from-slate-900/80 to-transparent"></div>

      <!-- 🌟 សាច់អត្ថបទ និងប៊ូតុង -->
      <div class="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 flex flex-col items-start w-full md:w-2/3 lg:w-1/2">
        <span class="inline-block bg-ikit-red text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-sm mb-4">
          Limited Time Offer
        </span>
        
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Build Your Dream <br class="hidden md:block" /> 
          <span class="text-blue-400">PC Setup</span>
        </h2>
        
        <p class="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
          Get up to 30% off on selected PC components, gaming monitors, and professional gears. Upgrade your workstation today!
        </p>
        
        <button class="bg-white text-slate-900 hover:bg-ikit-blue hover:text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors flex items-center gap-2 group/btn">
          Explore Deals
          <svg class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>

    </div>
  </section>
</template>