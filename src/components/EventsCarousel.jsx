'use client'
import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import { portableTextToPlainText } from '../lib/eventPortableText'
import Button from './Button'

function getEventImageLayout(image) {
  const dimensions = image?.asset?.metadata?.dimensions
  let width = dimensions?.width
  let height = dimensions?.height

  if (width && height && image.crop) {
    const widthFactor = 1 - (image.crop.left || 0) - (image.crop.right || 0)
    const heightFactor = 1 - (image.crop.top || 0) - (image.crop.bottom || 0)
    if (widthFactor > 0 && heightFactor > 0) {
      width = Math.max(1, Math.round(width * widthFactor))
      height = Math.max(1, Math.round(height * heightFactor))
    }
  }

  return {
    src: urlFor(image).width(1600).fit('max').auto('format').url(),
    width: width || 600,
    height: height || 800,
    hasDimensions: Boolean(width && height),
  }
}

export default function EventsCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentEvent = events[currentIndex]
  const eventImage = currentEvent?.image ? getEventImageLayout(currentEvent.image) : null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/New_York',
    })
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
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

        {events.length === 0 ? (
          <div className='bg-gray-800/50 rounded-brand-lg p-8 md:p-12 text-center shadow-brand-xl'>
            <p className='text-xl text-gray-300 font-inter mb-6'>
              No upcoming events right now — check back soon for workshops, meetings, and networking opportunities.
            </p>
            <Button href='/membership' variant='flame' className='text-base md:text-lg px-6 md:px-8 py-3 md:py-4'>
              Join Image Creatives
            </Button>
          </div>
        ) : (
          <div className='relative'>
            <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl'>
              <div className='grid md:grid-cols-3 gap-0'>
                {/* Left Column - Event Image */}
                <div className='md:col-span-1 relative w-full min-h-64 self-start flex items-center justify-center'>
                  {eventImage?.hasDimensions ? (
                    <Image
                      src={eventImage.src}
                      alt={currentEvent.image?.alt || currentEvent.title}
                      width={eventImage.width}
                      height={eventImage.height}
                      sizes='(max-width: 768px) 100vw, 33vw'
                      className='w-full h-auto'
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : eventImage ? (
                    <img
                      src={eventImage.src}
                      alt={currentEvent.image?.alt || currentEvent.title}
                      className='w-full h-auto'
                    />
                  ) : (
                    <div className='w-full min-h-64 bg-gradient-to-br from-flame/30 to-ember/30 flex items-center justify-center'>
                      <div className='text-center'>
                        <div className='text-6xl mb-4'>📅</div>
                        <p className='text-white/80 font-inter'>Event Image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Event Details */}
                <div className='md:col-span-2 p-8 md:p-12'>
                  <h3 className='text-2xl md:text-3xl font-poppins font-bold text-white mb-4'>
                    {currentEvent.title}
                  </h3>

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

                  <p className='text-gray-300 font-inter leading-relaxed mb-6'>
                    {portableTextToPlainText(currentEvent.description)}
                  </p>

                  <div className='mb-8'>
                    <Button 
                      href={currentEvent.slug?.current ? `/events/${currentEvent.slug.current}` : (currentEvent.slug ? `/events/${currentEvent.slug}` : '/events')} 
                      variant="flame"
                      className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                    >
                      More Information
                    </Button>
                  </div>

                  {events.length > 1 && (
                    <div className='flex items-center justify-between pt-6 border-t border-white/10'>
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

                      <div className='flex space-x-2'>
                        {events.map((_, index) => (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
