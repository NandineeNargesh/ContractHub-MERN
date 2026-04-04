

import React, { useState } from 'react';
import { createTransaction } from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, CreditCard, DollarSign, FileText } from 'lucide-react';

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        type: 'Expense',
        category: 'Food',
        date: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount || !formData.date) {
            toast.error("Please fill Title, Amount, and Date!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await createTransaction(formData);
            if(response.status === 201) {
                toast.success("Transaction recorded successfully!");
                setFormData({ title: '', description: '', amount: '', type: 'Expense', category: 'Food', date: '' });
            }
        } catch (error) {
            console.error("Failed", error);
            toast.error("Error saving to Database.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // 🔹 REMOVED ml-[340px] and ml-24 here because App.js already handles it
            className="w-full max-w-5xl mx-auto"
        >
            {/* Top Header Card */}
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 md:p-4 rounded-full text-emerald-600 shrink-0">
                        <CreditCard size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">New Transaction</h1>
                        <p className="text-gray-400 text-xs md:text-sm font-medium">Log your daily activities</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-black rounded-2xl font-bold text-white hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Entry</>}
                </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Section: Details */}
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <FileText size={16} />
                        <h3 className="text-xs font-black uppercase tracking-widest">Basic Details</h3>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Title</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-emerald-500 focus:bg-white transition-all outline-none font-semibold" 
                            placeholder="e.g. Office Lunch" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Category</label>
                        <select 
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-emerald-500 focus:bg-white transition-all outline-none font-semibold" 
                            value={formData.category} 
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Food">🍔 Food & Drinks</option>
                            <option value="Rent">🏠 Rent & Bills</option>
                            <option value="Salary">💰 Salary / Income</option>
                            <option value="Shopping">🛒 Shopping</option>
                            <option value="Travel">🚗 Travel</option>
                        </select>
                    </div>
                </div>

                {/* Right Section: Financials */}
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <DollarSign size={16} />
                        <h3 className="text-xs font-black uppercase tracking-widest">Financial Info</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Amount</label>
                            <input 
                                type="number" 
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-emerald-500 focus:bg-white transition-all outline-none font-bold text-lg" 
                                placeholder="0.00" 
                                value={formData.amount} 
                                onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Date</label>
                            <input 
                                type="date" 
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-emerald-500 focus:bg-white transition-all outline-none font-semibold text-sm" 
                                value={formData.date} 
                                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-4 ml-1">Transaction Type</label>
                        <div className="flex bg-gray-50 p-2 rounded-2xl gap-2">
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, type: 'Income'})}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.type === 'Income' ? 'bg-white text-emerald-600 shadow-md' : 'text-gray-400'}`}
                            >
                                Income
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, type: 'Expense'})}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.type === 'Expense' ? 'bg-white text-red-600 shadow-md' : 'text-gray-400'}`}
                            >
                                Expense
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default TransactionForm;