

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TransactionForm from './components/TransactionForm'; 
import TransactionList from './components/TransactionList';
import Settings from './components/Settings';
import Insights from './components/Insights'; 
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState('list');
  const [role, setRole] = useState('Admin'); 

  const renderMainContent = () => {
    switch(view) {
      case 'create': 
        return role === 'Admin' ? <TransactionForm /> : <TransactionList role="Viewer" />;
      case 'insights': 
        return <Insights />;
      case 'settings': 
        return <Settings />;
      case 'list':
      default: 
        return <TransactionList role={role} />;
    }
  };

  return (
    // 🔹 Flex-col for mobile, flex-row for desktop. overflow-x-hidden is a MUST.
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc] overflow-x-hidden">
      
      {/* 1. Global Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '15px',
            background: '#333',
            color: '#fff',
            fontWeight: 'bold'
          },
        }}
      />

      {/* 2. Sidebar - It handles its own responsive behavior now */}
      <Sidebar setView={setView} currentView={view} />
      
      {/* 3. Main Content Area */}
      {/* 🔹 Fixed: ml-0 on mobile, ml-[340px] on desktop. pb-24 for mobile nav space. */}
      <div className="flex-1 transition-all duration-500 md:ml-[340px] p-4 md:p-10 pb-24 md:pb-8 w-full max-w-full">
        
        {/* Header: Role Management - Stacks on small screens */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] md:text-sm font-bold text-gray-400 md:text-gray-500 uppercase tracking-widest">
                System Live
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full sm:w-auto">
              <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-xs font-black uppercase tracking-tighter shadow-sm ${role === 'Admin' ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white'}`}>
                Access: {role}
              </div>
              
              <div className="hidden sm:block h-6 w-[1px] bg-gray-200"></div>

              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <label className="text-[9px] md:text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Switch:</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 sm:flex-none p-2 pr-6 border-none rounded-xl bg-white shadow-sm outline-none text-xs md:text-sm font-bold text-gray-700 cursor-pointer"
                >
                  <option value="Admin">IT Administrator</option>
                  <option value="Viewer">Guest Analyst</option>
                </select>
              </div>
            </div>
        </div>

        {/* 4. Dynamic Page View */}
        <div className="w-full">
          {renderMainContent()}
        </div>

      </div>
    </div>
  );
}

export default App;