'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Entry {
  _id: string
  title: string
  photographer: string
  imageUrl: string
  score?: number
}

interface ResultsGalleryProps {
  scoredEntries: Entry[]
  pendingEntries: Entry[]
  highestScore: number
}

export default function ResultsGallery({ scoredEntries, pendingEntries, highestScore }: ResultsGalleryProps) {
  const [fullscreenImage, setFullscreenImage] = useState<Entry | null>(null)

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

  return (
    <>
      {/* Scored Entries */}
      {scoredEntries.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-bold text-white mb-6">
            Judged Entries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scoredEntries.map((entry, index) => {
              const isWinner = entry.score === highestScore && highestScore > 0
              const rank = index + 1
              
              return (
                <div
                  key={entry._id}
                  className={`bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${
                    isWinner ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''
                  }`}
                >
                  {isWinner && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-center py-2 px-4">
                      <span className="font-poppins font-bold text-sm">🏆 Winner</span>
                    </div>
                  )}
                  <div 
                    className="relative w-full aspect-square cursor-pointer"
                    onClick={() => handleImageClick(entry)}
                  >
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-inter text-gray-500">
                        #{rank}
                      </span>
                      <div className={`px-3 py-1 rounded-full font-poppins font-bold text-lg ${
                        isWinner 
                          ? 'bg-yellow-400 text-yellow-900' 
                          : 'bg-flame text-white'
                      }`}>
                        {entry.score?.toFixed(1)}
                      </div>
                    </div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-inter text-gray-600">
                      by {entry.photographer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pending Entries */}
      {pendingEntries.length > 0 && (
        <div>
          <h2 className="text-2xl font-poppins font-bold text-white mb-6">
            Pending Judging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pendingEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 opacity-75"
              >
                <div 
                  className="relative w-full aspect-square cursor-pointer"
                  onClick={() => handleImageClick(entry)}
                >
                  <Image
                    src={entry.imageUrl}
                    alt={entry.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-end mb-2">
                    <span className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 font-poppins font-medium text-sm">
                      Pending
                    </span>
                  </div>
                  <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-sm font-inter text-gray-600">
                    by {entry.photographer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
    </>
  )
}
