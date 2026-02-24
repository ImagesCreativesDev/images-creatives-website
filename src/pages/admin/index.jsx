'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getUpcomingEvents } from '../../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

// Create image URL builder for client-side use
const getImageUrl = (image) => {
  if (!image || typeof image !== 'object') return null
  try {
    const builder = imageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    })
    return builder.image(image).width(200).height(200).url()
  } catch (error) {
    console.error('Error building image URL:', error)
    return null
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('events')
  const [events, setEvents] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Check if already authenticated on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin-authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load events
      const eventsData = await fetch('/api/events/list').then(res => res.json())
      setEvents(eventsData.events || [])
      
      // Load members
      const membersData = await fetch('/api/members/list').then(res => res.json())
      setMembers(membersData.members || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Clear any previous error message before entering the dashboard
        setMessage('')
        setIsAuthenticated(true)
        sessionStorage.setItem('admin-authenticated', 'true')
        sessionStorage.setItem('admin-token', data.token)
        loadData()
      } else {
        setMessage('Invalid password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setMessage('Error logging in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin-authenticated')
    setPassword('')
  }

  const showMessage = (msg, type = 'success') => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#433F59] flex items-center justify-center">
        <Head>
          <title>Admin - Image Creatives</title>
        </Head>
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-poppins font-bold text-gray-800 mb-2">
              Image Creatives Admin
            </h1>
            <p className="text-gray-600 font-inter">
              Enter password to access admin area
            </p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-inter font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-flame text-white font-inter font-medium py-3 rounded-lg hover:bg-ember transition-colors duration-300"
            >
              Login
            </button>
          </form>
          
          {message && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#433F59] py-8">
      <Head>
        <title>Admin Dashboard - Image Creatives</title>
      </Head>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-white mb-2">
              Image Creatives Admin
            </h1>
            <p className="text-gray-300 font-inter">
              Manage events and featured members
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 font-inter"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-inter font-medium rounded-lg transition-colors duration-300 ${
              activeTab === 'events'
                ? 'bg-flame text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab('member')}
            className={`px-6 py-3 font-inter font-medium rounded-lg transition-colors duration-300 ${
              activeTab === 'member'
                ? 'bg-flame text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Featured Member
          </button>
        </div>

        {/* Competition Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href="/competition/judge"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-cool text-white font-inter font-medium rounded-lg hover:bg-night transition-colors duration-300"
          >
            Judging Page
          </a>
          <a
            href="/competition/results"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-cool text-white font-inter font-medium rounded-lg hover:bg-night transition-colors duration-300"
          >
            Results Page
          </a>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <EventsManagement 
            events={events} 
            onUpdate={loadData}
            onMessage={showMessage}
            loading={loading}
          />
        )}

        {/* Member Tab */}
        {activeTab === 'member' && (
          <MemberManagement 
            members={members} 
            onUpdate={loadData}
            onMessage={showMessage}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}

// Events Management Component
function EventsManagement({ events, onUpdate, onMessage, loading }) {
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    eventDate: '',
    location: '',
    isVirtual: false,
    headerColor: 'blue',
    headerText: '',
    headerSubText: '',
    price: '',
    capacity: '',
    ticketsSold: '',
    buttonText: '',
    registrationLink: '',
    image: null
  })
  const [eventImageFile, setEventImageFile] = useState(null)
  const [eventImagePreview, setEventImagePreview] = useState(null)
  const [uploadingEventImage, setUploadingEventImage] = useState(false)

  const generateEventSlug = (title) => {
    if (!title) return ''
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      eventDate: '',
      location: '',
      isVirtual: false,
      headerColor: 'blue',
      headerText: '',
      headerSubText: '',
      price: '',
      capacity: '',
      ticketsSold: '',
      buttonText: '',
      registrationLink: '',
      image: null
    })
    setEventImageFile(null)
    setEventImagePreview(null)
    setEditingEvent(null)
    setShowForm(false)
  }

  const handleEdit = (event) => {
    setFormData({
      title: event.title || '',
      slug: event.slug?.current || event.slug || '',
      description: event.description || '',
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '',
      location: event.location || '',
      isVirtual: event.isVirtual || false,
      headerColor: event.headerColor || 'blue',
      headerText: event.headerText || '',
      headerSubText: event.headerSubText || '',
      price: event.price || '',
      capacity: event.capacity || '',
      ticketsSold: event.ticketsSold || '',
      buttonText: event.buttonText || '',
      registrationLink: event.registrationLink || '',
      image: event.image || null
    })
    setEventImageFile(null)
    setEventImagePreview(null)
    setEditingEvent(event)
    setShowForm(true)
  }

  const uploadEventImageToSanity = async (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const response = await fetch('/api/members/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: reader.result, filename: file.name || 'event-image.jpg' })
          })
          const data = await response.json()
          if (response.ok) resolve(data.image)
          else reject(new Error(data.message || 'Failed to upload image'))
        } catch (e) { reject(e) }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploadingEventImage(true)
    try {
      let imageData = formData.image
      if (eventImageFile) {
        imageData = await uploadEventImageToSanity(eventImageFile)
      }
      const url = editingEvent ? '/api/events/update' : '/api/events/create'
      const method = editingEvent ? 'PUT' : 'POST'
      const slug = formData.slug || generateEventSlug(formData.title)
      const payload = {
        ...formData,
        slug,
        image: imageData,
        _id: editingEvent?._id
      }
      // Convert datetime-local (user's local time) to ISO UTC before sending to API
      if (payload.eventDate) {
        payload.eventDate = new Date(payload.eventDate).toISOString()
      }
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        onMessage(editingEvent ? 'Event updated successfully!' : 'Event created successfully!')
        resetForm()
        onUpdate()
      } else {
        onMessage(data.message || data.error || 'Error saving event', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage('Error saving event', 'error')
    } finally {
      setUploadingEventImage(false)
    }
  }

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch('/api/events/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: eventId })
      })

      const data = await response.json()

      if (response.ok) {
        onMessage('Event deleted successfully!')
        onUpdate()
      } else {
        const errorMsg = data.message || data.error || 'Error deleting event'
        console.error('Delete API Error:', data)
        onMessage(errorMsg, 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage(`Error deleting event: ${error.message}`, 'error')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-white font-inter">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Events List */}
      <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-poppins font-bold text-gray-800">
            Events ({events.length})
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-flame text-white px-4 py-2 rounded-lg hover:bg-ember transition-colors duration-300 font-inter"
          >
            Add New Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-600 font-inter">No events found. Add your first event!</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <div className="text-sm text-gray-600 font-inter space-y-1">
                      <p>📅 {formatDate(event.eventDate)}</p>
                      <p>📍 {event.location}</p>
                      {event.isVirtual && <p>💻 Virtual Event</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-poppins font-bold text-gray-800 mb-6">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Event Date *
                </label>
                <input
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-inter font-medium mb-2">
                URL slug (event detail page)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                onBlur={(e) => {
                  if (!e.target.value && formData.title) {
                    setFormData(prev => ({ ...prev, slug: generateEventSlug(formData.title) }))
                  }
                }}
                placeholder="Auto-generated from title (e.g. monthly-meeting)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1 font-inter">
                Detail page: /events/{formData.slug || generateEventSlug(formData.title) || 'slug'}
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-inter font-medium mb-2">
                Event image (for detail page)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    if (!file.type.startsWith('image/')) { onMessage('Please select a valid image file', 'error'); return }
                    if (file.size > 10 * 1024 * 1024) { onMessage('Image must be under 10MB', 'error'); return }
                    setEventImageFile(file)
                    const reader = new FileReader()
                    reader.onloadend = () => setEventImagePreview(reader.result)
                    reader.readAsDataURL(file)
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
              />
              {eventImagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">New image preview:</p>
                  <img src={eventImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                </div>
              )}
              {formData.image && !eventImageFile && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Current image:</p>
                  {getImageUrl(formData.image) ? (
                    <img src={getImageUrl(formData.image)} alt="Current" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ) : (
                    <p className="text-sm text-gray-500 italic">Image set (upload new file to replace)</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-inter font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Header Color
                </label>
                <select
                  value={formData.headerColor}
                  onChange={(e) => setFormData({...formData, headerColor: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                >
                  <option value="yellow">Yellow</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Header Text
                </label>
                <input
                  type="text"
                  value={formData.headerText}
                  onChange={(e) => setFormData({...formData, headerText: e.target.value})}
                  placeholder="e.g., MONTHLY MEETING"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Header Sub Text
                </label>
                <input
                  type="text"
                  value={formData.headerSubText}
                  onChange={(e) => setFormData({...formData, headerSubText: e.target.value})}
                  placeholder="e.g., ENGAGE & EDUCATE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="e.g., Starting $0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Tickets Sold
                </label>
                <input
                  type="number"
                  value={formData.ticketsSold}
                  onChange={(e) => setFormData({...formData, ticketsSold: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                  placeholder="e.g., Buy Tickets"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Registration Link (optional)
                </label>
                <input
                  type="text"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
                  placeholder="https://... (e.g. Stripe when ready)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVirtual"
                checked={formData.isVirtual}
                onChange={(e) => setFormData({...formData, isVirtual: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isVirtual" className="text-gray-700 font-inter">
                Virtual Event
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={uploadingEventImage}
                className="bg-flame text-white px-6 py-3 rounded-lg hover:bg-ember transition-colors duration-300 font-inter font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingEventImage ? 'Uploading image...' : (editingEvent ? 'Update Event' : 'Create Event')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={uploadingEventImage}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-inter font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// Member Management Component
function MemberManagement({ members, onUpdate, onMessage, loading }) {
  const [selectedMemberId, setSelectedMemberId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    role: '',
    bio: '',
    description: '',
    profileLink: '',
    image: null // Changed to null for image object
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Find the currently featured member
  const featuredMember = members.find(m => m.featured === true)

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      businessName: '',
      role: '',
      bio: '',
      description: '',
      profileLink: '',
      image: null
    })
    setImageFile(null)
    setImagePreview(null)
    setSelectedMemberId('')
    setShowForm(false)
  }

  const handleMemberSelect = (memberId) => {
    if (memberId === 'new') {
      resetForm()
      setShowForm(true)
    } else {
      const member = members.find(m => m._id === memberId)
      if (member) {
        setFormData({
          name: member.name || '',
          slug: member.slug?.current || member.slug || '',
          businessName: member.businessName || '',
          role: member.role || '',
          bio: member.bio || '',
          description: member.description || '',
          profileLink: member.profileLink || '',
          image: member.image || null // Keep existing image object if present
        })
        setImageFile(null)
        setImagePreview(null)
        setSelectedMemberId(memberId)
        setShowForm(true)
      }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        onMessage('Please select a valid image file', 'error')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        onMessage('Image size must be less than 10MB', 'error')
        return
      }

      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToSanity = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result
          const filename = file.name || 'member-image.jpg'
          
          const response = await fetch('/api/members/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageData: base64Data,
              filename: filename,
            }),
          })

          const data = await response.json()
          
          if (response.ok) {
            resolve(data.image)
          } else {
            reject(new Error(data.message || 'Failed to upload image'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFeatureMember = async (memberId) => {
    if (!confirm('Are you sure you want to feature this member? This will unfeature the current featured member.')) return

    try {
      const response = await fetch('/api/members/feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: memberId })
      })

      const data = await response.json()

      if (response.ok) {
        onMessage('Member featured successfully!')
        onUpdate()
      } else {
        const errorMsg = data.message || data.error || 'Error featuring member'
        console.error('Feature API Error:', data)
        onMessage(errorMsg, 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage(`Error featuring member: ${error.message}`, 'error')
    }
  }

  const generateSlug = (name) => {
    if (!name) return ''
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setUploadingImage(true)
      
      // Upload image if a new file was selected
      let imageData = formData.image // Keep existing image if no new file
      if (imageFile) {
        imageData = await uploadImageToSanity(imageFile)
      }
      
      // Generate slug from name if not provided
      const slug = formData.slug || generateSlug(formData.name)
      
      const url = selectedMemberId && selectedMemberId !== 'new' ? '/api/members/update' : '/api/members/create'
      const method = selectedMemberId && selectedMemberId !== 'new' ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug: slug,
          image: imageData,
          _id: selectedMemberId !== 'new' ? selectedMemberId : undefined,
          featured: true
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        onMessage(selectedMemberId && selectedMemberId !== 'new' ? 'Member updated and featured!' : 'Member created and featured!')
        resetForm()
        onUpdate()
      } else {
        const errorMsg = data.message || data.error || 'Error saving member'
        console.error('API Error:', data)
        onMessage(errorMsg, 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage(`Error saving member: ${error.message}`, 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-white font-inter">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Member Selection */}
      <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-6">
          Featured Member Management
        </h2>
        
        {/* Current Featured Member Display */}
        {featuredMember ? (
          <div className="mb-6 p-4 bg-flame/10 border-2 border-flame rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter font-medium text-gray-600 mb-1">
                  Currently Featured Member:
                </p>
                <p className="text-lg font-poppins font-bold text-gray-800">
                  {featuredMember.name}
                  {featuredMember.businessName && (
                    <span className="text-gray-600 font-normal"> - {featuredMember.businessName}</span>
                  )}
                </p>
              </div>
              <span className="px-3 py-1 bg-flame text-white rounded-full text-sm font-inter font-medium">
                Featured
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-inter text-yellow-800">
              ⚠️ No member is currently featured. Select a member below to feature them.
            </p>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 font-inter font-medium mb-2">
            Select Member to Feature or Edit
          </label>
          <select
            value={selectedMemberId}
            onChange={(e) => handleMemberSelect(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
          >
            <option value="">Choose a member...</option>
            <option value="new">+ Add New Member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} {member.businessName && `(${member.businessName})`}
                {member.featured && ' ⭐ Featured'}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Feature Buttons */}
        {members.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-inter font-medium text-gray-700 mb-3">
              Quick Feature (without editing):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((member) => (
                <div
                  key={member._id}
                  className={`p-3 border rounded-lg flex items-center justify-between ${
                    member.featured
                      ? 'bg-flame/10 border-flame'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-inter font-medium text-gray-800 truncate">
                      {member.name}
                    </p>
                    {member.businessName && (
                      <p className="text-sm text-gray-600 truncate">
                        {member.businessName}
                      </p>
                    )}
                  </div>
                  {member.featured ? (
                    <span className="ml-2 px-2 py-1 bg-flame text-white rounded text-xs font-inter font-medium whitespace-nowrap">
                      Featured
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFeatureMember(member._id)}
                      className="ml-2 px-3 py-1 bg-flame text-white rounded text-sm hover:bg-ember transition-colors duration-300 font-inter font-medium whitespace-nowrap"
                    >
                      Feature
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Member Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-poppins font-bold text-gray-800 mb-6">
            {selectedMemberId === 'new' ? 'Add New Member' : 'Edit Member'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Role/Title
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="e.g., Portrait Photographer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Slug (URL-friendly)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  onBlur={(e) => {
                    // Auto-generate slug from name if empty
                    if (!e.target.value && formData.name) {
                      setFormData({...formData, slug: generateSlug(formData.name)})
                    }
                  }}
                  placeholder="Auto-generated from name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1 font-inter">
                  URL: /members/{formData.slug || generateSlug(formData.name) || 'slug'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-inter font-medium mb-2">
                Short Bio *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={3}
                placeholder="Brief description for the spotlight..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-inter font-medium mb-2">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
                placeholder="Detailed description about the member..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Members Website Link
                </label>
                <input
                  type="url"
                  value={formData.profileLink}
                  onChange={(e) => setFormData({...formData, profileLink: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-inter font-medium mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                {formData.image && !imageFile && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    {(() => {
                      const imageUrl = getImageUrl(formData.image)
                      return imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt="Current" 
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        />
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          Image exists (upload new file to replace)
                        </p>
                      )
                    })()}
                    <p className="mt-2 text-sm text-gray-600">
                      Upload a new file to replace the current image.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={uploadingImage}
                className="bg-flame text-white px-6 py-3 rounded-lg hover:bg-ember transition-colors duration-300 font-inter font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImage 
                  ? 'Uploading Image...' 
                  : selectedMemberId === 'new' 
                    ? 'Create & Feature Member' 
                    : 'Update & Feature Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={uploadingImage}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-inter font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
