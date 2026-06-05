<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { Code2, Workflow, Cloud, Lightbulb } from '@lucide/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import type { ServiceItem } from '@/types'
import { useScrollReveal, useStaggerReveal } from '@/composables/useGsapAnimations'

const sectionRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

useScrollReveal(sectionRef, { y: 30 })
useStaggerReveal(gridRef, '.service-card')

const services: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Tailored web and enterprise applications engineered for performance, maintainability, and longevity. From MVP to production-grade systems.',
    icon: markRaw(Code2),
    tags: ['Vue 3', 'Node.js', 'TypeScript', 'REST / GraphQL'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description:
      'Eliminate repetitive workflows with intelligent automation using n8n, custom pipelines, and API orchestration that saves thousands of hours annually.',
    icon: markRaw(Workflow),
    tags: ['n8n', 'Workflow Orchestration', 'API Integration', 'RPA'],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    description:
      'Scalable, secure, and cost-optimized cloud infrastructure on AWS, GCP, or Azure — designed to grow with your business demands.',
    icon: markRaw(Cloud),
    tags: ['AWS', 'GCP', 'Azure', 'Docker / Kubernetes'],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    description:
      'Strategic technology guidance to align your IT investments with business outcomes. We audit, advise, and architect a roadmap for digital transformation.',
    icon: markRaw(Lightbulb),
    tags: ['Tech Strategy', 'Architecture Review', 'Digital Transformation'],
  },
]
</script>

<template>
  <section
    id="services"
    ref="sectionRef"
    class="relative py-24 lg:py-32"
  >
    <!-- Section header -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center mb-16">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
          What We Do
        </p>
        <h2 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Services Built for Impact
        </h2>
        <p class="mt-4 text-zinc-400 text-lg">
          From bespoke software to intelligent automation — we deliver end-to-end solutions that
          create measurable business value.
        </p>
      </div>

      <!-- Services grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
      >
        <BaseCard
          v-for="service in services"
          :key="service.id"
          variant="default"
          :hoverable="true"
          class="service-card group flex flex-col gap-5"
        >
          <!-- Icon -->
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_16px_var(--color-accent-dim)]"
          >
            <component :is="service.icon" :size="22" />
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-3 flex-1">
            <h3 class="text-lg font-semibold text-zinc-50">{{ service.title }}</h3>
            <p class="text-sm text-zinc-400 leading-relaxed flex-1">{{ service.description }}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-auto pt-2 border-t border-zinc-800">
            <span
              v-for="tag in service.tags"
              :key="tag"
              class="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
