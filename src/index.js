let express = require("express");
let app = express();
let server = require("http").createServer(app).listen(3000);
let io = require("socket.io").listen(server);

app.get('/', (req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});
app.get('/styleEnter.css', (req,resp) => {
    resp.sendFile(__dirname + "/styleEnter.css");
});
app.get('/enter.html', (req,resp) => {
    resp.sendFile(__dirname + "/enter.html");
});
app.get('/style.css', (req,resp) => {
    resp.sendFile(__dirname + "/style.css");
});

let users = {
    count: 0
};
let connections = [];

console.log('***************');
console.log('Сервер запущен.');
console.log('***************');

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    let address = socket.handshake.address;

    console.log("Успешное соединение "+address);

    users.count++;
    io.sockets.emit('new_connect', [users.count,address]);

    socket.on('disconnect', function(data) {
        console.log("Отключено "+address);
        connections.splice(connections.indexOf(socket), 1);
        users.count = users.count-1;
        io.sockets.emit('new_connect', [users.count,address]);
    });

    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {
            mess: data.mess,
            name: data.name,
            time: data.time
        });
    });
});
