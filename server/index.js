require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log("❌ DB Error", err));

// 2. Models
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  title: String, description: String, amount: Number, type: String, category: String, date: Date
}, { timestamps: true }));

const Settings = mongoose.model('Settings', new mongoose.Schema({
  id: { type: String, default: "global_config" }, notificationsEnabled: Boolean, currency: String, budgetLimit: Number
}));

// 3. BULLETPROOF ROUTES (Written as a single block)
app.get('/api/transactions/list', async (req, res) => {
    const data = await Transaction.find().sort({ date: -1 });
    res.json(data);
});

app.post('/api/transactions/create', async (req, res) => {
    const doc = new Transaction(req.body);
    await doc.save();
    res.status(201).json(doc);
});

app.delete('/api/transactions/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get('/api/settings', async (req, res) => {
    let config = await Settings.findOne({ id: "global_config" });
    if (!config) config = await Settings.create({ id: "global_config" });
    res.json(config);
});

app.post('/api/settings/update', async (req, res) => {
    const updated = await Settings.findOneAndUpdate({ id: "global_config" }, req.body, { new: true, upsert: true });
    res.json(updated);
});

// 4. Start
app.listen(5000, () => console.log('🚀 SERVER IS DEFINITELY RUNNING ON 5000'));
