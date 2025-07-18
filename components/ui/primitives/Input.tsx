import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ 
  label, 
  error, 
  helperText, 
  className = '', 
  disabled,
  ...props 
}: InputProps) {
  const inputId = props.id || props.name

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={inputId}
          className={`
            w-full
            px-[var(--spacing-4)]
            py-[var(--spacing-2)]
            ${label ? 'pt-5' : ''}
            bg-transparent
            border-0
            border-b
            border-[var(--input-border)]
            rounded-none
            text-sm
            text-[var(--color-text-primary)]
            placeholder:text-[var(--input-placeholder)]
            placeholder:text-sm
            transition-colors
            duration-[var(--transition-fast)]
            focus:outline-none
            focus:border-[var(--input-border)]
            focus:ring-0
            disabled:bg-transparent
            disabled:text-[var(--input-disabled-text)]
            disabled:cursor-not-allowed
            touch-target
            [&::-webkit-search-cancel-button]:appearance-none
            [&::-webkit-search-decoration]:appearance-none
            ${error ? 'border-b-[var(--color-error)] focus:border-b-[var(--color-error)]' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="absolute left-[var(--spacing-4)] bottom-1 text-xs text-[var(--color-text-secondary)] pointer-events-none"
          >
            {label}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
}