var mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    isSalad: { type: Boolean, required: true },
    isSpecial: { type: Boolean, required: true }    
});

module.exports = mongoose.model('ingredients', ingredientsSchema);