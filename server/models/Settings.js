const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    id: { type: String, default: "global_config" },
    currency: { type: String, default: "INR" },
    budgetLimit: { type: Number, default: 50000 },
    notificationsEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Settings', SettingsSchema);
