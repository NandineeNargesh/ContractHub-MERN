
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    const [config, setConfig] = useState({
        notificationsEnabled: true,
        autoRenewal: false,
        defaultCommissionRate: 5
    });

useEffect(() => {
    axios.get('http://localhost:5000/api/settings')
        .then(res => setConfig(res.data))
        .catch(err => console.error("Settings Load Error:", err));
}, []);


    const handleToggle = async (field) => {
        const updatedConfig = { ...config, [field]: !config[field] };
        setConfig(updatedConfig);
       await axios.post('http://localhost:5000/api/settings/update', updatedConfig);
   };

    return (
        <div className="p-8 w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">System Control Panel</h1>
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                
                <div className="flex justify-between items-center border-b pb-6">
                    <div>
                        <p className="font-bold text-gray-800 text-lg">Email Notifications</p>
                        <p className="text-sm text-gray-400">Trigger alerts for Account Managers when contracts expire</p>
                    </div>
                    <button 
                        onClick={() => handleToggle('notificationsEnabled')}
                        className={`w-14 h-7 rounded-full transition-colors relative ${config.notificationsEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                    >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${config.notificationsEnabled ? 'left-8' : 'left-1'}`}></div>
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-800 text-lg">Sales Commission Rate (%)</p>
                        <p className="text-sm text-gray-400">Standard rate for Sales Representative earnings</p>
                    </div>
                    <input 
                        type="number"
                        className="w-20 bg-gray-100 border-none rounded-xl p-2 font-bold text-center"
                        value={config.defaultCommissionRate}
                        onChange={(e) => setConfig({...config, defaultCommissionRate: e.target.value})}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;

