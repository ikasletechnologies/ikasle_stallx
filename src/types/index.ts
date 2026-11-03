export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface StallFeature {
  id: string
  title: string
  description: string
  icon: string
  badge?: string
}

export interface StallProject {
  id: string
  title: string
  category: string
  dimensions: string
  status: 'Completed' | 'In Progress' | 'Concept'
  imageUrl?: string
}

export interface MetricCard {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

