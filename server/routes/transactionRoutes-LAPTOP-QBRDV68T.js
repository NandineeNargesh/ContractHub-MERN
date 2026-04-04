



const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

router.get('/test', (req, res) => {
    res.send("Router is working!");
});

router.post('/create', async (req, res) => {
    console.log("POST /create HIT", req.body);

    try {
        const contract = new Contract(req.body);
        const saved = await contract.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const contracts = await Contract.find().sort({ createdAt: -1 }); // Newest first
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch contracts" });
    }
});

module.exports = router;
