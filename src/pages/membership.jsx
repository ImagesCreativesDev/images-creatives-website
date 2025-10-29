export default function MembershipPage() {
  return (
    <div className='min-h-screen bg-[#433F59] py-12 md:py-20'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Page Title */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6'>
            Membership
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed'>
            Join our community of passionate photographers and unlock exclusive benefits, 
            networking opportunities, and educational resources to elevate your craft.
          </p>
        </div>

        {/* Floating Card */}
        <div className='bg-[#4A3A4A] rounded-brand-lg shadow-brand-xl p-8 md:p-12 border border-white/10 hover:shadow-brand-lg transition-all duration-300 relative'>
          {/* Decorative top accent */}
          <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-flame rounded-t-brand-lg'></div>

          {/* Membership Details */}
          <div className='space-y-6'>
            {/* Price */}
            <div className='text-center'>
              <div className='text-5xl md:text-6xl font-poppins font-bold text-white mb-2'>
                $100
              </div>
              <p className='text-gray-400 font-inter text-sm uppercase tracking-wide'>
                Annual Dues
              </p>
            </div>

            {/* Divider */}
            <div className='border-t border-white/10 my-6'></div>

            {/* Membership Title */}
            <h3 className='text-2xl font-poppins font-bold text-white mb-4'>
              Individual Yearly Membership
            </h3>

            {/* Description */}
            <p className='text-gray-300 font-inter leading-relaxed mb-8'>
              Maximize your photography skills with our Individual Membership, designed for solo photographers aiming to enhance their craft. This membership grants free access to monthly seminars, image competitions, and an exclusive Members-Only Facebook group for networking. Choose from monthly or yearly options to start refining your photography prowess today.
            </p>

            {/* CTA Button */}
            <div className='text-center'>
              <button className='btn-brand text-lg px-8 py-4 w-full md:w-auto'>
                Join Now - $100/year
              </button>
            </div>
          </div>

          {/* Bottom decorative accent */}
          <div className='absolute bottom-0 left-0 right-0 h-2 bg-gradient-flame rounded-b-brand-lg'></div>
        </div>

        {/* Additional Information Section */}
        <div className='mt-12 text-center'>
          <p className='text-gray-400 font-inter text-sm'>
            Need more information? Contact us for details about membership benefits and pricing options.
          </p>
        </div>
      </div>
    </div>
  )
}
