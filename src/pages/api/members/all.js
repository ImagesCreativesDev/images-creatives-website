import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const query = `*[_type == "member"] | order(name asc) {
      _id,
      name,
      slug,
      businessName,
      role,
      bio,
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
      featured
    }`

    const members = await client.fetch(query)

    res.status(200).json({ 
      members: members || []
    })
  } catch (error) {
    console.error('Error fetching all members:', error)
    res.status(500).json({ 
      message: 'Error fetching members',
      error: error.message || 'Unknown error'
    })
  }
}

