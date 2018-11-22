//переключение вакансий
let jobs = document.querySelectorAll('.main__job-container');
let barberJob = document.querySelector('.barber-job');
let adminJob = document.querySelector('.admin-job');

barberJob.addEventListener('click', function() {
    jobs[1].classList.remove('main__job-container--active');
    jobs[0].classList.add('main__job-container--active');

    adminJob.classList.remove('job-list__item--active');
    barberJob.classList.add('job-list__item--active');
    
});

adminJob.addEventListener('click', function() {
    jobs[0].classList.remove('main__job-container--active');
    jobs[1].classList.add('main__job-container--active');

    barberJob.classList.remove('job-list__item--active');
    adminJob.classList.add('job-list__item--active');
});

// функция для создания текстовой обёртки вокруг данных 
let pGenerator = function(value) {
    let p = document.createElement('p');
    p.textContent = value;
    return p;
}

// отрисовка контента личного кабинета и кнопки записи
let loggedInUser = localStorage.getItem('_lastUserLoggedIn');
let loggedInUserData = JSON.parse(localStorage.getItem(loggedInUser));

let logInMenu = (function () {
    let loginHi = document.querySelector('.sign-in__log-in');
    let loggedInUserName = pGenerator(loggedInUserData.name);
    loginHi.innerText = `Добро пожаловать,\n` + loggedInUserName.textContent + `!`;
    let mainPage = document.querySelector('.main__page');
    let appointmentButton = mainPage.querySelector('.main__button');
    appointmentButton.style.display = 'block';
})();

// запись на приём. Обработчик висит на onlick в html-разметке
let appoint = function(evt) { 
    let date = document.querySelector('input[name = date]');
    let time = document.querySelector('select[name = time]');
    let service = document.querySelector('select[name = service]');
    let appointment = {};
    appointment.date = date.value;
    appointment.time = time.value;
    appointment.service = service.value;
    loggedInUserData.date.push(appointment); 
    localStorage.setItem(loggedInUser, JSON.stringify(loggedInUserData));
}

// отрисовка крестика в списке 'Мои сеансы'
function renderDeleteAppointment(item) {
    let closeButton = document.createElement('span');
    closeButton.classList.add('small-close');
    closeButton.innerHTML = `&times;`;
    closeButton.onclick = function() {
        item.style.display="none";
    }
    item.appendChild(closeButton);
}

// отрисовка списка и содержимого 'Мои сеансы'
let renderMyAppointments = (function(evt) {
    let personalBlock = document.querySelector('.personal-block');
    let appointmentBlock = document.createElement('div');
    if (loggedInUserData.date.length === 0) {
        appointmentBlock.innerText = `Вы пока никуда не записаны=( \nНужно срочно это исправить!`;
    }
    loggedInUserData.date.forEach((item, index) => {
        let appointmentBox = document.createElement('div');
        appointmentBox.classList.add('appointment-box');
        let appointmentDate = pGenerator(item.date);
        let appointmentTime = pGenerator(item.time);
        let appointmentService = pGenerator(item.service);
        let hr = document.createElement('hr');
        appointmentBox.innerText = `Вы записаны:\n` + appointmentDate.textContent + `\nв ` + appointmentTime.textContent + `\nна ` + appointmentService.textContent;
        appointmentBox.appendChild(hr);
        renderDeleteAppointment(appointmentBox);
        appointmentBlock.appendChild(appointmentBox);
    });
    appointmentBlock.classList.add('appointmentBlock', 'bordered');
    personalBlock.appendChild(appointmentBlock);
})();

// удаление записей из БД и из списка 'Мои сеансы' по клику на крестики
let deleteAppointments = (function() {
crosses = document.querySelectorAll('.small-close');
crosses = Array.from(crosses);
crosses.forEach(function(item, index) {
    item.addEventListener('click', function() {
        loggedInUserData.date.splice(loggedInUserData.date[index], 1);
        if (loggedInUserData.date.length === 0) {
            let emptyBlock = document.querySelector('.appointmentBlock');
            emptyBlock.innerText = `Вы пока никуда не записаны=( \nНужно срочно это исправить!`;
        }
        localStorage.setItem(loggedInUser, JSON.stringify(loggedInUserData));  
    })
});
})();

// отображение/сокрытие содержимого 'Мои сеансы' по клику на пункт меню 'Мои сеансы'
let myAppointments = document.querySelector('.personal-menu__item');

myAppointments.addEventListener('click', function(evt) {
    let appointmentBlock = document.querySelector('.appointmentBlock');
    appointmentBlock.classList.toggle('visible-flex');
});

// датапикер для окна записи на приём
$( "#datepicker" ).datepicker({
    inline: true,
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
    monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],  
    maxDate: '+1m',
    minDate: '-0d'
});