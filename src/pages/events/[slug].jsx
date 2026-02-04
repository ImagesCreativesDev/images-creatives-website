import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getEventBySlug } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Button from '../../components/Button'

export default function EventPage({ event }) {
  if (!event) {
    return (
      <div className='min-h-screen bg-[#433F59] flex items-center justify-center'>
        <Head>
          <title>Event Not Found - Image Creatives</title>
        </Head>
        <div className='text-center'>
          <h1 className='text-4xl font-poppins font-bold text-white mb-4'>Event Not Found</h1>
          <p className='text-gray-300 font-inter mb-6'>The event you're looking for doesn't exist or may have been removed.</p>
          <Link href='/events'>
            <Button variant="flame">Back to Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  const hasValidImage = event.image && typeof event.image === 'object' && event.image.asset

  const eventSlug = event.slug?.current || event.slug
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      dateStr: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      timeStr: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    }
  }
  const { dateStr, timeStr } = formatDate(event.eventDate)

  return (
    <div className='min-h-screen bg-[#433F59]'>
      <Head>
        <title>{event.title} - Image Creatives</title>
        <meta name="description" content={event.description ? `${event.description.substring(0, 160)}...` : `Details for ${event.title}, Image Creatives of Southwest Florida.`} />
      </Head>

      {/* Back Navigation */}
      <section className='py-8 bg-[#593831]'>
        <div className='max-w-6xl mx-auto px-4'>
          <Link href='/events' className='inline-flex items-center text-flame hover:text-ember transition-colors duration-300 font-inter'>
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back to Events
          </Link>
        </div>
      </section>

      {/* Event Detail Section */}
      <section className='py-12 md:py-20 bg-[#191C26]'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl'>
            <div className='grid md:grid-cols-2 gap-0'>
              {/* Left Column - Event Image */}
              <div className='relative h-80 md:min-h-[400px]'>
                {hasValidImage ? (
                  <Image
                    src={urlFor(event.image).width(800).height(600).url()}
                    alt={event.image?.alt || event.title}
                    width={800}
                    height={600}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gradient-to-br from-flame/30 to-ember/30 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='text-6xl mb-4'>📅</div>
                      <p className='text-white/80 font-inter'>Event Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Content */}
              <div className='p-8 md:p-12 flex flex-col justify-center'>
                {event.headerText && (
                  <p className='text-flame font-inter text-sm font-medium uppercase tracking-wide mb-1'>
                    {event.headerText}
                  </p>
                )}
                {event.headerSubText && (
                  <p className='text-gray-400 font-inter text-xs uppercase tracking-wide mb-3'>
                    {event.headerSubText}
                  </p>
                )}

                <h1 className='text-3xl md:text-4xl font-poppins font-bold text-white mb-6'>
                  {event.title}
                </h1>

                {/* Date & Time */}
                <div className='flex items-start space-x-3 mb-4'>
                  <span className='text-flame text-lg'>📅</span>
                  <div>
                    <p className='text-white font-inter font-medium'>{dateStr}</p>
                    <p className='text-gray-400 font-inter text-sm'>{timeStr}</p>
                  </div>
                </div>

                {/* Location */}
                <div className='flex items-start space-x-3 mb-4'>
                  <span className='text-flame text-lg'>📍</span>
                  <p className='text-gray-300 font-inter'>{event.location}</p>
                </div>

                {event.isVirtual && (
                  <p className='text-gray-400 font-inter text-sm mb-4'>💻 Virtual Event</p>
                )}

                {/* Price */}
                {event.price && (
                  <div className='flex items-center space-x-2 mb-4'>
                    <span className='text-flame'>🎫</span>
                    <p className='text-gray-300 font-inter'>{event.price}</p>
                  </div>
                )}

                {/* Capacity (optional) */}
                {(event.capacity != null || event.ticketsSold != null) && (
                  <p className='text-gray-400 font-inter text-sm mb-4'>
                    {event.ticketsSold ?? 0}
                    {event.capacity != null && ` / ${event.capacity} spots`}
                  </p>
                )}

                {/* Description */}
                <div className='mb-6'>
                  <p className='text-gray-300 font-inter leading-relaxed whitespace-pre-line'>
                    {event.description}
                  </p>
                </div>

                {/* Optional external link (e.g. venue or more info) */}
                {event.registrationLink && (
                  <div className='mt-auto pt-4'>
                    <Button
                      href={event.registrationLink}
                      variant="flame"
                      className='text-base md:text-lg px-6 md:px-8 py-3 md:py-4'
                    >
                      {event.buttonText || 'More Information'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const slug = params?.slug
    if (!slug) {
      return { notFound: true }
    }
    const event = await getEventBySlug(slug)

    if (!event) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        event,
      },
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    return {
      notFound: true,
    }
  }
}
