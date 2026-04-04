import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContractForm from './components/ContractForm';
import ContractList from './components/ContractList';
import Settings from './components/Settings';

function App() {
  const [view, setView] = useState('list');

 const renderMainContent = () => {
  switch(view) {
    case 'create': return <ContractForm />;
    case 'sales': return <ContractList role="sales" />;
    case 'legal': return <ContractList role="legal" />;
    case 'finance': return <ContractList role="finance" />;
    case 'settings': return <Settings />;
    default: return <ContractList role="manager" />;
  }
};

  return (
    <div className="flex min-h-screen bg-[#f0f4f1]">
      <Sidebar setView={setView} currentView={view} />
      <div className="flex-1 ml-[320px]">
        {renderMainContent()}
      </div>
    </div>
  );
}
export default App;

