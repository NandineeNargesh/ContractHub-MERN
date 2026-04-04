
import React from 'react';
import { Layout, FilePlus, List, ShieldCheck, Banknote, BarChart3, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ setView, currentView }) => {
  return (
    <div className="flex fixed left-0 top-0 h-screen z-50">
      {/* Primary Slim Sidebar - BLACK BAR */}
      <div className="w-20 bg-[#1a1a1a] flex flex-col items-center py-6 text-gray-500 border-r border-gray-800 justify-between">
        <div className="flex flex-col items-center w-full">
           <div className="text-white bg-blue-600 p-3 rounded-2xl cursor-pointer shadow-lg mb-12">
                <Layout size={28} />
            </div>

            <nav className="flex flex-col gap-9 items-center w-full">
                {/* Tooltip Wrapper using 'group' */}
                <div className="relative group flex justify-center w-full">
                    <List 
                        size={24} 
                        className={`cursor-pointer transition-colors ${currentView === 'list' ? 'text-white' : 'hover:text-white'}`} 
                        onClick={() => setView('list')} 
                    />
                    <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-xl">
                        View Dashboard
                    </span>
                </div>

                <div className="relative group flex justify-center w-full">
                    <FilePlus 
                        size={24} 
                        className={`cursor-pointer transition-colors ${currentView === 'create' ? 'text-white' : 'hover:text-white'}`} 
                        onClick={() => setView('create')} 
                    />
                    <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-xl">
                        New Contract
                    </span>
                </div>

                <div className="relative group flex justify-center w-full">
                    <BarChart3 size={24} className="hover:text-white cursor-pointer" onClick={() => setView('sales')} />
                    <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-xl">
                        Performance
                    </span>
                </div>
            </nav>
        </div>

        <div className="flex flex-col gap-8 pb-4 items-center w-full">
            <div className="relative group flex justify-center w-full">
                <Settings 
                    size={24} 
                    className={`cursor-pointer transition-colors ${currentView === 'settings' ? 'text-white' : 'hover:text-white'}`} 
                    onClick={() => setView('settings')} 
                />
                <span className="absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-xl">
                    System Settings
                </span>
            </div>
            <LogOut size={24} className="hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Secondary Navigation Drawer - LIGHT SAGE BAR */}
      <div className="w-64 bg-[#f8f9fa] border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-6 mb-12 ml-2">Departments</h2>
        
        <div className="space-y-2 flex-1">
          <button onClick={() => setView('list')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
            <Layout size={18} /> Contract Manager
          </button>
          <button onClick={() => setView('sales')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'sales' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
            <BarChart3 size={18} /> Sales & Earnings
          </button>
          <button onClick={() => setView('legal')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'legal' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
            <ShieldCheck size={18} /> Legal Review
          </button>
          <button onClick={() => setView('finance')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all text-sm ${currentView === 'finance' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
            <Banknote size={18} /> Finance Reports
          </button>
        </div>
        
        <div className="bg-blue-50/50 p-4 rounded-[2rem] border border-blue-100">
            <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Authenticated</p>
            <p className="text-xs font-bold text-blue-800">IT Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;