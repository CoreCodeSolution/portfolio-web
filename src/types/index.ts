import type { Component } from 'vue'

export interface NavLink {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: Component
  tags: string[]
}

export interface ValueMetric {
  id: string
  icon: Component
  label: string
  value: string
  description: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatarUrl?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}
