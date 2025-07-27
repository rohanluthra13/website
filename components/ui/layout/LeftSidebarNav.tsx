'use client'

import { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '../providers/NavigationProvider'
import { type SectionData } from '../../../types/navigation'

interface LeftSidebarNavProps {
  sections: SectionData[]
}

interface LabelPosition {
  id: string
  top: number
}

export default function LeftSidebarNav({ sections }: LeftSidebarNavProps) {
  const { activeSection, setActiveSection } = useNavigation()
  const [labelPositions, setLabelPositions] = useState<LabelPosition[]>([])

  const calculateLabelPositions = useCallback(() => {
    const positions: LabelPosition[] = []
    
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        const containerRect = document.querySelector('main')?.getBoundingClientRect()
        
        if (containerRect) {
          // Calculate the top of the section relative to the main container with small offset
          const sectionTop = rect.top - containerRect.top + 10
          positions.push({ id, top: sectionTop })
        }
      }
    })
    
    setLabelPositions(positions)
  }, [sections])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Calculate initial positions
    setTimeout(calculateLabelPositions, 100)
    
    // Recalculate on resize
    window.addEventListener('resize', calculateLabelPositions)
    
    // Recalculate on scroll (for dynamic content)
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(calculateLabelPositions, 100)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', calculateLabelPositions)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [sections, calculateLabelPositions, setActiveSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <div className="h-full relative hidden md:block">
      {labelPositions.map(({ id, top }) => {
        const section = sections.find(s => s.id === id)
        if (!section) return null
        
        return (
          <div
            key={id}
            className={`
              absolute text-right pr-6 cursor-pointer transition-all duration-300
              ${activeSection === id 
                ? 'text-[var(--color-text-primary)] opacity-100 scale-105' 
                : 'text-[var(--color-text-secondary)] opacity-70 hover:opacity-90 hover:scale-102'
              }
            `}
            style={{ 
              top: `${top}px`,
              transform: 'translateZ(0)',
              fontFamily: 'Reef',
              fontSize: '1.5rem',
              lineHeight: '1.1',
              right: 0
            }}
            onClick={() => scrollToSection(id)}
          >
            {section.label}
          </div>
        )
      })}
    </div>
  )
}