const express = require('express');
const app = express();
const md5 = require('md5');
let db = require('./database');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 8000;

// root endpoint
app.get('/',(req,res) => {
    res.json({"message": "OK"});
})

// get all users
app.get('/api/users',(req,res) => {
    var sql = "select * from user";
    var params = [];
    db.all(sql,params,(err,rows) => {
        if(err){
            res.status(400).json({"error":err.message})
        }
        res.json({
            "message": "Success",
            "data": rows
        });
    });
});

// get an user by id
app.get('/api/users/:id',(req,res) => {
    var sql = "select * from user where id = ?";
    var params = [req.params.id];
    db.all(sql,params,(err,row) => {
        if(err){
            res.status(400).json({"error":err.message})
        }
        res.json({
            "message": "Success",
            "data": row
        });
    });
});

// thunder client
// http://localhost:8000/api/users
// headers
// Content-Type : "application/json"
// body
/*
    {
        "name": "abhijith",
        "email": "a.chowdary@zensar.com",
        "password": "Abhijith@143"
    }
*/
// create a new user
app.post('/api/users',(req,res) => {
    var errors = [];
    if(!req.body.password){
        errors.push("No password specified!")
    }
    if(!req.body.email){
        errors.push("No email specified!")
    }
    if(errors.length){
        res.status(400).json({"error":errors.json(",")});
        return;
    }
    var data = {
        name:req.body.name,
        email:req.body.email,
        password:md5(req.body.password)
    }
    var sql = "INSERT INTO user(name,email,password) VALUES(?,?,?)";
    var params = [data.name,data.email,data.password];
    db.run(sql,params,(function(err,result){
        if(err){
            res.status(400).json({"error":err.message});
        }else{
            res.json({
                "message":"Success",
                "data":data,
                "id":this.lastID
            })
        }
    }))
});

// thunder client
// http://localhost:8000/api/users/id
// headers
// Content-Type : "application/json"
// body
/*
    {
        "name": "abhijith",
        "email": "a.chowdary@zensar.com",
        "password": "Abhijith@143"
    }
*/
// update an existing user by id
app.put('/api/users/:id',(req,res) => {
    var data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password ? md5(req.body.password) : null
    }
    var sql = `UPDATE user SET 
                name = COALESCE(?,name),
                email = COALESCE(?,email),
                password = COALESCE(?,password)
                WHERE id = ?`;
    var params = [data.name,data.email,data.password,req.params.id];
    db.run(sql,params,(function(err,result){
        if(err){
            res.status(400).json({"error":err.message});
        }else{
            res.json({
                "message":"Success",
                "data":data,
                "changes":this.changes
            })
        }
    }))
});

// delete an user by id
app.delete('/api/users/:id',(req,res) => {
    var sql = "delete from user where id = ?";
    var params = [req.params.id];
    db.run(sql,params,(err,row) => {
        if(err){
            res.status(400).json({"error":err.message})
        }
        res.json({
            "message": "Deleted",
            "changes": this.changes
        });
    });
});

app.listen(port, () => {
    console.log('Server running at port: ' + port);
})