import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { slug } = req.query

    if (!slug) {
      return res.status(400).json({ message: 'Slug is required' })
    }

    const query = `*[_type == "member" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      businessName,
      role,
      bio,
      description,
      profileLink,
      image {
        _type,
        asset -> {
          _id,
          _type,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      socialLinks,
      featured
    }`

    const member = await client.fetch(query, { slug })

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    res.status(200).json({ member })
  } catch (error) {
    console.error('Error fetching member by slug:', error)
    res.status(500).json({ 
      message: 'Error fetching member',
      error: error.message || 'Unknown error'
    })
  }
}

