<script setup lang="ts">
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    href?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    href: undefined,
    type: 'button',
  },
)
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    :disabled="disabled || undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
      {
        'bg-accent text-zinc-950 hover:brightness-110 hover:shadow-[0_0_20px_var(--color-accent-glow)]':
          variant === 'primary',
        'border border-zinc-700 text-zinc-50 hover:border-accent hover:text-accent bg-transparent':
          variant === 'secondary',
        'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/70': variant === 'ghost',
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
        'opacity-50 cursor-not-allowed pointer-events-none': disabled,
      },
    ]"
  >
    <slot />
  </component>
</template>
