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
    alert('Ваш e-mail: ' + form.email.value + '\n' + 'Ваш пароль: ' + form.password.value);
});    

// Register switch

const registerButton = document.querySelector('.register-button');
const socialButtons = document.querySelector('.pop-up-social-buttons');
const separator = document.querySelector('.pop-up-separator.first');
const forgotPassword = document.querySelector('.forgot-password');
const popUpTitle = document.querySelector('.pop-up-title-p');
const registerText = document.querySelector('.register-p');
const signUpClass = document.querySelector('.register-text');

function switchRegister (socialButtons) {
    socialButtons.classList.toggle('hide')
}

registerButton.addEventListener('click', () => {
    socialButtons.classList.toggle('hide');
    separator.classList.toggle('hide');
    forgotPassword.classList.toggle('hide');
    popupContent.classList.toggle('sign-up-height');

    popUpTitle.classList.toggle('register-text');
    registerButton.classList.toggle('register-text');
    registerText.classList.toggle('register-text');
    signInButton.classList.toggle('register-text');

// Доделать смену текста!!!
    if (!popUpTitle.classList.contains(signUpClass)) {
        popUpTitle.innerHTML = 'Create account';
    }
    if (!registerButton.classList.contains(signUpClass)) {
        registerButton.innerHTML = 'Log in';
    }
    if (!registerText.classList.contains(signUpClass)) {
        registerText.innerHTML = 'Already have an account?';
    }
    if (!signInButton.classList.contains(signUpClass)) {
        signInButton.innerHTML = 'Sign Up';
    }
});
//    popUpTitle.innerHTML = 'Create account';
//    registerButton.innerHTML = 'Log in';
//    registerText.innerHTML = 'Already have an account?';
//    signInButton.innerHTML = 'Sign Up';






