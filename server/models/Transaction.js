const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    type: { 
        type: String, 
        enum: ['Income', 'Expense'], 
        required: true 
    },
    amount: { type: Number, required: true }, 
    category: { 
        type: String, 
        enum: ['Food', 'Rent', 'Salary', 'Shopping', 'Other'], 
        default: 'Other' 
    },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
