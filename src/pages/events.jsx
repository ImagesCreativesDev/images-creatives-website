import Head from 'next/head'
import EventCard from '../components/EventCard'
import { getUpcomingEvents } from '../lib/sanity'

export default function EventsPage({ events }) {
  // Fallback mock events if no Sanity data
  const mockEvents = [
    {
      _id: '1',
      title: 'November PPCF Board Meeting',
      description: 'Our monthly board member meeting is a collaborative gathering of the leadership team of the Professional Photographers of Central Florida...',
      eventDate: '2025-11-10T19:00:00Z',
      location: 'Virtual',
      isVirtual: true,
      headerColor: 'yellow',
      headerText: 'BOARD MEETING',
      headerSubText: '',
      price: null,
      capacity: null,
      buttonText: 'View Details',
      registrationLink: '#details'
    },
    {
      _id: '2',
      title: 'November 2025 Monthly Meeting',
      description: 'Join us for our monthly PPCF meeting featuring inspiring speakers, networking opportunities, and educational content for photographers of all levels.',
      eventDate: '2025-11-18T18:30:00Z',
      location: 'Evolve Technology',
      isVirtual: false,
      headerColor: 'blue',
      headerText: 'MONTHLY MEETING',
      headerSubText: 'ENGAGE & EDUCATE',
      price: 'Starting $0.00',
      capacity: 100,
      ticketsSold: 0,
      buttonText: 'Buy Tickets',
      registrationLink: '#tickets'
    },
    {
      _id: '3',
      title: 'December Workshop - Advanced Lighting',
      description: 'Learn advanced lighting techniques from industry professionals. This hands-on workshop will cover studio lighting, outdoor techniques, and creative lighting setups.',
      eventDate: '2025-12-05T10:00:00Z',
      location: 'Image Creatives Studio',
      isVirtual: false,
      headerColor: 'purple',
      headerText: 'WORKSHOP',
      headerSubText: 'LEARN & CREATE',
      price: 'Starting $75.00',
      capacity: 20,
      ticketsSold: 8,
      buttonText: 'Register Now',
      registrationLink: '#register'
    }
  ]

  // Use Sanity events if available, otherwise fallback to mock data
  const displayEvents = events && events.length > 0 ? events : mockEvents

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
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {displayEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
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

