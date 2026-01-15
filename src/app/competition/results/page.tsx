import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../../../sanity/env'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import ResultsGallery from './ResultsGallery'

export const dynamic = 'force-dynamic'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

interface CompetitionEntry {
  _id: string
  title: string
  photographer: string
  imageUrl: string
  score?: number
}

async function getCompetitionEntries(): Promise<CompetitionEntry[]> {
  const query = `*[_type == "competitionEntry" && defined(photo.asset->url)] | order(score desc, title asc) {
    _id,
    title,
    photographer,
    "imageUrl": photo.asset->url,
    score
  }`

  try {
    const entries = await client.fetch<CompetitionEntry[]>(query)
    // Filter out any entries without imageUrl (safety check)
    return (entries || []).filter(entry => entry.imageUrl)
  } catch (error) {
    console.error('Error fetching competition entries:', error)
    return []
  }
}

export default async function ResultsPage() {
  const entries = await getCompetitionEntries()
  
  // Separate entries with scores and without scores
  const scoredEntries = entries.filter(entry => entry.score !== undefined && entry.score !== null)
  const pendingEntries = entries.filter(entry => entry.score === undefined || entry.score === null)
  
  // Find the highest score for highlighting winners
  const highestScore = scoredEntries.length > 0 ? Math.max(...scoredEntries.map(e => e.score || 0)) : 0

  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Competition Results
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Ranked by highest score
            </p>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300 font-inter">
                No competition entries yet.
              </p>
            </div>
          ) : (
            <ResultsGallery 
              scoredEntries={scoredEntries}
              pendingEntries={pendingEntries}
              highestScore={highestScore}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
