<template>
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl py-6 font-sans">
    
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <router-link to="/" class="hover:text-ikit-blue transition-colors">Home</router-link>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      <span class="text-slate-800 font-medium">All Products</span>
    </nav>

    <div class="flex flex-col lg:flex-row gap-8">
      
      <aside class="w-full lg:w-1/4 shrink-0 space-y-8 hidden lg:block">
        
        <div class="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 class="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm flex items-center justify-between">
            Categories
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer" />
              <span class="text-slate-600 group-hover:text-ikit-blue text-sm font-medium">Laptops (45)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer" />
              <span class="text-slate-600 group-hover:text-ikit-blue text-sm font-medium">Desktops (12)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer" />
              <span class="text-slate-600 group-hover:text-ikit-blue text-sm font-medium">Accessories (89)</span>
            </label>
          </div>
        </div>

        <div class="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 class="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm flex items-center justify-between">
            Brands
          </h3>
          <div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
            <label v-for="brand in ['ASUS', 'MSI', 'Acer', 'Lenovo', 'Dell', 'HP']" :key="brand" class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-ikit-blue focus:ring-ikit-blue cursor-pointer" />
              <span class="text-slate-600 group-hover:text-ikit-blue text-sm font-medium">{{ brand }}</span>
            </label>
          </div>
        </div>

        <div class="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 class="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Price Range</h3>
          <div class="flex items-center gap-2 mb-4">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input type="number" placeholder="Min" class="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none" />
            </div>
            <span class="text-slate-400">-</span>
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input type="number" placeholder="Max" class="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue outline-none" />
            </div>
          </div>
          <button class="w-full bg-slate-100 hover:bg-ikit-blue hover:text-white text-slate-800 font-bold py-2 rounded-lg transition-colors text-sm">
            Apply Filter
          </button>
        </div>

      </aside>

      <main class="w-full lg:w-3/4">
        
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          
          <button class="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-300 py-2 px-4 rounded-lg font-medium text-sm text-slate-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter
          </button>

          <p class="text-sm text-slate-500 hidden sm:block">
            Showing <span class="font-bold text-slate-800">1-12</span> of <span class="font-bold text-slate-800">120</span> results
          </p>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <span class="text-sm text-slate-500 whitespace-nowrap">Sort By:</span>
            <select class="w-full sm:w-auto border border-slate-300 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-ikit-blue focus:ring-1 focus:ring-ikit-blue cursor-pointer bg-white">
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="i in 8" :key="i" class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-ikit-blue transition-all group relative flex flex-col h-full">
            <div class="aspect-square bg-slate-50 rounded-md mb-4 flex items-center justify-center p-4 overflow-hidden relative">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg==" alt="Mockup" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              <button class="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 bg-ikit-blue hover:bg-ikit-dark text-white text-xs font-bold py-2 px-4 rounded transition-all duration-300 w-[90%] shadow-md z-20">
                Add to Cart
              </button>
            </div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Brand Name</span>
            <h3 class="text-sm font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-ikit-blue transition-colors mt-auto">
              Sample Gaming Laptop {{ i }} - Intel Core i7, 16GB RAM, RTX 4060
            </h3>
            <div class="font-bold text-ikit-red text-base">$999.00</div>
          </div>
        </div>

        <div class="mt-12 flex items-center justify-center gap-2">
          <button class="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-ikit-blue hover:text-ikit-blue transition-colors disabled:opacity-50">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <button class="w-10 h-10 rounded-lg bg-ikit-blue text-white font-bold flex items-center justify-center shadow-md">1</button>
          <button class="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold hover:border-ikit-blue hover:text-ikit-blue transition-colors flex items-center justify-center">2</button>
          <button class="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold hover:border-ikit-blue hover:text-ikit-blue transition-colors flex items-center justify-center">3</button>
          
          <span class="text-slate-400 px-2">...</span>
          <button class="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold hover:border-ikit-blue hover:text-ikit-blue transition-colors flex items-center justify-center">10</button>
          
          <button class="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-ikit-blue hover:text-ikit-blue transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
// Mockup មិនទាន់មាន Logic អ្វីទេ
</script>