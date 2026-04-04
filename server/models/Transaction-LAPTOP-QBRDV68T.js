
const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { 
        type: String, 
        enum: ['Draft', 'Pending Approval', 'Active', 'Expired', 'Renewed'], 
        default: 'Draft' 
    },
    contractValue: { type: Number, default: 0 }, // Finance Team ke liye
    expiryDate: { type: Date, required: true }, // Manager & Sales ke liye
    renewalNotification: { type: Boolean, default: false }, // Automation story
    version: { type: Number, default: 1 }, // Version control story
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);