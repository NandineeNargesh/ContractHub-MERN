

import axios from 'axios';
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// GET: To fulfill the Account Manager and Analyst stories (viewing data)
export const fetchContracts = () => API.get('/contracts/list');

// POST: To fulfill the Contract Manager and Sales stories (saving data)
export const createContract = (contractData) => API.post('/contracts/create', contractData);