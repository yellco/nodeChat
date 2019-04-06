var express = require("express");
var app = express();
var server = require("http").createServer(app).listen(7777);
var io = require("socket.io").listen(server);

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'test-chat',
//   port: '7777'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });

// // connection.connect(function(err) {
// //     if (err) {
// //       console.error('error connecting: ' + err.stack);
// //       return;
// //     }
  
// //     console.log('connected as id ' + connection.threadId);
// // });
 
// connection.end();

app.get('/', (req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});
app.get('/style.css', (req,resp) => {
    resp.sendFile(__dirname + "/style.css");
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
