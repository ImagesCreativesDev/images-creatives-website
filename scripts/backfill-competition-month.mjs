/**
 * One-time backfill: set competitionMonth from uploadDate for legacy entries.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... node scripts/backfill-competition-month.mjs
 *
 * Optional dry run:
 *   DRY_RUN=1 SANITY_API_WRITE_TOKEN=... node scripts/backfill-competition-month.mjs
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
const dryRun = process.env.DRY_RUN === '1'

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

function monthFromUploadDate(uploadDate) {
  if (!uploadDate || typeof uploadDate !== 'string') return null
  const datePart = uploadDate.split('T')[0]
  return datePart?.slice(0, 7) ?? null
}

const query = `*[_type == "competitionEntry" && !defined(competitionMonth) && defined(uploadDate)]{
  _id,
  title,
  uploadDate
}`

const entries = await client.fetch(query)

if (entries.length === 0) {
  console.log('No entries need backfill.')
  process.exit(0)
}

console.log(`Found ${entries.length} entries to backfill${dryRun ? ' (dry run)' : ''}.`)

let updated = 0
for (const entry of entries) {
  const competitionMonth = monthFromUploadDate(entry.uploadDate)
  if (!competitionMonth) {
    console.warn(`Skipping ${entry._id} (${entry.title}): invalid uploadDate`)
    continue
  }

  console.log(`${dryRun ? '[dry run] ' : ''}${entry.title} -> ${competitionMonth}`)

  if (!dryRun) {
    await client.patch(entry._id).set({ competitionMonth }).commit()
  }
  updated += 1
}

console.log(`${dryRun ? 'Would update' : 'Updated'} ${updated} entries.`)
