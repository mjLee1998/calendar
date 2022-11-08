import * as jquery from './jquery.js';

export class calendar {
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
        const nowMonth = document.querySelector('select :nth-child(' + month + ')');
        nowMonth.setAttribute('selected', 'selected');

        // 달력 채우기
        // 달을 바꿀 때마다 자동으로 채워주기 위해서 select에 onchange를 걸어서 value를 여기로 보내서 처리
        function fillCalendar(mV) {
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

            // 마지막 주(6번째 주)가 비어있다면 안보이게 하기
            const twentynine = document.querySelector('.d36');
            if (twentynine.innerHTML == '') {
                document.querySelector('.sixthWeek').style.display = 'none';
            } else {
                document.querySelector('.sixthWeek').style.display = 'contents';
            }
        }

        // 페이지 시작하면 이번 달을 기준으로 달력을 채움
        window.onload = fillCalendar(nowMonth.value);

        // 다른 달을 선택하면 바꿔주기
        const selectedMonth = document.querySelector('#selectMonth');
        selectedMonth.onchange = () => {
            // 지금 달력 다 지우기
            var everyDay = document.querySelectorAll('td');
            // console.log(everyDay);
            var i;
            for (i = 0; i < 42; i++) {
                everyDay[i].innerHTML = '';
            }
            //다시 채우기
            fillCalendar(selectedMonth.value);
        };

        // 달 이동하기 버튼

        // 저번 달
        const prevClick = document.querySelector('#previousMonth');
        prevClick.onclick = () => {
            var everyDay = document.querySelectorAll('td');
            var i;
            for (i = 0; i < 42; i++) {
                everyDay[i].innerHTML = '';
            }
            if (selectedMonth.value == 1) {
                fillCalendar(12);
            } else {
                fillCalendar(selectedMonth.value - 1);
            }
            var prevMonth;
            if (selectedMonth.value == 1) {
                prevMonth = document.querySelector('#M12');
            } else {
                prevMonth = document.querySelector('#M' + (selectedMonth.value - 1));
            }
            $('option:selected').removeAttr('selected');
            // DOM요소가 아닌 것에 setAttr을 사용하면 오류가 발생한다.
            prevMonth.setAttribute('selected', 'selected');
        };

        // 다음 달
        const nextClick = document.querySelector('#nextMonth');
        nextClick.onclick = () => {
            var everyDay = document.querySelectorAll('td');
            var i;
            for (i = 0; i < 42; i++) {
                everyDay[i].innerHTML = '';
            }
            if (selectedMonth.value == 12) {
                fillCalendar(1);
            } else {
                fillCalendar(parseInt(selectedMonth.value) + 1);
            }
            var nextMonth;
            if (selectedMonth.value == 12) {
                nextMonth = document.querySelector('#M1');
            } else {
                // +연산자를 사용했을 때, 오류가 생기면 typeof를 사용해서 값이 number인지 string인지 확인하기
                // -연산자의 경우에는 string이어도 ''안이 숫자로만 이루어져 있으면 number로 인식
                nextMonth = document.querySelector('#M' + (parseInt(selectedMonth.value) + 1));
            }
            $('option:selected').removeAttr('selected');
            nextMonth.setAttribute('selected', 'selected');
        };

        // 현재
        const nowClick = document.querySelector('#goToNow');
        nowClick.onclick = () => {
            fillCalendar(nowMonth.value);
            $('option:selected').removeAttr('selected');
            nowMonth.setAttribute('selected', 'selected');
        };
    }
}
