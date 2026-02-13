'use client';

import { useEffect, useState } from 'react';
import { usePhase4Store } from '@/store/phase4-store';

/**
 * UX Settings & Preferences Page
 * Control noise reduction, UI optimization, and cognitive load settings
 */
export default function UXSettingsPage() {
  const {
    uxPreferences,
    loadingPreferences,
    updateUXPreferences,
  } = usePhase4Store();

  const [preferences, setPreferences] = useState({
    noiseReductionEnabled: false,
    autoCollapseStems: true,
    highlightVitalsAndLabs: true,
    fontSize: 'normal' as 'small' | 'normal' | 'large',
    theme: 'light' as 'light' | 'dark',
    soundEnabled: true,
    notificationsEnabled: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (uxPreferences) {
      setPreferences(uxPreferences);
    }
  }, [uxPreferences]);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const handleChange = (key: keyof typeof preferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateUXPreferences(preferences);
      setSuccessMessage('✅ Your preferences have been saved!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">UX Settings & Preferences</h1>
        <p className="mt-2 text-gray-600">
          Customize your learning experience to reduce cognitive load and optimize focus
        </p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Cognitive Load Optimization Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">🧠 Cognitive Load Optimization</h2>

        <div className="space-y-4">
          {/* Noise Reduction */}
          <div className="flex items-start justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Noise Reduction Mode</h3>
              <p className="text-sm text-gray-600 mt-1">
                Hide sidebar, progress bars, and analytics. Focus only on questions and timer.
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>✓ Fullscreen mode</p>
                <p>✓ Minimalist interface</p>
                <p>✓ Distraction elimination</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('noiseReductionEnabled')}
              className={`ml-4 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                preferences.noiseReductionEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preferences.noiseReductionEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Auto-Collapse Stems */}
          <div className="flex items-start justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Auto-Collapse Long Stems</h3>
              <p className="text-sm text-gray-600 mt-1">
                Automatically collapse clinical stems longer than 150 characters. Show abstract, click to expand full text.
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>✓ Reduced information density</p>
                <p>✓ Easier to read abstracts</p>
                <p>✓ On-demand detail access</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoCollapseStems')}
              className={`ml-4 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                preferences.autoCollapseStems
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preferences.autoCollapseStems ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Highlight Vitals & Labs */}
          <div className="flex items-start justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Highlight Vitals & Labs</h3>
              <p className="text-sm text-gray-600 mt-1">
                Color-code abnormal laboratory values and vital signs in clinical stems.
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>🔴 Red: Critically abnormal values</p>
                <p>🟡 Yellow: Borderline abnormal values</p>
                <p>🟢 Green: Normal values</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('highlightVitalsAndLabs')}
              className={`ml-4 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                preferences.highlightVitalsAndLabs
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preferences.highlightVitalsAndLabs ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </section>

      {/* Display Settings Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">🎨 Display Settings</h2>

        <div className="space-y-4">
          {/* Font Size */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Font Size</h3>
              <p className="text-sm text-gray-600">Adjust text size for comfortable reading</p>
            </div>
            <select
              value={preferences.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small (12px)</option>
              <option value="normal">Normal (14px)</option>
              <option value="large">Large (16px)</option>
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Theme</h3>
              <p className="text-sm text-gray-600">Choose between light and dark mode</p>
            </div>
            <select
              value={preferences.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications & Sound Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">🔔 Notifications & Sound</h2>

        <div className="space-y-4">
          {/* Sound */}
          <div className="flex items-start justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Sound Effects</h3>
              <p className="text-sm text-gray-600 mt-1">
                Play sound for question submission, answer confirmation, and test completion.
              </p>
            </div>
            <button
              onClick={() => handleToggle('soundEnabled')}
              className={`ml-4 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                preferences.soundEnabled
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preferences.soundEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-start justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">
                Receive reminders for scheduled study sessions, burnout warnings, and new content.
              </p>
            </div>
            <button
              onClick={() => handleToggle('notificationsEnabled')}
              className={`ml-4 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                preferences.notificationsEnabled
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving || loadingPreferences}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
        <button
          onClick={() => setPreferences(uxPreferences || preferences)}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
      </div>

      {/* Tips Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
        <h3 className="text-lg font-bold text-cyan-900 mb-3">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm text-cyan-800">
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Enable <strong>Noise Reduction</strong> during high-stakes practice tests for maximum focus
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Use <strong>Auto-Collapse Stems</strong> when feeling cognitive overload
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Enable <strong>Lab Highlighting</strong> to quickly spot critical abnormal values
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Increase <strong>Font Size</strong> if studying for extended periods (reduces eye strain)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Use <strong>Dark Mode</strong> for evening rotations to reduce blue light exposure
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}