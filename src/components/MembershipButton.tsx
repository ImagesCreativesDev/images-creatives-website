'use client'

import { useState } from 'react'

export default function MembershipButton() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/membership-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = (await res.json()) as { url?: string; error?: string }

      if (!res.ok) {
        setError(data.error || 'Checkout could not be started. Please try again.')
        return
      }
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError('Checkout could not be started. Please try again.')
    } catch (err) {
      console.error('[MembershipButton]', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-center space-y-4 max-w-md mx-auto">
      <div className="text-left">
        <label htmlFor="membership-email" className="block text-gray-300 font-inter text-sm mb-2">
          Email address
        </label>
        <input
          id="membership-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-[#433F59] border border-white/20 text-white font-inter placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
        />
        <p className="text-gray-500 font-inter text-xs mt-2">
          Used for your receipt and membership account in Stripe.
        </p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="btn-brand text-lg px-8 py-4 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? 'Redirecting…' : 'Join Now - $100/year'}
      </button>
      {error ? (
        <p className="text-red-300 text-sm font-inter" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
