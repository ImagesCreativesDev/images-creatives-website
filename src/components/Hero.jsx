import Button from './Button'

export default function Hero({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center bg-light text-center px-4 relative overflow-hidden'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-flame/8 via-transparent to-cool/8'></div>
      
      {/* Animated background elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-ember/30 rounded-full blur-xl animate-pulse'></div>
      <div className='absolute top-40 right-20 w-16 h-16 bg-cool/30 rounded-full blur-lg animate-bounce'></div>
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-flame/20 rounded-full blur-2xl animate-pulse'></div>
      <div className='absolute bottom-40 left-20 w-24 h-24 bg-ember/25 rounded-full blur-xl animate-bounce'></div>
      
      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Badge */}
        <div className='inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-flame/20 mb-8 shadow-brand'>
          <span className='text-flame text-sm font-inter font-medium'>✨ Creative Excellence Since 2024</span>
        </div>
        
        {/* Main Headline */}
        <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-poppins font-bold mb-8 text-gradient-flame leading-tight tracking-tight'>
          {title}
        </h1>
        
        {/* Subtitle */}
        <p className='text-lg md:text-xl lg:text-2xl mb-12 text-gray-700 font-inter leading-relaxed max-w-4xl mx-auto'>
          {subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16'>
          <Button href={ctaLink} variant="flame" className="text-lg px-8 py-4">
            {ctaText}
          </Button>
          <Button href="#learn-more" variant="cool" className="text-lg px-8 py-4">
            View Our Work
          </Button>
        </div>
        
        {/* Stats or Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          <div className='text-center group'>
            <div className='text-3xl md:text-4xl font-poppins font-bold text-night mb-2 group-hover:text-gradient-flame transition-all duration-300'>
              100+
            </div>
            <div className='text-gray-600 font-inter'>Projects Completed</div>
          </div>
          <div className='text-center group'>
            <div className='text-3xl md:text-4xl font-poppins font-bold text-night mb-2 group-hover:text-gradient-cool transition-all duration-300'>
              50+
            </div>
            <div className='text-gray-600 font-inter'>Happy Clients</div>
          </div>
          <div className='text-center group'>
            <div className='text-3xl md:text-4xl font-poppins font-bold text-night mb-2 group-hover:text-gradient-flame transition-all duration-300'>
              5★
            </div>
            <div className='text-gray-600 font-inter'>Average Rating</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-flame/50 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-flame rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </section>
  )
}
