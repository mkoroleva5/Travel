// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = new Date().toLocaleDateString('en-US', options);

function showDate() {
    date.textContent = currentDate;
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    setTimeout(showTime, 1000);
}

setInterval(() => {
    setBg();
    showDate();
    showGreeting();
    getTimeOfDay();
}
    , 1000);

showTime();
showDate();

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
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) name.value = localStorage.getItem('name');
    if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

showGreeting();

// 3. Images slider

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum;
let bgNum;

function getRandomNum() {
    let min = Math.ceil(1);
    let max = Math.floor(21);
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
            break;
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
            break;
        }
    }
    setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// 4. Weather

const weather = document.querySelector('.weather');
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
    if (res.status !== 200) {
        alert('Enter your city')
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = 'Wind speed: ' + Math.round(data.wind.speed) + ' m/s';
        humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    }
}
getWeather();
setInterval(getWeather, 60000);

city.addEventListener('change', () => {
    setLocalStorage();
    getWeather();
});



// 5. Quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote')

let random;
function getRandom() {
    let min = Math.ceil(1);
    let max = Math.floor(1500);
    return random = Math.floor(Math.random() * (max - min)) + min;
} 

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    getRandom();
    quote.textContent = `"` + data[random].text +`"`;
    author.textContent = data[random].author;
  }
  getQuotes();

  changeQuoteButton.addEventListener('click', getQuotes);

// 6. Audio Player

const player = document.querySelector('.player');
const audio = document.querySelector('audio');
const playPrevButton = document.querySelector('.play-prev');
const playButton = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
let isPlay = false;

import playList from './playList.js';

function playAudio() {
  audio.currentTime = 0;
  audio.src = playList[playNum].src;
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

playButton.addEventListener('click', () => {
    if (!isPlay) {
        playAudio();
        isPlay = true;
        playButton.classList.add('pause');
        playItem[playNum].classList.add('item-active');
    } else if (isPlay) {
        pauseAudio();
        isPlay = false;
        playButton.classList.remove('pause');
        playItem[playNum].classList.remove('item-active');
    }
});

let playNum = 0;
function playNext() {
    if (playNum === 3) {
        playNum = 0;
        playItem[0].classList.add('item-active')
        playItem[3].classList.remove('item-active')
    } else {
        while (playNum <= 3) {
            playNum++;
            playItem[playNum].classList.add('item-active')
            playItem[playNum-1].classList.remove('item-active')
            break;
        }
    }
    playAudio();
    isPlay = true;
    playButton.classList.add('pause');
}

function playPrev() {
    if (playNum === 0) {
        playNum = 3;
        playItem[3].classList.add('item-active')
        playItem[0].classList.remove('item-active')
    } else {
        while (playNum <= 3) {
            playNum--;
            playItem[playNum].classList.add('item-active')
            playItem[playNum+1].classList.remove('item-active')
            break;
        }
    }
    playAudio();
    isPlay = true;
    playButton.classList.add('pause');
}

playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');

playList.forEach((el, i) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    playListContainer.append(li);
    li.textContent = playList[i].title;
});

const playItem = document.querySelectorAll('.play-item');

// 8. Translation
/*
const greetingTranslation = {
    en: '',
    ru: ''
}
*/

// 10. Settings

const settingsIcon = document.querySelector('.settings-icon');
const settings = document.querySelector('.settings')

settingsIcon.addEventListener('click', () =>{
    settingsIcon.classList.toggle('rotate');
    settings.classList.toggle('visible');
});

const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

const settingsItems = document.querySelectorAll('.settings-item');
const checkboxIcon = document.querySelectorAll('.checkbox-icon');

for (let i=0; i<settingsItems.length; i++) {
    settingsItems[i].addEventListener('click', () => {
        checkboxIcon[i].classList.toggle('open');
        checkboxIcon[i].classList.toggle('closed');
        if (i === 0) {
            time.classList.toggle('invisible');
            time.style.transition = '0.5s';
        } else if (i === 1) {
            date.classList.toggle('invisible');
            date.style.transition = '0.5s';
        } else if (i === 2) {
            greeting.classList.toggle('invisible');
            name.classList.toggle('invisible');
            greeting.style.transition = '0.5s';
            name.style.transition = '0.5s';
        } else if (i === 3) {
            quote.classList.toggle('invisible');
            author.classList.toggle('invisible');
            changeQuoteButton.classList.toggle('invisible');
            quote.style.transition = '0.5s';
            author.style.transition = '0.5s';
            changeQuoteButton.style.transition = '0.5s';
        } else if (i === 4) {
            weather.classList.toggle('invisible');
            weather.style.transition = '0.5s';
        } else if (i === 5) {
           player.classList.toggle('invisible');
           player.style.transition = '0.5s';
        }    
        
    })
}

/*function setLocalStorageSettings() {
    settingsItems[0].addEventListener('change', () => {
        if(settingsItems[0].checked) {
            localStorage.setItem('show-time', settingsItems[0].value='on');
        } else {
            localStorage.setItem('show-time', settingsItems[0].value='off');
        }
    })
}

function getLocalStorageSettings() {
    if (localStorage.getItem('show-time') === 'off') {
        time.classList.add('invisible');
        checkboxIcon[0].classList.remove('open');
        checkboxIcon[0].classList.add('closed');
    } else {
        time.classList.remove('invisible');
        checkboxIcon[0].classList.add('open');
        checkboxIcon[0].classList.remove('closed');
    }
}

window.addEventListener('beforeunload', setLocalStorageSettings);
window.addEventListener('load', getLocalStorageSettings);
*/


