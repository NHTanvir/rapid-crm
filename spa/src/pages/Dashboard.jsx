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
      { id: 1, contact: 'John Smith', activity: 'Added new contact', time: '2 minutes ago', type: 'contact', avatar: '👨‍💼' },
      { id: 2, contact: 'Sarah Johnson', activity: 'Closed deal - $5,200', time: '1 hour ago', type: 'deal', avatar: '👩‍💼' },
      { id: 3, contact: 'Mike Davis', activity: 'Scheduled meeting', time: '3 hours ago', type: 'meeting', avatar: '👨‍💻' },
      { id: 4, contact: 'Emily Chen', activity: 'Updated contact info', time: '5 hours ago', type: 'contact', avatar: '👩‍🔬' },
      { id: 5, contact: 'Robert Wilson', activity: 'Sent proposal email', time: 'Yesterday', type: 'email', avatar: '🧑‍💼' }
    ]);

    setUpcomingTasks([
      { id: 1, title: 'Follow up with John Smith', dueDate: 'Today', priority: 'high', icon: '🔥' },
      { id: 2, title: 'Prepare proposal for ABC Corp', dueDate: 'Tomorrow', priority: 'medium', icon: '📋' },
      { id: 3, title: 'Call Sarah Johnson about contract', dueDate: 'Dec 23', priority: 'low', icon: '📞' },
      { id: 4, title: 'Send newsletter to leads', dueDate: 'Dec 25', priority: 'medium', icon: '📨' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon, change, color, delay }) => (
    <div 
      className="relative group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 animate-pulse-slow"></div>
      <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {loaded ? value : '—'}
              </p>
              {change && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  change.startsWith('+') 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
                } shadow-lg animate-bounce-subtle`}>
                  {change}
                </span>
              )}
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity, index }) => (
    <div 
      className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-200 hover:shadow-md"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <span className="text-2xl">{activity.avatar}</span>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
          {activity.contact}
        </p>
        <p className="text-sm text-gray-600 truncate">{activity.activity}</p>
        <div className="flex items-center mt-1 space-x-2">
          <Activity className="w-3 h-3 text-gray-400" />
          <p className="text-xs text-gray-400 font-medium">{activity.time}</p>
        </div>
      </div>
      
      <div className={`p-2 rounded-lg ${
        activity.type === 'deal' ? 'bg-green-100' :
        activity.type === 'meeting' ? 'bg-purple-100' :
        activity.type === 'email' ? 'bg-yellow-100' : 'bg-blue-100'
      } transform transition-transform duration-300 group-hover:scale-110`}>
        {activity.type === 'contact' && <Users className="w-4 h-4 text-blue-600" />}
        {activity.type === 'deal' && <Briefcase className="w-4 h-4 text-green-600" />}
        {activity.type === 'meeting' && <Calendar className="w-4 h-4 text-purple-600" />}
        {activity.type === 'email' && <Mail className="w-4 h-4 text-yellow-600" />}
      </div>
    </div>
  );

  const TaskItem = ({ task, index }) => (
    <div 
      className="group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-200 hover:shadow-md"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:border-purple-400"
        />
        <span className="text-xl">{task.icon}</span>
        <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
          {task.title}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          task.priority === 'high' ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg' :
          task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' :
          'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
        }`}>
          {task.priority.toUpperCase()}
        </span>
        <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {task.dueDate}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-10 h-10 text-purple-600 animate-bounce-subtle" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <Star className="w-8 h-8 text-yellow-500 animate-bounce-subtle" />
          </div>
          <p className="text-xl text-gray-600 font-medium">
            Welcome back! 🚀 Here's your performance at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Contacts"
            value={stats.totalContacts}
            icon={Users}
            color="from-blue-500 to-cyan-500"
            change="+12%"
            delay={0}
          />
          <StatCard
            title="Active Deals"
            value={stats.activeDeals}
            icon={Briefcase}
            color="from-green-500 to-emerald-500"
            change="+5%"
            delay={100}
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
            color="from-purple-500 to-pink-500"
            change="+8.2%"
            delay={200}
          />
          <StatCard
            title="Open Tasks"
            value={stats.openTasks}
            icon={CheckSquare}
            color="from-orange-500 to-red-500"
            change="-3"
            delay={300}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-black text-white">Recent Activities</h3>
                    <div className="flex-1"></div>
                    <span className="px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-bold text-white">
                      Live ✨
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  {recentActivities.map((activity, index) => (
                    <ActivityItem key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Quick Actions */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-black text-white">Quick Actions</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Add New Contact</span>
                    </div>
                  </button>
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span>Create Deal</span>
                    </div>
                  </button>
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Schedule Meeting</span>
                    </div>
                  </button>
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-black text-white">Upcoming Tasks</h3>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  {upcomingTasks.map((task, index) => (
                    <TaskItem key={task.id} task={task} index={index} />
                  ))}
                  <button className="mt-4 w-full text-center font-bold text-purple-600 hover:text-purple-800 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                    View all tasks →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;