const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 3000;

let votes = { red: 0, blue: 0, green: 0 };

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit('votes', votes);
  socket.on('vote', (vote) => {
    votes[vote]++;
    io.emit('votes', votes);
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));

app.use(express.static(path.join(__dirname, 'src')));
