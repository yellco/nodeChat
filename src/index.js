let express = require("express");
let app = express();
let server = require("http")
  .createServer(app)
  .listen(3000);
let io = require("socket.io").listen(server);

app.get("/chat/", (req, resp) => {
  resp.sendFile(__dirname + "/index.html");
});
app.get("/chat/styleEnter.css", (req, resp) => {
  resp.sendFile(__dirname + "/styleEnter.css");
});
app.get("/chat/enter.html", (req, resp) => {
  resp.sendFile(__dirname + "/enter.html");
});
app.get("/chat/style.css", (req, resp) => {
  resp.sendFile(__dirname + "/style.css");
});

app.get("/chat/stickers/1.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/1.png");
});
app.get("/chat/stickers/2.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/2.png");
});
app.get("/chat/stickers/3.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/3.png");
});
app.get("/chat/stickers/4.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/4.png");
});
app.get("/chat/stickers/5.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/5.png");
});
app.get("/chat/stickers/6.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/6.png");
});
app.get("/chat/stickers/7.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/7.png");
});
app.get("/chat/stickers/8.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/8.png");
});
app.get("/chat/stickers/9.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/9.png");
});
app.get("/chat/stickers/10.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/10.png");
});
app.get("/chat/stickers/11.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/11.png");
});
app.get("/chat/stickers/12.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/12.png");
});
app.get("/chat/stickers/logo.png", (req, resp) => {
  resp.sendFile(__dirname + "/stickers/logo.png");
});

let users = {
  count: 0
};

let messages = [];

let connections = [];

console.log("***************");
console.log("Сервер запущен.");
console.log("***************");

io.sockets.on("connection", function(socket) {
  connections.push(socket);
  let address = socket.handshake.address;

  console.log("Успешное соединение " + address);

  users.count++;
  io.sockets.emit("new_connect", [users.count, messages]);

  socket.on("disconnect", function(data) {
    console.log("Отключено " + address);
    connections.splice(connections.indexOf(socket), 1);
    users.count = users.count - 1;
    io.sockets.emit("disconnect", [users.count, messages]);
  });

  socket.on("send mess", function(data) {
    messages.push({
      mess: data.mess,
      name: data.name,
      time: data.time
    });
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
      time: data.time
    });
  });
  socket.on("images", function(data) {
    messages.push({
      mess: data.mess,
      name: data.name,
      time: data.time
    });
    io.sockets.emit("images", {
      mess: data.mess,
      name: data.name,
      time: data.time
    });
  });

  socket.on("responseData", function(data) {
    io.sockets.emit("responseData", [users.count, messages]);
  });
});
