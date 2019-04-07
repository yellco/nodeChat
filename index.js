var express = require("express");
var app = express();
var server = require("http").createServer(app).listen(3000);
var io = require("socket.io").listen(server);

app.get('/', (req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});
app.get('/style.css', (req,resp) => {
    resp.sendFile(__dirname + "/style.css");
});
app.get('/enter.html', (req,resp) => {
    resp.sendFile(__dirname + "/enter.html");
});

var users = {
    count: 0
};
connections = [];

io.sockets.on('connection', function(socket){
    connections.push(socket);
    var address = socket.handshake.address;

    console.log("Успешное соединение "+address);

    users.count++;
    io.sockets.emit('new_connect', [users.count,address]);
    
    socket.on('disconnect', function(data){
        console.log("Отключено "+address);
        connections.splice(connections.indexOf(socket), 1);
        users.count = users.count-1;
        io.sockets.emit('new_connect', [users.count,address]);
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {
            mess: data.mess, 
            name: data.name,
            time: data.time
        });
    });
});
