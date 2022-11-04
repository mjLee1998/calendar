import { calendar } from './testCalender.js';
import { getClientIP } from './getClientIp.js';

class App {
    constructor() {
        new calendar();
    }
}

window.onload = () => {
    new App();
    getClientIP();
};
