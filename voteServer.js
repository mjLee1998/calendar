// Connect to the Socket.io server
const socket = io('http://localhost:3000');

// Listen for votes from the server
socket.on('votes', (votes) => {
  // Update the vote count for each option
  document.getElementById('yes-count').innerHTML = votes.yes;
  document.getElementById('no-count').innerHTML = votes.no;
});

// Listen for clicks on the "Yes" and "No" buttons
document.getElementById('yes').addEventListener('click', () => {
  // Send a "vote" message to the server
  socket.emit('vote', 'yes');
});

document.getElementById('no').addEventListener('click', () => {
  // Send a "vote" message to the server
  socket.emit('vote', 'no');
});
