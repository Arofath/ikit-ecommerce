<template>
  <!-- 🌟 Trust Badges: បង្ហាញពីទំនុកចិត្ត (ដឹកជញ្ជូន, ធានា, សេវាកម្ម, សុវត្ថិភាព) -->
  <section class="bg-white border border-slate-200 rounded-lg shadow-sm py-8 px-4 md:px-8 mb-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
      
      <!-- សេវាកម្ម ១: ដឹកជញ្ជូន -->
      <div class="flex items-center gap-4 sm:justify-center sm:px-4 pt-4 sm:pt-0 first:pt-0">
        <div class="w-12 h-12 bg-blue-50 text-ikit-blue rounded-full flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">Free Delivery</h4>
          <p class="text-xs text-slate-500 mt-0.5">For orders over $500</p>
        </div>
      </div>

      <!-- សេវាកម្ម ២: ការធានា -->
      <div class="flex items-center gap-4 sm:justify-center sm:px-4 pt-4 sm:pt-0">
        <div class="w-12 h-12 bg-red-50 text-ikit-red rounded-full flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">Official Warranty</h4>
          <p class="text-xs text-slate-500 mt-0.5">1-2 years local warranty</p>
        </div>
      </div>

      <!-- សេវាកម្ម ៣: សេវាកម្មអតិថិជន -->
      <div class="flex items-center gap-4 sm:justify-center sm:px-4 pt-4 sm:pt-0">
        <div class="w-12 h-12 bg-blue-50 text-ikit-blue rounded-full flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">24/7 Support</h4>
          <p class="text-xs text-slate-500 mt-0.5">Dedicated customer care</p>
        </div>
      </div>

      <!-- សេវាកម្ម ៤: សុវត្ថិភាព -->
      <div class="flex items-center gap-4 sm:justify-center sm:px-4 pt-4 sm:pt-0">
        <div class="w-12 h-12 bg-red-50 text-ikit-red rounded-full flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">Secure Payment</h4>
          <p class="text-xs text-slate-500 mt-0.5">100% safe & trusted</p>
        </div>
      </div>

    </div>
  </section>
</template>