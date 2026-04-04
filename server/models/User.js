const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Viewer'], // Zoryn RBAC Requirements
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);
