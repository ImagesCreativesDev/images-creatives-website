import { Suspense } from 'react'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import {
  getAvailableCompetitionMonths,
  getCompetitionEntries,
} from '../../../lib/competitionEntries'
import {
  defaultCompetitionMonth,
  formatCompetitionMonthLabel,
  resolveCompetitionMonth,
} from '../../../lib/competitionMonth'
import CompetitionMonthFilter from '../CompetitionMonthFilter'
import ResultsGallery from './ResultsGallery'

export const dynamic = 'force-dynamic'

interface ResultsPageProps {
  searchParams: Promise<{
    month?: string
  }>
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams
  const availableMonths = await getAvailableCompetitionMonths()
  const fallbackMonth = availableMonths[0] ?? defaultCompetitionMonth()
  const selectedMonth = resolveCompetitionMonth(params.month, fallbackMonth)

  const entries = await getCompetitionEntries({
    month: selectedMonth,
    sort: 'results',
  })

  const scoredEntries = entries.filter(
    (entry) => entry.score !== undefined && entry.score !== null
  )
  const pendingEntries = entries.filter(
    (entry) => entry.score === undefined || entry.score === null
  )
  const highestScore =
    scoredEntries.length > 0 ? Math.max(...scoredEntries.map((e) => e.score || 0)) : 0

  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Competition Results
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              {formatCompetitionMonthLabel(selectedMonth)} · Ranked by highest score
            </p>
          </div>

          <Suspense fallback={null}>
            <CompetitionMonthFilter
              availableMonths={availableMonths}
              selectedMonth={selectedMonth}
            />
          </Suspense>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300 font-inter">
                No competition entries for {formatCompetitionMonthLabel(selectedMonth)}.
              </p>
            </div>
          ) : (
            <ResultsGallery
              scoredEntries={scoredEntries}
              pendingEntries={pendingEntries}
              highestScore={highestScore}
              selectedMonth={selectedMonth}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
