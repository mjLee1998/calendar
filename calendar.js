import { getToday } from './getToday.js';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const now = new getToday(year, month, date);
console.log(now.year, now.month, now.date);
