import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Query functions
export async function getMembers() {
  const query = `*[_type == "member"] | order(_createdAt desc) [0...3] {
    _id,
    name,
    bio,
    image,
    role,
    socialLinks
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching members:', error)
    return []
  }
}

export async function getUpcomingEvents() {
  const query = `*[_type == "event"] | order(eventDate asc) [0...1] {
    _id,
    title,
    description,
    eventDate,
    location,
    image,
    registrationLink
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
