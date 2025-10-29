'use client'
import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import Button from './Button'

export default function EventsCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock data for development
  const mockEvents = [
    {
      _id: '1',
      title: 'Monthly Meetup - March 2025',
      description: 'Join us for our monthly Image Creatives meetup featuring inspiring speakers and networking opportunities.',
      eventDate: '2025-03-15T18:00:00Z',
      location: 'Location TBA',
      image: null,
      registrationLink: '#register'
    },
    {
      _id: '2',
      title: 'Photography Workshop',
      description: 'Learn advanced photography techniques from industry professionals.',
      eventDate: '2025-04-20T14:00:00Z',
      location: 'Image Creatives Studio',
      image: null,
      registrationLink: '#register'
    },
    {
      _id: '3',
      title: 'Portfolio Review Night',
      description: 'Get feedback on your portfolio from fellow photographers and mentors.',
      eventDate: '2025-05-10T18:00:00Z',
      location: 'Downtown Gallery',
      image: null,
      registrationLink: '#register'
    }
  ]

  const displayEvents = events.length > 0 ? events : mockEvents
  const currentEvent = displayEvents[currentIndex]

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayEvents.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayEvents.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className='py-12 md:py-20 bg-[#593831] text-white relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 w-32 h-32 bg-flame/30 rounded-full blur-2xl'></div>
        <div className='absolute bottom-10 right-10 w-40 h-40 bg-ember/30 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        {/* Section Header */}
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-poppins font-bold text-white inline-flex items-center'>
            Upcoming Events
            <span className='ml-4 flex-1 h-px bg-gradient-to-r from-flame to-transparent'></span>
          </h2>
        </div>

        {/* Event Carousel */}
        <div className='relative'>
          <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl'>
            <div className='grid md:grid-cols-3 gap-0'>
              {/* Left Column - Event Image */}
              <div className='md:col-span-1 relative h-64 md:h-auto'>
                {currentEvent.image ? (
                  <Image
                    src={urlFor(currentEvent.image).width(600).height(800).url()}
                    alt={currentEvent.title}
                    width={600}
                    height={800}
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

              {/* Right Column - Event Details */}
              <div className='md:col-span-2 p-8 md:p-12'>
                {/* Event Title */}
                <h3 className='text-2xl md:text-3xl font-poppins font-bold text-white mb-4'>
                  {currentEvent.title}
                </h3>

                {/* Event Details */}
                <div className='space-y-3 mb-6'>
                  <div className='flex items-start space-x-3'>
                    <span className='text-flame text-lg'>📅</span>
                    <div>
                      <p className='text-gray-300 font-inter'>{formatDate(currentEvent.eventDate)}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-start space-x-3'>
                    <span className='text-flame text-lg'>📍</span>
                    <p className='text-gray-300 font-inter'>{currentEvent.location}</p>
                  </div>
                </div>

                {/* Description */}
                <p className='text-gray-300 font-inter leading-relaxed mb-6'>
                  {currentEvent.description}
                </p>

                {/* CTA Button */}
                <div className='mb-8'>
                  <Button 
                    href={currentEvent.registrationLink || '#register'} 
                    variant="flame"
                    className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                  >
                    Register Now
                  </Button>
                </div>

                {/* Carousel Navigation */}
                <div className='flex items-center justify-between pt-6 border-t border-white/10'>
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    className='flex items-center space-x-2 text-white hover:text-flame transition-colors duration-300'
                    aria-label='Previous event'
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                    <span className='font-inter'>Previous</span>
                  </button>

                  {/* Dots Indicator */}
                  <div className='flex space-x-2'>
                    {displayEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 ${
                          index === currentIndex
                            ? 'w-8 h-2 bg-flame rounded-full'
                            : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    className='flex items-center space-x-2 text-white hover:text-flame transition-colors duration-300'
                    aria-label='Next event'
                  >
                    <span className='font-inter'>Next</span>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

