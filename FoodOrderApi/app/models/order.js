const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menu', required: true },
    mainCourse: {
        type: { type: String, required: false },
        ingredients: [{ type: String, required: false }],
        special: [{ type: String, required: false }],
        sauce: { type: String, required: false }
    },
    garnish: {
        garnish: { type: mongoose.Schema.Types.ObjectId, ref: 'garnish', required: false },
        garnishIngredients: [{ type: String, required: false }]
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
    turn: { type: mongoose.Schema.Types.ObjectId, ref: 'turn', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: Date, required: true },
    note: { type: String }
})

module.exports = mongoose.model('order', orderSchema);