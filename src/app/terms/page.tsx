import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Terms of Service
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
            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                By accessing or using ImageCreatives.com, you agree to these Terms of Service.
              </p>
            </section>

            {/* About Image Creatives */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                2. About Image Creatives
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                Image Creatives is a Florida-based nonprofit photography organization that hosts competitions, educational programs, and community events.
              </p>
            </section>

            {/* Competition Submissions & Image Rights */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                3. Competition Submissions & Image Rights
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    Ownership
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed">
                    Photographers retain full ownership and copyright of all images submitted to Image Creatives competitions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    License Granted
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed mb-2">
                    By submitting an image, you grant Image Creatives a non-exclusive, royalty-free license to use the submitted image solely for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                    <li>Competition judging and presentation</li>
                    <li>Display on ImageCreatives.com</li>
                    <li>Promotion of Image Creatives and its competitions, including social media, email newsletters, and nonprofit marketing materials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    Limitations on Use
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed mb-2">
                    Image Creatives will never:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4 mb-2">
                    <li>Sell submitted images</li>
                    <li>License images to third parties</li>
                    <li>Use images for commercial or for-profit purposes</li>
                    <li>Claim ownership or authorship of submitted images</li>
                  </ul>
                  <p className="text-gray-700 font-inter leading-relaxed">
                    No submitted image will be used for commercial purposes under any circumstances without the photographer's explicit written permission.
                  </p>
                </div>
              </div>
            </section>

            {/* Representations */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                4. Representations
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                By submitting content, you represent that:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                <li>You are the creator and copyright holder of the image, or</li>
                <li>You have full legal rights to submit the image</li>
              </ul>
            </section>

            {/* Prohibited Content */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                5. Prohibited Content
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                You agree not to submit content that is:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4 mb-2">
                <li>Illegal or infringing</li>
                <li>Defamatory, obscene, or offensive</li>
                <li>Misleading or fraudulent</li>
              </ul>
              <p className="text-gray-700 font-inter leading-relaxed">
                Image Creatives reserves the right to remove submissions at its discretion.
              </p>
            </section>

            {/* Payments & Donations */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                6. Payments & Donations
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                All payments and donations are processed by Stripe.
              </p>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                Image Creatives does not store payment information.
              </p>
              <p className="text-gray-700 font-inter leading-relaxed">
                Refund policies, if applicable, will be disclosed on individual competition or event pages.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                All website content, branding, logos, and materials belong to Image Creatives unless otherwise stated and may not be reused without permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                Image Creatives is not liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                <li>Technical issues or service interruptions</li>
                <li>Loss of submitted content</li>
                <li>Failures of third-party services, including payment processors</li>
              </ul>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                9. Modifications
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                We may update these Terms of Service at any time. Continued use of the site constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                These Terms of Service are governed by the laws of the State of Florida, United States.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                Questions regarding these Terms may be sent to:
              </p>
              <p className="text-gray-700 font-inter leading-relaxed">
                <a 
                  href="mailto:ppswfl@gmail.com" 
                  className="text-flame hover:text-ember transition-colors duration-300 font-medium"
                >
                  ppswfl@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
