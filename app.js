import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
class App {
  constructor() {
    new calendar();
  }
}
window.onload = () => {
  getClientIP();
  new App();
};
