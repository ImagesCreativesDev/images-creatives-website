import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      name,
      businessName,
      role,
      bio,
      description,
      profileLink,
      image,
      featured
    } = req.body

    // Validate required fields
    if (!name || !bio) {
      return res.status(400).json({ message: 'Name and bio are required' })
    }

    // If this member is being featured, unfeature all others first
    if (featured) {
      const featuredMembers = await client.fetch(
        '*[_type == "member" && featured == true] { _id }'
      )
      
      // Unfeature all currently featured members
      for (const member of featuredMembers) {
        await client.patch(member._id).set({ featured: false }).commit()
      }
    }

    const member = {
      _type: 'member',
      name,
      businessName: businessName || '',
      role: role || '',
      bio,
      description: description || '',
      profileLink: profileLink || '',
      image: image || '',
      featured: featured || false
    }

    const result = await client.create(member)

    res.status(201).json({ 
      message: 'Member created successfully',
      member: result 
    })
  } catch (error) {
    console.error('Error creating member:', error)
    res.status(500).json({ 
      message: 'Error creating member',
      error: error.message || 'Unknown error'
    })
  }
}
