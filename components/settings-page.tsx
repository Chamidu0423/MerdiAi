'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Save, Eye, EyeOff } from 'lucide-react'

interface SettingsData {
  modelName: string
  apiKey: string
}

const SettingsPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<SettingsData>({
    modelName: '',
    apiKey: ''
  })
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('merdiai-settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as SettingsData
        setFormData(parsed)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }, [])

  const handleInputChange = (field: keyof SettingsData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Save to localStorage
      localStorage.setItem('merdiai-settings', JSON.stringify(formData))
      
      // Show success message
      setSaveMessage('Settings saved successfully!')
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
      
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveMessage('Error saving settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    router.push('/main-ui')
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,192,203,0.6),_rgba(221,160,221,0.4),_rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_center,_rgba(139,0,139,0.6),_rgba(75,0,130,0.5),_rgba(18,18,18,1))] transition-colors">
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={handleBack}
            className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-7 h-7 text-black dark:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
            <h1 className="text-2xl font-semibold text-black dark:text-white">Settings</h1>
          </div>
        </div>

        {/* Settings Form */}
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-white/10 p-8 shadow-lg">
          
          {/* AI Model Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              AI Model Name
            </label>
            <input
              type="text"
              value={formData.modelName}
              onChange={(e) => handleInputChange('modelName', e.target.value)}
              placeholder="e.g., gpt-4o, claude-3-5-sonnet-20241022"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800/50 px-4 py-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Enter the model name from OpenRouter (e.g., openai/gpt-4o)
            </p>
          </div>

          {/* API Key Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="Enter your OpenRouter API Key"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800/50 px-4 py-3 pr-12 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {showApiKey ? (
                  <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Your API key will be stored securely in your browser's local storage
            </p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              saveMessage.includes('Error') 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700'
                : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
            }`}>
              {saveMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving || !formData.modelName.trim() || !formData.apiKey.trim()}
              className="px-6 py-3 rounded-full bg-black hover:bg-zinc-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg border border-blue-300/50 dark:border-blue-700/50">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
             Getting Started with OpenRouter
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Visit <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="underline">openrouter.ai</a> to get your API key</li>
            <li>• Browse available models and their pricing</li>
            <li>• Your settings are saved locally and never shared</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
