import Head from 'next/head'
import Hero from '../components/Hero'
import Button from '../components/Button'
import MemberSpotlight from '../components/MemberSpotlight'
import EventsCarousel from '../components/EventsCarousel'
import MembershipCTA from '../components/MembershipCTA'
import { getUpcomingEvents } from '../lib/sanity'

export default function Home({ events }) {
  return (
    <div>
      <Head>
        <title>Image Creatives - Southwest Florida Photography Community</title>
        <meta name="description" content="Join Image Creatives of Southwest Florida - Where passionate photographers find their tribe, elevate their craft, and flourish through shared knowledge and unwavering support." />
      </Head>
      <Hero backgroundImage='/hero-bg.jpg' />
      
      {/* Member Spotlight Section */}
      <MemberSpotlight />
      
      {/* Upcoming Events Section */}
      <EventsCarousel events={events} />

      {/* Membership CTA Section */}
      <MembershipCTA />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const events = await getUpcomingEvents(5) // Get 5 events for the carousel
    return {
      props: {
        events: events || []
      }
    }
  } catch (error) {
    console.error('Error fetching events for homepage:', error)
    return {
      props: {
        events: []
      }
    }
  }
}
