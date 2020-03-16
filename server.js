const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require("./router");
const cors = require("cors");

class client {
  constructor(id) {
    this.id = id;
  }
  static onConnect(socket) {
    console.log("New Connection!");
  }
}
app.use(cors());
app.use(router);

io.on("connection", function(socket) {
  client.onConnect(socket);
  socket.on("delete", data => {
    console.log("delete");
    socket.broadcast.emit("delete", data);
  });
  socket.on("add", data => {
    socket.broadcast.emit("add", data);
  });
});

server.listen(8080, function() {
  console.log("server running on 8080");
});
