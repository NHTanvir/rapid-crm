import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeDeals: 0,
    revenue: 0,
    openTasks: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalContacts: 124,
        activeDeals: 18,
        revenue: 42500,
        openTasks: 7
      });
    }, 500);

    // Recent activities
    setRecentActivities([
      { id: 1, contact: 'John Smith', activity: 'Added new contact', time: '2 minutes ago', type: 'contact' },
      { id: 2, contact: 'Sarah Johnson', activity: 'Closed deal', time: '1 hour ago', type: 'deal' },
      { id: 3, contact: 'Mike Davis', activity: 'Scheduled meeting', time: '3 hours ago', type: 'meeting' },
      { id: 4, contact: 'Emily Chen', activity: 'Updated contact info', time: '5 hours ago', type: 'contact' },
      { id: 5, contact: 'Robert Wilson', activity: 'Sent email', time: 'Yesterday', type: 'email' }
    ]);

    // Upcoming tasks
    setUpcomingTasks([
      { id: 1, title: 'Follow up with John Smith', dueDate: 'Today', priority: 'high' },
      { id: 2, title: 'Prepare proposal for ABC Corp', dueDate: 'Tomorrow', priority: 'medium' },
      { id: 3, title: 'Call Sarah Johnson about contract', dueDate: 'Dec 23', priority: 'low' },
      { id: 4, title: 'Send newsletter to leads', dueDate: 'Dec 25', priority: 'medium' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon, change }) => (
    <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2 gradient-text">{value}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full shadow-inner">
          {icon}
        </div>
      </div>
      {change && (
        <p className={`mt-3 text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
          {change} from last month
        </p>
      )}
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 animate-slide-up">
      <div className="mr-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-sm">
          {activity.type === 'contact' && <span className="text-blue-600 text-lg">👤</span>}
          {activity.type === 'deal' && <span className="text-green-600 text-lg">💼</span>}
          {activity.type === 'meeting' && <span className="text-purple-600 text-lg">📅</span>}
          {activity.type === 'email' && <span className="text-yellow-600 text-lg">✉️</span>}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{activity.contact}</p>
        <p className="text-sm text-gray-600">{activity.activity}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </div>
  );

  const TaskItem = ({ task }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <span className={`ml-3 text-sm font-medium ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
          {task.title}
        </span>
      </div>
      <span className="text-sm text-gray-500 font-medium">{task.dueDate}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={<span className="text-blue-600 text-xl">👥</span>}
          change="+12%"
        />
        <StatCard
          title="Active Deals"
          value={stats.activeDeals}
          icon={<span className="text-green-600 text-xl">💼</span>}
          change="+5%"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={<span className="text-purple-600 text-xl">💰</span>}
          change="+8.2%"
        />
        <StatCard
          title="Open Tasks"
          value={stats.openTasks}
          icon={<span className="text-yellow-600 text-xl">✅</span>}
          change="-3"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
            </div>
            <div className="p-6">
              <div className="divide-y divide-gray-100">
                {recentActivities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Upcoming Tasks */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full btn-primary text-white py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                Add New Contact
              </button>
              <button className="w-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 py-3 px-4 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]">
                Create Deal
              </button>
              <button className="w-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 py-3 px-4 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]">
                Schedule Meeting
              </button>
              <button className="w-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 py-3 px-4 rounded-lg text-sm font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-[1.02]">
                Send Email
              </button>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="card-glow bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h3>
            </div>
            <div className="p-6">
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
              <button className="mt-6 w-full text-center text-sm text-blue-600 hover:text-blue-800 font-semibold py-3 transition-colors duration-200">
                View all tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
