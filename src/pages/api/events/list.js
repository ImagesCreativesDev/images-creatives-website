import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const query = `*[_type == "event"] | order(eventDate asc) {
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
    }`

    const events = await client.fetch(query)

    res.status(200).json({ 
      events: events || []
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ message: 'Error fetching events' })
  }
}
