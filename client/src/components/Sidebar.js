

import React from 'react';
import { Layout, PlusCircle, List, BarChart3, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ setView, currentView }) => {
  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION - Only visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1a1a1a] h-16 z-[100] flex justify-around items-center px-4 border-t border-gray-800">
        <List 
          size={22} 
          className={currentView === 'list' ? 'text-emerald-500' : 'text-gray-500'} 
          onClick={() => setView('list')} 
        />
        <PlusCircle 
          size={22} 
          className={currentView === 'create' ? 'text-emerald-500' : 'text-gray-500'} 
          onClick={() => setView('create')} 
        />
        <BarChart3 
          size={22} 
          className={currentView === 'insights' ? 'text-emerald-500' : 'text-gray-500'} 
          onClick={() => setView('insights')} 
        />
        <Settings 
          size={22} 
          className={currentView === 'settings' ? 'text-emerald-500' : 'text-gray-500'} 
          onClick={() => setView('settings')} 
        />
      </div>

      {/* DESKTOP SIDEBAR - Hidden on mobile */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen z-50">
        {/* Primary Slim Sidebar - BLACK BAR */}
        <div className="w-20 bg-[#1a1a1a] flex flex-col items-center py-6 text-gray-500 border-r border-gray-800 justify-between">
          <div className="flex flex-col items-center w-full">
              <div className="text-white bg-emerald-600 p-3 rounded-2xl cursor-pointer shadow-lg mb-12">
                  <Layout size={28} />
              </div>

              <nav className="flex flex-col gap-9 items-center w-full text-gray-500">
                  <div className="relative group flex justify-center w-full">
                      <List size={24} className={`cursor-pointer transition-colors ${currentView === 'list' ? 'text-white' : 'hover:text-white'}`} onClick={() => setView('list')} />
                      <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap z-50">Transactions</span>
                  </div>
                  <div className="relative group flex justify-center w-full">
                      <PlusCircle size={24} className={`cursor-pointer transition-colors ${currentView === 'create' ? 'text-white' : 'hover:text-white'}`} onClick={() => setView('create')} />
                      <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap z-50">Add Entry</span>
                  </div>
                  <div className="relative group flex justify-center w-full">
                      <BarChart3 size={24} className={`cursor-pointer transition-colors ${currentView === 'insights' ? 'text-white' : 'hover:text-white'}`} onClick={() => setView('insights')} />
                      <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap z-50">Analytics</span>
                  </div>
              </nav>
          </div>
          <div className="flex flex-col gap-8 pb-4 items-center w-full">
              <Settings size={24} className={`cursor-pointer transition-colors ${currentView === 'settings' ? 'text-white' : 'hover:text-white'}`} onClick={() => setView('settings')} />
              <LogOut size={24} className="hover:text-red-400 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Secondary Navigation Drawer - LIGHT SAGE BAR */}
       <div className="hidden md:flex w-64 bg-[#f8f9fa] border-r border-gray-200 p-6 flex-col">   <h2 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-6 mb-12 ml-2">Control Room</h2>
          <div className="space-y-2 flex-1">
            <button onClick={() => setView('list')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              <Layout size={18} /> Daily Journal
            </button>
            <button onClick={() => setView('insights')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'insights' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              <BarChart3 size={18} /> Budget Insights
            </button>
            <button onClick={() => setView('settings')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'settings' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              <Settings size={18} /> Configurations
            </button>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-[2rem] border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">System Health</p>
              <p className="text-xs font-bold text-emerald-800">MERN Connected</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;