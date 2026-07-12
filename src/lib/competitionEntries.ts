import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../sanity/env'
import {
  getEffectiveCompetitionMonth,
  isPendingCompetitionEntry,
} from './competitionMonth'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export interface CompetitionEntry {
  _id: string
  title: string
  photographer: string
  imageUrl: string
  score?: number
  description?: string
  competitionMonth?: string
  uploadDate?: string
}

type GetCompetitionEntriesOptions = {
  month?: string | null
  pendingOnly?: boolean
  sort?: 'judge' | 'results'
}

const entryProjection = `{
  _id,
  title,
  photographer,
  "imageUrl": photo.asset->url,
  score,
  description,
  competitionMonth,
  uploadDate
}`

function shuffleEntries(entries: CompetitionEntry[]): CompetitionEntry[] {
  const shuffled = [...entries]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function sortEntries(entries: CompetitionEntry[], sort: 'judge' | 'results'): CompetitionEntry[] {
  if (sort === 'results') {
    return [...entries].sort((a, b) => {
      const scoreDiff = (b.score ?? -1) - (a.score ?? -1)
      if (scoreDiff !== 0) return scoreDiff
      return a.title.localeCompare(b.title)
    })
  }

  return shuffleEntries(entries)
}

export async function getCompetitionEntries(
  options: GetCompetitionEntriesOptions = {}
): Promise<CompetitionEntry[]> {
  const { month = null, pendingOnly = false, sort = 'judge' } = options

  const query = `*[_type == "competitionEntry" && defined(photo.asset->url)] ${entryProjection}`

  try {
    const entries = await client.fetch<CompetitionEntry[]>(query)
    let filtered = (entries || []).filter((entry) => entry.imageUrl)

    if (month) {
      filtered = filtered.filter(
        (entry) => getEffectiveCompetitionMonth(entry) === month
      )
    }

    if (pendingOnly) {
      filtered = filtered.filter((entry) => isPendingCompetitionEntry(entry.score))
    }

    return sortEntries(filtered, sort)
  } catch (error) {
    console.error('Error fetching competition entries:', error)
    return []
  }
}

export async function getAvailableCompetitionMonths(): Promise<string[]> {
  const query = `*[_type == "competitionEntry" && defined(photo.asset->url)]{
    competitionMonth,
    uploadDate
  }`

  try {
    const entries = await client.fetch<Array<{ competitionMonth?: string; uploadDate?: string }>>(query)
    const months = new Set<string>()

    for (const entry of entries || []) {
      const month = getEffectiveCompetitionMonth(entry)
      if (month) months.add(month)
    }

    return Array.from(months).sort((a, b) => b.localeCompare(a))
  } catch (error) {
    console.error('Error fetching competition months:', error)
    return []
  }
}
