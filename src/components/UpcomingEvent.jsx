import Image from 'next/image'
import { urlFor } from '../lib/sanity'

export default function UpcomingEvent({ events = [] }) {
  // Mock data for development
  const mockEvent = {
    _id: '1',
    title: 'Creative Workshop: Digital Art & Design',
    description: 'Join us for an immersive workshop exploring the latest trends in digital art and design. Learn from industry experts and network with fellow creatives.',
    eventDate: '2024-03-15T18:00:00Z',
    location: 'Image Creatives Studio, Downtown',
    image: null,
    registrationLink: '#register'
  }

  const event = events.length > 0 ? events[0] : mockEvent

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const tz = 'America/New_York'
    return {
      day: parseInt(date.toLocaleDateString('en-US', { timeZone: tz, day: 'numeric' }), 10),
      month: date.toLocaleDateString('en-US', { timeZone: tz, month: 'short' }),
      year: parseInt(date.toLocaleDateString('en-US', { timeZone: tz, year: 'numeric' }), 10),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true,
        timeZone: tz,
      })
    }
  }

  const eventDate = formatDate(event.eventDate)

  return (
    <section className='py-20 bg-gradient-to-br from-night via-night to-cool/90 text-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 w-32 h-32 bg-flame/30 rounded-full blur-2xl'></div>
        <div className='absolute bottom-10 right-10 w-40 h-40 bg-ember/30 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cool/20 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-montserrat font-semibold mb-6'>
            Upcoming Event
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto font-inter'>
            Don't miss our exclusive creative events and workshops designed to inspire and connect.
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='card-brand bg-white/10 backdrop-blur-sm border border-white/20 group hover:bg-white/15 transition-all duration-500'>
            <div className='grid lg:grid-cols-2 gap-8 items-center'>
              {/* Event Image */}
              <div className='relative'>
                <div className='aspect-video bg-gradient-to-br from-flame/30 to-ember/30 rounded-brand-lg overflow-hidden'>
                  {event.image ? (
                    <Image
                      src={urlFor(event.image).width(600).height(400).url()}
                      alt={event.title}
                      width={600}
                      height={400}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <div className='text-center'>
                        <div className='text-6xl mb-4'>🎨</div>
                        <p className='text-white/80 font-inter'>Event Preview</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Date Badge */}
                <div className='absolute -top-4 -right-4 bg-gradient-flame rounded-brand-lg p-4 text-center shadow-brand-lg'>
                  <div className='text-white font-poppins font-bold text-2xl'>{eventDate.day}</div>
                  <div className='text-white/90 font-inter text-sm'>{eventDate.month}</div>
                  <div className='text-white/90 font-inter text-xs'>{eventDate.year}</div>
                </div>
              </div>

              {/* Event Details */}
              <div className='p-6 lg:p-8'>
                <h3 className='text-2xl lg:text-3xl font-poppins font-bold text-white mb-4 group-hover:text-gradient-flame transition-all duration-300'>
                  {event.title}
                </h3>
                
                <p className='text-gray-300 font-inter leading-relaxed mb-6'>
                  {event.description}
                </p>

                {/* Event Info */}
                <div className='space-y-4 mb-8'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-flame/20 rounded-brand flex items-center justify-center'>
                      <span className='text-flame text-lg'>📅</span>
                    </div>
                    <div>
                      <p className='text-white font-inter font-medium'>{eventDate.month} {eventDate.day}, {eventDate.year}</p>
                      <p className='text-gray-400 font-inter text-sm'>{eventDate.time}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-cool/20 rounded-brand flex items-center justify-center'>
                      <span className='text-cool text-lg'>📍</span>
                    </div>
                    <p className='text-gray-300 font-inter'>{event.location}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <a 
                    href={event.registrationLink}
                    className='btn-brand text-center'
                  >
                    Register Now
                  </a>
                  <a 
                    href='#events'
                    className='btn-brand-cool text-center'
                  >
                    View All Events
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
