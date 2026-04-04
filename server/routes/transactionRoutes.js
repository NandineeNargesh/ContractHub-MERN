const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Test Route
router.get('/test', (req, res) => {
    res.send("Finance Router is working!");
});

// Create Transaction
router.post('/create', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        const saved = await transaction.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List Transactions
router.get('/list', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch transactions" });
    }
});

module.exports = router;
