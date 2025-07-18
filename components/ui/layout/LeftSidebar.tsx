'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../providers/ThemeProvider'
import NavItem from '../primitives/NavItem'
import { Suspense } from 'react'

interface LeftSidebarProps {
  company?: {
    name: string
    ticker: string
    cik: string
  }
}

function LeftSidebarContent({ company }: LeftSidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isMobile } = useTheme()
  
  const navigationItems = company ? [
    {
      href: `/company/${company.ticker}`,
      label: 'Overview',
      active: pathname === `/company/${company.ticker}`
    },
    {
      href: `/company/${company.ticker}?section=financials`,
      label: 'Financials',
      active: searchParams?.get('section') === 'financials'
    },
    {
      href: `/company/${company.ticker}/analytics`,
      label: 'Analytics',
      active: pathname.startsWith(`/company/${company.ticker}/analytics`),
      disabled: true
    },
    {
      href: `/company/${company.ticker}/dashboards`,
      label: 'Dashboards',
      active: pathname.startsWith(`/company/${company.ticker}/dashboards`),
      disabled: true
    }
  ] : []

  if (isMobile) {
    return null // Handle mobile menu separately
  }

  return (
    <aside 
      className="bg-[var(--color-surface)] min-h-screen flex-shrink-0"
      style={{ width: 'var(--sidebar-left-width)' }}
    >

      <div className="p-6">
        {/* Content removed */}
      </div>
    </aside>
  )
}

export default function LeftSidebar({ company }: LeftSidebarProps) {
  return (
    <Suspense fallback={<div className="bg-[var(--color-surface)] min-h-screen flex-shrink-0" style={{ width: 'var(--sidebar-left-width)' }} />}>
      <LeftSidebarContent company={company} />
    </Suspense>
  )
}