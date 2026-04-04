
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchTransactions, deleteTransaction } from '../services/api';
import { 
    ArrowUpCircle, 
    ArrowDownCircle, 
    Search, 
    TrendingUp, 
    Trash2 
} from 'lucide-react';

const TransactionList = ({ role }) => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        try {
            const response = await fetchTransactions();
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions", error);
            toast.error("Failed to load transactions");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            try {
                await deleteTransaction(id);
                toast.success("Transaction Deleted!");
                getTransactions();
            } catch (error) {
                toast.error("Delete failed!");
            }
        }
    };

    // 🔹 Added safety check with ?. to prevent 'toLowerCase' errors
    const displayData = transactions.filter(t => {
        const titleMatch = t.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = t.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || t.type === filter;
        return (titleMatch || categoryMatch) && matchesFilter;
    });

    const totalIncome = displayData.filter(t => t.type === 'Income').reduce((a, c) => a + (Number(c.amount) || 0), 0);
    const totalExpense = displayData.filter(t => t.type === 'Expense').reduce((a, c) => a + (Number(c.amount) || 0), 0);
    const balance = totalIncome - totalExpense;
return (
        <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div className="w-full">
                    <h1 className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">Finance Overview</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        {role === 'Admin' ? 'Managing all financial activities' : 'Viewing real-time insights'}
                    </p>
                </div>
                
                <div className="flex flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm font-bold outline-none text-gray-500 cursor-pointer"
                    >
                        <option value="All">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
            </div>

            {/* KPI Cards */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
            >
                {/* Entries */}
                <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm h-36 md:h-44 border border-gray-50">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2 text-blue-600 font-bold text-lg">
                        {displayData.length}
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entries</p>
                </div>

                {/* Balance */}
                <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm h-36 md:h-44 border border-gray-50">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                        <TrendingUp size={20} className="text-emerald-600" />
                    </div>
                    <h2 className="text-sm md:text-xl font-black text-gray-800">₹{balance.toLocaleString()}</h2>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Balance</p>
                </div>

                {/* Income */}
                <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm h-36 md:h-44 border-b-4 border-emerald-400">
                    <h2 className="text-sm md:text-xl font-black text-emerald-600">₹{totalIncome.toLocaleString()}</h2>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Income</p>
                </div>

                {/* Expense */}
                <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm h-36 md:h-44 border-b-4 border-red-400">
                    <h2 className="text-sm md:text-xl font-black text-red-600">₹{totalExpense.toLocaleString()}</h2>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expense</p>
                </div>
            </motion.div>

            {/* Transaction List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {displayData.map((item, index) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            key={item._id} 
                            className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-50 flex items-center justify-between hover:shadow-md transition-all"
                        >
                            {/* Left Side: Icon + Title */}
                            <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
                                <div className={`p-3 md:p-4 rounded-2xl shrink-0 ${item.type === 'Income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {item.type === 'Income' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                                </div>
                                <div className="truncate">
                                    <h3 className="font-bold text-gray-800 text-sm md:text-lg truncate">{item.title}</h3>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wide">
                                        {item.category} • {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Amount + Action */}
                            <div className="flex items-center gap-4 md:gap-10">
                                <div className="text-right">
                                    <p className={`font-black text-base md:text-xl whitespace-nowrap ${item.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {item.type === 'Income' ? '+' : '-'} ₹{item.amount?.toLocaleString()}
                                    </p>
                                </div>
                                
                                {role === 'Admin' && (
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 md:p-3 text-red-400 hover:text-red-800 hover:bg-red-100 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {displayData.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold italic">No entries match your search...</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TransactionList;