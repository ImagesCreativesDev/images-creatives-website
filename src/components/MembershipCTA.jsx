import Button from './Button'

export default function MembershipCTA() {
  return (
    <section className='py-20 bg-gradient-to-br from-flame/5 via-white to-cool/5 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-40 h-40 bg-flame/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-20 w-60 h-60 bg-cool/10 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ember/5 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gradient-flame mb-6'>
            Join Our Creative Community
          </h2>
          <p className='text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-inter leading-relaxed'>
            Become part of Image Creatives and unlock exclusive benefits, networking opportunities, 
            and access to our creative resources.
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='card-brand bg-white/80 backdrop-blur-sm border border-flame/20 group hover:shadow-brand-xl transition-all duration-500'>
            <div className='p-8 md:p-12 text-center'>
              {/* Benefits Grid */}
              <div className='grid md:grid-cols-3 gap-8 mb-12'>
                <div className='group'>
                  <div className='w-16 h-16 bg-gradient-flame rounded-brand mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-white text-2xl'>🎨</span>
                  </div>
                  <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Creative Resources</h3>
                  <p className='text-gray-600 font-inter'>Access to premium design tools, templates, and exclusive content.</p>
                </div>

                <div className='group'>
                  <div className='w-16 h-16 bg-gradient-cool rounded-brand mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-white text-2xl'>🤝</span>
                  </div>
                  <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Networking</h3>
                  <p className='text-gray-600 font-inter'>Connect with fellow creatives and industry professionals.</p>
                </div>

                <div className='group'>
                  <div className='w-16 h-16 bg-gradient-flame rounded-brand mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-white text-2xl'>🚀</span>
                  </div>
                  <h3 className='text-xl font-montserrat font-semibold text-night mb-3'>Growth Opportunities</h3>
                  <p className='text-gray-600 font-inter'>Workshops, mentorship, and career development programs.</p>
                </div>
              </div>

              {/* Membership Tiers */}
              <div className='grid md:grid-cols-2 gap-8 mb-12'>
                <div className='card-brand bg-gradient-to-br from-flame/5 to-ember/5 border border-flame/30 group hover:shadow-brand-lg transition-all duration-300'>
                  <div className='p-6'>
                    <h4 className='text-2xl font-poppins font-bold text-night mb-2'>Basic Member</h4>
                    <div className='text-3xl font-bold text-flame mb-4'>Free</div>
                    <ul className='text-left space-y-2 text-gray-600 font-inter mb-6'>
                      <li className='flex items-center space-x-2'>
                        <span className='text-flame'>✓</span>
                        <span>Access to community forum</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <span className='text-flame'>✓</span>
                        <span>Monthly newsletter</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <span className='text-flame'>✓</span>
                        <span>Basic templates</span>
                      </li>
                    </ul>
                    <Button href='#membership' variant="cool" className="w-full">
                      Join Free
                    </Button>
                  </div>
                </div>

                <div className='card-brand bg-gradient-to-br from-cool/5 to-night/5 border border-cool/30 group hover:shadow-brand-lg transition-all duration-300 relative'>
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-gradient-flame text-white px-4 py-1 rounded-full text-sm font-inter font-medium'>
                      Most Popular
                    </span>
                  </div>
                  <div className='p-6'>
                    <h4 className='text-2xl font-poppins font-bold text-night mb-2'>Pro Member</h4>
                    <div className='text-3xl font-bold text-cool mb-4'>$29<span className='text-lg text-gray-500'>/month</span></div>
                    <ul className='text-left space-y-2 text-gray-600 font-inter mb-6'>
                      <li className='flex items-center space-x-2'>
                        <span className='text-cool'>✓</span>
                        <span>Everything in Basic</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <span className='text-cool'>✓</span>
                        <span>Premium resources & tools</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <span className='text-cool'>✓</span>
                        <span>Exclusive workshops</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <span className='text-cool'>✓</span>
                        <span>Priority support</span>
                      </li>
                    </ul>
                    <Button href='#membership' variant="flame" className="w-full">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main CTA */}
              <div className='text-center'>
                <h3 className='text-2xl font-montserrat font-semibold text-night mb-4'>
                  Ready to Elevate Your Creative Journey?
                </h3>
                <p className='text-gray-600 font-inter mb-8 max-w-2xl mx-auto'>
                  Join thousands of creatives who are already part of our community. 
                  Start your membership today and unlock your creative potential.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                  <Button href='/membership' variant="flame" className="text-lg px-8 py-4">
                    Start Your Membership
                  </Button>
                  <Button href='#learn-more' variant="cool" className="text-lg px-8 py-4">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
