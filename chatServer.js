var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); // socket 객체 : io
// 해당 서버를 소켓 서버임을 설정

// 클라이언트가 최초 접속 시 보여지는 화면
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// 서버 실행
http.listen(3000, function () {
  console.log('server listening on port : 3000');
});

// connection을 수립하고, callback 인자로 socket을 받음
io.on('connection', function (socket) {
  // 연결이 성공했을 경우 실행됨

  socket.on('disconnect', function () {
    // 클라이언트의 연결이 끊어졌을 경우 실행됨
  });
});
[
  { _id: 'room01', members: ['zero_id', 'aero_id'] },
  { _id: 'room02', members: ['nero_id', 'hero_id'] },
];
