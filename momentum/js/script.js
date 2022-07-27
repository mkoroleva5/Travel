// 1. Clock and calendar

const time = document.querySelector('.time');

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    setTimeout(showTime, showDate, 1000);
}
showTime();

const date = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = new Date().toLocaleDateString('en-US', options);

function showDate() {
    date.textContent = currentDate;
}
showDate();


