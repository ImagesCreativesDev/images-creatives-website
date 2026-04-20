/**
 * Helpers for event descriptions stored as Sanity portable text (array of blocks + optional images).
 */

function makeKey() {
  return `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Convert plain text (paragraphs separated by blank lines) to minimal portable text blocks.
 * Used by the admin form and events API when description is submitted as a string.
 */
export function plainTextToPortableText(text) {
  if (!text || !String(text).trim()) return []
  const raw = String(text).trim()
  const parts = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const paragraphs = parts.length ? parts : [raw]
  return paragraphs.map((para) => ({
    _type: 'block',
    _key: makeKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: makeKey(),
        marks: [],
        text: para.replace(/\n/g, ' '),
      },
    ],
  }))
}

/**
 * Flatten portable text to plain string for excerpts, meta tags, and admin textarea.
 */
export function portableTextToPlainText(blocks) {
  if (blocks == null) return ''
  if (typeof blocks === 'string') return blocks
  if (!Array.isArray(blocks)) return ''
  const parts = []
  for (const block of blocks) {
    if (!block || !block._type) continue
    if (block._type === 'block' && Array.isArray(block.children)) {
      const text = block.children.map((c) => (c && c.text) || '').join('')
      if (text) parts.push(text)
    }
  }
  return parts.join('\n\n')
}

/**
 * Normalize API body: string -> blocks, or pass through valid block array.
 * Returns null if result would be empty.
 */
export function normalizeEventDescription(description) {
  if (Array.isArray(description) && description.length > 0) {
    return description
  }
  if (typeof description === 'string' && description.trim()) {
    const blocks = plainTextToPortableText(description)
    return blocks.length ? blocks : null
  }
  return null
}

export function excerptFromDescription(description, maxLen = 120) {
  const plain = portableTextToPlainText(description)
  if (!plain) return ''
  if (plain.length <= maxLen) return plain
  return `${plain.slice(0, maxLen).trim()}...`
}
