'use client'

import Link from 'next/link'
import { useTheme } from '../providers/ThemeProvider'
import MetricRow from '../primitives/MetricRow'

interface SideContentProps {
  company?: {
    name: string
    ticker: string
    cik: string
    // Add other company properties as needed
  }
  latestFiling?: {
    adsh: string
    form: string
    filed: string
    period: string
    fiscal_year: number | null
    fiscal_period: string | null
  } | null
}

export default function SideContent({ company, latestFiling }: SideContentProps) {
  const { rightSidebarOpen, isMobile } = useTheme()

  if (isMobile || !rightSidebarOpen) {
    return null
  }

  return (
    <aside className="flex-1 bg-[var(--color-surface)] min-h-screen sticky top-0 overflow-y-auto">
      {/* Empty space where menu was - aligned with search input */}
      <div style={{ paddingTop: 'calc(1.5rem + 22px - 0.875rem/2 + 1.5rem)' }}></div>
      
      <div className="p-6 pt-4 stagger-entrance">
        {/* Company Info Card (when company exists) */}
        {company && (
          <div className="bg-[var(--color-background)] rounded-lg p-4 mb-6 card-hover card-enter">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
              Company Info
            </h3>
            <div className="space-y-1">
              <MetricRow 
                label="CIK" 
                value={company.cik} 
              />
              <MetricRow 
                label="Ticker" 
                value={company.ticker.toUpperCase()} 
              />
              <MetricRow 
                label="Exchange" 
                value="[Exchange]" 
                sublabel="Primary listing"
              />
            </div>
          </div>
        )}

        {/* Quick Search Card (when no company - homepage) */}
        {!company && (
          <div className="bg-[var(--color-background)] rounded-lg p-4 mb-6 card-hover card-enter">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
              Quick Search
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-[#666666]">
                Popular companies:
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/company/AAPL" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  AAPL
                </Link>
                <Link href="/company/MSFT" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  MSFT
                </Link>
                <Link href="/company/GOOGL" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  GOOGL
                </Link>
                <Link href="/company/AMZN" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  AMZN
                </Link>
                <Link href="/company/TSLA" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  TSLA
                </Link>
                <Link href="/company/META" className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[#E5E5E5] hover:bg-[#0066CC] hover:text-white transition-colors">
                  META
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filing Information Card (only for companies) */}
        {company && (
          <div className="bg-[var(--color-background)] rounded-lg p-4 mb-6 card-hover card-enter stagger-1">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
              Latest Filing
            </h3>
            {latestFiling ? (
            <div className="space-y-1">
              <MetricRow 
                label="Form Type" 
                value={latestFiling.form} 
              />
              <MetricRow 
                label="Filed Date" 
                value={new Date(latestFiling.filed).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })} 
              />
              <MetricRow 
                label="Period End" 
                value={new Date(latestFiling.period).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })} 
              />
              {latestFiling.fiscal_year && (
                <MetricRow 
                  label="Fiscal Year" 
                  value={latestFiling.fiscal_year.toString()} 
                  sublabel={latestFiling.fiscal_period || undefined}
                />
              )}
            </div>
          ) : (
            <div className="py-4 text-center">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Key Metrics Card (only for companies) */}
        {company && (
        <div className="bg-[var(--color-background)] rounded-lg p-4 mb-6 card-hover card-enter stagger-2">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
            Key Metrics
          </h3>
          <div className="space-y-1">
            <MetricRow 
              label="Market Cap" 
              value="TBD" 
              sublabel="USD"
            />
            <MetricRow 
              label="Revenue (TTM)" 
              value="TBD" 
              sublabel="Millions USD"
            />
            <MetricRow 
              label="P/E Ratio" 
              value="TBD" 
            />
            <MetricRow 
              label="Debt to Equity" 
              value="TBD" 
            />
          </div>
        </div>
        )}

        {/* Visualization Placeholder (only for companies) */}
        {company && (
        <div className="bg-[var(--color-background)] rounded-lg p-4 card-hover card-enter stagger-3">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
            Interactive Charts
          </h3>
          <div className="space-y-3">
            <div className="h-32 bg-[var(--color-surface)] rounded border border-[#E5E5E5] flex items-center justify-center">
              <div className="text-center text-[#666666] text-sm">
                <div className="w-8 h-8 bg-[#E5E5E5] rounded mx-auto mb-2"></div>
                <p>Stock Price Chart</p>
                <p className="text-xs">Coming Soon</p>
              </div>
            </div>
            <div className="h-24 bg-[var(--color-surface)] rounded border border-[#E5E5E5] flex items-center justify-center">
              <div className="text-center text-[#666666] text-sm">
                <div className="w-6 h-6 bg-[#E5E5E5] rounded mx-auto mb-1"></div>
                <p className="text-xs">Financial Ratios</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* App Info Card (when no company - homepage) */}
        {!company && (
          <div className="bg-[var(--color-background)] rounded-lg p-4 card-hover card-enter stagger-1">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
              About SEC Viewer
            </h3>
            <div className="space-y-2 text-sm text-[#666666]">
              <p>
                Search and view financial statements from SEC EDGAR filings.
              </p>
              <p>
                Access Income Statements, Balance Sheets, and Cash Flow data for publicly traded companies.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}