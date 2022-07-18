console.log('1. Вёрстка соответствует макету. Ширина экрана 390px +48\n- блок <header> +6\n- секция preview +9\n- секция steps +9\n- секция destinations +9\n- секция stories +9\n- блок <footer> +6\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n- нет полосы прокрутки при ширине страницы от 1440рх до 390px +7\n- нет полосы прокрутки при ширине страницы от 390px до 320рх +8\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22\n- при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2\n- адаптивное меню соответствует макету +4\n- при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)\n- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4')

// Menu 

const menuItem = document.querySelector('.menu');
const menuActive = document.querySelector('.nav');
const menuClose = document.querySelector('.close-button');
const menuLinks = document.querySelectorAll('.nav-link');
const dark = document.querySelector('.dark');

menuItem.addEventListener('click', () => {
    menuActive.classList.add('nav-active');
    dark.style.display = 'block';
});

menuClose.addEventListener('click', () => {
    menuActive.classList.remove('nav-active');
    dark.style.display = 'none';
});

if (window.innerWidth < 768) {
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', () => {
            menuActive.classList.remove('nav-active');
            dark.style.display = 'none';
        });
    }
};

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(menuActive) || e.composedPath().includes(menuItem);
    if ( !click ) {
        menuActive.classList.remove('nav-active');
        dark.style.display = 'none';
    }
});

// Login Page

const popup = document.querySelector('.pop-up');
const loginButton = document.getElementById('login');
const accountButton = document.querySelector('.account');
const popUpDark = document.querySelector('.pop-up-dark');
const popupContent = document.querySelector('.pop-up-content');

loginButton.addEventListener('click', () => {
    popup.classList.add('login-active');
    popUpDark.style.display = 'block';
});

popup.addEventListener('click', (event) => {
    const click = event.composedPath().includes(popupContent);
    if ( !click ) {
        popup.classList.remove('login-active');
        popUpDark.style.display = 'none';
    }
});

accountButton.addEventListener('click', () => {
    popup.classList.add('login-active');
    popUpDark.style.display = 'block';
    menuActive.classList.remove('nav-active');
});

// Login Alert

const signInButton = document.querySelector('.sign-in-button');
const form = document.querySelector('.pop-up-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

signInButton.addEventListener('click', () => {
    if (form.email.value == 0 && form.password.value == 0) {
        alert('Вы ничего не ввели :(');
    } else if (form.email.value == 0) {
        alert('Вы не ввели e-mail :(');
    } else if (form.password.value == 0) {
        alert('Вы не ввели пароль :(');
    } else {
        alert('Ваш e-mail: ' + form.email.value + '\n' + 'Ваш пароль: ' + form.password.value);
    }
});    

// Register switch

const registerButton = document.querySelector('.register-button');
const socialButtons = document.querySelector('.pop-up-social-buttons');
const separator = document.querySelector('.pop-up-separator.first');
const forgotPassword = document.querySelector('.forgot-password');
const popUpTitle = document.querySelector('.pop-up-title-p');
const registerText = document.querySelector('.register-p');

registerButton.addEventListener('click', () => {
    socialButtons.classList.toggle('hide');
    separator.classList.toggle('hide');
    forgotPassword.classList.toggle('hide');
    popupContent.classList.toggle('sign-up-height');

    popUpTitle.innerHTML === 'Log in to your account' ? popUpTitle.innerHTML = 'Create account' : popUpTitle.innerHTML = 'Log in to your account';
    registerButton.innerHTML === 'Register' ? registerButton.innerHTML = 'Log in' : registerButton.innerHTML = 'Register';
    registerText.innerHTML === 'Don\'t have an account?' ? registerText.innerHTML = 'Already have an account?' : registerText.innerHTML = 'Don\'t have an account?';
    signInButton.innerHTML === 'Sign In' ? signInButton.innerHTML = 'Sign Up' : signInButton.innerHTML = 'Sign In';
});

// Slider

const slider = document.querySelector('.slider');
const buttonLeft = document.querySelector('.arrow-left');
const buttonRight = document.querySelector('.arrow-right');

const itemLeft = document.querySelector('.slider-left');
const itemRight = document.querySelector('.slider-right');
const itemCenter = document.querySelector('.slider-center');
const image1 = document.querySelector('.left-image');
const image2 = document.querySelector('.center-image');
const image3 = document.querySelector('.right-image');

const moveLeft = () => {
    slider.classList.add('transition-left');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
};

const moveRight = () => {
    slider.classList.add('transition-right');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
};

buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);

slider.addEventListener('animationend', (event) => {

    if (event.animationName === 'move-left') {
        slider.classList.remove('transition-left');

        if (itemLeft.lastChild === image3) {
            itemLeft.innerHTML = '';
            itemLeft.appendChild(image3);
            itemLeft.appendChild(image1);
            itemLeft.appendChild(image2); 
            itemRight.innerHTML = itemCenter.innerHTML;
            itemCenter.innerHTML = itemLeft.innerHTML;
        } else if (itemLeft.lastChild === image2) {
            itemLeft.innerHTML = '';
            itemLeft.appendChild(image2);
            itemLeft.appendChild(image3);
            itemLeft.appendChild(image1); 
            itemRight.innerHTML = itemCenter.innerHTML;
            itemCenter.innerHTML = itemLeft.innerHTML;
        } else if (itemLeft.lastChild === image1) {
            itemLeft.innerHTML = '';
            itemLeft.appendChild(image1);
            itemLeft.appendChild(image2);
            itemLeft.appendChild(image3); 
            itemRight.innerHTML = itemCenter.innerHTML;
            itemCenter.innerHTML = itemLeft.innerHTML;
        }
        
    } else if (event.animationName === 'move-right') {
        slider.classList.remove('transition-right');

        console.log(itemRight.lastChild);

        if (itemRight.lastChild === image3) {
            itemRight.innerHTML = '';
            itemRight.appendChild(image2);
            itemRight.appendChild(image3);
            itemRight.appendChild(image1);   

            itemRight.innerHTML = itemLeft.innerHTML;
            itemCenter.innerHTML = itemRight.innerHTML;

            console.log(3)
        } else if (itemRight.lastChild === image2) {
            itemRight.innerHTML = '';
            itemRight.appendChild(image3);
            itemRight.appendChild(image1);
            itemRight.appendChild(image2);   

            itemRight.innerHTML = itemLeft.innerHTML;
            itemCenter.innerHTML = itemRight.innerHTML;

            console.log(2)
        } else if (itemRight.lastChild === image1) {
            itemLeft.innerHTML = '';
            itemLeft.appendChild(image1);
            itemLeft.appendChild(image2);
            itemLeft.appendChild(image3); 

            itemRight.innerHTML = itemLeft.innerHTML;
            itemCenter.innerHTML = itemRight.innerHTML;

            console.log(1)
        }
    }
    

 /*   for (let i = 0; i < 3; i++) {
        if(itemChanged.lastChild === image1) {
            itemChanged.innerHTML = '';
          itemChanged.appendChild(image2);
          itemChanged.appendChild(image3);
          itemChanged.appendChild(image1);  
        } else if(itemChanged.lastChild === image2) {
            itemChanged.innerHTML = '';
            itemChanged.appendChild(image3); 
            itemChanged.appendChild(image1);
            itemChanged.appendChild(image2); 
        } else if(itemChanged.lastChild === image3) {
            itemChanged.innerHTML = '';
            itemChanged.appendChild(image1);  
            itemChanged.appendChild(image2);
            itemChanged.appendChild(image3);
        } 
    }*/

    buttonLeft.addEventListener('click', moveLeft);
    buttonRight.addEventListener('click', moveRight);
});






