import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-lg
    transition-opacity
    duration-[var(--transition-fast)]
    focus:outline-none
    hover:opacity-80
    cursor-pointer
    disabled:opacity-[var(--button-disabled-opacity)]
    disabled:cursor-not-allowed
    disabled:hover:opacity-[var(--button-disabled-opacity)]
    button-press
    touch-target
  `

  const variantStyles = {
    primary: `
      bg-[var(--button-primary-bg)]
      disabled:hover:bg-[var(--button-primary-bg)]
    `,
    secondary: `
      bg-[var(--button-secondary-bg)]
      disabled:hover:bg-[var(--button-secondary-bg)]
    `
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-[var(--button-padding)] py-[var(--button-padding)] text-base',
    lg: 'px-4 py-2 text-lg'
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${!className.includes('text-') ? 'text-muted' : ''}
        ${className}
      `}
      style={{ 
        fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif',
        ...props.style 
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}