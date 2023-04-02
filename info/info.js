window.onload = function () {
  const searchParams = new URLSearchParams(location.search);
  for (const param of searchParams) {
    for (i = 1; i <= 12; i++) {
      for (j = 1; j <= 31; j++) {
        if (param[0] == i + '_' + j) {
          var mV = i;
          var dayValue = j;
        }
      }
    }
  }
  console.log(mV);
  console.log(dayValue);
  localStorage.setItem('month', mV);
  localStorage.setItem('day', dayValue);

  var month = document.querySelector('.month');
  var day = document.querySelector('.day');

  month.innerHTML = mV + '월';
  day.innerHTML = dayValue + '일';
};
