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
    const statusStyles = {
      Active: 'bg-blue-100 text-blue-800',
      Lead: 'bg-gray-100 text-gray-800',
      Customer: 'bg-green-100 text-green-800',
      Prospect: 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your customer relationships</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search contacts..."
                className="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap">
              Add Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-500">Loading contacts...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Contact
                    </th>
                    <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors duration-100">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-700 text-sm font-medium">{contact.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.company}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {contact.phone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {contact.lastContact}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800 mr-2 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredContacts.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new contact.</p>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors duration-150">
                    Add Contact
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
