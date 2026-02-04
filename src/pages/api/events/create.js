import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) {
    return res.status(500).json({
      message: 'Server misconfiguration: SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN) is not set. Add it in .env.local and in your host (e.g. Vercel) environment.',
    })
  }

  try {
    const {
      title,
      description,
      eventDate,
      location,
      isVirtual,
      headerColor,
      headerText,
      headerSubText,
      price,
      capacity,
      ticketsSold,
      buttonText,
      registrationLink,
      slug: slugInput,
      image
    } = req.body

    // Validate required fields
    if (!title || !description || !eventDate || !location) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Generate slug from title if not provided
    const slugValue = slugInput || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Ensure unique slug
    let finalSlug = slugValue
    const existing = await client.fetch(
      '*[_type == "event" && slug.current == $slug][0] { _id }',
      { slug: finalSlug }
    )
    if (existing) {
      let counter = 1
      while (await client.fetch('*[_type == "event" && slug.current == $slug][0] { _id }', { slug: `${finalSlug}-${counter}` })) {
        counter++
      }
      finalSlug = `${finalSlug}-${counter}`
    }

    const event = {
      _type: 'event',
      title,
      slug: { _type: 'slug', current: finalSlug },
      description,
      eventDate: new Date(eventDate).toISOString(),
      location,
      isVirtual: isVirtual || false,
      headerColor: headerColor || 'blue',
      headerText: headerText || '',
      headerSubText: headerSubText || '',
      price: price || '',
      capacity: capacity ? parseInt(capacity) : null,
      ticketsSold: ticketsSold ? parseInt(ticketsSold) : 0,
      buttonText: buttonText || 'View Details',
      registrationLink: registrationLink || ''
    }

    if (image && typeof image === 'object' && image._type === 'image') {
      event.image = image
    }

    const result = await client.create(event)

    res.status(201).json({ 
      message: 'Event created successfully',
      event: result 
    })
  } catch (error) {
    console.error('Error creating event:', error)
    const message = error.message || 'Error creating event'
    const statusCode = error.statusCode || error.status || 500
    res.status(statusCode).json({
      message: message.includes('permission') || message.includes('Insufficient permissions')
        ? 'Permission denied. Ensure SANITY_API_WRITE_TOKEN is set and has create permission for events in Sanity.'
        : 'Error creating event',
      error: message,
    })
  }
}
