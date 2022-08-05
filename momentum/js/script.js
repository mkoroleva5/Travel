const en = ['Enter your city', 'Wind speed', 'm/s', 'Humidity', 'Where are you?', 'What\'s your name?'];
const ru = ['Введите Ваш город', 'Скорость ветра', 'м/с', 'Влажность', 'Где Вы?', 'Как Вас зовут?'];
let language = en;

// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function showDate() {
    let currentDate;
    if (language === en) currentDate = new Date().toLocaleDateString('en-US', options);
    if (language === ru) currentDate = new Date().toLocaleDateString('ru-RU', options);
    date.textContent = currentDate;
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    setTimeout(showTime, 1000);
}

setInterval(setBg, 1000);
setInterval(showDate, 1000);
setInterval(showGreeting, 1000);
setInterval(getTimeOfDay, 1000);

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
let greetingText = `Good ${timeOfDay}`;

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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=858cc72675d07ef302efd48f4b4f104d&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    if (res.status !== 200) {
        alert(language[0])
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = language[1] + ': ' + Math.round(data.wind.speed) + ' ' + language[2];
        humidity.textContent = language[3] + ': ' + data.main.humidity + '%';
    }
   
}
/*getWeather();
setInterval(getWeather, 30000);*/

city.addEventListener('change', () => {
    setLocalStorage();
    getWeather();
});

console.log()

// 5. Quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote')

let random;
function getRandom() {
    let min = Math.ceil(1);
    let max;
    if (language === en) max = Math.floor(1500);
    if (language === ru) max = Math.floor(30);
    return random = Math.floor(Math.random() * (max - min)) + min;
} 

async function getQuotes() {  
    let quotes;
    if (language === en) quotes = 'data.json';
    if (language === ru) quotes = 'dataRU.json';
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
const trackName = document.querySelector('.track-name');
let isPlay = false;

import playList from '../js/playList.js';

function playAudio() {
  audio.currentTime = 0;
  audio.src = playList[playNum].src;
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

audio.addEventListener('ended', () => {
    playNext();
});

function playTrack() {
    if (!isPlay) {
        playAudio();
        isPlay = true;
        playButton.classList.add('pause');
        playItem[playNum].classList.add('item-active');
        trackName.innerHTML = `${playItem[playNum].textContent}`;
        trackLength.textContent = `${playList[playNum].duration}`;
    } else if (isPlay) {
        pauseAudio();
        isPlay = false;
        playButton.classList.remove('pause');
        playItem[playNum].classList.remove('item-active');
        trackName.innerHTML = '';
        trackLength.textContent = `00:00`;
    }
}
playButton.addEventListener('click', playTrack);


let playNum = 0;
function playNext() {
    if (playNum === 3) {
        playNum = 0;
        playItem[0].classList.add('item-active');
        playItem[3].classList.remove('item-active');
        trackName.innerHTML = `${playItem[playNum].textContent}`;
        trackLength.textContent = `${playList[playNum].duration}`;
    } else {
        while (playNum <= 3) {
            playNum++;
            playItem[playNum].classList.add('item-active');
            playItem[playNum-1].classList.remove('item-active');
            trackName.innerHTML = `${playItem[playNum].textContent}`;
            trackLength.textContent = `${playList[playNum].duration}`;
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
        playItem[3].classList.add('item-active');
        playItem[0].classList.remove('item-active');
        trackName.innerHTML = `${playItem[playNum].textContent}`;
        trackLength.textContent = `${playList[playNum].duration}`;
    } else {
        while (playNum <= 3) {
            playNum--;
            playItem[playNum].classList.add('item-active');
            playItem[playNum+1].classList.remove('item-active');
            trackName.innerHTML = `${playItem[playNum].textContent}`;
            trackLength.textContent = `${playList[playNum].duration}`;
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

// 7*. Advanced audio player

// 7.1. Volume

const muteButton = document.querySelector('.mute-button');
const volume = document.querySelector('.volume');
const volumePercentage = document.querySelector('.volume-percentage');

muteButton.addEventListener('click', () => {
    muteButton.classList.toggle('muted');
    if (audio.muted === false) audio.muted = true;
    else audio.muted = false;
});

function setVolume() {
    localStorage.setItem('volume-bar', volumePercentage.style.width);
    localStorage.setItem('volume', audio.volume);
}

function getVolume() {
    if (localStorage.getItem('volume-bar')) volumePercentage.style.width = localStorage.getItem('volume-bar');
    if (localStorage.getItem('volume')) audio.volume = localStorage.getItem('volume');
}

window.addEventListener('beforeunload', setVolume);
window.addEventListener('load', getVolume);

async function changeVolume() {
    const res = await getVolume();
    
    volume.style.opacity = '1';
    
    volume.addEventListener('click', e => {
        const sliderWidth = window.getComputedStyle(volume).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        volumePercentage.style.width = newVolume * 100 + '%';
      }, false)
}

changeVolume();

// 7.2. Change track by clicking on track name

const playItem = document.querySelectorAll('.play-item');

playItem.forEach((el, i) => {
    playItem[i].addEventListener('click', () => {
        if (isPlay && playNum == i) {
            playTrack();
        } else {
            playNum = i
            playTrack();
            if(!isPlay) {
                playItem[0].classList.remove('item-active');
                playItem[1].classList.remove('item-active');
                playItem[2].classList.remove('item-active');
                playItem[3].classList.remove('item-active');
                playNum = i
                playTrack();
            }
        }
    })
})

// 7.3. Progress bar

const timeline = document.querySelector('.timeline');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current');
const trackLength = document.querySelector('.length');

timeline.addEventListener('click', e => {
    if (isPlay) {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek; 
    } 
}, false);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `0${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:0${minutes}:${String(
            seconds % 60
    ).padStart(2, 0)}`;
}

setInterval(() => {
    if (isPlay) {
        progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
        currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    } else {
        progressBar.style.width = '0%';
        audio.currentTime = 0;
        currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    }
}, 100);

// 8. Translation

function getTimeOfDayRu() {
    if (hours >= 0 && hours < 6) {
        return 'Доброй ночи,';
    } else if (hours >= 6 && hours < 12) {
        return 'Доброе утро,';
    } else if (hours >= 12 && hours < 18) {
        return 'Добрый день,';
    } else if (hours >= 18 && hours <= 23) {
        return 'Добрый вечер,';
    }
}
getTimeOfDayRu();
const timeOfDayRu = getTimeOfDayRu();

const greetingTranslation = {
    en: `Good ${timeOfDay}`,
    ru: `${timeOfDayRu}`,
};


// 10. Settings


// 10.1. Show settings

const settingsIcon = document.querySelector('.settings-icon');
const settings = document.querySelector('.settings-wrapper')

settingsIcon.addEventListener('click', () =>{
    settingsIcon.classList.toggle('rotate');
    settings.classList.toggle('invisible');
    settings.classList.toggle('visible');
});

document.addEventListener('click', (event) => {
    if (!event.composedPath().includes(settings) && !event.composedPath().includes(settingsIcon)) {
        settings.classList.add('invisible');
        settings.classList.remove('visible');
    }
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

// 10.2. Language settings

const buttonEN = document.querySelector('.button-en');
const buttonRU = document.querySelector('.button-ru');
const showTitle = document.querySelector('.show-title');
const languageTitle = document.querySelector('.language-title');

buttonEN.addEventListener('click', () => {
    language = en;
    buttonEN.classList.add('button-selected');
    buttonRU.classList.remove('button-selected');
    greetingText = greetingTranslation.en;
    city.value = 'Minsk';
    name.placeholder = 'What\'s your name?';
    city.placeholder = 'Where are you?';
    getQuotes();
    showTitle.textContent = 'Show';
    languageTitle.textContent = 'Language';
});

buttonRU.addEventListener('click', () => {
    language = ru;
    buttonRU.classList.add('button-selected');
    buttonEN.classList.remove('button-selected');
    greetingText = greetingTranslation.ru;
    city.value = 'Минск';
    name.placeholder = 'Как Вас зовут?';
    city.placeholder = 'Где Вы?';
    getQuotes();
    showTitle.textContent = 'Показывать';
    languageTitle.textContent = 'Язык';
});



