import Head from 'next/head'

export default function FreeMeeting() {
  return (
    <div className='min-h-screen bg-[#433F59] py-12'>
      <Head>
        <title>Attend a Free Meeting - Image Creatives</title>
        <meta name="description" content="Experience an inspiring speaker, connect with local photographers, and see why Image Creatives is the perfect place to perfect your craft!" />
      </Head>
        <div className='max-w-4xl mx-auto px-4'>
          {/* Header Section */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-poppins font-bold text-white mb-4'>
              Attend a Free Meeting
            </h1>
            <p className='text-xl text-gray-300 font-inter max-w-2xl mx-auto'>
              Experience an inspiring speaker, connect with local photographers, and see why our community is the perfect place to perfect your craft!
            </p>
          </div>

          {/* Form Section */}
          <div className='bg-white rounded-lg shadow-xl p-8 md:p-12'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4'>
                Join Us for Our Next Meeting
              </h2>
              <p className='text-gray-600 font-inter'>
                Fill out the form below to register for our upcoming free meeting
              </p>
            </div>

            {/* Google Form Embed */}
            <div className='w-full'>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSecpdCu1Cw7hTjACEb0uYX1-hrIXL7d6OmxlaDz-Im0OXxz3A/viewform?embedded=true" 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                className="rounded-lg"
                title="Free Meeting Registration Form"
              >
                Loading...
              </iframe>
            </div>

            {/* Alternative Contact Info */}
            <div className='mt-8 text-center'>
              <p className='text-gray-600 font-inter mb-4'>
                Prefer to contact us directly?
              </p>
              <div className='flex justify-center'>
                <a 
                  href='mailto:ppswflorida@gmail.com?subject=Free Meeting Registration' 
                  className='inline-flex items-center px-8 py-3 bg-flame text-white font-inter font-medium rounded-lg hover:bg-ember transition-colors duration-300'
                >
                  <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className='mt-12 grid md:grid-cols-3 gap-8'>
            <div className='text-center text-white'>
              <div className='w-16 h-16 bg-flame rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <h3 className='text-xl font-poppins font-semibold mb-2'>Educational Content</h3>
              <p className='text-gray-300 font-inter'>
                Learn from experienced photographers and industry professionals
              </p>
            </div>
            
            <div className='text-center text-white'>
              <div className='w-16 h-16 bg-ember rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-poppins font-semibold mb-2'>Networking</h3>
              <p className='text-gray-300 font-inter'>
                Connect with fellow photographers in Southwest Florida
              </p>
            </div>
            
            <div className='text-center text-white'>
              <div className='w-16 h-16 bg-cool rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
              </div>
              <h3 className='text-xl font-poppins font-semibold mb-2'>Inspiration</h3>
              <p className='text-gray-300 font-inter'>
                Get inspired by amazing photography and creative techniques
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}
