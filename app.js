<<<<<<< HEAD
import { calendar } from './calendar.js';
import { getClientIP } from './getClientIp.js';
=======
import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
>>>>>>> b4514e646ea1c49a6c4e4ba3ba198cb172512016
import vote from './vote.js';
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
