import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='bg-[#594255] text-white'>
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          {/* Brand Section */}
          <div>
            <div className='flex items-center space-x-3 mb-6'>
              <Image 
                src='/logo.png' 
                alt='Image Creatives Logo' 
                width={40}
                height={40}
                className='object-contain'
                unoptimized
              />
              <div className='flex flex-col'>
                <span className='text-2xl font-poppins font-bold text-gradient-flame leading-tight'>
                  Image Creatives
                </span>
                <span className='text-sm font-inter text-white leading-tight'>
                  of Southwest Florida
                </span>
              </div>
            </div>
            <div className='flex space-x-4'>
              <a 
                href='https://www.facebook.com/groups/255915997069421' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 bg-flame/20 rounded-brand flex items-center justify-center hover:bg-flame/30 transition-colors duration-300'
                aria-label='Visit Image Creatives Facebook Group'
              >
                <svg 
                  className='w-6 h-6 text-flame' 
                  fill='currentColor' 
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-montserrat font-semibold text-white mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              <li><a href='/events' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Events</a></li>
              <li><a href='/members' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Members</a></li>
              <li><a href='/membership' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Membership</a></li>
              <li><a href='/free-meeting' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Free Meeting</a></li>
              <li><a href='/upload' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Submit Photo</a></li>
              <li><a href='/' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Home</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-gray-400 font-inter text-sm'>
              &copy; {new Date().getFullYear()} Image Creatives. All rights reserved.
            </p>
            <div className='flex space-x-6 text-sm'>
              <a href='/privacy' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Privacy Policy</a>
              <a href='/terms' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Terms of Service</a>
              <a href='/cookies' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
