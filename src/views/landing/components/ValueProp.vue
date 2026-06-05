<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { Zap, ShieldCheck, TrendingUp, HeartHandshake } from '@lucide/vue'
import type { ValueMetric } from '@/types'
import { useScrollReveal } from '@/composables/useGsapAnimations'

const sectionRef = ref<HTMLElement | null>(null)

useScrollReveal(sectionRef, { y: 40 })

const metrics: ValueMetric[] = [
  {
    id: 'speed',
    icon: markRaw(Zap),
    label: 'Ship Faster',
    value: '3×',
    description:
      'Accelerated delivery with CI/CD pipelines, agile sprints, and reusable component systems that cut development time.',
  },
  {
    id: 'security',
    icon: markRaw(ShieldCheck),
    label: 'Built Secure',
    value: '100%',
    description:
      'Enterprise-grade security practices from day one — OWASP compliance, encrypted data pipelines, and regular audits.',
  },
  {
    id: 'scalability',
    icon: markRaw(TrendingUp),
    label: 'Scales with You',
    value: '∞',
    description:
      'Cloud-native architecture and auto-scaling infrastructure that handles growth without re-engineering.',
  },
  {
    id: 'partnership',
    icon: markRaw(HeartHandshake),
    label: 'True Partnership',
    value: '24/7',
    description:
      'We are not just vendors — we are long-term technology partners invested in your success beyond delivery.',
  },
]
</script>

<template>
  <section
    id="why-us"
    ref="sectionRef"
    class="relative py-24 lg:py-32 bg-zinc-900/30"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Section header -->
      <div class="mx-auto max-w-2xl text-center mb-16">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
          Why CoreCodeSolution
        </p>
        <h2 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Engineering Excellence,<br />
          <span class="text-gradient">Every Delivery</span>
        </h2>
      </div>

      <!-- Metrics grid -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="metric in metrics"
          :key="metric.id"
          class="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-zinc-800 hover:border-accent/40 transition-all duration-300 hover:bg-zinc-900/50"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20"
          >
            <component :is="metric.icon" :size="26" />
          </div>

          <div class="text-4xl font-bold text-zinc-50 tracking-tight">
            {{ metric.value }}
          </div>

          <div>
            <div class="text-base font-semibold text-zinc-200 mb-2">{{ metric.label }}</div>
            <p class="text-sm text-zinc-500 leading-relaxed">{{ metric.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
