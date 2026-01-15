'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'

interface Entry {
  _id: string
  title: string
  imageUrl: string
  score?: number
}

interface ScoringGalleryProps {
  entries: Entry[]
}

export default function ScoringGallery({ entries }: ScoringGalleryProps) {
  const [savingStates, setSavingStates] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({})
  const [localScores, setLocalScores] = useState<Record<string, number>>(
    entries.reduce((acc, entry) => {
      if (entry.score !== undefined) {
        acc[entry._id] = entry.score
      }
      return acc
    }, {} as Record<string, number>)
  )
  const [fullscreenImage, setFullscreenImage] = useState<Entry | null>(null)

  const handleScoreChange = async (_id: string, score: number) => {
    // Update local state immediately
    setLocalScores((prev) => ({ ...prev, [_id]: score }))
    setSavingStates((prev) => ({ ...prev, [_id]: 'saving' }))

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, score }),
      })

      if (response.ok) {
        setSavingStates((prev) => ({ ...prev, [_id]: 'saved' }))
        // Clear saved state after 2 seconds
        setTimeout(() => {
          setSavingStates((prev) => ({ ...prev, [_id]: 'idle' }))
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error('Error saving score:', errorData)
        setSavingStates((prev) => ({ ...prev, [_id]: 'idle' }))
        alert('Failed to save score. Please try again.')
      }
    } catch (error) {
      console.error('Error saving score:', error)
      setSavingStates((prev) => ({ ...prev, [_id]: 'idle' }))
      alert('Failed to save score. Please try again.')
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, _id: string) => {
    const score = parseFloat(e.target.value)
    if (!isNaN(score)) {
      handleScoreChange(_id, score)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, _id: string) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleImageClick = (entry: Entry) => {
    setFullscreenImage(entry)
  }

  const handleCloseFullscreen = () => {
    setFullscreenImage(null)
  }

  // Close fullscreen on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenImage) {
        handleCloseFullscreen()
      }
    }
    if (fullscreenImage) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [fullscreenImage])

  if (entries.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[#433F59]">
        <NavBar />
        <main className="flex-grow py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
                Competition Judging
              </h1>
              <p className="text-xl text-gray-300 font-inter">
                No entries to judge yet.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#433F59]">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Competition Judging
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Score each entry (0-100)
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto space-y-8">
          {entries.map((entry) => {
            const savingState = savingStates[entry._id] || 'idle'
            const currentScore = localScores[entry._id] ?? entry.score ?? ''

            return (
              <div
                key={entry._id}
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div 
                  className="relative w-full min-w-[1000px] min-h-[600px] bg-gray-50 cursor-pointer"
                  onClick={() => handleImageClick(entry)}
                >
                  <div className="absolute inset-[50px]">
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1000px) 1000px, 100vw"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-4">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor={`score-${entry._id}`}
                      className="text-base font-inter font-medium text-gray-700 whitespace-nowrap"
                    >
                      Score:
                    </label>
                    <input
                      id={`score-${entry._id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={currentScore}
                      onChange={(e) => {
                        const value = e.target.value
                        setLocalScores((prev) => ({ ...prev, [entry._id]: value === '' ? 0 : parseFloat(value) }))
                      }}
                      onBlur={(e) => handleBlur(e, entry._id)}
                      onKeyDown={(e) => handleKeyDown(e, entry._id)}
                      className="flex-1 max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-lg"
                      placeholder="0-100"
                      disabled={savingState === 'saving'}
                    />
                    <div className="w-8 h-8 flex items-center justify-center">
                      {savingState === 'saving' && (
                        <svg
                          className="animate-spin h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {savingState === 'saved' && (
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </main>
      <Footer />

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={handleCloseFullscreen}
        >
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 text-white font-inter font-medium text-lg hover:text-gray-300 transition-colors duration-300 z-10 bg-black bg-opacity-50 px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <div 
            className="relative w-full h-full max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage.imageUrl}
              alt={fullscreenImage.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
