import { client } from '../../../lib/sanity'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // 10MB max file size
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { imageData, filename } = req.body

    if (!imageData) {
      return res.status(400).json({ message: 'Image data is required' })
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Determine MIME type from the data URL
    const mimeMatch = imageData.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/)
    const mimeType = mimeMatch ? `image/${mimeMatch[1]}` : 'image/jpeg'
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: filename || 'member-image.jpg',
      contentType: mimeType,
    })

    // Return the asset reference in the format Sanity expects
    res.status(200).json({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({
      message: 'Error uploading image',
      error: error.message || 'Unknown error',
    })
  }
}

