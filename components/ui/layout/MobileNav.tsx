'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'next/navigation'
import { X, Menu, FileText, User } from 'lucide-react'
import { useLayout } from '../providers/LayoutProvider'
import Link from 'next/link'

export function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen, isMobile } = useLayout()
  const params = useParams()

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [params, setMobileMenuOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen, setMobileMenuOpen])

  // Body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [mobileMenuOpen])

  // Only render on mobile
  if (!isMobile) return null

  const navigationItems = [
    {
      label: 'Writing',
      href: '/',
      icon: FileText,
    },
    {
      label: 'About',
      href: '/about',
      icon: User,
    }
  ]

  const mobileMenu = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-surface border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="mobile-nav-title" className="text-lg font-semibold text-text-primary">
            rohanluthra
          </h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="Close navigation menu"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors touch-target flex items-center space-x-3 text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={20} className="text-text-secondary" />
                  <div className="font-medium">{item.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )

  // Use portal to render at document root
  return typeof window !== 'undefined' 
    ? createPortal(mobileMenu, document.body)
    : null
}

// Mobile header component
export function MobileHeader() {
  const { setMobileMenuOpen, isMobile } = useLayout()

  if (!isMobile) return null

  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border md:hidden">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <Menu size={20} className="text-text-primary" />
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-sm font-semibold text-text-primary">
            rohanluthra
          </h1>
        </div>

        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </header>
  )
}