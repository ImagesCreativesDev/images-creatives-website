import Hero from '../components/Hero'
import Button from '../components/Button'
import MemberSpotlight from '../components/MemberSpotlight'
import UpcomingEvent from '../components/UpcomingEvent'
import MembershipCTA from '../components/MembershipCTA'

export default function Home() {
  return (
    <div>
      <Hero
        title='Image Creatives'
        subtitle='Where artistic vision meets digital innovation. We craft stunning visual experiences that tell your story.'
        ctaText='Start Your Project'
        ctaLink='#contact'
      />
      
      {/* Creative Excellence Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-montserrat font-semibold text-night mb-6'>
              Creative Excellence
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto font-inter'>
              Our team combines artistic passion with cutting-edge technology to deliver 
              visual solutions that captivate and inspire.
            </p>
          </div>
          
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='card-brand text-center group hover:shadow-brand-lg transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-flame rounded-brand mx-auto mb-4 flex items-center justify-center'>
                <span className='text-2xl text-white'>🎨</span>
              </div>
              <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Design</h3>
              <p className='text-gray-600 font-inter'>Bold, modern designs that make your brand stand out</p>
            </div>
            
            <div className='card-brand text-center group hover:shadow-brand-lg transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-cool rounded-brand mx-auto mb-4 flex items-center justify-center'>
                <span className='text-2xl text-white'>⚡</span>
              </div>
              <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Performance</h3>
              <p className='text-gray-600 font-inter'>Lightning-fast, optimized experiences for every device</p>
            </div>
            
            <div className='card-brand text-center group hover:shadow-brand-lg transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-flame rounded-brand mx-auto mb-4 flex items-center justify-center'>
                <span className='text-2xl text-white'>🚀</span>
              </div>
              <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Innovation</h3>
              <p className='text-gray-600 font-inter'>Cutting-edge solutions that push creative boundaries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Spotlight Section */}
      <MemberSpotlight />

      {/* Upcoming Event Section */}
      <UpcomingEvent />

      {/* Membership CTA Section */}
      <MembershipCTA />
    </div>
  )
}
