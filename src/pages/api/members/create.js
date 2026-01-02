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

    // Generate slug from name if not provided
    let slugValue = req.body.slug
    if (!slugValue) {
      slugValue = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Check if slug already exists
    const existingMember = await client.fetch(
      '*[_type == "member" && slug.current == $slug][0] { _id }',
      { slug: slugValue }
    )

    if (existingMember) {
      // Append number if slug exists
      let counter = 1
      let uniqueSlug = `${slugValue}-${counter}`
      while (await client.fetch('*[_type == "member" && slug.current == $slug][0] { _id }', { slug: uniqueSlug })) {
        counter++
        uniqueSlug = `${slugValue}-${counter}`
      }
      slugValue = uniqueSlug
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
    } else if (image) {
      // Legacy support: if it's a string URL, we'll skip it (should use file upload now)
      // member.image = null
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
