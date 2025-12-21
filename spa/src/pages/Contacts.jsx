import React, { useState, useEffect } from 'react';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for contacts
  useEffect(() => {
    setTimeout(() => {
      const mockContacts = [
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', company: 'ABC Corp', status: 'Active', lastContact: '2 days ago' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 234-5678', company: 'XYZ Inc', status: 'Lead', lastContact: '1 week ago' },
        { id: 3, name: 'Mike Davis', email: 'mike@example.com', phone: '(555) 345-6789', company: 'Tech Solutions', status: 'Customer', lastContact: '3 days ago' },
        { id: 4, name: 'Emily Chen', email: 'emily@example.com', phone: '(555) 456-7890', company: 'Global Systems', status: 'Prospect', lastContact: '5 days ago' },
        { id: 5, name: 'Robert Wilson', email: 'robert@example.com', phone: '(555) 567-8901', company: 'Enterprise Ltd', status: 'Active', lastContact: 'Today' },
        { id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '(555) 678-9012', company: 'Business Group', status: 'Lead', lastContact: '2 weeks ago' },
      ];
      setContacts(mockContacts);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    if (status === 'Active') {
      bgColor = 'bg-gradient-to-r from-green-100 to-green-200';
      textColor = 'text-green-800';
    } else if (status === 'Lead') {
      bgColor = 'bg-gradient-to-r from-blue-100 to-blue-200';
      textColor = 'text-blue-800';
    } else if (status === 'Customer') {
      bgColor = 'bg-gradient-to-r from-purple-100 to-purple-200';
      textColor = 'text-purple-800';
    } else if (status === 'Prospect') {
      bgColor = 'bg-gradient-to-r from-yellow-100 to-yellow-200';
      textColor = 'text-yellow-800';
    }

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor} animate-pulse-slow`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your customer relationships</p>
      </div>

      {/* Controls */}
      <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                className="form-input w-full pl-10 pr-4 py-3 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold ml-0 sm:ml-4 mt-4 sm:mt-0 transition-all duration-300 transform hover:scale-[1.02]">
              Add New Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center">
            <div className="spinner mb-4"></div>
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-container">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Last Contact
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, index) => (
                    <tr
                      key={contact.id}
                      className={`hover:bg-gray-50 transition-colors duration-200 animate-slide-up`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-sm">
                              <span className="text-blue-800 font-bold text-lg">{contact.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {contact.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.lastContact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold mr-4 transition-colors duration-200 transform hover:scale-105">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200 transform hover:scale-105">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredContacts.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">No contacts found</h3>
                <p className="mt-2 text-gray-600">Get started by creating a new contact.</p>
                <div className="mt-8">
                  <button className="btn-primary text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                    Add New Contact
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Contacts;
