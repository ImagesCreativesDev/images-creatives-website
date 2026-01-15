'use client'

import { useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

type Status = 'idle' | 'uploading' | 'success' | 'error'

export default function UploadPage() {
  const [photographer, setPhotographer] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate required fields
    if (!file) {
      setStatus('error')
      setErrorMessage('Please select an image file')
      return
    }

    if (!title.trim()) {
      setStatus('error')
      setErrorMessage('Please enter a title')
      return
    }

    if (!photographer.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your name')
      return
    }

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('photographer', photographer)

    // Set uploading status
    setStatus('uploading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/competition-entries', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
        // Reset form fields
        setPhotographer('')
        setTitle('')
        setFile(null)
      } else {
        const errorData = await response.json()
        setStatus('error')
        setErrorMessage(errorData.error || 'Failed to upload image. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An error occurred. Please try again.')
      console.error('Upload error:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setErrorMessage('')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setPhotographer('')
    setTitle('')
    setFile(null)
    setErrorMessage('')
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col min-h-screen bg-[#433F59]">
        <NavBar />
        <main className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-green-500"
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
              </div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 font-inter mb-8">
                Your competition entry has been submitted successfully.
              </p>
              <button
                onClick={handleReset}
                className="btn-brand text-lg px-8 py-4"
              >
                Upload Another
              </button>
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
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Photography Competition
            </h1>
            <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
              Submit your entry to the competition
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-4">
                Upload Your Entry
              </h2>
              <p className="text-gray-600 font-inter">
                Fill out the form below to submit your competition entry
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="photographer"
                  className="block text-gray-700 font-inter font-medium mb-2"
                >
                  Photographer Name *
                </label>
                <input
                  type="text"
                  id="photographer"
                  value={photographer}
                  onChange={(e) => setPhotographer(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  placeholder="Enter your name"
                  required
                  disabled={status === 'uploading'}
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-inter font-medium mb-2"
                >
                  Image Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  placeholder="Enter the title of your image"
                  required
                  disabled={status === 'uploading'}
                />
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-gray-700 font-inter font-medium mb-2"
                >
                  Image File *
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-flame file:text-white hover:file:bg-ember focus:outline-none focus:ring-2 focus:ring-flame focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={status === 'uploading'}
                />
                {file && (
                  <p className="mt-2 text-sm text-gray-600 font-inter">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              {status === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm font-inter">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'uploading'}
                className="btn-brand w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'uploading' ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Uploading...
                  </span>
                ) : (
                  'Upload'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
