<script setup lang="ts">
import NavBar from '@/views/landing/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-zinc-950">
    <NavBar />
    <main>
      <slot />
    </main>
  </div>
</template>
