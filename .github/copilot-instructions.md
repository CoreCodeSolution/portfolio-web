# AI Developer Instructions — CoreCodeSolution Portfolio Web

## Core Mandate
- This project is strictly **Vue 3 Composition API** (`<script setup lang="ts">`) and **100% TypeScript**.
- Absolutely **NO** `.js` or `.jsx` source files. **NO** `any` types. Use `unknown` as a last resort.
- All components live under `src/` and follow the established folder structure.

## Project: CoreCodeSolution Landing Page
CoreCodeSolution is an elite Software Services & Business Automation agency. All copy, branding, and content must reflect this identity.

## Vue & TypeScript Best Practices
- Define props using TypeScript type declarations: `defineProps<{ title: string; isActive?: boolean }>()`.
- Use `withDefaults()` when props require default values.
- Define emits with type-based declarations: `defineEmits<{ (e: 'update:modelValue', value: string): void }>()`.
- Explicitly type `ref` and `reactive` instances: `const count = ref<number>(0)`.
- Type template refs correctly: `const el = ref<HTMLElement | null>(null)`.
- Every composable must have explicit return types.

## Styling
- **Tailwind CSS exclusively**. Design for **dark mode first** (`darkMode: 'class'` with `dark` on `<html>`).
- Brand accent color is `--color-accent: #06b6d4` (cyan). Use sparingly for CTAs and highlights.
- Use `glass` utility class for glassmorphism surfaces.
- Use `gradient-mesh` utility class for background depth effects.
- Keep components granular — avoid monolithic Vue files over 250 lines.

## Animation
- **GSAP + ScrollTrigger**: Import via composables in `src/composables/useGsapAnimations.ts`.
- **@vueuse/motion**: Use `v-motion` directive for entrance animations on individual elements.
- Always clean up GSAP animations in `onUnmounted` (use `gsap.context().revert()`).

## File Structure
```
src/
├── assets/          # Tailwind entry CSS
├── components/ui/   # BaseButton.vue, BaseCard.vue
├── composables/     # useGsapAnimations.ts
├── layouts/         # DefaultLayout.vue
├── views/landing/
│   ├── components/  # NavBar, HeroSection, ServicesGrid, ValueProp, ContactCTA
│   └── LandingView.vue
├── router/          # index.ts
├── stores/          # useAppStore.ts (Pinia)
├── types/           # index.ts, gsap.d.ts
├── App.vue
└── main.ts
```

## Testing
- Use **Vitest** + **@vue/test-utils**.
- Test files go in `src/__tests__/`.
- Mock GSAP and ScrollTrigger in tests to avoid DOM issues.
