export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { password } = req.body

    // Check password server-side only
    if (password === process.env.ADMIN_PASSWORD) {
      // Generate a simple session token
      const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
      
      res.status(200).json({ 
        success: true,
        token: sessionToken
      })
    } else {
      res.status(401).json({ message: 'Invalid password' })
    }
  } catch (error) {
    console.error('Admin verification error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
