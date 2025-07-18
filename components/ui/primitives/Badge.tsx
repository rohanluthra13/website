import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}: BadgeProps) {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-[var(--badge-border-radius)]
    border
    transition-colors
    duration-[var(--transition-fast)]
  `

  const variantStyles = {
    default: `
      bg-[var(--badge-bg)]
      text-[var(--badge-text)]
      border-[var(--badge-border)]
    `,
    primary: `
      bg-[var(--color-accent)]
      text-white
      border-[var(--color-accent)]
    `,
    success: `
      bg-[var(--color-success)]
      text-white
      border-[var(--color-success)]
    `,
    error: `
      bg-[var(--color-error)]
      text-white
      border-[var(--color-error)]
    `
  }

  const sizeStyles = {
    sm: 'px-[var(--badge-padding)] py-0.5 text-xs min-w-[1.25rem] h-5',
    md: 'px-3 py-1 text-sm min-w-[1.5rem] h-6'
  }

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}