const mongoose = require('mongoose');

const turnSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    active: { type: Boolean, required: true }    
});

module.exports = mongoose.model('turn', turnSchema);