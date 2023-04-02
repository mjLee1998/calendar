import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
class App {
  constructor() {
    new calendar();
    // getClientIP();
  }
}
window.onload = () => {
  new App();
};
