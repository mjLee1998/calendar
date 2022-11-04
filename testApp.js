import { calendar } from './testCalender.js';
import axios from 'axios';
import getClientIP from './getClientIp.js';

class App {
    constructor() {
        this.calendar = new calendar();
        // this.getClientIP = new getClientIP();
    }
}

window.onload = () => {
    new App();
};
