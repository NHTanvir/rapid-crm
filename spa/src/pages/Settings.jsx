import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Rapid CRM',
    siteDescription: 'Your customer relationship management system',
    adminEmail: 'admin@example.com',
    dateFormat: 'F j, Y',
    timeFormat: 'g:i A',
    timezone: 'America/New_York',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    integration: {
      mailchimp: false,
      salesforce: false,
      hubspot: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
          Site Name
        </label>
        <input
          type="text"
          name="siteName"
          id="siteName"
          value={formData.siteName}
          onChange={handleInputChange}
          className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Site Description
        </label>
        <textarea
          id="siteDescription"
          name="siteDescription"
          rows={3}
          value={formData.siteDescription}
          onChange={handleInputChange}
          className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Admin Email
        </label>
        <input
          type="email"
          name="adminEmail"
          id="adminEmail"
          value={formData.adminEmail}
          onChange={handleInputChange}
          className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
            Date Format
          </label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={formData.dateFormat}
            onChange={handleInputChange}
            className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="F j, Y">December 21, 2025</option>
            <option value="Y-m-d">2025-12-21</option>
            <option value="m/d/Y">12/21/2025</option>
            <option value="d/m/Y">21/12/2025</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 mb-1">
            Time Format
          </label>
          <select
            id="timeFormat"
            name="timeFormat"
            value={formData.timeFormat}
            onChange={handleInputChange}
            className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="g:i A">11:59 PM</option>
            <option value="H:i">23:59</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="America/New_York">Eastern Time (US & Canada)</option>
          <option value="America/Chicago">Central Time (US & Canada)</option>
          <option value="America/Denver">Mountain Time (US & Canada)</option>
          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
          <option value="UTC">Coordinated Universal Time</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Configure how you want to receive notifications about your CRM activities.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <input
              id="notifications.email"
              name="notifications.email"
              type="checkbox"
              checked={formData.notifications.email}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.email" className="ml-3 block text-sm font-medium text-gray-900">
              Email Notifications
            </label>
          </div>
          <span className="text-sm text-gray-600">Receive email alerts</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <input
              id="notifications.sms"
              name="notifications.sms"
              type="checkbox"
              checked={formData.notifications.sms}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.sms" className="ml-3 block text-sm font-medium text-gray-900">
              SMS Notifications
            </label>
          </div>
          <span className="text-sm text-gray-600">Receive text alerts</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <input
              id="notifications.push"
              name="notifications.push"
              type="checkbox"
              checked={formData.notifications.push}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.push" className="ml-3 block text-sm font-medium text-gray-900">
              Push Notifications
            </label>
          </div>
          <span className="text-sm text-gray-600">Receive browser notifications</span>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-purple-700">
              Connect with third-party services to extend your CRM capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8">
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-800 text-xs font-medium">M</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Mailchimp</h3>
              <p className="text-sm text-gray-600">Sync contacts and manage email campaigns</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.mailchimp"
              name="integration.mailchimp"
              type="checkbox"
              checked={formData.integration.mailchimp}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800 text-xs font-medium">S</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Salesforce</h3>
              <p className="text-sm text-gray-600">Sync with your Salesforce CRM</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.salesforce"
              name="integration.salesforce"
              type="checkbox"
              checked={formData.integration.salesforce}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-800 text-xs font-medium">H</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">HubSpot</h3>
              <p className="text-sm text-gray-600">Sync with your HubSpot CRM</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.hubspot"
              name="integration.hubspot"
              type="checkbox"
              checked={formData.integration.hubspot}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your CRM settings and preferences</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrations
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderTabContent()}

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded-md font-medium hover:bg-gray-300 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
