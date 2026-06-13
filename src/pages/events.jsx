import Head from 'next/head'
import Link from 'next/link'
import EventCard from '../components/EventCard'
import { getUpcomingEvents } from '../lib/sanity'

export default function EventsPage({ events }) {
  return (
    <div className='min-h-screen bg-[#433F59]'>
      <Head>
        <title>Events - Image Creatives</title>
        <meta name="description" content="Join us for inspiring workshops, meetings, and networking opportunities with Image Creatives of Southwest Florida." />
      </Head>
      {/* Page Header */}
      <section className='py-16 bg-[#593831]'>
        <div className='max-w-6xl mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-poppins font-bold text-white mb-4'>
            Upcoming Events
          </h1>
          <p className='text-xl text-gray-300 font-inter'>
            Join us for inspiring workshops, meetings, and networking opportunities
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className='py-12 md:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          {events.length === 0 ? (
            <div className='text-center py-12 px-6 bg-gray-800/30 rounded-brand-lg'>
              <p className='text-xl text-gray-300 font-inter mb-6'>
                No upcoming events right now — check back soon for workshops, meetings, and networking opportunities.
              </p>
              <Link
                href='/membership'
                className='inline-block bg-flame text-white px-6 py-3 rounded-lg hover:bg-ember transition-colors duration-300 font-inter font-medium'
              >
                Join Image Creatives
              </Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const events = await getUpcomingEvents(10)
    return {
      props: {
        events: events || []
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      props: {
        events: []
      }
    }
  }
}
