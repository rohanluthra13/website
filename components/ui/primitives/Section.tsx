interface SectionProps {
  id: string
  title?: string
  children: React.ReactNode
  className?: string
  hideTitle?: boolean
}

export default function Section({ id, title, children, className = '', hideTitle = false }: SectionProps) {
  return (
    <section id={id} className={`${className}`}>
      {!hideTitle && title && (
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      )}
      {children}
    </section>
  )
}