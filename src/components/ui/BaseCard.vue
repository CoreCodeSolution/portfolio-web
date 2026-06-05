<script setup lang="ts">
export type CardVariant = 'default' | 'glass' | 'bordered'

withDefaults(
  defineProps<{
    variant?: CardVariant
    hoverable?: boolean
  }>(),
  {
    variant: 'default',
    hoverable: false,
  },
)
</script>

<template>
  <div
    :class="[
      'rounded-xl p-6 transition-all duration-300',
      {
        'bg-zinc-900 border border-zinc-800': variant === 'default',
        'backdrop-blur-md bg-zinc-900/60 border border-zinc-800/60': variant === 'glass',
        'bg-transparent border border-zinc-700': variant === 'bordered',
        'hover:border-accent/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] cursor-pointer':
          hoverable,
      },
    ]"
  >
    <slot />
  </div>
</template>
