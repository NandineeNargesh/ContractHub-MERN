
import React, { useEffect, useState } from 'react';
import { fetchContracts } from '../services/api';
import { 
  Clock, 
  DollarSign, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  CreditCard, 
  ShieldAlert 
} from 'lucide-react';
const ContractList = ({ role }) => {
    const [contracts, setContracts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getContracts = async () => {
            try {
                const response = await fetchContracts();
                setContracts(response.data);
            } catch (error) {
                console.error("Error fetching contracts", error);
            }
        };
        getContracts();
    }, [role]); 

    // Role-based filtering logic
    const displayContracts = contracts.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (role === 'legal') return matchesSearch && c.status === 'Pending Approval';
       if (role === 'finance') return matchesSearch && Number(c.contractValue) > 0;
        return matchesSearch;
    });

    return (
        <div className="p-8 w-full max-w-6xl">
            {/* Dynamic Header based on Role */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 capitalize">{role} Dashboard</h1>
                    <p className="text-gray-500 font-medium">
                        {role === 'legal' ? 'Reviewing pending compliance requirements' : 
                         role === 'sales' ? 'Tracking earnings and customer agreements' : 
                         'Centralized Contract Management System'}
                    </p>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search contracts..."
                        className="pl-10 pr-4 py-2 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

  {/* Fully Dynamic KPI Circles */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
    
    {/* 1. Records Circle  */}
    <div className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm h-48 transition-all">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <span className="text-xl font-black text-blue-600">
                {displayContracts.length}
            </span>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {role === 'manager' ? 'Total Records' : `${role} Records`}
        </p>
    </div>

    {/* 2. Portfolio Value  */}
    <div className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm h-48 transition-all">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
            <TrendingUp size={24} className="text-emerald-600" />
        </div>
        <h2 className="text-lg font-black text-gray-800">
            €{displayContracts.reduce((a, c) => a + (Number(c.contractValue) || 0), 0).toLocaleString()}
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {role === 'sales' ? 'Sales Target' : 'View Value'}
        </p>
    </div>

    {/* 3. Action/Commission Circle */}
    <div className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm h-48 transition-all">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-3">
            {role === 'legal' ? <ShieldAlert size={24} className="text-amber-600" /> : <DollarSign size={24} className="text-amber-600" />}
        </div>
        <h2 className="text-lg font-black text-gray-800">
            {role === 'legal' 
                ? displayContracts.length // Shows number of risks to review
                : `€${(displayContracts.reduce((a, c) => a + (Number(c.contractValue) || 0), 0) * 0.05).toLocaleString(undefined, {maximumFractionDigits: 0})}`
            }
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {role === 'legal' ? 'Risk Tasks' : 'Comm. Share'}
        </p>
    </div>

    {/* 4. Efficiency/Load Factor */}
    <div className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm h-48 transition-all">
        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-3">
            <CheckCircle size={24} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-black text-gray-800">
            {((displayContracts.length / (contracts.length || 1)) * 100).toFixed(0)}%
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter Impact</p>
    </div>
</div>
            {/* Contract List */}
            <div className="grid grid-cols-1 gap-4">
                {displayContracts.map((item) => (
                    <div key={item._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                                <p className="text-sm text-gray-400">ID: {item._id.substring(0,8)}... | Exp: {new Date(item.expiryDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Story Content: Finance/Sales details */}
                        <div className="flex-1 flex justify-center gap-10">
                            {role === 'finance' && (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CreditCard size={16}/> <span className="text-xs font-bold uppercase">Net-30 Terms</span>
                                </div>
                            )}
                            {role === 'legal' && (
                                <div className="flex items-center gap-2 text-amber-600">
                                    <ShieldAlert size={16}/> <span className="text-xs font-bold uppercase">Clause Review</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-8 flex-1 justify-end">
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase">Value</p>
                                <p className="font-bold text-gray-800">€{item.contractValue?.toLocaleString()}</p>
                            </div>
                            {role === 'legal' ? (
                                <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold">APPROVE</button>
                            ) : (
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold min-w-[100px] text-center ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {item.status}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContractList;

