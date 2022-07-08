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