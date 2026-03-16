import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { projectId, dataset, apiVersion } from '../../../sanity/env'

export async function POST(request: Request) {
  try {
    // Validate token exists
    const token = process.env.SANITY_API_WRITE_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: 'SANITY_API_WRITE_TOKEN is not configured' },
        { status: 500 }
      )
    }

    // Create Sanity client with write token
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })

    // Parse JSON body
    const body = await request.json()
    const { _id, score, description } = body

    // Validate required fields
    if (!_id) {
      return NextResponse.json(
        { error: '_id is required' },
        { status: 400 }
      )
    }

    if (score === undefined && (description === undefined || description === null)) {
      return NextResponse.json(
        { error: 'score or description is required' },
        { status: 400 }
      )
    }

    // Build patch object based on provided fields
    const patch: Record<string, unknown> = {}
    if (score !== undefined && score !== null) {
      patch.score = Number(score)
    }
    if (description !== undefined) {
      patch.description = description
    }

    // Update the document
    await client.patch(_id).set(patch).commit()

    // Revalidate the judging and results pages
    revalidatePath('/competition/judge')
    revalidatePath('/competition/results')

    return NextResponse.json(
      {
        message: 'Entry updated successfully',
        _id,
        score: score !== undefined && score !== null ? Number(score) : undefined,
        description,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating score:', error)
    return NextResponse.json(
      {
        error: 'Error updating score',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
