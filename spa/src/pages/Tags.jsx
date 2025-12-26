import React, { useState, useEffect } from 'react';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B82F6');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for tags
  useEffect(() => {
    setTimeout(() => {
      const mockTags = [
        { id: 1, name: 'VIP Customer', color: '#10B981', contactCount: 24, createdDate: '2023-05-15' },
        { id: 2, name: 'Hot Lead', color: '#EF4444', contactCount: 15, createdDate: '2023-06-22' },
        { id: 3, name: 'Newsletter', color: '#8B5CF6', contactCount: 321, createdDate: '2023-04-01' },
        { id: 4, name: 'High Value', color: '#F59E0B', contactCount: 12, createdDate: '2023-08-30' },
        { id: 5, name: 'Follow Up', color: '#3B82F6', contactCount: 45, createdDate: '2023-07-10' },
        { id: 6, name: 'Inactive', color: '#6B7280', contactCount: 89, createdDate: '2023-07-10' },
      ];
      setTags(mockTags);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleCreateTag = (e) => {
    e.preventDefault();
    if (newTagName.trim()) {
      const newTag = {
        id: tags.length + 1,
        name: newTagName,
        color: newTagColor,
        contactCount: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setNewTagColor('#3B82F6');
      setShowCreateForm(false);
    }
  };

  const TagBadge = ({ name, color }) => (
    <span
      className="px-3 py-1 text-xs font-medium rounded-full"
      style={{ backgroundColor: color + '20', color: color, border: `1px solid ${color}40` }}
    >
      {name}
    </span>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Tags</h1>
        <p className="text-sm text-gray-500 mt-1">Organize your contacts with tags</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                {tags.length} {tags.length === 1 ? 'tag' : 'tags'} • {tags.reduce((sum, tag) => sum + tag.contactCount, 0)} total contacts tagged
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Create Tag Form */}
        {showCreateForm && (
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleCreateTag} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="tagName" className="block text-xs font-medium text-gray-700 mb-1">Tag Name</label>
                <input
                  type="text"
                  id="tagName"
                  placeholder="Enter tag name..."
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tagColor" className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="tagColor"
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                  />
                  <span className="text-xs text-gray-600">{newTagColor}</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTagName('');
                    setNewTagColor('#3B82F6');
                  }}
                  className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded-md font-medium hover:bg-gray-300 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-500">Loading tags...</p>
          </div>
        ) : (
          tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-150"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{tag.name}</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors duration-100">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors duration-100">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-center mb-2">
                    <TagBadge name={tag.name} color={tag.color} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 text-xs">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 mr-2">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span>{tag.contactCount} contacts</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-xs">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 mr-2">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>Created {tag.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="w-full bg-gray-100 text-gray-800 py-1.5 px-3 text-sm rounded-md font-medium hover:bg-gray-200 transition-colors duration-150">
                    View Contacts
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {tags.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tags</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new tag.</p>
          <div className="mt-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150"
            >
              Add Tag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
