const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    active: { type: Boolean, required: true }    
});

module.exports = mongoose.model('location', locationSchema);