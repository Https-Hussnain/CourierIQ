import React, { useState } from 'react';
import Upload from './Upload';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

function Dashboard({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [analyticsData, setAnalyticsData] = useState(null);

  const courierData = [
    { name: 'Leopards', orders: 3, delivered: 2, delayed: 1 },
    { name: 'TCS', orders: 3, delivered: 1, delayed: 1 },
    { name: 'BlueEx', orders: 2, delivered: 2, delayed: 0 },
  ];

  const statusData = [
    { name: 'Delivered', value: 5 },
    { name: 'Delayed', value: 2 },
    { name: 'Failed', value: 1 },
  ];

  const regionData = [
    { name: 'Punjab', orders: 4 },
    { name: 'Sindh', orders: 3 },
    { name: 'Federal', orders: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">CourierIQ</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.email}</span>
          <button
            onClick={() => setUser(null)}
            className="bg-white text-blue-600 px-4 py-1 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white shadow px-6 flex gap-4">
        <button
          onClick={() => setActiveTab('upload')}
          className={`py-3 px-4 font-semibold border-b-2 ${activeTab === 'upload' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Upload Data
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-4 font-semibold border-b-2 ${activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Analytics
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'upload' && <Upload />}
        {activeTab === 'analytics' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-3xl font-bold text-blue-600">8</p>
                <p className="text-gray-500 text-sm">Total Orders</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-3xl font-bold text-green-600">5</p>
                <p className="text-gray-500 text-sm">Delivered</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-3xl font-bold text-yellow-500">2</p>
                <p className="text-gray-500 text-sm">Delayed</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow text-center">
                <p className="text-3xl font-bold text-red-500">1</p>
                <p className="text-gray-500 text-sm">Failed</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-gray-700 mb-4">Courier Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={courierData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
                    <Bar dataKey="delayed" fill="#F59E0B" name="Delayed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-gray-700 mb-4">Delivery Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name, value}) => `${name}: ${value}`}>
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Region Chart */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-700 mb-4">Orders by Region</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3B82F6" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AI Recommendation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-blue-700 mb-2">🤖 AI Recommendation</h3>
              <p className="text-blue-600">Based on your delivery data, <strong>BlueEx</strong> has the best delivery rate (100%). For Punjab region, <strong>Leopards</strong> is recommended. Avoid <strong>TCS</strong> for Sindh region due to high failure rate.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;