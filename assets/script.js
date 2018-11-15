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

//плавный скролл. не работает?
$(document).ready(function(){
    $('a[href^="#services"]').click(function() {
        $("html", "body").animate({ scrollTop: $(".main__services").offset().top }, 600);
    })
});


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

// отправка данных с регистрации
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
    }
}

loginUserField.oninput = function () {
    loginUserField.setCustomValidity('');
    loginUserField.style.border = '1px solid #ccc'; 
}

loginPasswordField.oninput = function() {
    loginPasswordField.setCustomValidity('');
    loginPasswordField.style.border = '1px solid #ccc';
}

loginForm.onsubmit = checkLogin;






/*
let logInMenu = function () {
    loginBlock.style.display = 'none';
    let signInBlock = document.querySelector('.sign-in');
    let signInItems = signInBlock.querySelectorAll('.sign-in__item');
    signInItems = Array.from(signInItems);
    signInItems.forEach((item) => item.style.display = 'none');

    
    let loginHi = document.createElement('li');
    loginHi.innerHTML = `Добро пожаловать,<br> ${loginUserField.value}!`;
    loginHi.classList.add('sign-in__log-in');
    signInBlock.appendChild(loginHi);

    let personalMenu = document.querySelector('.personal-menu');
    personalMenu.style.display = 'flex';

    let mainPage = document.querySelector('.main__page');
    let appointmentButton = mainPage.querySelector('.main__button');
    appointmentButton.style.display = 'block';
}*/

/*registerForm.onsubmit = function(evt) {
    let stopSubmit = false;
    let registerUserName = registerBlock.querySelector('input[type = text]').value;
    let registerPassword = registerBlock.querySelector('input[name = psw]').value;
    let repeatedPassword = registerBlock.querySelector('input[name = repeat-psw').value;

    if (logins.indexOf(registerUserName) !== -1) {
        userField.setCustomValidity('Такой аккаунт уже зарегистрирован!');
        userField.style.border = '2px solid red';
        stopSubmit = true;
    } else {
        userField.setCustomValidity('');
    }

    if (registerPassword !== repeatedPassword) {
        passwordField.setCustomValidity('Пароли должны совпадать!');
        passwordField.style.border = '2px solid red';
        repeatedPasswordField.style.border = '2px solid red';
        stopSubmit = true;
    } else {
        passwordField.setCustomValidity('');
    }

    if (stopSubmit) {
        evt.preventDefault();
        return false; 
    } else {
        localStorage.setItem(registerUserName, registerPassword); 
    }
}*/

/*let resetFieldErrors = function () {
    this.style.border = '1px solid #ccc';
    this.setCustomValidity('');
}*/

/*userField.oninput = function() {
    userField.style.border = '1px solid #ccc';
}

passwordField.oninput = function() {
    passwordField.style.border = '1px solid #ccc';
}

repeatedPasswordField.oninput = function() {
    repeatedPasswordField.style.border = '1px solid #ccc'; 
}*/





/*let logIn = function() {
    let loginUserName = loginBlock.querySelector('input[type = text]').value;
    loginBlock.style.display = "none";

    let signInBlock = document.querySelector('.sign-in');
    let signInItems = signInBlock.querySelectorAll('.sign-in__item');
    signInItems = Array.from(signInItems);
    signInItems.forEach((item) => item.style.display = 'none');

    
    let loginHi = document.createElement('li');
    loginHi.innerHTML = `Добро пожаловать, ${loginUserName}!`;
    loginHi.classList.add('sign-in__log-in');
    signInBlock.appendChild(loginHi);

    let mainPage = document.querySelector('.main__page');
    let appointmentButton = mainPage.querySelector('.main__button');
    appointmentButton.style.display = 'block';
}

let loginSubmit = loginBlock.querySelector('button[type = submit]');
loginSubmit.addEventListener('click', function () {
    let loginUserField = loginBlock.querySelector('input[type = text]');
    let loginPasswordField = loginBlock.querySelector('input[type = password]'); 
    let loginUserName = loginBlock.querySelector('input[type = text]').value;
    let loginPassword = loginBlock.querySelector('input[type = password]').value; 
    if ((logins.indexOf(loginUserName) !== -1) && (loginPassword === localStorage.getItem(loginUserName))) {
        logIn();
    }
    else {
        evt.preventDefault();
        loginPasswordField.style.border = '2px solid red';
        loginUserField.style.border = '2px solid red';
        loginPasswordField.setCustomValidity('Неверно введён логин или пароль');  
    }
});*/

/*loginBlock.onsubmit = function(evt) {
    let loginUserField = loginBlock.querySelector('input[type = text]');
    let loginPasswordField = loginBlock.querySelector('input[type = password]'); 
    let loginUserName = loginBlock.querySelector('input[type = text]').value;
    let loginPassword = loginBlock.querySelector('input[type = password]').value; 
    if ((logins.indexOf(loginUserName) !== -1) && (loginPassword === localStorage.getItem(loginUserName))) {
        let logIn = function() {
            loginBlock.style.display = "none";

            let signInItems = document.querySelectorAll('.sign-in__item');
            signInItems = Array.from(signInItems);
            signInItems.forEach((item) => item.style.display = 'none');
        
            let signInBlock = document.querySelector('.sign-in');
            let loginHi = document.createElement('li');
            loginHi.innerHTML = `Добро пожаловать, ${loginUserName}!`;
            loginHi.classList.add('sign-in__log-in');
            signInBlock.appendChild(loginHi);

            let mainPage = document.querySelector('.main__page');
            let appointmentButton = mainPage.querySelector('.main__button');
            appointmentButton.style.display = 'block';
        }
        
    } else {
        evt.preventDefault();
        loginPasswordField.style.border = '2px solid red';
        loginUserField.style.border = '2px solid red';
        loginPasswordField.setCustomValidity('Неверно введён логин или пароль');
    };
}*/









/*var onAdFormClick = function (evt) {
    var stopSubmit = false;
    if (title.value.length < 30) {
      title.setCustomValidity('Длина меньше 30 символов!');
      title.style.border = '2px solid red';
      stopSubmit = true;
    } else {
      title.setCustomValidity('');
    }
    var minPrice = TypePlaceholders[type.value];
    if (price.value < parseInt(minPrice, 10) || price.value > MAX_PRICE) {
      price.style.border = '2px solid red';
      price.setCustomValidity('Цена указана неверно!');
      stopSubmit = true;
    } else {
      price.setCustomValidity('');
    }
    if (stopSubmit) {
      evt.preventDefault();
      adForm.addEventListener('input', function () {
        price.style.border = 'none';
        title.style.border = 'none';
        title.setCustomValidity('');
        price.setCustomValidity('');
      });
    }
  };*/
  