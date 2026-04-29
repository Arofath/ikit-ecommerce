<template>
  <div class="bg-slate-100 rounded-lg h-100 md:h-112.5 relative overflow-hidden flex items-center group shadow-sm">
    
    <div class="px-6 sm:px-8 md:px-16 w-full md:w-3/5 z-10 relative">
      <span class="inline-block bg-white text-ikit-red font-extrabold text-xs px-4 py-1.5 rounded-full mb-3 md:mb-4 shadow-sm">
        GET 20% OFF
      </span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 md:mb-4 leading-tight">
        Smart System <br>
        <span class="text-ikit-blue">Generation</span>
      </h1>
      <p class="text-slate-500 text-sm mb-6 md:mb-8 leading-relaxed max-w-sm md:max-w-md">
        Upgrade your workspace with our latest high-performance laptops. Limited time offer, grab yours today!
      </p>
      <button class="bg-ikit-blue hover:bg-ikit-dark text-white font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
        SHOP NOW
      </button>
    </div>

    <div class="absolute right-0 top-0 h-full w-full sm:w-2/3 md:w-1/2">
      <div class="absolute inset-0 bg-linear-to-r from-slate-100 via-slate-100/90 sm:via-slate-100/70 md:via-slate-100/50 to-transparent z-0"></div>
      <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Laptop" class="h-full w-full object-cover object-right" />
    </div>

    <button class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
    <button class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

    <div class="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
      <span class="w-8 h-2.5 rounded-full bg-ikit-blue cursor-pointer transition-all"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer transition-all"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer transition-all"></span>
    </div>

  </div>
</template>