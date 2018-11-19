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

//создание вспомогательного ключа для хранения залогиненного пользователя
localStorage.setItem('_lastUserLoggedIn','');

function rememberUserLoggedIn(userName) {
    localStorage.setItem('_lastUserLoggedIn', userName);
}

// открытие/закрытие окон входа и регистрации
let loginBlock = document.getElementById('loginBlock');

document.addEventListener('click', function(evt) {
    if (evt.target == loginBlock)  {
        loginBlock.style.display = "none";
    }
});

document.addEventListener('keydown', function(evt) {
	if (evt.keyCode === 27) {
    	loginBlock.style.display = "none";
	}
});

let registerBlock = document.getElementById('registerBlock');

window.onclick = function(evt) {
    if (evt.target == registerBlock)  {
        registerBlock.style.display = "none";
    }
}
document.addEventListener('keydown', function(evt) {
	if (evt.keyCode === 27) {
    	registerBlock.style.display = "none";
	}
});

let registerLink = document.querySelector('.register-link');
registerLink.addEventListener('click', function(evt) {
    loginBlock.style.display = "none";
    registerBlock.style.display = "block";
});

// форма регистраации
let logins = Object.keys(localStorage);

let registerForm = registerBlock.querySelector('.modal-content');
let registerSubmit = registerBlock.querySelector('.btn');
let userField = registerBlock.querySelector('input[type = text]');
let passwordField = registerBlock.querySelector('input[name = psw]');
let repeatedPasswordField = registerBlock.querySelector('input[name = repeat-psw]');
let registerFlag = false;
userField.onblur = function(evt) {
    if (logins.indexOf(userField.value) !== -1) {
        userField.setCustomValidity('Такой аккаунт уже зарегистрирован!');
        userField.style.border = '2px solid red';   
        registerFlag = true;
        return registerFlag;
    }
}

repeatedPasswordField.onblur = function(evt) {  //если ввести неправильно а потом правильно, то не зарегистрирует, т.к. флаг уже вернётся как true
    if (passwordField.value !== repeatedPasswordField.value) {
        repeatedPasswordField.setCustomValidity('Пароли должны совпадать!');
        passwordField.style.border = '2px solid red';
        repeatedPasswordField.style.border = '2px solid red';
        registerFlag = true;
        return registerFlag;
    }
}
let checkRegister = function(evt) {
    if (!registerFlag) {
        localStorage.setItem(userField.value, JSON.stringify({name: userField.value, password: passwordField.value, date: []}));
    } 
}

userField.oninput = function () {
    registerFlag = false;
    userField.setCustomValidity('');
    userField.style.border = '1px solid #ccc'; 
    return registerFlag;
}

passwordField.oninput = function() {
    registerFlag = false;
    passwordField.setCustomValidity('');
    passwordField.style.border = '1px solid #ccc';
    return registerFlag;
}

repeatedPasswordField.oninput = function() {
    registerFlag = false;
    repeatedPasswordField.setCustomValidity('');
    repeatedPasswordField.style.border = '1px solid #ccc'; 
    return registerFlag;
}

registerForm.onsubmit = checkRegister;
 
// форма входа
let loginUserField = loginBlock.querySelector('input[type = text]');
let loginPasswordField = loginBlock.querySelector('input[type = password]'); 
let signInBlock = document.querySelector('.sign-in');
let signInItems = signInBlock.querySelectorAll('.sign-in__item');
let mainPage = document.querySelector('.main__page');
let appointmentButton = mainPage.querySelector('.main__button');
let loginForm = loginBlock.querySelector('.modal-content');
let loginFlag = false;
let getUserDataObject = function(userName) {
    return JSON.parse(localStorage.getItem(userName));
}

loginUserField.onblur = function(evt) {
    if (logins.indexOf(loginUserField.value) === -1) {
        loginUserField.setCustomValidity('Такого аккаунта не существует!');
        loginUserField.style.border = '2px solid red';
        loginFlag = true;
        return loginFlag;
    }
}

loginPasswordField.onblur = function(evt) {
    if (loginPasswordField.value !== getUserDataObject(loginUserField.value).password) {
        loginPasswordField.setCustomValidity('Вы ввели неверный пароль!');
        loginPasswordField.style.border = '2px solid red';
        loginFlag = true;
        return loginFlag;
    }
}

let checkLogin = function (evt) {
    if (loginFlag) {
        evt.preventDefault();
    } else {
        rememberUserLoggedIn(loginUserField.value);
    }
}

loginUserField.oninput = function () {
    loginFlag = false;
    loginUserField.setCustomValidity('');
    loginUserField.style.border = '1px solid #ccc'; 
}

loginPasswordField.oninput = function() {
    loginFlag = false;
    loginPasswordField.setCustomValidity('');
    loginPasswordField.style.border = '1px solid #ccc';
}

loginForm.onsubmit = checkLogin;