const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 웹 서버 구동
server.listen(3000, () => {
  console.log('Server started on port 3000');
});

// 접속한 클라이언트를 저장할 배열
const clients = [];

// socket.io 설정
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // 클라이언트 접속 시
  socket.on('vote', (data) => {
    // 접속한 클라이언트 배열에 추가
    clients.push({
      id: socket.id,
      vote: data,
    });

    // 접속한 모든 클라이언트에게 투표 결과 전송
    io.emit('vote', clients);
  });

  // 클라이언트 접속 해제 시
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // 접속 해제한 클라이언트를 배열에서 제거
    clients.forEach((client, index) => {
      if (client.id === socket.id) {
        clients.splice(index, 1);
      }
    });

    // 접속한 모든 클라이언트에게 투표 결과 전송
    io.emit('vote', clients);
  });
});
