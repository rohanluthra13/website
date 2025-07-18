import React from 'react'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  hover?: boolean
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table
        className={`w-full border-collapse bg-[var(--color-surface)] ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '', ...props }: TableHeaderProps) {
  return (
    <thead
      className={`bg-[var(--table-header-bg)] border-b border-[var(--table-header-border)] ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '', ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, hover = true, className = '', ...props }: TableRowProps) {
  return (
    <tr
      className={`border-b border-[var(--table-border)] transition-colors duration-[var(--transition-fast)] ${
        hover ? 'hover:bg-[var(--table-row-hover)]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className = '', ...props }: TableHeadProps) {
  return (
    <th
      className={`px-[var(--table-cell-padding)] py-[var(--table-cell-padding)] text-left font-medium text-[var(--color-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className = '', ...props }: TableCellProps) {
  return (
    <td
      className={`px-[var(--table-cell-padding)] py-[var(--table-cell-padding)] text-[var(--color-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </td>
  )
}