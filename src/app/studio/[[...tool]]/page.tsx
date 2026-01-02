/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Studio must be dynamic, not static
export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  // Verify environment variables are set
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Configuration Error</h1>
        <p>NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please configure your environment variables.</p>
      </div>
    )
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Configuration Error</h1>
        <p>NEXT_PUBLIC_SANITY_DATASET is not set. Please configure your environment variables.</p>
      </div>
    )
  }

  return <NextStudio config={config} />
}
