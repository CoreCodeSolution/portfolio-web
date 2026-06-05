<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { NavLink } from '@/types'
import { Menu, X } from '@lucide/vue'

const appStore = useAppStore()

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const isScrolled = ref<boolean>(false)

function handleScroll(): void {
  isScrolled.value = window.scrollY > 20
}

function handleNavLinkClick(href: string): void {
  appStore.closeNav()
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'glass shadow-lg shadow-zinc-950/50'
        : 'bg-transparent',
    ]"
  >
    <nav class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group" aria-label="CoreCodeSolution home">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-bold text-zinc-950 text-sm transition-all duration-200 group-hover:shadow-[0_0_12px_var(--color-accent-glow)]"
          >
            CCS
          </span>
          <span class="font-semibold text-zinc-50 text-sm hidden sm:block">
            CoreCode<span class="text-accent">Solution</span>
          </span>
        </a>

        <!-- Desktop nav links -->
        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200 rounded-md hover:bg-zinc-800/50"
              @click.prevent="handleNavLinkClick(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <!-- CTA + Mobile toggle -->
        <div class="flex items-center gap-3">
          <BaseButton
            href="#contact"
            variant="primary"
            size="sm"
            class="hidden md:inline-flex"
            @click.prevent="handleNavLinkClick('#contact')"
          >
            Book Consultation
          </BaseButton>

          <button
            class="md:hidden p-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors"
            :aria-label="appStore.isNavOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="appStore.isNavOpen"
            @click="appStore.toggleNav()"
          >
            <X v-if="appStore.isNavOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="appStore.isNavOpen" class="md:hidden pb-4 pt-2">
          <ul class="flex flex-col gap-1">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="block px-4 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors"
                @click.prevent="handleNavLinkClick(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="mt-3 px-2">
            <BaseButton
              href="#contact"
              variant="primary"
              size="sm"
              class="w-full"
              @click.prevent="handleNavLinkClick('#contact')"
            >
              Book Consultation
            </BaseButton>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
