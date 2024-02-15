const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate:{
        type: String,
        require: true
    },
    deliveryDate:{
        type: String,
        require: true
    }
},{
    versionKey: false
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;