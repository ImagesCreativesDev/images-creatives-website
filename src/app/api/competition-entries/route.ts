import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'
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

    // Parse FormData from request
    const formData = await request.formData()
    
    // Extract fields
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string | null
    const photographer = formData.get('photographer') as string | null

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    if (!title || !photographer) {
      return NextResponse.json(
        { error: 'Title and photographer are required' },
        { status: 400 }
      )
    }

    // Step 1: Upload image asset
    const asset = await client.assets.upload('image', file, {
      filename: file.name,
    })

    if (!asset._id) {
      return NextResponse.json(
        { error: 'Failed to upload image asset' },
        { status: 500 }
      )
    }

    // Step 2: Create competition entry document
    const document = await client.create({
      _type: 'competitionEntry',
      title,
      photographer,
      uploadDate: new Date().toISOString(),
      photo: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Competition entry created successfully',
        document,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating competition entry:', error)
    return NextResponse.json(
      {
        error: 'Error creating competition entry',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
