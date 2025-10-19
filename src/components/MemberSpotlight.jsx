import Image from 'next/image'
import { urlFor } from '../lib/sanity'

export default function MemberSpotlight({ members = [] }) {
  // Mock data for development
  const mockMembers = [
    {
      _id: '1',
      name: 'Sarah Chen',
      role: 'Creative Director',
      bio: 'Passionate about visual storytelling and brand identity. Sarah brings 8+ years of experience in digital design.',
      image: null,
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      _id: '2', 
      name: 'Marcus Rodriguez',
      role: 'Lead Photographer',
      bio: 'Specializing in commercial and artistic photography. Marcus captures the essence of every moment.',
      image: null,
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      _id: '3',
      name: 'Emma Thompson',
      role: 'UX Designer',
      bio: 'Creating intuitive user experiences that bridge the gap between design and functionality.',
      image: null,
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    }
  ]

  const displayMembers = members.length > 0 ? members : mockMembers

  return (
    <section className='py-20 bg-gradient-to-br from-light via-white to-light/50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-montserrat font-semibold text-night mb-6'>
            Member Spotlight
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto font-inter'>
            Meet the creative minds behind Image Creatives. Our talented team brings 
            diverse skills and artistic vision to every project.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {displayMembers.map((member) => (
            <div 
              key={member._id}
              className='card-brand group hover:shadow-brand-xl transition-all duration-500 transform hover:-translate-y-2'
            >
              {/* Member Image */}
              <div className='relative mb-6 overflow-hidden rounded-brand-lg'>
                <div className='aspect-square bg-gradient-to-br from-flame/20 to-ember/20 flex items-center justify-center'>
                  {member.image ? (
                    <Image
                      src={urlFor(member.image).width(400).height(400).url()}
                      alt={member.name}
                      width={400}
                      height={400}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  ) : (
                    <div className='w-32 h-32 bg-gradient-flame rounded-full flex items-center justify-center text-white text-4xl font-poppins font-bold'>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-night/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>

              {/* Member Info */}
              <div className='text-center'>
                <h3 className='text-xl font-montserrat font-semibold text-night mb-2 group-hover:text-gradient-flame transition-all duration-300'>
                  {member.name}
                </h3>
                <p className='text-flame font-inter font-medium mb-4'>
                  {member.role}
                </p>
                <p className='text-gray-600 font-inter leading-relaxed mb-6'>
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className='flex justify-center space-x-4'>
                  {member.socialLinks?.twitter && (
                    <a 
                      href={member.socialLinks.twitter}
                      className='w-10 h-10 bg-flame/10 rounded-brand flex items-center justify-center hover:bg-flame/20 transition-colors duration-300'
                    >
                      <span className='text-flame text-lg'>🐦</span>
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a 
                      href={member.socialLinks.linkedin}
                      className='w-10 h-10 bg-cool/10 rounded-brand flex items-center justify-center hover:bg-cool/20 transition-colors duration-300'
                    >
                      <span className='text-cool text-lg'>💼</span>
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a 
                      href={member.socialLinks.instagram}
                      className='w-10 h-10 bg-ember/10 rounded-brand flex items-center justify-center hover:bg-ember/20 transition-colors duration-300'
                    >
                      <span className='text-ember text-lg'>📷</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Members CTA */}
        <div className='text-center mt-12'>
          <a 
            href='#members'
            className='btn-brand-cool text-lg px-8 py-4'
          >
            View All Members
          </a>
        </div>
      </div>
    </section>
  )
}
