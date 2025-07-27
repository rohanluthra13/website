'use client'

import { useLayout } from '../providers/LayoutProvider'

interface SectionProps {
  id: string
  title?: string
  children: React.ReactNode
  className?: string
  hideTitle?: boolean
}

export default function Section({ id, title, children, className = '', hideTitle = false }: SectionProps) {
  const { isMobile } = useLayout()
  
  // On mobile, always show title (ignore hideTitle). On desktop, respect hideTitle.
  const shouldShowTitle = isMobile ? !!title : (!hideTitle && !!title)
  
  return (
    <section id={id} className={`${className}`}>
      {shouldShowTitle && title && (
        <h2 
          className="text-2xl font-semibold mb-8 md:hidden" 
          style={{ fontFamily: 'Reef', fontSize: '1.5rem' }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}