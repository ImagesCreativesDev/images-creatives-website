import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className='bg-[#433F59] backdrop-blur-sm shadow-brand sticky top-0 z-50 border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href='/' className='group flex items-center space-x-3'>
          <img 
            src='/logo.png' 
            alt='Image Creatives Logo' 
            className='h-10 w-10 object-contain transition-all duration-300 group-hover:scale-105'
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className='flex flex-col'>
            <span className='text-2xl font-poppins font-bold text-gradient-flame cursor-pointer transition-all duration-300 group-hover:scale-105 leading-tight'>
              Image Creatives
            </span>
            <span className='text-sm font-inter text-white leading-tight'>
              of Southwest Florida
            </span>
          </div>
        </Link>
        
        <div className='hidden md:flex space-x-8 items-center'>
          <Link 
            href='/events' 
            className='text-white font-inter font-medium hover:text-ember transition-colors duration-300 relative group'
          >
            Events
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='/membership' 
            className='text-white font-inter font-medium hover:text-ember transition-colors duration-300 relative group'
          >
            Membership
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='/free-meeting' 
            className='text-white font-inter font-medium hover:text-ember transition-colors duration-300 relative group'
          >
            Free Meeting
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='#' 
            className='text-white font-inter font-medium hover:text-ember transition-colors duration-300 relative group'
          >
            Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='#get-started' 
            className='btn-brand text-sm px-4 py-2'
          >
            Get Started
          </Link>
        </div>
        
        <div className='md:hidden'>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='text-white hover:text-ember transition-colors duration-300 p-2'
            aria-label='Toggle menu'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className='md:hidden bg-[#433F59] border-t border-white/10 shadow-lg'>
          <div className='px-4 py-4 space-y-3'>
            <Link 
              href='/events' 
              className='block text-white font-inter font-medium hover:text-ember transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link 
              href='/membership' 
              className='block text-white font-inter font-medium hover:text-ember transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Membership
            </Link>
            <Link 
              href='/free-meeting' 
              className='block text-white font-inter font-medium hover:text-ember transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Free Meeting
            </Link>
            <Link 
              href='#' 
              className='block text-white font-inter font-medium hover:text-ember transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className='pt-2'>
              <Link 
                href='#get-started' 
                className='btn-brand text-sm px-4 py-2 inline-block'
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
