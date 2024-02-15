const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

const port = 5000;

app.get('/',(req,res) => {
    // res.send("Hello");
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    console.log('New User connected!');
    // Event listener for sendName event
    socket.on('sendName',(username) => {
        console.log(username);
        io.emit('sendName',username);
    });
    // Event listener for sendMessage event
    socket.on('sendMessage',(chatMsg) => {
        console.log(chatMsg);
        io.emit('sendMessage',chatMsg);
    })
});

server.listen(port, () => {
    console.log('Server listening at the port:',port);
});