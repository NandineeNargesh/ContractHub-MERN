import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, 
});

// GET: Transactions list
export const fetchTransactions = () => API.get('/transactions/list');

// POST: Create Transaction
export const createTransaction = (transactionData) => API.post('/transactions/create', transactionData);
// 🔹 Settings Functions
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (data) => API.post('/settings/update', data);
// DELETE: Transaction remove karne ke liye
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export default API;
