import { createClient, ClientError, ServerError } from '@sanity/client'
import { NextResponse } from 'next/server'
import { projectId, dataset, apiVersion } from '../../../sanity/env'
import { COMPETITION_MAX_FILE_BYTES } from '../../../lib/competitionUploadLimits'

function stringifySanityBody(body: unknown): string | undefined {
  if (body === undefined || body === null) return undefined
  if (typeof body === 'string') return body.length > 1200 ? `${body.slice(0, 1200)}…` : body
  try {
    const s = JSON.stringify(body)
    return s.length > 1200 ? `${s.slice(0, 1200)}…` : s
  } catch {
    return String(body)
  }
}

export async function POST(request: Request) {
  const correlationId = crypto.randomUUID()

  try {
    // Validate token exists
    const token = process.env.SANITY_API_WRITE_TOKEN
    if (!token) {
      console.error('[competition-entries]', correlationId, 'SANITY_API_WRITE_TOKEN missing')
      return NextResponse.json(
        {
          error: 'Server configuration error: uploads are temporarily unavailable.',
          correlationId,
          type: 'config_error',
        },
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
        { error: 'File is required', correlationId, type: 'validation' },
        { status: 400 }
      )
    }

    if (!title || !photographer) {
      return NextResponse.json(
        { error: 'Title and photographer are required', correlationId, type: 'validation' },
        { status: 400 }
      )
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'Terms must be accepted to submit an entry', correlationId, type: 'validation' },
        { status: 400 }
      )
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file type. Only JPEG and PNG images are allowed.',
          details: `Received type: "${file.type || 'unknown'}".`,
          correlationId,
          type: 'validation',
        },
        { status: 400 }
      )
    }

    // File size validation (under Vercel ~4.5MB request body limit)
    if (file.size > COMPETITION_MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: 'File size exceeds 4 MB limit. Please compress or resize your image.',
          details: `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB.`,
          correlationId,
          type: 'validation',
        },
        { status: 400 }
      )
    }

    // Step 1: Upload image asset
    const asset = await client.assets.upload('image', file, {
      filename: file.name,
    })

    if (!asset._id) {
      console.error('[competition-entries]', correlationId, 'asset upload returned no _id')
      return NextResponse.json(
        {
          error: 'Image upload did not complete. Please try again or use a different file.',
          correlationId,
          type: 'asset_upload',
        },
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (error instanceof ClientError || error instanceof ServerError) {
      const details =
        stringifySanityBody(error.responseBody) ??
        (error.details ? stringifySanityBody(error.details) : undefined)
      const httpStatus =
        error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500

      console.error('[competition-entries]', correlationId, 'Sanity API error', {
        statusCode: error.statusCode,
        message: error.message,
        responseBody: error.responseBody,
      })

      return NextResponse.json(
        {
          error:
            error.statusCode === 413
              ? 'Image file is too large for the server to accept. Try a smaller file or stronger compression.'
              : 'Upload failed while talking to our image service.',
          details: details || error.message,
          correlationId,
          type: 'sanity_api_error',
          httpStatus: error.statusCode,
        },
        { status: httpStatus }
      )
    }

    console.error('[competition-entries]', correlationId, 'Error creating competition entry:', error)

    return NextResponse.json(
      {
        error: 'Something went wrong while saving your entry.',
        details: errorMessage,
        correlationId,
        type: 'unknown_error',
      },
      { status: 500 }
    )
  }
}
