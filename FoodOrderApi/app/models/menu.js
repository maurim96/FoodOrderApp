var mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isSecondary: { type: Boolean, required: true },
    menuType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'menuType', required: false }],
    hasSecondary: { type: Boolean, required: true, default: true}
});

module.exports = mongoose.model('menu', menuSchema);