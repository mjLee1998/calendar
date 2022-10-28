import { getToday } from './getToday.js';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const now = new getToday(year, month, date);
console.log(now.year, now.month, now.date);

// 해당 달의 일 수 구하기
var lastDay;
if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
) {
    var lastDay = 31;
} else if (month != 2) {
    var lastDay = 30;
} else {
    if (year % 4 == 0) {
        var lastDay = 29;
    } else {
        var lastDay = 28;
    }
}
// console.log(lastDay);

// 오늘의 요일 구하기
const WeekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let Week = WeekDay[today.getDay()];
// console.log(Week);

// 이번 달 1일의 요일 구하기
const firstDay = new Date(year, month - 1, 1);
var w = firstDay.getDay();
const firstDayWeek = WeekDay[firstDay.getDay()];
// console.log(firstDayWeek);

// 달력 채우기
var x = w;
function fillCalendar(x) {
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
        console.log(getDay[0]);
        getDay[0].innerHTML = i;
    }
}
fillCalendar(x);
