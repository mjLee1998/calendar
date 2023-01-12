const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let results = {
  option1: 0,
  option2: 0,
  option3: 0,
};

io.on('connection', (socket) => {
  socket.emit('results', results);

  socket.on('vote', (vote) => {
    results[vote] += 1;
    io.emit('results', results);
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
