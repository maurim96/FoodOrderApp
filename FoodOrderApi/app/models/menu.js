const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    active: { type: Boolean, required: true },    
    type: [{
        name: { type: String},
        active: { type: Boolean }
    }],
    sauce: [{
        name: { type: String},
        active: { type: Boolean }
    }],
    isSalad: { type: Boolean, required: true },
    hasGarnish: { type: Boolean, required: true }
});

module.exports = mongoose.model('menu', menuSchema);