const express = require('express');

// connect
require('../db/db');

// model
const Customer = require('./customer');

const app = express();
const port = 5000;
app.use(express.json());

app.get('/customer',(req,res) => {
    Customer.find().then((customers) => {
        if(customers.length !== 0){
            res.json(customers);
        }else{
            res.status(404).send('Customers not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    })
});

app.get('/customer/:id',(req,res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(customer){
            res.json(customer);
        }else{
            res.status(404).send('Customer not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.post('/customer',(req,res)=> {
    console.log('using spread operator',req.body);
    console.log('not using spread operator',{...req.body});
    const newCustomer = new Customer({...req.body});
    newCustomer.save().then(() => {
        res.send('New customer added successfully!')
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.put('/customer/:id',(req,res) => {
    Customer.updateOne({_id: req.params.id},{$set:{name:req.body.name, age:req.body.age,
        address:req.body.address}}).then((customer)=>{
            if(customer){
                res.send({
                    message:'Customer updated successfully!',
                    customerUpdated:customer
                })
            }else{
                res.send('Customer not found!')
            }
        }).catch((err) => {
            res.status(500).send('Internal Server Error ' + err);
        });
});

app.delete('/customer/:id',(req,res) => {
    Customer.findByIdAndDelete(req.params.id).then((customer) => {
        if(customer){
            res.json('Customer deleted successfully!');
        }else{
            res.status(404).send('Customer not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.listen(port, () => {
    console.log(`Server up and running at port ${port} - Customer Service!`);
})