import { calendar } from './testCalender.js';

class App {
    constructor() {
        this.calendar = new calendar();
    }
}

window.onload = () => {
    new App();
};
