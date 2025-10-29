import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
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
      registrationLink
    } = req.body

    // Validate required fields
    if (!title || !description || !eventDate || !location) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const event = {
      _type: 'event',
      title,
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
      registrationLink: registrationLink || '#register'
    }

    const result = await client.create(event)

    res.status(201).json({ 
      message: 'Event created successfully',
      event: result 
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ message: 'Error creating event' })
  }
}
