const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    photo: {
        type: String,
        required: true,
    },
    path: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    buyingPrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    stock: {
        type: Number
    },
    edited: {
        type: Date,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('item', ItemSchema);