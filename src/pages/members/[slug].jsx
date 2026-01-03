import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getMemberBySlug } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Button from '../../components/Button'

export default function MemberPage({ member }) {
  if (!member) {
    return (
      <div className='min-h-screen bg-[#433F59] flex items-center justify-center'>
        <Head>
          <title>Member Not Found - Image Creatives</title>
        </Head>
        <div className='text-center'>
          <h1 className='text-4xl font-poppins font-bold text-white mb-4'>Member Not Found</h1>
          <p className='text-gray-300 font-inter mb-6'>The member you're looking for doesn't exist.</p>
          <Link href='/members'>
            <Button variant="flame">Back to Members</Button>
          </Link>
        </div>
      </div>
    )
  }

  const hasValidImage = member.image && 
    typeof member.image === 'object' && 
    member.image._type === 'image' &&
    member.image.asset

  // Helper function to render description blocks or plain text
  const renderDescription = (description) => {
    if (!description) return null
    
    // If it's a string, render it directly
    if (typeof description === 'string') {
      const paragraphs = description.split('\n').filter(p => p.trim())
      return paragraphs.map((para, index) => (
        <p key={index} className='text-gray-300 font-inter leading-relaxed mb-4'>
          {para.trim()}
        </p>
      ))
    }
    
    // If it's an array of blocks (portable text format)
    if (Array.isArray(description)) {
      return description.map((block, index) => {
        if (block._type === 'block' && block.children) {
          return (
            <p key={index} className='text-gray-300 font-inter leading-relaxed mb-4'>
              {block.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          )
        }
        return null
      }).filter(Boolean)
    }
    
    return null
  }

  return (
    <div className='min-h-screen bg-[#433F59]'>
      <Head>
        <title>{member.name} - Image Creatives</title>
        <meta name="description" content={member.bio || `Profile of ${member.name}, ${member.role || 'member'} of Image Creatives of Southwest Florida.`} />
      </Head>

      {/* Back Navigation */}
      <section className='py-8 bg-[#593831]'>
        <div className='max-w-6xl mx-auto px-4'>
          <Link href='/members' className='inline-flex items-center text-flame hover:text-ember transition-colors duration-300 font-inter'>
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back to Members
          </Link>
        </div>
      </section>

      {/* Member Profile Section */}
      <section className='py-12 md:py-20 bg-[#191C26]'>
        <div className='max-w-6xl mx-auto px-4'>
          {/* Member Card */}
          <div className='bg-gray-800/50 rounded-brand-lg overflow-hidden shadow-brand-xl'>
            <div className='grid md:grid-cols-2 gap-0'>
              {/* Left Column - Image */}
              <div className='relative h-80 md:h-auto'>
                {hasValidImage ? (
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
                <h1 className='text-3xl md:text-4xl font-poppins font-bold text-white mb-2'>
                  {member.name}
                </h1>

                {/* Role */}
                {member.role && (
                  <p className='text-gray-400 font-inter text-lg mb-6'>
                    {member.role}
                  </p>
                )}

                {/* Description */}
                {member.description && renderDescription(member.description)}
                
                {/* Fallback Bio */}
                {!member.description && member.bio && (
                  <p className='text-gray-300 font-inter leading-relaxed mb-6'>
                    {member.bio}
                  </p>
                )}

                {/* Social Links */}
                {member.socialLinks && (member.socialLinks.twitter || member.socialLinks.linkedin || member.socialLinks.instagram) && (
                  <div className='flex space-x-4 mb-6'>
                    {member.socialLinks.twitter && (
                      <a 
                        href={member.socialLinks.twitter} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='text-gray-400 hover:text-flame transition-colors duration-300'
                        aria-label='Twitter'
                      >
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'/>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a 
                        href={member.socialLinks.linkedin} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='text-gray-400 hover:text-flame transition-colors duration-300'
                        aria-label='LinkedIn'
                      >
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.instagram && (
                      <a 
                        href={member.socialLinks.instagram} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='text-gray-400 hover:text-flame transition-colors duration-300'
                        aria-label='Instagram'
                      >
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Profile Link (if external) */}
                {member.profileLink && (
                  <div className='mt-6'>
                    <Button 
                      href={member.profileLink} 
                      variant="flame"
                      className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                    >
                      Visit Member Website
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
    const member = await getMemberBySlug(params.slug)
    
    if (!member) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        member
      }
    }
  } catch (error) {
    console.error('Error fetching member:', error)
    return {
      notFound: true,
    }
  }
}

