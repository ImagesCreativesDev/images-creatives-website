import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'

export default function MemberCard({ member }) {
  const hasValidImage = member.image && 
    typeof member.image === 'object' && 
    member.image._type === 'image' &&
    member.image.asset

  const slug = member.slug?.current || member.slug || ''

  return (
    <Link href={`/members/${slug}`}>
      <div className='bg-gray-900 rounded-brand-lg overflow-hidden shadow-brand-xl hover:shadow-brand-lg transition-all duration-300 cursor-pointer group'>
        {/* Image Section */}
        <div className='relative h-64 overflow-hidden'>
          {hasValidImage ? (
            <Image
              src={urlFor(member.image).width(400).height(400).url()}
              alt={member.name}
              width={400}
              height={400}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-flame/30 to-ember/30 flex items-center justify-center'>
              <div className='w-24 h-24 bg-gradient-flame rounded-full flex items-center justify-center text-white text-4xl font-poppins font-bold'>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className='p-6'>
          {/* Business Name */}
          {member.businessName && (
            <p className='text-flame font-inter text-sm font-medium mb-1'>
              {member.businessName}
            </p>
          )}
          
          {/* Member Name */}
          <h3 className='text-xl font-poppins font-bold text-white mb-2 group-hover:text-flame transition-colors duration-300'>
            {member.name}
          </h3>

          {/* Role */}
          {member.role && (
            <p className='text-gray-400 font-inter text-sm mb-3'>
              {member.role}
            </p>
          )}

          {/* Bio Preview */}
          {member.bio && (
            <p className='text-gray-300 font-inter text-sm leading-relaxed line-clamp-3'>
              {member.bio}
            </p>
          )}

          {/* View Profile Link */}
          <div className='mt-4 pt-4 border-t border-gray-700'>
            <span className='text-flame font-inter text-sm font-medium group-hover:text-ember transition-colors duration-300'>
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

