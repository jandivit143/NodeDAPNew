const express = require('express');
const axios = require('axios');

// connect
require('../db/db');

// model
const Order = require('./order');

const app = express();
const port = 9000;
app.use(express.json());

app.get('/order',(req,res) => {
    Order.find().then((orders) => {
        if(orders.length !== 0){
            res.json(orders);
        }else{
            res.status(404).send('Orders not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    })
});

app.get('/order/:id',(req,res) => {
    Order.findById(req.params.id).then((order) => {
        let orderObject = {
            CustomerName:'',
            BookTitle:'',
            initialDate:''
        };
        if(order){
            // res.json(order);
            // Interservice communication using http call
            axios.get(`http://localhost:3000/book/${order.bookId}`).then((response) => {
                orderObject.BookTitle = response.data.title;
                console.log('orderObject',orderObject);
            });
            axios.get(`http://localhost:5000/customer/${order.customerId}`).then((response) => {
                orderObject.CustomerName = response.data.name;
                console.log('orderObject',orderObject);
                orderObject.initialDate = order.initialDate;
                res.json(orderObject);
            });
        }else{
            res.status(404).send('Order not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.post('/order',(req,res)=> {
    console.log('using spread operator',req.body);
    console.log('not using spread operator',{...req.body});
    const newOrder = new Order({...req.body});
    newOrder.save().then(() => {
        res.send('New order added successfully!')
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.put('/order/:id',(req,res) => {
    Order.updateOne({_id: req.params.id},{$set:{customerId:req.body.customerId, bookId:req.body.bookId,
        initialDate:req.body.initialDate, deliveryDate:req.body.deliveryDate}}).then((order)=>{
            if(order){
                res.send({
                    message:'Order updated successfully!',
                    orderUpdated:order
                })
            }else{
                res.status(404).send('Order not found!');
            }
        }).catch((err) => {
            res.status(500).send('Internal Server Error ' + err);
        });
});

app.delete('/order/:id',(req,res) => {
    Order.findByIdAndDelete(req.params.id).then((order) => {
        if(order){
            res.json('Order deleted successfully!');
        }else{
            res.status(404).send('Order not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.listen(port, () => {
    console.log(`Server up and running at port ${port} - Order Service!`);
})