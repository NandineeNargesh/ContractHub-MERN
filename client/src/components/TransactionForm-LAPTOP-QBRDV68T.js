

import React, { useState } from 'react';
import { createContract } from '../services/api';
import { Save, XCircle, FileText, DollarSign, Calendar } from 'lucide-react';

const ContractForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contractValue: '',
        expiryDate: '',
        status: 'Draft'
    });

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Professional Validation Check
    if (!formData.title || !formData.expiryDate) {
        alert("Please fill in the Required fields (Title and Expiry Date)");
        return;
    }

    try {
        const response = await createContract(formData);
        if(response.status === 201) {
            alert("Contract saved to Database successfully!");
            setFormData({ title: '', description: '', contractValue: '', expiryDate: '', status: 'Draft' });
        }
    } catch (error) {
        console.error("Submission failed", error);
        alert("Failed to save. Check terminal for details.");
    }
};

    return (
        <div className="ml-24 p-8 w-full max-w-4xl">
            {/* Header section */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                        <FileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">New Agreement</h1>
                        <p className="text-gray-400 text-sm">Fill in the details to standardize the process</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="button" className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition">
                        <XCircle size={18} /> Discard
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2 bg-black rounded-xl font-semibold text-white hover:bg-gray-800 transition"
                    >
                        <Save size={18} /> Save Contract
                    </button>
                </div>
            </div>

            {/* Form Fields in Rounded Cards */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">General Details</h3>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contract Title</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Annual Service Agreement"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description / User Story</label>
                        <textarea 
                            rows="4"
                            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Briefly describe the contract terms..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Financials & Timeline</h3>
                    
                    <div>
                        <label className=" text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                            <DollarSign size={14} /> Contract Value (EUR)
                        </label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0.00"
                            value={formData.contractValue}
                            onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className=" text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                            <Calendar size={14} /> Expiration Date
                        </label>
                        <input 
                            type="date" 
                            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Lifecycle Status</label>
                        <select 
                            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContractForm;
