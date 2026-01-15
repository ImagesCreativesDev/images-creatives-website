import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Privacy Policy
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
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-4">
                Image Creatives ("we," "us," or "our") is a nonprofit photography organization based in Florida. We respect your privacy and are committed to protecting any personal information you choose to share with us.
              </p>
              <p className="text-gray-700 font-inter leading-relaxed">
                This Privacy Policy explains how we collect, use, and protect information when you visit ImageCreatives.com.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-4">
                We collect very limited information, including:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    a. Competition Submissions
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed mb-2">
                    When you submit a photograph for a competition, we may collect:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                    <li>Your name</li>
                    <li>Image title</li>
                    <li>The submitted image file</li>
                  </ul>
                  <p className="text-gray-700 font-inter leading-relaxed mt-2">
                    We do not require account creation unless explicitly stated for a specific event.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    b. Payments
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed mb-2">
                    Payments or donations made through our website are processed securely by Stripe, a third-party payment processor.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                    <li>We do not collect or store credit card or banking information</li>
                    <li>Stripe may collect personal and financial information necessary to process payments</li>
                    <li>You can review Stripe's privacy practices on their website.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                    c. Automatically Collected Information
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed mb-2">
                    We may collect limited technical information such as:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Pages visited</li>
                  </ul>
                  <p className="text-gray-700 font-inter leading-relaxed mt-2">
                    This information is used only for basic website functionality and analytics.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                3. How We Use Information
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                We use collected information solely to:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4 mb-4">
                <li>Administer photography competitions</li>
                <li>Display submitted images as part of competitions</li>
                <li>Communicate competition results or organizational updates</li>
                <li>Process payments and donations</li>
              </ul>
              <p className="text-gray-700 font-inter leading-relaxed">
                We do not sell, rent, or trade personal information.
              </p>
            </section>

            {/* Image Usage */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                4. Image Usage
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                Submitted images are used only in accordance with our Competition Image License, which limits use to competition presentation and nonprofit promotional purposes. Images are never sold or used commercially.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                5. Cookies
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                We use minimal cookies required for:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4 mb-2">
                <li>Website functionality</li>
                <li>Basic analytics</li>
              </ul>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                We do not use cookies for advertising or cross-site tracking.
              </p>
              <p className="text-gray-700 font-inter leading-relaxed">
                For more details, see our <a href="/cookies" className="text-flame hover:text-ember transition-colors duration-300 font-medium">Cookie Policy</a>.
              </p>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                6. Data Sharing
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                We only share information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter leading-relaxed space-y-1 ml-4">
                <li>Service providers necessary to operate the website (e.g., Stripe)</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                7. Data Security
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                We take reasonable measures to protect your information. However, no online transmission or storage method is 100% secure.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                ImageCreatives.com is not intended for children under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                We may update this Privacy Policy from time to time. Updates will be posted on this page.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed">
                This Privacy Policy is governed by the laws of the State of Florida, United States.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-700 font-inter leading-relaxed mb-2">
                If you have questions about this Privacy Policy, contact us at:
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
