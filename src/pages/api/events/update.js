import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      _id,
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
    if (!_id || !title || !description || !eventDate || !location) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const event = {
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

    const result = await client.patch(_id).set(event).commit()

    res.status(200).json({ 
      message: 'Event updated successfully',
      event: result 
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({ message: 'Error updating event' })
  }
}
