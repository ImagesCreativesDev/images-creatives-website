import Head from 'next/head'
import Hero from '../components/Hero'
import Button from '../components/Button'
import MemberSpotlight from '../components/MemberSpotlight'
import EventsCarousel from '../components/EventsCarousel'
import MembershipCTA from '../components/MembershipCTA'
import { getUpcomingEvents, getFeaturedMember } from '../lib/sanity'

export default function Home({ events, featuredMember }) {
  return (
    <div>
      <Head>
        <title>Image Creatives - Southwest Florida Photography Community</title>
        <meta name="description" content="Join Image Creatives of Southwest Florida - Where passionate photographers find their tribe, elevate their craft, and flourish through shared knowledge and unwavering support." />
      </Head>
      <Hero backgroundImage='/hero-bg.jpg' />
      
      {/* Member Spotlight Section */}
      <MemberSpotlight featuredMember={featuredMember} />
      
      {/* Upcoming Events Section */}
      <EventsCarousel events={events} />

      {/* Membership CTA Section */}
      <MembershipCTA />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const [events, featuredMember] = await Promise.all([
      getUpcomingEvents(5), // Get 5 events for the carousel
      getFeaturedMember() // Get the featured member
    ])
    
    return {
      props: {
        events: events || [],
        featuredMember: featuredMember || null
      }
    }
  } catch (error) {
    console.error('Error fetching data for homepage:', error)
    return {
      props: {
        events: [],
        featuredMember: null
      }
    }
  }
}
