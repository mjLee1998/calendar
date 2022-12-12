const io = require('socket.io')();

// Keep track of the votes for each option
const votes = {
  option1: 0,
  option2: 0,
  option3: 0,
};

io.on('connection', (socket) => {
  // Send the current vote counts to the client when they connect
  socket.emit('votes', votes);

  // Listen for vote events from the client
  socket.on('vote', (option) => {
    // Update the vote counts
    votes[option]++;

    // Send the updated vote counts to all connected clients
    io.sockets.emit('votes', votes);
  });
});

const port = 8000;
io.listen(port);
console.log('Listening on port', port);
