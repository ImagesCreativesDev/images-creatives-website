'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  defaultCompetitionMonth,
  formatCompetitionMonthLabel,
  isValidCompetitionMonth,
} from '../../lib/competitionMonth'

interface CompetitionMonthFilterProps {
  availableMonths: string[]
  selectedMonth: string
  showPendingFilter?: boolean
  pendingOnly?: boolean
}

export default function CompetitionMonthFilter({
  availableMonths,
  selectedMonth,
  showPendingFilter = false,
  pendingOnly = false,
}: CompetitionMonthFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const monthOptions = Array.from(
    new Set([defaultCompetitionMonth(), selectedMonth, ...availableMonths].filter(isValidCompetitionMonth))
  ).sort((a, b) => b.localeCompare(a))

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    const query = params.toString()
    const basePath = pathname ?? '/'
    router.push(query ? `${basePath}?${query}` : basePath)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label htmlFor="competition-month-filter" className="text-gray-300 font-inter text-sm">
          Competition month
        </label>
        <select
          id="competition-month-filter"
          value={selectedMonth}
          onChange={(e) => updateParams({ month: e.target.value })}
          className="px-4 py-2 rounded-lg bg-[#433F59] border border-white/20 text-white font-inter focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {formatCompetitionMonthLabel(month)}
            </option>
          ))}
        </select>
      </div>

      {showPendingFilter && (
        <label className="inline-flex items-center gap-2 text-gray-300 font-inter text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={pendingOnly}
            onChange={(e) => updateParams({ pending: e.target.checked ? '1' : null })}
            className="w-4 h-4 text-flame border-gray-300 rounded focus:ring-flame"
          />
          Pending only
        </label>
      )}
    </div>
  )
}
