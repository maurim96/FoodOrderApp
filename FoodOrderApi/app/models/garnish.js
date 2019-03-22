const mongoose = require('mongoose');

const garnishSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    img: { type: String, required: true },
    isSalad: { type: Boolean, required: true }
});

module.exports = mongoose.model('garnish', garnishSchema);