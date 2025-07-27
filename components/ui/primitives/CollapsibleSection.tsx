'use client'

import { useState } from 'react'
import ButtonTile from './ButtonTile'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = true,
  className = ''
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <ButtonTile 
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6"
      >
        {title}
      </ButtonTile>
      {isOpen && children}
    </div>
  )
}