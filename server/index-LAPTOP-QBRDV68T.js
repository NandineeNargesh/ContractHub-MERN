

require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ Mongo Error", err));

// 🔹 Contract Model
const ContractSchema = new mongoose.Schema({
  title: String,
  description: String,
  contractValue: Number,
  expiryDate: Date,
  status: String
}, { timestamps: true });

const Contract = mongoose.model('Contract', ContractSchema);

// 🔹 Settings Model (Now Inline to fix the 404/Import issue)
const SettingsSchema = new mongoose.Schema({
    id: { type: String, default: "global_config" },
    notificationsEnabled: { type: Boolean, default: true },
    autoRenewal: { type: Boolean, default: false },
    defaultCommissionRate: { type: Number, default: 5 }
});

const Settings = mongoose.model('Settings', SettingsSchema);

// 🔹 ROUTES

// 1. Create Contract
app.post('/api/contracts/create', async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json({ message: 'Saved', contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. List Contracts
app.get('/api/contracts/list', async (req, res) => {
    try {
        const contracts = await Contract.find().sort({ createdAt: -1 });
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// 3. GET Settings
app.get('/api/settings', async (req, res) => {
    try {
        let config = await Settings.findOne({ id: "global_config" });
        if (!config) {
            config = await Settings.create({ id: "global_config" });
        }
        res.status(200).json(config);
    } catch (err) {
        res.status(500).json({ error: "Failed to load settings" });
    }
});

// 4. UPDATE Settings
app.post('/api/settings/update', async (req, res) => {
    try {
        const updated = await Settings.findOneAndUpdate(
            { id: "global_config" }, 
            req.body, 
            { new: true, upsert: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update settings" });
    }
});

// 🔹 START SERVER
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});