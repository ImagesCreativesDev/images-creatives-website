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
    const termsAccepted = formData.get('termsAccepted') === 'true'

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

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'Terms must be accepted to submit an entry' },
        { status: 400 }
      )
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG and PNG images are allowed.' },
        { status: 400 }
      )
    }

    // File size validation (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit. Please compress or resize your image.' },
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

    // Generate slug from title (matching Sanity's slug generation)
    const generateSlug = (text: string): string => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        .substring(0, 96) // Max length 96
    }

    const slugValue = generateSlug(title)

    // Step 2: Create competition entry document
    // Note: termsVersion should match the date on the Terms of Service page
    const document = await client.create({
      _type: 'competitionEntry',
      title,
      photographer,
      slug: {
        _type: 'slug',
        current: slugValue,
      },
      uploadDate: new Date().toISOString(),
      termsAccepted: true,
      termsAcceptedAt: new Date().toISOString(),
      termsVersion: '2026-01-15', // Must be kept in sync with Terms of Service page date
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error('Error details:', { errorMessage, errorStack })
    return NextResponse.json(
      {
        error: 'Error creating competition entry',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
