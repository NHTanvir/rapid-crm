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
    <div className="space-y-8">
      <div>
        <label htmlFor="siteName" className="block text-sm font-semibold text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          name="siteName"
          id="siteName"
          value={formData.siteName}
          onChange={handleInputChange}
          className="form-input w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="siteDescription" className="block text-sm font-semibold text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          id="siteDescription"
          name="siteDescription"
          rows={3}
          value={formData.siteDescription}
          onChange={handleInputChange}
          className="form-input w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-semibold text-gray-700 mb-2">
          Admin Email
        </label>
        <input
          type="email"
          name="adminEmail"
          id="adminEmail"
          value={formData.adminEmail}
          onChange={handleInputChange}
          className="form-input w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="dateFormat" className="block text-sm font-semibold text-gray-700 mb-2">
            Date Format
          </label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={formData.dateFormat}
            onChange={handleInputChange}
            className="form-select w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          >
            <option value="F j, Y">December 21, 2025</option>
            <option value="Y-m-d">2025-12-21</option>
            <option value="m/d/Y">12/21/2025</option>
            <option value="d/m/Y">21/12/2025</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeFormat" className="block text-sm font-semibold text-gray-700 mb-2">
            Time Format
          </label>
          <select
            id="timeFormat"
            name="timeFormat"
            value={formData.timeFormat}
            onChange={handleInputChange}
            className="form-select w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          >
            <option value="g:i A">11:59 PM</option>
            <option value="H:i">23:59</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timezone" className="block text-sm font-semibold text-gray-700 mb-2">
          Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="form-select w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
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
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base text-blue-800 font-medium">
              Configure how you want to receive notifications about your CRM activities.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <input
              id="notifications.email"
              name="notifications.email"
              type="checkbox"
              checked={formData.notifications.email}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.email" className="ml-4 block text-lg font-medium text-gray-900">
              Email Notifications
            </label>
          </div>
          <span className="text-lg text-gray-600">Receive email alerts</span>
        </div>

        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <input
              id="notifications.sms"
              name="notifications.sms"
              type="checkbox"
              checked={formData.notifications.sms}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.sms" className="ml-4 block text-lg font-medium text-gray-900">
              SMS Notifications
            </label>
          </div>
          <span className="text-lg text-gray-600">Receive text alerts</span>
        </div>

        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <input
              id="notifications.push"
              name="notifications.push"
              type="checkbox"
              checked={formData.notifications.push}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="notifications.push" className="ml-4 block text-lg font-medium text-gray-900">
              Push Notifications
            </label>
          </div>
          <span className="text-lg text-gray-600">Receive browser notifications</span>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base text-purple-800 font-medium">
              Connect with third-party services to extend your CRM capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <span className="text-orange-800 font-bold text-lg">M</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900">Mailchimp</h3>
              <p className="text-gray-600">Sync contacts and manage email campaigns</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.mailchimp"
              name="integration.mailchimp"
              type="checkbox"
              checked={formData.integration.mailchimp}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-blue-800 font-bold text-lg">S</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900">Salesforce</h3>
              <p className="text-gray-600">Sync with your Salesforce CRM</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.salesforce"
              name="integration.salesforce"
              type="checkbox"
              checked={formData.integration.salesforce}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-purple-800 font-bold text-lg">H</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900">HubSpot</h3>
              <p className="text-gray-600">Sync with your HubSpot CRM</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="integration.hubspot"
              name="integration.hubspot"
              type="checkbox"
              checked={formData.integration.hubspot}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your CRM settings and preferences</p>
      </div>

      <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <nav className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-5 px-8 text-center border-b-2 font-semibold text-base transition-all duration-300 ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-5 px-8 text-center border-b-2 font-semibold text-base transition-all duration-300 ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-5 px-8 text-center border-b-2 font-semibold text-base transition-all duration-300 ${
                activeTab === 'integrations'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrations
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {renderTabContent()}

          <div className="mt-12 flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-3 px-6 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]"
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
