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
    const { _id, score } = body

    // Validate required fields
    if (!_id) {
      return NextResponse.json(
        { error: '_id is required' },
        { status: 400 }
      )
    }

    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: 'score is required' },
        { status: 400 }
      )
    }

    // Update the score
    await client.patch(_id).set({ score: Number(score) }).commit()

    // Revalidate the judging page
    revalidatePath('/competition/judge')

    return NextResponse.json(
      {
        message: 'Score updated successfully',
        _id,
        score: Number(score),
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
