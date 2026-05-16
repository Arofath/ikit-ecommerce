<template>
  <div class="min-h-screen bg-slate-50 py-10 lg:py-16">
    <div class="container mx-auto px-4 max-w-6xl space-y-12">
      
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <p class="text-slate-500">
          We'd love to hear from you. Please fill out this form or shoot us an email. Our team is always here to help you out!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <ContactInfo />
        </div>
        <div class="lg:col-span-2">
          <ContactForm />
        </div>
      </div>

      <div class="pt-6">
        <ContactMap />
      </div>

    </div>
  </div>
</template>

<script setup>
import ContactMap from '@/components/contact/ContactMap.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
</script>