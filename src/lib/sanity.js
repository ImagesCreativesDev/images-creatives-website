import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Use SANITY_API_WRITE_TOKEN (same as .env.local and App Router APIs); fallback for legacy SANITY_API_TOKEN
const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: writeToken, // Required for create/update/delete (events, members, assets)
})

// Client that bypasses CDN - use for events so updates appear immediately (no stale cache)
export const clientNoCdn = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: writeToken,
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
    slug,
    businessName,
    role,
    bio,
    description,
    image {
      _type,
      asset -> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
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
    slug,
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
    return await clientNoCdn.fetch(query)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    eventDate,
    location,
    image {
      _type,
      asset -> {
        _id,
        _type,
        url,
        metadata {
          dimensions { width, height }
        }
      },
      alt
    },
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
    return await clientNoCdn.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return null
  }
}

export async function getAllMembers() {
  const query = `*[_type == "member"] | order(name asc) {
    _id,
    name,
    slug,
    businessName,
    role,
    bio,
    image {
      _type,
      asset -> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    featured
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching all members:', error)
    return []
  }
}

export async function getMemberBySlug(slug) {
  const query = `*[_type == "member" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    businessName,
    role,
    bio,
    description,
    profileLink,
    image {
      _type,
      asset -> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    socialLinks,
    featured
  }`
  
  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching member by slug:', error)
    return null
  }
}
