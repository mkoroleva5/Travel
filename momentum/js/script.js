// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = new Date().toLocaleDateString('en-US', options);

function showDate() {
    date.textContent = currentDate;
    setTimeout(showDate, 1000);
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}

// 2. Greeting

const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const city = document.querySelector('.city');
const hours = new Date().getHours();

function getTimeOfDay() {
    if (hours >= 0 && hours < 6) {
        return 'night';
    } else if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours <= 23) {
        return 'evening';
    }
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;

function showGreeting() {
    greeting.textContent = greetingText;
    setTimeout(showGreeting, 1000);
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    } 
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

showTime();

// 3. Images slider

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum;
let bgNum;

function getRandomNum() {
    min = Math.ceil(1);
    max = Math.floor(21);
    randomNum = Math.floor(Math.random() * (max - min)) + min;
}
getRandomNum();

function setBg() {
    bgNum = String(randomNum).padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    }
}
setBg();

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        while (randomNum <= 20) {
            randomNum--;
            break
        }
    }
    setBg();
}

function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
    } else {
        while (randomNum <= 20) {
            randomNum++;
            break
        }
    }
    setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

city.value = 'Minsk';

async function getWeather() {  
    getLocalStorage();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=858cc72675d07ef302efd48f4b4f104d&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = 'Wind speed: ' + Math.round(data.wind.speed) + ' m/s';
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
  }
  getWeather();

city.addEventListener('change', () => {
    setLocalStorage();
    getWeather();
});