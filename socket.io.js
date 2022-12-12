// Initialize the Socket.io instance
const io = require('socket.io')();

// Listen for incoming connections from clients
io.on('connection', (client) => {
  // Listen for client messages
  client.on('vote', (vote) => {
    // Increment the votes for the selected option
    votes[vote] += 1;

    // Send the updated votes to all clients
    io.emit('votes', votes);
  });
});

// Start the Socket.io server on port 3000
io.listen(3000);
