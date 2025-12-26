import React, { useState, useEffect } from 'react';
import { Users, DollarSign, CheckSquare, Activity, Mail, Calendar, Briefcase, Plus, Star, Zap } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeDeals: 0,
    revenue: 0,
    openTasks: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalContacts: 124,
        activeDeals: 18,
        revenue: 42500,
        openTasks: 7
      });
      setLoaded(true);
    }, 300);

    setRecentActivities([
      { id: 1, contact: 'John Smith', activity: 'Added new contact', time: '2 min ago', type: 'contact' },
      { id: 2, contact: 'Sarah Johnson', activity: 'Closed deal - $5,200', time: '1 hour ago', type: 'deal' },
      { id: 3, contact: 'Mike Davis', activity: 'Scheduled meeting', time: '3 hours ago', type: 'meeting' },
      { id: 4, contact: 'Emily Chen', activity: 'Updated contact info', time: '5 hours ago', type: 'contact' },
      { id: 5, contact: 'Robert Wilson', activity: 'Sent proposal email', time: 'Yesterday', type: 'email' }
    ]);

    setUpcomingTasks([
      { id: 1, title: 'Follow up with John Smith', dueDate: 'Today', priority: 'high' },
      { id: 2, title: 'Prepare proposal for ABC Corp', dueDate: 'Tomorrow', priority: 'medium' },
      { id: 3, title: 'Call Sarah Johnson about contract', dueDate: 'Dec 23', priority: 'low' },
      { id: 4, title: 'Send newsletter to leads', dueDate: 'Dec 25', priority: 'medium' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{loaded ? value : '—'}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'deal':
          return <Briefcase className="w-4 h-4 text-green-600" />;
        case 'meeting':
          return <Calendar className="w-4 h-4 text-blue-600" />;
        case 'email':
          return <Mail className="w-4 h-4 text-yellow-600" />;
        default:
          return <Users className="w-4 h-4 text-gray-600" />;
      }
    };

    return (
      <div className="flex items-start space-x-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
        <div className="p-2 bg-gray-100 rounded-lg">
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.contact}</p>
          <p className="text-sm text-gray-600 truncate">{activity.activity}</p>
          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
        </div>
      </div>
    );
  };

  const TaskItem = ({ task }) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-900">{task.title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-sm text-gray-500">{task.dueDate}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back! Here's your performance at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Contacts"
            value={stats.totalContacts}
            icon={Users}
          />
          <StatCard
            title="Active Deals"
            value={stats.activeDeals}
            icon={Briefcase}
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Open Tasks"
            value={stats.openTasks}
            icon={CheckSquare}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Contact</span>
                  </div>
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Create Deal</span>
                  </div>
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Meeting</span>
                  </div>
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-left">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <CheckSquare className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
              <div className="p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View all tasks →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;