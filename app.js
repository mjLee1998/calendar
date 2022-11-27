import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
import vote from './vote.js';
class App {
  constructor() {
    new calendar();
    // new vote();
  }
}
window.onload = () => {
  getClientIP();
  new App();
};
