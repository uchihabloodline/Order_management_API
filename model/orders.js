const mongoose = require('mongoose');

//defining product schema
const orderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    quantity:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: false,
    },
    pay_mode:{
        type: String,
        enum: ["COD", "PRE_PAID"],
        required: true
    }

},{
    timestamps: true
});

//mongoose.model will compile the model
const Order = mongoose.model('Order', orderSchema);

//exporting the model
module.exports = Order;