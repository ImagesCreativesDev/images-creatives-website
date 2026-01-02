import { client } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { _id } = req.body

    if (!_id) {
      return res.status(400).json({ message: 'Member ID is required' })
    }

    // Verify the member exists
    const member = await client.fetch(`*[_id == $id][0]`, { id: _id })
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    // Unfeature all currently featured members
    const featuredMembers = await client.fetch(
      '*[_type == "member" && featured == true && _id != $currentId] { _id }',
      { currentId: _id }
    )
    
    // Unfeature all currently featured members (except the one being featured)
    for (const featuredMember of featuredMembers) {
      await client.patch(featuredMember._id).set({ featured: false }).commit()
    }

    // Feature the selected member
    const result = await client.patch(_id).set({ featured: true }).commit()

    res.status(200).json({ 
      message: 'Member featured successfully',
      member: result 
    })
  } catch (error) {
    console.error('Error featuring member:', error)
    res.status(500).json({ 
      message: 'Error featuring member',
      error: error.message || 'Unknown error'
    })
  }
}

