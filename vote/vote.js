const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const vote = new FormData(form).get('vote');
  socket.emit('vote', vote);
});

const socket = io();

socket.on('results', (data) => {
  const results = document.querySelector('#results');
  results.innerHTML = '';
  for (const [option, count] of Object.entries(data)) {
    const p = document.createElement('p');
    p.innerHTML = `${option}: ${count}`;
    results.appendChild(p);
  }
});
