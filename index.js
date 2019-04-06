var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(7777);

app.get('/', (req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log("Успешное соединение");
    connections.push(socket);
    
    socket.on('disconnect', function(data){
        console.log("Отключено");
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {msg: data});
    });
});
