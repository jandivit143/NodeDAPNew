const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    }
},{
    versionKey: false
})

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;