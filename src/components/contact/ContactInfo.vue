<template>
  <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
    <h3 class="text-xl font-bold text-slate-800 mb-6">Contact Information</h3>
    
    <div class="space-y-6 flex-1">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#006adc] shrink-0">
          <span class="material-symbols-outlined">location_on</span>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm mb-1">Our Location</h4>
          <p class="text-slate-500 text-sm leading-relaxed">No. 123, Street 456, Sangkat Toul Tompoung, Khan Chamkarmon, Phnom Penh</p>
        </div>
      </div>

      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#006adc] shrink-0">
          <span class="material-symbols-outlined">call</span>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm mb-1">Phone Number</h4>
          <p class="text-slate-500 text-sm">+855 12 345 678</p>
          <p class="text-slate-500 text-sm">+855 98 765 432</p>
        </div>
      </div>

      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#006adc] shrink-0">
          <span class="material-symbols-outlined">mail</span>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm mb-1">Email Address</h4>
          <p class="text-slate-500 text-sm">support@ikit.com</p>
        </div>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t border-slate-100">
      <h4 class="font-bold text-slate-800 text-sm mb-4">Follow Us</h4>
      <div class="flex gap-4">
        <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white transition-colors">
          <i class="fab fa-facebook-f text-lg"></i>
        </a>
        <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#229ED9] hover:text-white transition-colors">
          <i class="fab fa-telegram-plane text-lg"></i>
        </a>
        <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#E4405F] hover:text-white transition-colors">
          <i class="fab fa-instagram text-lg"></i>
        </a>
        <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#FF0000] hover:text-white transition-colors">
          <i class="fab fa-youtube text-lg"></i>
        </a>
      </div>
    </div>

  </div>
</template>