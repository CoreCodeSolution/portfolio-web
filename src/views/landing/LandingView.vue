<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesGrid from './components/ServicesGrid.vue'
import ValueProp from './components/ValueProp.vue'
import ContactCTA from './components/ContactCTA.vue'
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <ServicesGrid />
    <ValueProp />
    <ContactCTA />

    <!-- Footer -->
    <footer class="border-t border-zinc-800 py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span
              class="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-bold text-zinc-950 text-xs"
            >
              CCS
            </span>
            <span class="text-sm text-zinc-400">
              Core<span class="text-accent font-medium">CodeSolution</span>
            </span>
          </div>
          <p class="text-xs text-zinc-600">
            © {{ new Date().getFullYear() }} CoreCodeSolution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </DefaultLayout>
</template>
