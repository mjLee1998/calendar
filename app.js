import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
import vote from './vote.js';
// import axios from './node_modules/axios/lib/axios.js';
class App {
  constructor() {
    new calendar();
    new vote();
  }
}
window.onload = () => {
  getClientIP();
  new App();
};
