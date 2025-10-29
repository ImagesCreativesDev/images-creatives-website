import Button from './Button'
import Image from 'next/image'

export default function Hero({ title, subtitle, ctaText, ctaLink, backgroundImage }) {
  return (
    <section className='min-h-[calc(100vh-192px)] relative overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt='Image Creatives Background'
            fill
            className='object-cover'
            priority
            unoptimized
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-orange-400 via-orange-600 to-purple-800'></div>
        )}
      </div>
      
      {/* Content Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/20 to-black/40'></div>
      
      <div className='relative z-10 min-h-[calc(100vh-192px)] flex flex-col px-4 md:px-8'>
        <div className='max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-8'>
          
          {/* Left Side - Title and Subtitle */}
          <div className='text-left pt-12 md:pt-20'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-4 leading-tight'>
              IMAGE CREATIVES
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-white font-inter leading-relaxed max-w-lg'>
              Where passionate photographers find their tribe, elevate their craft, and flourish through shared knowledge and unwavering support
            </p>
          </div>
          
          {/* Right Side - CTA Button and Description */}
          <div className='text-left md:text-right self-end pb-12 md:pb-20'>
            <div className='mb-4 inline-block'>
              <Button href="/free-meeting" variant="flame" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Discover Your Tribe - Attend a Free Meeting!
              </Button>
            </div>
            <p className='text-sm md:text-base text-white/90 font-inter leading-relaxed max-w-md md:ml-auto'>
              Experience an inspiring speaker, connect with local photographers, and see why our community is the perfect place to perfect your craft!
            </p>
          </div>
          
        </div>
      </div>
      
      {/* Optional: Decorative elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl hidden md:block'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl hidden md:block'></div>
    </section>
  )
}
