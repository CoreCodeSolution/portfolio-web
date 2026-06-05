import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollRevealOptions {
  y?: number
  x?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
): void {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!target.value) return
    ctx = gsap.context(() => {
      gsap.from(target.value!, {
        y: options.y ?? 50,
        x: options.x ?? 0,
        opacity: 0,
        duration: options.duration ?? 0.8,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: target.value!,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

export function useStaggerReveal(
  container: Ref<HTMLElement | null>,
  selector: string,
  options: ScrollRevealOptions = {},
): void {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!container.value) return
    ctx = gsap.context(() => {
      gsap.from(selector, {
        y: options.y ?? 40,
        opacity: 0,
        duration: options.duration ?? 0.6,
        stagger: 0.15,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: container.value!,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, container.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
