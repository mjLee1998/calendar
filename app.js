<<<<<<< HEAD
import { calendar } from './calendar.js';
import { getClientIP } from './getClientIp.js';
=======
import calendar from './calendar.js';
import getClientIP from './getClientIp.js';
>>>>>>> 9d6c00e496617dc2baa0d7d9709d0a5337cb2328
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
