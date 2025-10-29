import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import Button from './Button'

const headerColors = {
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
}

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { 
      weekday: 'short', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }
    const dateStr = date.toLocaleDateString('en-US', options)
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
    return `${dateStr} ${timeStr}`
  }

  const formatDescription = (desc) => {
    if (!desc) return ''
    if (desc.length > 120) {
      return desc.substring(0, 120) + '...'
    }
    return desc
  }

  return (
    <div className='bg-gray-900 rounded-brand-lg overflow-hidden shadow-brand-xl hover:shadow-brand-lg transition-all duration-300'>
      {/* Header Section */}
      <div className={`relative ${headerColors[event.headerColor] || headerColors.blue} p-6`}>
        {/* Decorative Camera Icons */}
        <div className='absolute inset-0 opacity-20 flex items-center justify-center'>
          <svg className='w-24 h-24' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </div>

        {/* Header Content */}
        <div className='relative z-10'>
          {event.headerText && (
            <p className={`text-sm font-montserrat font-bold ${
              event.headerColor === 'yellow' ? 'text-gray-800' : 'text-white'
            } mb-2 uppercase tracking-wide`}>
              {event.headerText}
            </p>
          )}
          {event.headerSubText && (
            <p className={`text-xs font-inter ${
              event.headerColor === 'yellow' ? 'text-gray-700' : 'text-white'
            } mb-3 uppercase tracking-wide`}>
              {event.headerSubText}
            </p>
          )}
          <p className={`text-2xl font-poppins font-bold ${
            event.headerColor === 'yellow' ? 'text-gray-800' : 'text-white'
          } mb-1`}>
            Image Creatives
          </p>
          <p className={`text-xs font-inter ${
            event.headerColor === 'yellow' ? 'text-gray-700' : 'text-white/80'
          }`}>
            of Southwest Florida
          </p>
        </div>

        {/* Interactive Icons */}
        <div className='absolute bottom-4 right-4 flex space-x-2'>
          <button className='w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-300'>
            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
          </button>
          <button className='w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-300'>
            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-6'>
        {/* Title */}
        <h3 className='text-xl font-poppins font-bold text-white mb-4'>
          {event.title}
        </h3>

        {/* Details */}
        <div className='space-y-2 mb-4'>
          {event.isVirtual && (
            <p className='text-gray-400 font-inter text-sm'>Virtual</p>
          )}
          <p className='text-gray-400 font-inter text-sm'>{formatDate(event.eventDate)}</p>
          <p className='text-gray-400 font-inter text-sm'>{event.location}</p>
        </div>

        {/* Price and Capacity */}
        {(event.price || event.capacity) && (
          <div className='flex items-center justify-between mb-4 text-sm'>
            {event.price && (
              <p className='text-white font-inter flex items-center space-x-2'>
                <span>🎫</span>
                <span>{event.price}</span>
              </p>
            )}
            {event.capacity && (
              <p className='text-gray-400 font-inter'>
                {event.ticketsSold || 0}/{event.capacity}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        <p className='text-gray-400 font-inter text-sm leading-relaxed mb-6'>
          {formatDescription(event.description)}
        </p>

        {/* CTA Button */}
        <div className='text-center'>
          <Button 
            href={event.registrationLink || '#register'} 
            variant="flame"
            className="w-full"
          >
            {event.buttonText || 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  )
}

