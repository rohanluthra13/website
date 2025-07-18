'use client'

import Link from 'next/link'

interface NavItemProps {
  href: string
  label: string
  active?: boolean
  disabled?: boolean
  collapsed?: boolean
  icon?: React.ReactNode
}

export default function NavItem({ 
  href, 
  label, 
  active = false, 
  disabled = false, 
  collapsed = false,
  icon
}: NavItemProps) {
  const baseClasses = "block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
  
  const stateClasses = {
    active: "text-[#0066CC] bg-[#0066CC]/10",
    inactive: "text-[#666666] hover:text-[#1A1A1A] hover:bg-[var(--color-background)]",
    disabled: "text-[#CCCCCC] cursor-not-allowed"
  }

  const currentStateClass = disabled 
    ? stateClasses.disabled 
    : active 
      ? stateClasses.active 
      : stateClasses.inactive

  const classes = `${baseClasses} ${currentStateClass}`

  if (disabled) {
    return (
      <div className={classes} title={collapsed ? label : undefined}>
        {collapsed ? (
          <div className="flex justify-center">
            {icon || (
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-xs">{label.slice(0, 1)}</span>
              </div>
            )}
          </div>
        ) : (
          label
        )}
      </div>
    )
  }

  return (
    <Link href={href} className={classes} title={collapsed ? label : undefined}>
      {collapsed ? (
        <div className="flex justify-center">
          {icon || (
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs font-semibold">{label.slice(0, 1)}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
      )}
    </Link>
  )
}