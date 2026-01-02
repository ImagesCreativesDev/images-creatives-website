'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getUpcomingEvents } from '../../lib/sanity'

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
    registrationLink: ''
  })

  const resetForm = () => {
    setFormData({
      title: '',
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
      registrationLink: ''
    })
    setEditingEvent(null)
    setShowForm(false)
  }

  const handleEdit = (event) => {
    setFormData({
      title: event.title || '',
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
      registrationLink: event.registrationLink || ''
    })
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingEvent ? '/api/events/update' : '/api/events/create'
      const method = editingEvent ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _id: editingEvent?._id
        })
      })

      if (response.ok) {
        onMessage(editingEvent ? 'Event updated successfully!' : 'Event created successfully!')
        resetForm()
        onUpdate()
      } else {
        onMessage('Error saving event', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage('Error saving event', 'error')
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

      if (response.ok) {
        onMessage('Event deleted successfully!')
        onUpdate()
      } else {
        onMessage('Error deleting event', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      onMessage('Error deleting event', 'error')
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
                  Registration Link
                </label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
                  placeholder="https://..."
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
                className="bg-flame text-white px-6 py-3 rounded-lg hover:bg-ember transition-colors duration-300 font-inter font-medium"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-inter font-medium"
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
    image: ''
  })

  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      role: '',
      bio: '',
      description: '',
      profileLink: '',
      image: ''
    })
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
          businessName: member.businessName || '',
          role: member.role || '',
          bio: member.bio || '',
          description: member.description || '',
          profileLink: member.profileLink || '',
          image: member.image || ''
        })
        setSelectedMemberId(memberId)
        setShowForm(true)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = selectedMemberId && selectedMemberId !== 'new' ? '/api/members/update' : '/api/members/create'
      const method = selectedMemberId && selectedMemberId !== 'new' ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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
        
        <div>
          <label className="block text-gray-700 font-inter font-medium mb-2">
            Select Member to Feature
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
              </option>
            ))}
          </select>
        </div>
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
                  Profile Link
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
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-flame text-white px-6 py-3 rounded-lg hover:bg-ember transition-colors duration-300 font-inter font-medium"
              >
                {selectedMemberId === 'new' ? 'Create & Feature Member' : 'Update & Feature Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-inter font-medium"
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
