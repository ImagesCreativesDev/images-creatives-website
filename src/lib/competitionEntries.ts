import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../sanity/env'

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
  uploadDate,
  "effectiveMonth": coalesce(competitionMonth, string::slice(string::split(uploadDate, "T")[0], 0, 7))
}`

export async function getCompetitionEntries(
  options: GetCompetitionEntriesOptions = {}
): Promise<CompetitionEntry[]> {
  const { month = null, pendingOnly = false, sort = 'judge' } = options
  const orderClause =
    sort === 'results' ? 'order(score desc, title asc)' : 'order(uploadDate desc)'

  const query = `*[
    _type == "competitionEntry"
    && defined(photo.asset->url)
    && ($month == null || coalesce(competitionMonth, string::slice(string::split(uploadDate, "T")[0], 0, 7)) == $month)
    && ($pendingOnly != true || !defined(score))
  ] | ${orderClause} ${entryProjection}`

  try {
    const entries = await client.fetch<CompetitionEntry[]>(query, {
      month,
      pendingOnly,
    })
    return (entries || []).filter((entry) => entry.imageUrl)
  } catch (error) {
    console.error('Error fetching competition entries:', error)
    return []
  }
}

export async function getAvailableCompetitionMonths(): Promise<string[]> {
  const query = `array::unique(
    *[_type == "competitionEntry" && defined(photo.asset->url)]{
      "month": coalesce(competitionMonth, string::slice(string::split(uploadDate, "T")[0], 0, 7))
    }.month
  ) | order(@ desc)`

  try {
    const months = await client.fetch<string[]>(query)
    return (months || []).filter(Boolean)
  } catch (error) {
    console.error('Error fetching competition months:', error)
    return []
  }
}
