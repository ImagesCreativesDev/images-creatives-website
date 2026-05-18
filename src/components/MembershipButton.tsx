'use client'

import { useState } from 'react'

const inputClassName =
  'w-full px-4 py-3 rounded-lg bg-[#433F59] border border-white/20 text-white font-inter placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50'

export default function MembershipButton() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    const trimmedEmail = email.trim()
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()

    if (!trimmedFirst || !trimmedLast) {
      setError('Please enter your first and last name.')
      return
    }
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/membership-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: trimmedFirst,
          lastName: trimmedLast,
        }),
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div>
          <label htmlFor="membership-first-name" className="block text-gray-300 font-inter text-sm mb-2">
            First name
          </label>
          <input
            id="membership-first-name"
            type="text"
            name="given-name"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            placeholder="Jane"
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="membership-last-name" className="block text-gray-300 font-inter text-sm mb-2">
            Last name
          </label>
          <input
            id="membership-last-name"
            type="text"
            name="family-name"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            placeholder="Smith"
            className={inputClassName}
          />
        </div>
      </div>
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
          className={inputClassName}
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
