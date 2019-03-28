const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    isSpecial: { type: Boolean, required: true },
    img: { type: String, required: true }    
});

module.exports = mongoose.model('ingredients', ingredientsSchema);