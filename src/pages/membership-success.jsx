import Head from 'next/head'
import Link from 'next/link'

export default function MembershipSuccessPage() {
  return (
    <div className="min-h-screen bg-[#433F59] py-12 md:py-20">
      <Head>
        <title>Thank you - Image Creatives</title>
        <meta
          name="description"
          content="Your Image Creatives membership checkout completed successfully."
        />
      </Head>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">Thank you</h1>
        <p className="text-xl text-gray-300 font-inter leading-relaxed mb-10">
          Your membership checkout completed. You will receive a confirmation email from Stripe with
          your receipt and subscription details.
        </p>
        <Link href="/" className="btn-brand inline-block text-lg px-8 py-4">
          Back to home
        </Link>
      </div>
    </div>
  )
}
