import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '@/components/ui/BaseCard.vue'

describe('BaseCard', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: { default: '<p>Card content</p>' },
    })
    expect(wrapper.text()).toBe('Card content')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(BaseCard)
    expect(wrapper.classes()).toContain('bg-zinc-900')
    expect(wrapper.classes()).toContain('border-zinc-800')
  })

  it('applies glass variant classes', () => {
    const wrapper = mount(BaseCard, {
      props: { variant: 'glass' },
    })
    expect(wrapper.classes()).toContain('backdrop-blur-md')
  })

  it('applies hoverable classes when hoverable is true', () => {
    const wrapper = mount(BaseCard, {
      props: { hoverable: true },
    })
    expect(wrapper.classes()).toContain('cursor-pointer')
  })
})
