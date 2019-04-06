var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(7777);

app.get('/', (req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});