// visualize 플러그인을 통해  html에 그대로 정의된 data를 바탕으로 그래프를 그린다.
$('#example').visualize({ type: 'bar', width: '420px' }).trigger('visualizeRefresh');

var $opt_item;
var $opt_vote;

// 서버에 접속한다.
app_socket = io.connect('http://zzoon.just4fun.co.kr:10706');

// 서버로부터 'data-changed' 이벤트를 받으면 다음 함수를 실행한다.
// 여기서는 vote값을 받아 해당 항목을 update하고 그래프를 refresh한다.
app_socket.on('data-changed', function (data) {
  console.log('data changed!');
  console.log('index:' + data.index + ' vote : ' + data.vote);

  $opt_arr[data.index].vote = data.vote;
  $opt_arr[data.index].tr_item.innerText = data.vote;

  // visualize refresh
  $('.visualize').trigger('visualizeRefresh');
});

// $opt_arr 은 각 항목의 데이타를 저장하는 배열이다.
// 이 배열의 각 element는 index, vote, tr_item 을 가지는 object를 가리킨다.
// index : click 이벤트가 발생한 버튼의 id를 나타내는 프로퍼티
// vote : 해당 항목의 현재 vote 값을 나타내는 프로퍼티
// tr_item : 해당 항목의 DOM object를 가리키는 프로퍼티
$opt_arr = new Array();

// table안의 tr 태그에 대한 DOM object을 찾는다.
$opt = $('body').find('#example tbody tr');

// each 함수를 통해 각각의 TR item에 해당하는 DOM object를 찾아 여러가지 값을 얻어낸다.
$opt.each(function (i, item) {
  // i 번째 TR item
  $opt_item = $(item);
  // i 번째 TR object에서 TD object를 찾아낸다.
  $opt_find = $opt_item.find('td')[0];
  // 해당 TH항목의 innerText값 ( 여기서는 각 여자연예인 이름이 된다 )
  $opt_name = $opt_item.find('th')[0].innerText;
  // 해당 TD항목의 innerText값 ( 여기서는 vote 값이 된다. )
  $opt_vote = $opt_item.find('td')[0].innerText;

  console.log('Name : ' + $opt_name);
  console.log('votes : ' + $opt_vote);

  // $opt_arr 배열의 i번째에 위에서 찾아낸 값을 가지는 object를 가리키도록 한다.
  $opt_arr[i] = {
    index: i, // index는 click된 버튼의 id와 같고, 동시에 $opt_arr 배열 안에서의 element index이기도 하다.
    tr_item: $opt_find, // 여기서 tr_item은 DOM tree의 object를 직접 가리키고 있음을 명심하자.
    vote: Number($opt_vote), // Number 함수를 사용하였다.
  };
});

// 버튼의 click 이벤트 핸들러
var click_handler = function (event) {
  // click된 버튼의 id와 해당 항목의 vote값을 얻어낸다.
  var clicked_id = event.currentTarget.id;
  var vote_cnt = $opt_arr[clicked_id].vote;
  console.log(clicked_id + ' clicked');
  console.log('vote : ' + vote_cnt);

  // 'data-changed' 이벤트를 서버에 전송한다.
  app_socket.emit('data-changed', {
    index: clicked_id,
    vote: vote_cnt,
  });

  // 서버에 이벤트를 보낸후 현재 자신의 화면을 refresh 해야한다.
  vote_cnt++;
  $opt_arr[clicked_id].vote = vote_cnt;
  $opt_arr[clicked_id].tr_item.innerText = vote_cnt;

  // visualize refresh
  $('.visualize').trigger('visualizeRefresh');
};

// 버튼의 clieck 이벤트에 대한 핸들러 등록
$('button').click(click_handler);
