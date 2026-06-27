import React, { useState } from 'react';
import Upload from './Upload';

function Dashboard({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('upload');

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
          <div className="bg-white rounded-xl p-6 shadow text-center text-gray-400">
            Pehle data upload karo — analytics yahan dikhegi
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;