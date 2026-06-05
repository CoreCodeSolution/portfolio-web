<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { ContactFormData } from '@/types'
import { Send, CalendarCheck } from '@lucide/vue'
import { useScrollReveal } from '@/composables/useGsapAnimations'

const sectionRef = ref<HTMLElement | null>(null)

useScrollReveal(sectionRef, { y: 30 })

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  company: '',
  message: '',
})

const isSubmitting = ref<boolean>(false)
const isSubmitted = ref<boolean>(false)

async function handleSubmit(): Promise<void> {
  isSubmitting.value = true
  // Simulate async form submission
  await new Promise<void>((resolve) => setTimeout(resolve, 1200))
  isSubmitting.value = false
  isSubmitted.value = true
}
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative py-24 lg:py-32 overflow-hidden"
  >
    <!-- Background accent -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl"
      />
    </div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
        <!-- Left: CTA copy -->
        <div class="flex flex-col gap-6">
          <p class="text-sm font-semibold uppercase tracking-widest text-accent">
            Get Started
          </p>
          <h2 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl leading-tight">
            Ready to Transform<br />
            <span class="text-gradient">Your Business?</span>
          </h2>
          <p class="text-zinc-400 text-lg leading-relaxed max-w-md">
            Schedule a free 30-minute discovery call with our team. We will listen to your
            challenges and outline a clear path to a smarter, more automated business.
          </p>

          <div class="flex flex-col gap-4 mt-2">
            <div class="flex items-start gap-3">
              <CalendarCheck :size="20" class="text-accent mt-0.5 shrink-0" />
              <div>
                <div class="text-sm font-semibold text-zinc-200">Free Discovery Call</div>
                <div class="text-sm text-zinc-500">
                  30 minutes to discuss your goals, challenges, and ideal outcomes.
                </div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Send :size="20" class="text-accent mt-0.5 shrink-0" />
              <div>
                <div class="text-sm font-semibold text-zinc-200">Custom Proposal</div>
                <div class="text-sm text-zinc-500">
                  Receive a tailored scope, timeline, and investment estimate within 48 hours.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Contact form -->
        <div class="glass rounded-2xl p-8">
          <!-- Success state -->
          <div
            v-if="isSubmitted"
            class="flex flex-col items-center justify-center text-center gap-4 py-8"
          >
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent"
            >
              <CalendarCheck :size="32" />
            </div>
            <h3 class="text-xl font-semibold text-zinc-50">Message Received!</h3>
            <p class="text-zinc-400">
              Thank you for reaching out. Our team will be in touch within one business day.
            </p>
          </div>

          <!-- Form -->
          <form v-else class="flex flex-col gap-5" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div class="flex flex-col gap-1.5">
                <label for="name" class="text-sm font-medium text-zinc-300">Full Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  class="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-sm font-medium text-zinc-300">Work Email</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  class="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="company" class="text-sm font-medium text-zinc-300">Company</label>
              <input
                id="company"
                v-model="formData.company"
                type="text"
                placeholder="Your company name"
                class="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="message" class="text-sm font-medium text-zinc-300">
                Tell us about your project
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="4"
                placeholder="Describe your challenge, goals, or what you're trying to automate..."
                class="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
              />
            </div>

            <BaseButton
              variant="primary"
              size="md"
              type="submit"
              :disabled="isSubmitting"
              class="w-full mt-1"
            >
              <span>{{ isSubmitting ? 'Sending...' : 'Book a Discovery Call' }}</span>
              <Send v-if="!isSubmitting" :size="16" />
            </BaseButton>

            <p class="text-center text-xs text-zinc-600">
              No spam. No commitment. Just a conversation.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
