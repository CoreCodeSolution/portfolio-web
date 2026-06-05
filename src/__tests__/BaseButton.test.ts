import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders a button element by default', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders an anchor element when href is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('applies primary variant classes by default', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Primary' },
    })
    expect(wrapper.classes()).toContain('bg-accent')
  })

  it('applies secondary variant classes when variant is secondary', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secondary' },
    })
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('bg-transparent')
  })

  it('applies disabled state when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('cursor-not-allowed')
  })

  it('applies correct size classes', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })
    expect(wrapper.classes()).toContain('px-8')
    expect(wrapper.classes()).toContain('py-4')
  })
})
