const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/fed_microservices_db")
.then(() => {
    console.log('Connection successful!');
}).catch((err) => {
    console.error('Connection failed ' + err);
});