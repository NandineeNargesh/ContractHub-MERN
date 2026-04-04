import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Insights = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions()
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-gray-400 font-bold animate-pulse">Analyzing Financial Patterns...</p>
        </div>
    );

    const categoryData = data.filter(t => t.type === 'Expense').reduce((acc, curr) => {
        const found = acc.find(item => item.name === curr.category);
        if (found) found.value += Number(curr.amount);
        else acc.push({ name: curr.category, value: Number(curr.amount) });
        return acc;
    }, []);

    const summaryData = [
        { name: 'Income', amount: data.filter(t => t.type === 'Income').reduce((a, c) => a + Number(c.amount), 0) },
        { name: 'Expense', amount: data.filter(t => t.type === 'Expense').reduce((a, c) => a + Number(c.amount), 0) }
    ];

    const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'];

    return (
        <div className="p-4 md:p-8 w-full max-w-6xl mx-auto pb-24 md:pb-8">
            <div className="mb-10">
                <h1 className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">Financial Insights</h1>
                <p className="text-gray-500 font-medium mt-1">Visual breakdown of your cash flow and habits</p>
            </div>
            
            {data.length === 0 ? (
                <div className="bg-white p-20 rounded-[2.5rem] text-center shadow-sm border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic text-lg">No data points found yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Bar Chart Container */}
                    <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Cash Flow Comparison
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summaryData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                    <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={40}>
                                        {summaryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart Container */}
                    <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span> Expense Distribution
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={categoryData} 
                                        innerRadius={60} 
                                        outerRadius={80} 
                                        paddingAngle={5} 
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Insights;