import React, { useState, useEffect } from 'react'
import axios from 'axios'

import jari_picture from '../assets/jari_koivisto.jpeg'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [receiverEmails, setReceiverEmails] = useState('')
  const [forms, setForms] = useState([])
  const [sentForms, setSentForms] = useState([])
  const [selectedForm, setSelectedForm] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchForms()
    fetchReceiverEmails()
  }, [])

  const fetchForms = async () => {
    try {
      const response = await axios.get('/api/forms')
      setForms(response.data.filter(form => !form.sent))
      setSentForms(response.data.filter(form => form.sent))
    } catch (error) {
      console.error('Error fetching forms:', error)
    }
  }

  const fetchReceiverEmails = async () => {
    try {
      const response = await axios.get('/api/receiver-emails')
      setReceiverEmails(response.data.emails.join(', '))
    } catch (error) {
      console.error('Error fetching receiver emails:', error)
    }
  }

  const saveReceiverEmails = async () => {
    try {
      await axios.post('/api/receiver-emails', { emails: receiverEmails.split(',').map(email => email.trim()) })
      alert('Receiver emails saved successfully')
    } catch (error) {
      console.error('Error saving receiver emails:', error)
      alert('Failed to save receiver emails')
    }
  }

  const handleFormClick = (form) => {
    setSelectedForm(form)
    setIsEditing(false)
  }

  const handleEditForm = () => {
    setIsEditing(true)
  }

  const handleSaveForm = async () => {
    try {
      await axios.put(`/api/forms/${selectedForm._id}`, selectedForm)
      setIsEditing(false)
      fetchForms()
    } catch (error) {
      console.error('Error saving form:', error)
      alert('Failed to save form')
    }
  }

  const handleSendForm = async () => {
    try {
      await axios.post(`/api/send-form/${selectedForm._id}`)
      alert('Form sent successfully')
      fetchForms()
    } catch (error) {
      console.error('Error sending form:', error)
      alert('Failed to send form')
    }
  }

  const handleDeleteForm = async () => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await axios.delete(`/api/forms/${selectedForm._id}`)
        setSelectedForm(null)
        fetchForms()
      } catch (error) {
        console.error('Error deleting form:', error)
        alert('Failed to delete form')
      }
    }
  }

  return (
    <div className="min-h-screen bg-purple-300 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">CarOffer Admin</h1>
      <img src={jari_picture} alt="JARI" className="w-32 h-32 rounded-full mx-auto mb-4" />
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex mb-6">
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="flex">
            <div className="w-1/3 pr-4">
              <h2 className="text-2xl font-semibold mb-4">Unhandled Forms</h2>
              <div className="space-y-2">
                {forms.map(form => (
                  <div
                    key={form._id}
                    className={`p-2 rounded cursor-pointer ${selectedForm?._id === form._id ? 'bg-purple-100' : 'bg-gray-100'}`}
                    onClick={() => handleFormClick(form)}
                  >
                    {form.fullName} - {form.carModel}
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-semibold my-4">Sent Forms</h2>
              <div className="space-y-2">
                {sentForms.map(form => (
                  <div
                    key={form._id}
                    className={`p-2 rounded cursor-pointer bg-green-100 ${selectedForm?._id === form._id ? 'bg-green-200' : ''}`}
                    onClick={() => handleFormClick(form)}
                  >
                    {form.fullName} - {form.carModel}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3 pl-4">
              {selectedForm && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Form Details</h2>
                  {isEditing ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveForm(); }}>
                      {Object.entries(selectedForm).map(([key, value]) => (
                        key !== '_id' && key !== 'sent' && (
                          <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">{key}</label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setSelectedForm({ ...selectedForm, [key]: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        )
                      ))}
                      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded mr-2">Save</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    </form>
                  ) : (
                    <div>
                      {Object.entries(selectedForm).map(([key, value]) => (
                        key !== '_id' && key !== 'sent' && (
                          <p key={key} className="mb-2"><strong>{key}:</strong> {value}</p>
                        )
                      ))}
                      <div className="mt-4">
                        <button onClick={handleEditForm} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                        {!selectedForm.sent && (
                          <button onClick={handleSendForm} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Send to Partners</button>
                        )}
                        <button onClick={handleDeleteForm} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Receiver Emails</h2>
            <textarea
              value={receiverEmails}
              onChange={(e) => setReceiverEmails(e.target.value)}
              className="w-full h-32 p-2 border rounded"
              placeholder="Enter receiver emails separated by commas"
            />
            <button
              onClick={saveReceiverEmails}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save Receiver Emails
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage