'use client'

import { useState } from 'react'

export default function MembershipButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/membership-checkout', { method: 'POST' })
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
    <div className="text-center space-y-3">
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
