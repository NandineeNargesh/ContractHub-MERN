
import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/api';
import { Settings as SettingsIcon, Bell, DollarSign, Shield } from 'lucide-react';

const Settings = () => {
    const [config, setConfig] = useState({
        notificationsEnabled: true,
        currency: 'INR',
        budgetLimit: 50000
    });

    useEffect(() => {
        fetchSettings()
            .then(res => setConfig(res.data))
            .catch(err => console.error("Settings Load Error:", err));
    }, []);

    const handleToggle = async (field) => {
        const updatedConfig = { ...config, [field]: !config[field] };
        setConfig(updatedConfig);
        await updateSettings(updatedConfig);
    };

    const handleUpdate = async (field, value) => {
        const updatedConfig = { ...config, [field]: value };
        setConfig(updatedConfig);
        await updateSettings(updatedConfig);
    };

    return (
        <div className="p-4 md:p-8 w-full max-w-5xl mx-auto pb-24 md:pb-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">System Control</h1>
                <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Configure your global finance preferences</p>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 space-y-8">
                {/* Notification Toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-8">
                    <div className="flex gap-4">
                        <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 h-fit">
                            <Bell size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-lg">Alert Notifications</p>
                            <p className="text-xs md:text-sm text-gray-400 max-w-xs">Get notified when expenses cross 80% of your monthly budget</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleToggle('notificationsEnabled')}
                        className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${config.notificationsEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                    >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${config.notificationsEnabled ? 'left-8' : 'left-1'}`}></div>
                    </button>
                </div>

                {/* Budget Limit Input */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex gap-4">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 h-fit">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-lg">Monthly Budget Limit</p>
                            <p className="text-xs md:text-sm text-gray-400 max-w-xs">Set a global ceiling for all expense categories</p>
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                        <input 
                            type="number"
                            className="w-full sm:w-44 bg-gray-50 border-2 border-transparent rounded-2xl p-4 pl-8 font-black text-gray-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            value={config.budgetLimit}
                            onChange={(e) => handleUpdate('budgetLimit', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Health Status Footer */}
            <div className="mt-8 bg-gray-900 text-white p-6 rounded-[2rem] flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold tracking-wide uppercase">System Status: Online</p>
                </div>
                <Shield size={20} className="text-gray-500" />
            </div>
        </div>
    );
};

export default Settings;