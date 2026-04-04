

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['Manager', 'Sales', 'Legal', 'Finance', 'Accountant', 'Analyst'], 
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);