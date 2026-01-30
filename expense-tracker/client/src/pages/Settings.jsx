import { useState, useEffect } from 'react'
import './Settings.css'

function Settings() {
  const [settings, setSettings] = useState({
    currency: 'USD',
    theme: 'light',
    notifications: true,
    emailNotifications: false,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="container settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <h2>Preferences</h2>

        <div className="setting-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div className="setting-group checkbox">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <label htmlFor="notifications">Enable Notifications</label>
        </div>

        <div className="setting-group checkbox">
          <input
            type="checkbox"
            id="emailNotifications"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          <label htmlFor="emailNotifications">Email Notifications</label>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>

        {saved && <p className="success-message">Settings saved successfully!</p>}
      </div>

      <div className="settings-card">
        <h2>About</h2>
        <p>Expense Tracker v1.0.0</p>
        <p>A comprehensive financial management application.</p>
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Settings
