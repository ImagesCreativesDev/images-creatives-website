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

    // Handle slug - generate from name if not provided, or use provided slug
    let slugValue = req.body.slug
    if (!slugValue) {
      slugValue = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Check if slug already exists for another member
    const existingMember = await client.fetch(
      '*[_type == "member" && slug.current == $slug && _id != $currentId][0] { _id }',
      { slug: slugValue, currentId: _id }
    )

    if (existingMember) {
      // Append number if slug exists
      let counter = 1
      let uniqueSlug = `${slugValue}-${counter}`
      while (await client.fetch('*[_type == "member" && slug.current == $slug && _id != $currentId][0] { _id }', { slug: uniqueSlug, currentId: _id })) {
        counter++
        uniqueSlug = `${slugValue}-${counter}`
      }
      slugValue = uniqueSlug
    }

    // If this member is being featured, unfeature all others first
    if (featured) {
      const featuredMembers = await client.fetch(
        '*[_type == "member" && featured == true && _id != $currentId] { _id }',
        { currentId: _id }
      )
      
      // Unfeature all currently featured members (except the one being updated)
      for (const member of featuredMembers) {
        await client.patch(member._id).set({ featured: false }).commit()
      }
    }

    const member = {
      name,
      slug: {
        _type: 'slug',
        current: slugValue
      },
      businessName: businessName || '',
      role: role || '',
      bio,
      description: description || '',
      profileLink: profileLink || '',
      featured: featured || false
    }

    // Handle image - it should be a Sanity image object or null
    if (image && typeof image === 'object' && image._type === 'image') {
      member.image = image
    } else if (image === null || image === '') {
      // Explicitly set to null to remove image
      member.image = null
    }
    // If image is undefined, don't include it in the update (keeps existing)

    const result = await client.patch(_id).set(member).commit()

    res.status(200).json({ 
      message: 'Member updated successfully',
      member: result 
    })
  } catch (error) {
    console.error('Error updating member:', error)
    res.status(500).json({ 
      message: 'Error updating member',
      error: error.message || 'Unknown error'
    })
  }
}
