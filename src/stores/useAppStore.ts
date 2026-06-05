import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isNavOpen = ref<boolean>(false)

  function toggleNav(): void {
    isNavOpen.value = !isNavOpen.value
  }

  function closeNav(): void {
    isNavOpen.value = false
  }

  return {
    isNavOpen,
    toggleNav,
    closeNav,
  }
})
