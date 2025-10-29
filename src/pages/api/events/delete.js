import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { _id } = req.body

    if (!_id) {
      return res.status(400).json({ message: 'Event ID is required' })
    }

    await client.delete(_id)

    res.status(200).json({ 
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ message: 'Error deleting event' })
  }
}
