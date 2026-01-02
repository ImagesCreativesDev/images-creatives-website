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

    // Verify the event exists first
    const event = await client.fetch(`*[_id == $id][0]`, { id: _id })
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Sanity delete - returns a transaction result
    const result = await client.delete(_id)

    res.status(200).json({ 
      message: 'Event deleted successfully',
      result
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    
    // Check for specific Sanity errors
    const errorMessage = error.message || 'Unknown error'
    const statusCode = error.statusCode || error.status || 500
    
    // Provide more helpful error messages
    let userMessage = 'Error deleting event'
    if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
      userMessage = 'Permission denied. Check that your Sanity token has delete permissions.'
    } else if (errorMessage.includes('not found')) {
      userMessage = 'Event not found'
    }
    
    res.status(statusCode).json({ 
      message: userMessage,
      error: errorMessage,
      // Include more details in development
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.responseBody || error.stack 
      })
    })
  }
}
