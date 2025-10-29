// Removed temporary diagnostics endpoint once deployment verified
export default function handler(_, res) {
  return res.status(404).json({ message: 'Not found' })
}


