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
      className="badge px-4 py-2 text-sm font-semibold rounded-full shadow-sm animate-pulse-slow"
      style={{ backgroundColor: color + '20', color: color, border: `1px solid ${color}40` }}
    >
      {name}
    </span>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
        <p className="mt-2 text-lg text-gray-600">Organize your contacts with tags</p>
      </div>

      {/* Controls */}
      <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <p className="text-base text-gray-600">
                {tags.length} {tags.length === 1 ? 'tag' : 'tags'} • {tags.reduce((sum, tag) => sum + tag.contactCount, 0)} total contacts tagged
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]"
            >
              Create New Tag
            </button>
          </div>
        </div>

        {/* Create Tag Form */}
        {showCreateForm && (
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <form onSubmit={handleCreateTag} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="tagName" className="block text-sm font-semibold text-gray-700 mb-2">Tag Name</label>
                <input
                  type="text"
                  id="tagName"
                  placeholder="Enter tag name..."
                  className="form-input w-full py-3 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tagColor" className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="tagColor"
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                  />
                  <span className="text-base font-medium text-gray-600">{newTagColor}</span>
                </div>
              </div>
              <div className="flex items-end space-x-3">
                <button
                  type="submit"
                  className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]"
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
                  className="bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-3 px-6 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center">
            <div className="spinner mb-4"></div>
            <p className="text-gray-600">Loading tags...</p>
          </div>
        ) : (
          tags.map((tag, index) => (
            <div
              key={tag.id}
              className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden hover-lift transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{tag.name}</h3>
                  <div className="flex space-x-3">
                    <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-200">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-center mb-4">
                    <TagBadge name={tag.name} color={tag.color} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mr-3">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <span className="text-lg font-semibold">{tag.contactCount} contacts</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mr-3">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg font-semibold">Created {tag.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-3 px-4 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]">
                    View Contacts
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {tags.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">No tags</h3>
          <p className="mt-2 text-gray-600">Get started by creating a new tag.</p>
          <div className="mt-8">
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]"
            >
              Create New Tag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
