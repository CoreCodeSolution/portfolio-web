<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollReveal } from '@/composables/useGsapAnimations'
import { ArrowRight, ChevronDown } from '@lucide/vue'

const heroRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef, { y: 30 })

function scrollToServices(): void {
  const el = document.querySelector('#services')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh pt-16"
  >
    <!-- Decorative background orbs -->
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
      />
      <div
        class="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl"
      />
      <div
        class="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-accent/3 blur-3xl"
      />
    </div>

    <!-- Grid overlay -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style="
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 60px 60px;
      "
    />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
      <!-- Eyebrow label -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        class="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Elite Software & Automation Agency
      </div>

      <!-- Main headline -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 250 } }"
        class="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl"
      >
        <span class="block">Automate. Build.</span>
        <span class="text-gradient block mt-1">Scale.</span>
      </h1>

      <!-- Sub headline -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }"
        class="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed"
      >
        We design custom software solutions and intelligent business automations that
        transform how modern organizations operate — faster, smarter, and at scale.
      </p>

      <!-- CTA Buttons -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 560 } }"
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <BaseButton href="#contact" variant="primary" size="lg">
          Start Your Project
          <ArrowRight :size="18" />
        </BaseButton>
        <BaseButton href="#services" variant="secondary" size="lg" @click.prevent="scrollToServices">
          Explore Services
        </BaseButton>
      </div>

      <!-- Social proof strip -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 800 } }"
        class="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500"
      >
        <span>Trusted by fast-growing teams</span>
        <span class="hidden sm:block text-zinc-700">•</span>
        <span>50+ projects delivered</span>
        <span class="hidden sm:block text-zinc-700">•</span>
        <span>n8n workflow specialists</span>
        <span class="hidden sm:block text-zinc-700">•</span>
        <span>Cloud-native architecture</span>
      </div>
    </div>

    <!-- Scroll indicator -->
    <button
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 hover:text-accent transition-colors duration-200"
      aria-label="Scroll down"
      @click="scrollToServices"
    >
      <span class="text-xs uppercase tracking-widest">Scroll</span>
      <ChevronDown :size="18" class="animate-bounce" />
    </button>
  </section>
</template>
