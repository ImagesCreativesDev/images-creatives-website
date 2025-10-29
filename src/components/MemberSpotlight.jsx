import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import Button from './Button'

export default function MemberSpotlight({ featuredMember }) {
  // Mock data for development
  const mockMember = {
    _id: '1',
    name: 'Karen Kurta',
    businessName: 'Karen K Photo',
    role: 'Commercial Photographer',
    bio: 'Experienced commercial photographer with a background in marketing and design',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At Karen K Photo, we specialize in professional, high-quality photography for businesses, designed to elevate your brand and tell your story. From polished headshots and cohesive team portraits to dynamic corporate event coverage and stunning branding photography, we create visuals that inspire confidence and connection. Our expertise also extends to architectural photography, showcasing the innovation and craftsmanship of your projects to help you stand out in proposals, marketing materials, and real estate listings.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Founded by Karen Kurta, an experienced commercial photographer with a background in marketing and design, Karen K Photo blends technical expertise with creative storytelling to deliver impactful, business-focused results. Whether you are a professional refreshing your personal brand, a company strengthening its visual identity, or part of the architecture and real estate industries, we provide tailored photography services that meet your unique needs.'
          }
        ]
      }
    ],
    image: null,
    profileLink: '#profile'
  }

  const member = featuredMember || mockMember

  // Helper function to render description blocks
  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null
    return description.map((block, index) => (
      <p key={index} className='text-gray-300 font-inter leading-relaxed mb-4'>
        {block.children.map((child, childIndex) => (
          <span key={childIndex}>{child.text}</span>
        ))}
      </p>
    ))
  }

  return (
    <section className='py-12 md:py-20 bg-[#191C26]'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-poppins font-bold text-white inline-flex items-center'>
            Featured Member
            <span className='ml-4 flex-1 h-px bg-gradient-to-r from-flame to-transparent'></span>
          </h2>
        </div>

        {/* Featured Member Card */}
        <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl'>
          <div className='grid md:grid-cols-2 gap-0'>
            {/* Left Column - Image */}
            <div className='relative h-80 md:h-auto'>
              {member.image ? (
                <Image
                  src={urlFor(member.image).width(600).height(800).url()}
                  alt={member.name}
                  width={600}
                  height={800}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-gradient-to-br from-flame/30 to-ember/30 flex items-center justify-center'>
                  <div className='w-32 h-32 bg-gradient-flame rounded-full flex items-center justify-center text-white text-5xl font-poppins font-bold'>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className='p-8 md:p-12 flex flex-col justify-center'>
              {/* Business Name */}
              {member.businessName && (
                <p className='text-flame font-inter text-sm md:text-base font-medium mb-2'>
                  {member.businessName}
                </p>
              )}
              
              {/* Member Name */}
              <h3 className='text-3xl md:text-4xl font-poppins font-bold text-white mb-4'>
                {member.name}
              </h3>

              {/* Description */}
              {member.description && renderDescription(member.description)}
              
              {/* Fallback Bio */}
              {!member.description && member.bio && (
                <p className='text-gray-300 font-inter leading-relaxed mb-6'>
                  {member.bio}
                </p>
              )}

              {/* CTA Button */}
              <div className='mt-6'>
                <Button 
                  href={member.profileLink || '#profile'} 
                  variant="flame"
                  className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                >
                  View This Photographer's Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}