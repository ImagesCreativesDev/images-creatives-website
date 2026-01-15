'use client'

import { useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

type Status = 'idle' | 'uploading' | 'success' | 'error'

export default function UploadPage() {
  const [photographer, setPhotographer] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
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

    if (!termsAccepted) {
      setStatus('error')
      setErrorMessage('You must accept the terms to submit your entry')
      return
    }

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('photographer', photographer)
    formData.append('termsAccepted', 'true')

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setErrorMessage('')

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage('Please upload a JPEG or PNG image only. RAW files and other formats are not accepted.')
      setFile(null)
      // Reset the input
      e.target.value = ''
      return
    }

    // File size validation (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (selectedFile.size > maxSize) {
      setErrorMessage('Image file is too large. Maximum file size is 10MB. Please compress or resize your image.')
      setFile(null)
      e.target.value = ''
      return
    }

    // Image dimension validation
    try {
      const img = new Image()
      const objectUrl = URL.createObjectURL(selectedFile)
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl)
        const longEdge = Math.max(img.width, img.height)
        const maxDimension = 4000
        
        if (longEdge > maxDimension) {
          setErrorMessage(`Image dimensions are too large. Maximum long edge is ${maxDimension}px. Your image is ${longEdge}px. Please resize your image.`)
          setFile(null)
          e.target.value = ''
        } else {
          setFile(selectedFile)
        }
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        setErrorMessage('Invalid image file. Please select a valid JPEG or PNG image.')
        setFile(null)
        e.target.value = ''
      }
      
      img.src = objectUrl
    } catch (error) {
      setErrorMessage('Error reading image file. Please try again.')
      setFile(null)
      e.target.value = ''
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setPhotographer('')
    setTitle('')
    setFile(null)
    setTermsAccepted(false)
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
              <p className="text-xl text-gray-600 font-inter mb-4">
                Submission received. Your image will only be used as described in our Image License.
              </p>
              <p className="text-lg text-gray-500 font-inter mb-8">
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
                {/* Image Requirements Info Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <h3 className="text-gray-800 font-inter font-semibold mb-2">
                    Image Requirements
                  </h3>
                  <ul className="text-sm text-gray-700 font-inter space-y-1 list-disc list-inside">
                    <li><strong>Accepted formats:</strong> JPEG, PNG only</li>
                    <li><strong>Maximum file size:</strong> 10MB</li>
                    <li><strong>Maximum dimension:</strong> 4000px (long edge)</li>
                    <li><strong>Not accepted:</strong> RAW files (CR2, NEF, ARW, etc.), TIFF, HEIC, or other formats</li>
                  </ul>
                </div>

                <label
                  htmlFor="file"
                  className="block text-gray-700 font-inter font-medium mb-2"
                >
                  Image File *
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-flame file:text-white hover:file:bg-ember focus:outline-none focus:ring-2 focus:ring-flame focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={status === 'uploading'}
                />
                {file && (
                  <p className="mt-2 text-sm text-gray-600 font-inter">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-flame border-gray-300 rounded focus:ring-flame focus:ring-2"
                    disabled={status === 'uploading'}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="termsAccepted"
                      className="text-gray-700 font-inter leading-relaxed cursor-pointer"
                    >
                      I confirm that I am the copyright holder of this image and grant Image Creatives permission to display it for competition presentation and nonprofit promotion, as described in the Terms of Service.
                    </label>
                    <p className="mt-2 text-sm text-gray-500 font-inter">
                      By submitting, you retain full copyright. Images are never sold or used commercially.
                    </p>
                  </div>
                </div>
              </div>

              {status === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm font-inter">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'uploading' || !termsAccepted}
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

            {/* Image Rights Info Box */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Image Rights
              </h3>
              <div className="space-y-4 text-gray-700 font-inter leading-relaxed">
                <p className="font-semibold">
                  You keep your copyright. Always.
                </p>
                <div>
                  <p className="font-semibold mb-2">By entering this competition:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You own your image</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">We use submitted images only for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Competition judging and presentation</li>
                    <li>Showing results and winners</li>
                    <li>Promoting Image Creatives as a nonprofit photography group</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">We will never:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Sell your images</li>
                    <li>License them to anyone else</li>
                    <li>Use them for commercial purposes</li>
                  </ul>
                </div>
                <p>
                  If we ever want to use an image outside of this scope, we'll ask first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
