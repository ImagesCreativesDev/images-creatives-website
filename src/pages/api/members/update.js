import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      _id,
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
    if (!_id || !name || !bio) {
      return res.status(400).json({ message: 'ID, name and bio are required' })
    }

    // If this member is being featured, unfeature all others first
    if (featured) {
      await client
        .patch('*[_type == "member" && featured == true]')
        .set({ featured: false })
        .commit()
    }

    const member = {
      name,
      businessName: businessName || '',
      role: role || '',
      bio,
      description: description || '',
      profileLink: profileLink || '',
      image: image || '',
      featured: featured || false
    }

    const result = await client.patch(_id).set(member).commit()

    res.status(200).json({ 
      message: 'Member updated successfully',
      member: result 
    })
  } catch (error) {
    console.error('Error updating member:', error)
    res.status(500).json({ message: 'Error updating member' })
  }
}
