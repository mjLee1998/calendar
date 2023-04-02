import * as jquery from './jquery.js';

export default class calendar {
  constructor() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    console.log(year, month, date);
    // 해당 달의 일 수 구하기
    var lastDay;

    // 오늘의 요일 구하기
    const WeekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let Week = WeekDay[today.getDay()];
    // console.log(Week);
    // 이번 달 1일의 요일 구하기
    // const firstDay = new Date(year, month - 1, 1);
    // var w = firstDay.getDay();
    // const firstDayWeek = WeekDay[firstDay.getDay()];
    // console.log(firstDayWeek);

    // 현재 해당하는 달로 이동하기
    if (!localStorage.getItem('month')) {
      document
        .querySelector('select :nth-child(' + month + ')')
        .setAttribute('selected', 'selected');
    } else {
      document
        .querySelector('select :nth-child(' + localStorage.getItem('month') + ')')
        .setAttribute('selected', 'selected');
    }

    // 달력 채우기
    // 달을 바꿀 때마다 자동으로 채워주기 위해서 select에 onchange를 걸어서 value를 여기로 보내서 처리
    function fillCalendar(mV) {
      // 지금 달력 다 지우기
      var everyDay = document.querySelectorAll('td');
      var i;
      for (i = 0; i < 42; i++) {
        everyDay[i].innerHTML = '';
      }

      // select month
      for (i = 1; i <= 12; i++) {
        document.querySelector('select :nth-child(' + i + ')').removeAttribute('selected');
        // console.log(document.querySelector('select :nth-child(' + i + ')'));
      }
      $('#selectMonth').val(mV).prop('selected', true);
      const firstDay = new Date(year, mV - 1, 1);
      var w = firstDay.getDay();
      const firstDayWeek = WeekDay[firstDay.getDay()];
      var x = w;
      if (mV == 1 || mV == 3 || mV == 5 || mV == 7 || mV == 8 || mV == 10 || mV == 12) {
        var lastDay = 31;
      } else if (mV != 2) {
        var lastDay = 30;
      } else {
        if (year % 4 == 0) {
          var lastDay = 29;
        } else {
          var lastDay = 28;
        }
      }
      for (var i = 1; i <= lastDay; i++) {
        var everyDay = new Date(year, month - 1, i);
        // console.log(everyDay);
        // 요일을 매주 초기화
        w = w % 7;
        w++;
        // console.log(w);
        // console.log(WeekDay[w - 1]);
        //매일매일에 일 채워넣기
        var getDay = document.querySelectorAll('.d' + (i + x));
        // console.log(getDay[0]);
        getDay[0].innerHTML = i;
      }

      // 매일매일에 Attr 부여해서 info페이지로 이동하기
      for (var i = 1; i <= 35; i++) {
        var evd = document.querySelector('.d' + i);
        var DayValue = evd.innerHTML;
        if (DayValue == '') {
          evd.removeAttribute('onclick');
        } else {
          evd.setAttribute(
            'onclick',
            "location.href = './info/info.html" + `?${mV}` + '_' + `${DayValue}` + "'"
          );
        }
        //goToinfo(' + mV + ',' + DayValue + ')'
        var goToinfo = (m, d) => {
          console.log(m, d);
        };
        window.goToinfo = goToinfo;
      }

      // 마지막 주(6번째 주)가 비어있다면 안보이게 하기
      const twentynine = document.querySelector('.d36');
      if (twentynine.innerHTML == '') {
        document.querySelector('.sixthWeek').style.display = 'none';
      } else {
        document.querySelector('.sixthWeek').style.display = 'contents';
      }
    }

    // 다른 달을 선택하면 바꿔주기
    const selectedMonth = document.querySelector('#selectMonth');
    selectedMonth.onchange = () => {
      fillCalendar(selectedMonth.value);
    };

    // 페이지 시작하면 달력을 채움
    if (!localStorage.getItem('month')) {
      fillCalendar(month);
    } else {
      fillCalendar(localStorage.getItem('month'));
      localStorage.removeItem('month');
    }

    // 달 이동하기 버튼

    // 저번 달
    const prevClick = document.querySelector('#previousMonth');
    prevClick.onclick = () => {
      if (selectedMonth.value == 1) {
        fillCalendar(12);
      } else {
        fillCalendar(selectedMonth.value - 1);
      }
      var prevMonth;
      if (parseInt(selectedMonth.value) == 1) {
        prevMonth = document.querySelector('#M12');
      } else {
        prevMonth = document.querySelector('#M' + (selectedMonth.value - 1));
      }
    };

    // 다음 달
    const nextClick = document.querySelector('#nextMonth');
    nextClick.onclick = () => {
      if (parseInt(selectedMonth.value) == 12) {
        fillCalendar(1);
      } else {
        fillCalendar(parseInt(selectedMonth.value) + 1);
      }
      var nextMonth;
      if (parseInt(selectedMonth.value) == 12) {
        nextMonth = document.querySelector('#M1');
      } else {
        // +연산자를 사용했을 때, 오류가 생기면 typeof를 사용해서 값이 number인지 string인지 확인하기
        // -연산자의 경우에는 string이어도 ''안이 숫자로만 이루어져 있으면 number로 인식
        nextMonth = document.querySelector('#M' + (parseInt(selectedMonth.value) + 1));
      }
    };

    // 현재
    const nowClick = document.querySelector('#goToNow');
    nowClick.onclick = () => {
      fillCalendar(month);
    };

    // 뒤로가기 감지
    // 달력에서 날짜를 누르면 아까 눌렀던 달로는 안넘어가는 버그가 생김
    // 뒤로가기 이벤트를 감지해서 새로고침을 하여 함수를 제대로 실행
    window.onpageshow = function (event) {
      if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
        // Back Forward Cache로 브라우저가 로딩될 경우 혹은 브라우저 뒤로가기 했을 경우
        // 이벤트 추가하는 곳
        // 새로고침
        // window.location.reload();
        // info.html에서 보내는 달의 값
        var getMV = localStorage.getItem('month');
        // const selectedGetMV = document.querySelector('select :nth-child(' + getMV + ')');
        // fillCalendar(getMV);
      }
    };
  }
}
