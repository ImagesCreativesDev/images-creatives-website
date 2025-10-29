import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'

export default function MembershipCTA() {
  return (
    <section className='py-12 md:py-20 bg-[#2C3942] relative overflow-hidden'>
      {/* Subtle overlay pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div 
          className='absolute inset-0' 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23ffffff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 relative z-10'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          {/* Left Column - Text Content */}
          <div className='text-left'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-white mb-6'>
              Join the Image Creatives
            </h2>
            
            <p className='text-white font-inter leading-relaxed mb-8'>
              Looking to join the Image Creatives? Already a member and ready to renew? Now is the time! Become a member NOW for the 2025 year ($100) and join us for education, community, and more!
            </p>

            {/* CTA Button */}
            <Button 
              href='/membership' 
              variant="flame"
              className="border-2 border-teal-400 bg-transparent text-white hover:bg-teal-400 hover:text-white"
            >
              Become a Member Now!
            </Button>
          </div>

          {/* Right Column - Ticket Graphic */}
          <div className='relative flex justify-center md:justify-end'>
            <Link href='/membership' className='cursor-pointer'>
              <div className='relative bg-white rounded-lg p-8 shadow-brand-xl max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-300 hover:shadow-2xl'>
                {/* Ticket perforation effect */}
                <div className='absolute inset-0 pointer-events-none'>
                  <div className='absolute top-0 left-0 w-full h-2 bg-repeat-x' 
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'1\' r=\'1\' fill=\'%23000\'/%3E%3C/svg%3E")',
                      backgroundSize: '20px 2px'
                    }}
                  />
                  <div className='absolute bottom-0 left-0 w-full h-2 bg-repeat-x' 
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'1\' r=\'1\' fill=\'%23000\'/%3E%3C/svg%3E")',
                      backgroundSize: '20px 2px'
                    }}
                  />
                  <div className='absolute top-0 left-0 w-2 h-full bg-repeat-y' 
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'2\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'10\' r=\'1\' fill=\'%23000\'/%3E%3C/svg%3E")',
                      backgroundSize: '2px 20px'
                    }}
                  />
                  <div className='absolute top-0 right-0 w-2 h-full bg-repeat-y' 
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'2\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'10\' r=\'1\' fill=\'%23000\'/%3E%3C/svg%3E")',
                      backgroundSize: '2px 20px'
                    }}
                  />
                </div>

                {/* Logo and Brand */}
                <div className='text-center mb-4'>
                  <div className='flex items-center justify-center mb-2'>
                    <Image 
                      src='/logo.png' 
                      alt='Image Creatives Logo' 
                      width={48}
                      height={48}
                      className='mr-3'
                      unoptimized
                    />
                    <div>
                      <h3 className='text-2xl font-poppins font-bold text-gradient-flame'>
                        Image Creatives
                      </h3>
                      <span className='text-sm font-inter text-gray-600'>
                        of Southwest Florida
                      </span>
                    </div>
                  </div>
                  <div className='h-1 w-24 mx-auto bg-gradient-to-r from-flame to-ember rounded-full'></div>
                </div>

                {/* Membership Type */}
                <h4 className='text-xl font-montserrat font-semibold text-gray-600 uppercase tracking-wide text-center mb-8'>
                  Yearly Membership
                </h4>

                {/* Camera Icon */}
                <div className='flex justify-center mb-4'>
                  <svg className='w-16 h-16 text-black' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                </div>

                {/* Decorative border */}
                <div className='border-2 border-black rounded-lg p-4'>
                  <div className='text-center'>
                    <div className='text-2xl font-poppins font-bold text-black mb-2'>2025</div>
                    <div className='text-sm font-inter text-gray-600'>Membership</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}