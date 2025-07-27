import React from 'react'

interface ButtonTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function ButtonTile({ children, className = '', ...props }: ButtonTileProps) {
  return (
    <button
      className={`text-lg text-muted border border-black rounded-lg px-4 py-2 inline-block cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={{ 
        fontFamily: 'var(--font-family-reef)', 
        boxShadow: '0px 3px 0px black' 
      }}
      {...props}
    >
      {children}
    </button>
  )
}