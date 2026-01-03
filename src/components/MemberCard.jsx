import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'

export default function MemberCard({ member }) {
  // Helper function to get image URL or return null
  const getImageUrl = () => {
    if (!member.image || typeof member.image !== 'object' || member.image._type !== 'image' || !member.image.asset) {
      return null
    }
    try {
      // Request smaller image size to ensure it fits
      return urlFor(member.image).width(400).height(400).fit('max').url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      return null
    }
  }

  const imageUrl = getImageUrl()
  const slug = member.slug?.current || member.slug

  // Render image or placeholder
  const renderImage = () => (
    <div 
      className='relative bg-gray-800 flex items-center justify-center' 
      style={{ 
        height: '400px', 
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {imageUrl ? (
        <div 
          className='w-full h-full flex items-center justify-center' 
          style={{ 
            height: '400px', 
            width: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <img
            src={imageUrl}
            alt={member.name || 'Member photo'}
            className='group-hover:scale-110 transition-transform duration-500'
            style={{ 
              maxHeight: '350px',
              maxWidth: '100%',
              height: 'auto',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              objectPosition: 'center',
              transform: 'scale(0.9)'
            }}
          />
        </div>
      ) : (
        <div className='w-full h-full bg-gradient-to-br from-flame/30 to-ember/30 flex items-center justify-center' style={{ height: '400px' }}>
          <div className='w-32 h-32 bg-gradient-flame rounded-full flex items-center justify-center text-white text-5xl font-poppins font-bold'>
            {member.name ? member.name.split(' ').map(n => n[0]).join('') : '?'}
          </div>
        </div>
      )}
    </div>
  )

  // Card content
  const cardContent = (
    <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl hover:shadow-brand-lg transition-all duration-300 group'>
      <div className='grid md:grid-cols-2 gap-0'>
        {/* Left Column - Image */}
        <div style={{ height: '400px', width: '100%' }}>
          {renderImage()}
        </div>

        {/* Right Column - Content */}
        <div className='p-6 md:p-8 flex flex-col justify-center'>
          {/* Business Name */}
          {member.businessName && (
            <p className='text-flame font-inter text-sm md:text-base font-medium mb-2'>
              {member.businessName}
            </p>
          )}
          
          {/* Member Name */}
          <h3 className='text-2xl md:text-3xl font-poppins font-bold text-white mb-3 group-hover:text-flame transition-colors duration-300'>
            {member.name}
          </h3>

          {/* Role */}
          {member.role && (
            <p className='text-gray-400 font-inter text-base mb-4'>
              {member.role}
            </p>
          )}

          {/* Bio Preview */}
          {member.bio && (
            <p className='text-gray-300 font-inter text-sm md:text-base leading-relaxed mb-6 line-clamp-4'>
              {member.bio}
            </p>
          )}

          {/* View Profile Link */}
          {slug && (
            <div className='mt-auto pt-4 border-t border-gray-700'>
              <span className='text-flame font-inter text-sm font-medium group-hover:text-ember transition-colors duration-300 inline-flex items-center'>
                View Profile
                <svg className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Don't render link if no slug
  if (!slug) {
    return cardContent
  }

  return (
    <Link href={`/members/${slug}`} className='block'>
      {cardContent}
    </Link>
  )
}

