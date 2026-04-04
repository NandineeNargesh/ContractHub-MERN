

const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    id: { type: String, default: "global_config" }, // We only need one record
    notificationsEnabled: { type: Boolean, default: true },
    defaultCommissionRate: { type: Number, default: 5 },
    autoRenewal: { type: Boolean, default: false }
});

module.exports = mongoose.model('Settings', SettingsSchema);