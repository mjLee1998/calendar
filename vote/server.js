const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

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

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
