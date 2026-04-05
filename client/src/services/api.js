import axios from 'axios';


const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'  // Local link
    : 'https://finance-z.onrender.com/api'; // Render link
// GET: Transactions list

const API = axios.create({
    baseURL: API_URL,
});
export const fetchTransactions = () => API.get('/transactions/list');

// POST: Create Transaction
export const createTransaction = (transactionData) => API.post('/transactions/create', transactionData);
// 🔹 Settings Functions
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (data) => API.post('/settings/update', data);
// DELETE: Transaction remove karne ke liye
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export default API;
