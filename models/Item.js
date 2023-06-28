const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    photo: {
        itemId: {
            type: Schema.Types.ObjectId
        },
        filename: {
            type: String
        },
        url: {
            type: String
        },
        contentType: {
            type: String
        },
        size: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
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