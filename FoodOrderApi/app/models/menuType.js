var mongoose = require('mongoose');

const menuTypeSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    isSalad: { type: Boolean, required: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients', required: false }]
});

module.exports = mongoose.model('menuType', menuTypeSchema);