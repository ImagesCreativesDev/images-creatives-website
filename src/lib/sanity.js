import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Query functions
export async function getFeaturedMember() {
  const query = `*[_type == "member" && featured == true] | order(_createdAt desc) [0] {
    _id,
    name,
    businessName,
    role,
    bio,
    description,
    image,
    profileLink,
    socialLinks
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured member:', error)
    return null
  }
}

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

export async function getUpcomingEvents(limit = 10) {
  const query = `*[_type == "event"] | order(eventDate asc) [0...${limit}] {
    _id,
    title,
    description,
    eventDate,
    location,
    image,
    registrationLink,
    isVirtual,
    headerColor,
    headerText,
    headerSubText,
    price,
    capacity,
    ticketsSold,
    buttonText
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
