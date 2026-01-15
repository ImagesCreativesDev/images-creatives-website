import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../../../sanity/env'
import ScoringGallery from './ScoringGallery'

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
  imageUrl: string
  score?: number
}

async function getCompetitionEntries(): Promise<CompetitionEntry[]> {
  const query = `*[_type == "competitionEntry" && defined(photo.asset->url)] | order(uploadDate desc) {
    _id,
    title,
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

export default async function JudgePage() {
  const entries = await getCompetitionEntries()

  return <ScoringGallery entries={entries} />
}
