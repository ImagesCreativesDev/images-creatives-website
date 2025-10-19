import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className='bg-white/95 backdrop-blur-sm shadow-brand sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href='/' className='group'>
          <span className='text-2xl font-poppins font-bold text-gradient-flame cursor-pointer transition-all duration-300 group-hover:scale-105'>
            Image Creatives
          </span>
        </Link>
        
        <div className='hidden md:flex space-x-8 items-center'>
          <Link 
            href='#' 
            className='text-night font-inter font-medium hover:text-flame transition-colors duration-300 relative group'
          >
            Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='#about' 
            className='text-night font-inter font-medium hover:text-flame transition-colors duration-300 relative group'
          >
            About
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='#services' 
            className='text-night font-inter font-medium hover:text-flame transition-colors duration-300 relative group'
          >
            Services
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-flame transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link 
            href='#contact' 
            className='text-night font-inter font-medium hover:text-flame transition-colors duration-300 relative group'
          >
            Contact
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
            className='text-night hover:text-flame transition-colors duration-300 p-2'
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
        <div className='md:hidden bg-white border-t border-gray-100 shadow-lg'>
          <div className='px-4 py-4 space-y-3'>
            <Link 
              href='#' 
              className='block text-night font-inter font-medium hover:text-flame transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href='#about' 
              className='block text-night font-inter font-medium hover:text-flame transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href='#services' 
              className='block text-night font-inter font-medium hover:text-flame transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              href='#contact' 
              className='block text-night font-inter font-medium hover:text-flame transition-colors duration-300 py-2'
              onClick={() => setIsOpen(false)}
            >
              Contact
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
