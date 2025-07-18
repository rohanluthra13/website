'use client'

interface MetricRowProps {
  label: string
  value: string | number
  sublabel?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export default function MetricRow({ 
  label, 
  value, 
  sublabel, 
  trend, 
  trendValue 
}: MetricRowProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-[#10B981]'
      case 'down':
        return 'text-[#EF4444]'
      default:
        return 'text-[#666666]'
    }
  }

  const getTrendSymbol = () => {
    switch (trend) {
      case 'up':
        return '↗'
      case 'down':
        return '↘'
      default:
        return ''
    }
  }

  return (
    <div className="flex justify-between items-start py-2">
      <div className="flex-1">
        <span className="text-[#666666] text-sm">{label}</span>
        {sublabel && (
          <div className="text-xs text-[#999999] mt-0.5">{sublabel}</div>
        )}
      </div>
      <div className="text-right">
        <div className="text-[#1A1A1A] text-sm font-medium">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {trend && trendValue && (
          <div className={`text-xs mt-0.5 ${getTrendColor()}`}>
            {getTrendSymbol()} {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}