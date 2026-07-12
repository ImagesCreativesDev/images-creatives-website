import React from 'react'
import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getCompetitionEntries } from '../../../../lib/competitionEntries'
import {
  formatCompetitionMonthLabel,
  isValidCompetitionMonth,
} from '../../../../lib/competitionMonth'
import { CompetitionResultsPdfDocument } from '../../../../lib/competitionResultsPdf'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const month = new URL(request.url).searchParams.get('month')

  if (!month || !isValidCompetitionMonth(month)) {
    return NextResponse.json({ error: 'A valid month query parameter is required (YYYY-MM).' }, { status: 400 })
  }

  const entries = await getCompetitionEntries({ month, sort: 'results' })
  const scoredEntries = entries.filter(
    (entry) => entry.score !== undefined && entry.score !== null
  )

  if (scoredEntries.length === 0) {
    return NextResponse.json(
      { error: 'No scored entries found for this competition month.' },
      { status: 404 }
    )
  }

  try {
    const pdfBuffer = await renderToBuffer(
      <CompetitionResultsPdfDocument
        monthLabel={formatCompetitionMonthLabel(month)}
        entries={scoredEntries}
      />
    )

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="competition-results-${month}.pdf"`,
      },
    })
  } catch (error) {
    console.error('[competition/export-pdf] Error generating PDF:', error)
    return NextResponse.json({ error: 'Failed to generate PDF export.' }, { status: 500 })
  }
}
