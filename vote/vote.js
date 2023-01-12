const socket = io();

// 투표 이벤트
function vote(vote) {
  socket.emit('vote', vote);
}

// 투표 결과 수신 이벤트
socket.on('vote', (data) => {
  // 투표 결과를 HTML 문서에 표시
  const voteList = document.getElementById('vote-list');
  voteList.innerHTML = ''; // 기존 데이터 삭제

  data.forEach((client) => {
    const item = document.createElement('li');
    item.innerHTML = `${client.vote}: ${client.vote}표`;
    voteList.appendChild(item);
  });
});
