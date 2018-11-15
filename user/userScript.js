//переключение вакансий
let jobs = document.querySelectorAll(".main__job-container");
let barberJob = document.querySelector(".barber-job");
let adminJob = document.querySelector(".admin-job");

barberJob.addEventListener("click", function() {
    jobs[1].classList.remove("main__job-container--active");
    jobs[0].classList.add("main__job-container--active");

    adminJob.classList.remove("job-list__item--active");
    barberJob.classList.add("job-list__item--active");
    
})

adminJob.addEventListener("click", function() {
    jobs[0].classList.remove("main__job-container--active");
    jobs[1].classList.add("main__job-container--active");

    barberJob.classList.remove("job-list__item--active");
    adminJob.classList.add("job-list__item--active");
})

let logInMenu = function () {
    let loginHi = document.querySelector('.sign-in__log-in');
    loginHi.innerHTML = `Добро пожаловать,<br> лалала!`; //часть объекта локалстоража ${loginUserField.value}

    let mainPage = document.querySelector('.main__page');
    let appointmentButton = mainPage.querySelector('.main__button');
    appointmentButton.style.display = 'block';
}
logInMenu();