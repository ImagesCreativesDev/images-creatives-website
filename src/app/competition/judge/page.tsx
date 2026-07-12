import {
  getAvailableCompetitionMonths,
  getCompetitionEntries,
} from '../../../lib/competitionEntries'
import { defaultCompetitionMonth, resolveCompetitionMonth } from '../../../lib/competitionMonth'
import ScoringGallery from './ScoringGallery'

export const dynamic = 'force-dynamic'

interface JudgePageProps {
  searchParams: Promise<{
    month?: string
    pending?: string
  }>
}

export default async function JudgePage({ searchParams }: JudgePageProps) {
  const params = await searchParams
  const selectedMonth = resolveCompetitionMonth(params.month, defaultCompetitionMonth())
  const pendingOnly = params.pending === '1'
  const [entries, availableMonths] = await Promise.all([
    getCompetitionEntries({
      month: selectedMonth,
      pendingOnly,
      sort: 'judge',
    }),
    getAvailableCompetitionMonths(),
  ])

  return (
    <ScoringGallery
      entries={entries}
      selectedMonth={selectedMonth}
      availableMonths={availableMonths}
      pendingOnly={pendingOnly}
    />
  )
}
