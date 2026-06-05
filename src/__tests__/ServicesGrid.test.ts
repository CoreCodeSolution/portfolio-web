import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ServicesGrid from '@/views/landing/components/ServicesGrid.vue'

// Mock GSAP to avoid DOM issues in tests
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

describe('ServicesGrid', () => {
  it('renders the section with id="services"', () => {
    const wrapper = mount(ServicesGrid, {
      global: { stubs: { BaseCard: true } },
    })
    expect(wrapper.find('#services').exists()).toBe(true)
  })

  it('renders all 4 service cards', () => {
    const wrapper = mount(ServicesGrid, {
      global: { stubs: { BaseCard: true } },
    })
    expect(wrapper.findAllComponents({ name: 'BaseCard' })).toHaveLength(4)
  })

  it('displays section heading', () => {
    const wrapper = mount(ServicesGrid, {
      global: { stubs: { BaseCard: true } },
    })
    expect(wrapper.text()).toContain('Services Built for Impact')
  })
})
