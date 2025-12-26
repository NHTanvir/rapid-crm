import React, { useState, useEffect } from 'react';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for lists
  useEffect(() => {
    setTimeout(() => {
      const mockLists = [
        { id: 1, name: 'VIP Customers', contactCount: 24, createdDate: '2023-05-15', lastUpdated: '2023-11-20' },
        { id: 2, name: 'Marketing Prospects', contactCount: 156, createdDate: '2023-06-22', lastUpdated: '2023-12-18' },
        { id: 3, name: 'Inactive Leads', contactCount: 89, createdDate: '2023-07-10', lastUpdated: '2023-12-05' },
        { id: 4, name: 'Newsletter Subscribers', contactCount: 321, createdDate: '2023-04-01', lastUpdated: '2023-12-20' },
        { id: 5, name: 'High-Value Prospects', contactCount: 42, createdDate: '2023-08-30', lastUpdated: '2023-12-19' },
      ];
      setLists(mockLists);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleCreateList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList = {
        id: lists.length + 1,
        name: newListName,
        contactCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setLists([...lists, newList]);
      setNewListName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Lists</h1>
        <p className="text-gray-600">Organize your contacts into lists for targeted campaigns</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                {lists.length} {lists.length === 1 ? 'list' : 'lists'} • {lists.reduce((sum, list) => sum + list.contactCount, 0)} total contacts
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
            >
              Create New List
            </button>
          </div>
        </div>

        {/* Create List Form */}
        {showCreateForm && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleCreateList} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                type="text"
                placeholder="List name..."
                className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewListName('');
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading contact lists...</p>
          </div>
        ) : (
          lists.map((list) => (
            <div
              key={list.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors duration-150">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors duration-150">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                      <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="text-sm">{list.contactCount} contacts</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                      <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm">Updated {list.lastUpdated}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                    View Contacts
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {lists.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No contact lists</h3>
          <p className="mt-2 text-gray-600">Get started by creating a new contact list.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Create New List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
