export default function Footer() {
  return (
    <footer className='bg-night text-white mt-20'>
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-4 gap-8 mb-12'>
          {/* Brand Section */}
          <div className='md:col-span-2'>
            <h3 className='text-2xl font-poppins font-bold text-gradient-flame mb-4'>
              Image Creatives
            </h3>
            <p className='text-gray-300 font-inter leading-relaxed mb-6 max-w-md'>
              Where artistic vision meets digital innovation. We craft stunning visual 
              experiences that tell your story and captivate your audience.
            </p>
            <div className='flex space-x-4'>
              <a href='#' className='w-10 h-10 bg-flame/20 rounded-brand flex items-center justify-center hover:bg-flame/30 transition-colors duration-300'>
                <span className='text-flame'>📧</span>
              </a>
              <a href='#' className='w-10 h-10 bg-flame/20 rounded-brand flex items-center justify-center hover:bg-flame/30 transition-colors duration-300'>
                <span className='text-flame'>🐦</span>
              </a>
              <a href='#' className='w-10 h-10 bg-flame/20 rounded-brand flex items-center justify-center hover:bg-flame/30 transition-colors duration-300'>
                <span className='text-flame'>📘</span>
              </a>
              <a href='#' className='w-10 h-10 bg-flame/20 rounded-brand flex items-center justify-center hover:bg-flame/30 transition-colors duration-300'>
                <span className='text-flame'>📷</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-montserrat font-semibold text-white mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Home</a></li>
              <li><a href='#about' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>About</a></li>
              <li><a href='#services' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Services</a></li>
              <li><a href='#portfolio' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Portfolio</a></li>
              <li><a href='#contact' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className='text-lg font-montserrat font-semibold text-white mb-4'>Services</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Web Design</a></li>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Brand Identity</a></li>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Photography</a></li>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Digital Marketing</a></li>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Consulting</a></li>
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
              <a href='#' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Privacy Policy</a>
              <a href='#' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Terms of Service</a>
              <a href='#' className='text-gray-400 hover:text-flame transition-colors duration-300 font-inter'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
