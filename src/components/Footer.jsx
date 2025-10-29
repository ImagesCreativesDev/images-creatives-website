export default function Footer() {
  return (
    <footer className='bg-[#594255] text-white'>
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          {/* Brand Section */}
          <div>
            <div className='flex items-center space-x-3 mb-6'>
              <img 
                src='/logo.png' 
                alt='Image Creatives Logo' 
                className='h-10 w-10 object-contain'
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
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
              <li><a href='/events' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Events</a></li>
              <li><a href='/membership' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Membership</a></li>
              <li><a href='/free-meeting' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Free Meeting</a></li>
              <li><a href='#' className='text-gray-300 hover:text-flame transition-colors duration-300 font-inter'>Home</a></li>
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
