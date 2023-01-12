const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var option1Votes = 0;
var option2Votes = 0;
var option3Votes = 0;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('vote', (vote) => {
    if (vote == 'option1') {
      option1Votes++;
    } else if (vote == 'option2') {
      option2Votes++;
    } else if (vote == 'option3') {
      option3Votes++;
    }

    io.emit('updateVotes', { option1: option1Votes, option2: option2Votes, option3: option3Votes });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
