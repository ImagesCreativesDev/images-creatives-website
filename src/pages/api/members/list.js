import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const query = `*[_type == "member"] | order(_createdAt desc) {
      _id,
      name,
      businessName,
      role,
      bio,
      description,
      profileLink,
      image,
      featured
    }`

    const members = await client.fetch(query)

    res.status(200).json({ 
      members: members || []
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    res.status(500).json({ message: 'Error fetching members' })
  }
}
