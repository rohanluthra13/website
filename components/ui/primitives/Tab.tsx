import React from 'react'

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children: React.ReactNode
  icon?: React.ReactNode
  count?: number | string
}

interface TabListProps {
  children: React.ReactNode
  className?: string
}

export function TabList({ children, className = '' }: TabListProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1
        p-1
        bg-[var(--color-surface)]
        border
        border-[var(--tab-border)]
        rounded-[var(--tab-border-radius)]
        ${className}
      `}
      role="tablist"
    >
      {children}
    </div>
  )
}

export function Tab({
  active = false,
  children,
  icon,
  count,
  className = '',
  ...props
}: TabProps) {
  const baseStyles = `
    inline-flex
    items-center
    gap-2
    px-[var(--tab-padding)]
    py-[var(--tab-padding)]
    font-medium
    text-sm
    rounded-[calc(var(--tab-border-radius)-4px)]
    transition-all
    duration-[var(--transition-fast)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--color-accent)]
    focus:ring-opacity-20
    disabled:opacity-50
    disabled:cursor-not-allowed
    tab-slide
    ${active ? 'active' : ''}
    touch-target
  `

  const stateStyles = active
    ? `
      bg-[var(--tab-bg-active)]
      text-[var(--tab-text-active)]
      shadow-sm
    `
    : `
      bg-transparent
      text-[var(--tab-text)]
      hover:bg-[var(--tab-hover-bg)]
      hover:text-[var(--color-text-primary)]
    `

  return (
    <button
      role="tab"
      aria-selected={active}
      className={`
        ${baseStyles}
        ${stateStyles}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {count !== undefined && (
        <span
          className={`
            ml-1
            px-1.5
            py-0.5
            text-xs
            font-medium
            rounded-full
            ${
              active
                ? 'bg-[var(--color-surface)] bg-opacity-20 text-white'
                : 'bg-[var(--badge-bg)] text-[var(--badge-text)]'
            }
          `}
        >
          {count}
        </span>
      )}
    </button>
  )
}