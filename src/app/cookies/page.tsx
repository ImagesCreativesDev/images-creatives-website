import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              ImageCreatives.com
            </p>
            <p className="text-sm text-gray-400 font-inter mt-2">
              Last updated: January 15, 2026
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            {/* What Are Cookies? */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                Cookies are small text files stored on your device that help websites function properly.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                Image Creatives uses cookies only to:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4 mb-2">
                <li>Ensure basic site functionality</li>
                <li>Understand general website usage</li>
              </ul>
              <p className="text-gray-700 font-inter leading-relaxed">
                We do not use cookies for advertising or tracking across websites.
              </p>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                Some third-party services (such as Stripe or analytics tools) may set cookies as part of their functionality.
              </p>
            </section>

            {/* Managing Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                Managing Cookies
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                You can control or disable cookies through your browser settings. Disabling cookies may affect site functionality.
              </p>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                Updates
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                We may update this Cookie Policy from time to time.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
