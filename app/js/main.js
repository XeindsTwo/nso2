const body = document.body;
const modal = document.querySelector('.modal');
const btnRegister = document.getElementById('buttonOpenRegister');
const btnCloseRegister = document.getElementById('buttonCloseRegister');

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        body.classList.remove('body--active');
        modal.classList.remove('modal--active');
        modal.scrollTop = 0;
    }
});

btnRegister.addEventListener('click', function () {
    body.classList.add('body--active');
    modal.classList.add('modal--active');
});

btnCloseRegister.addEventListener('click', function () {
    body.classList.remove('body--active');
    modal.classList.remove('modal--active');
    modal.scrollTop = 0;
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.modal__form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailErrorSymbols = document.getElementById('emailError');
    const emailErrorLength = document.getElementById('emailErrorLength');
    const emailErrorEmpty = document.getElementById('emailErrorEmpty');
    const passwordErrorSymbols = document.getElementById('passwordErrorSymbols');
    const passwordErrorMin = document.getElementById('passwordErrorMin');
    const passwordErrorMax = document.getElementById('passwordErrorMax');
    const passwordRepeatInput = document.getElementById('passwordRepeat');
    const passwordRepeatError = document.getElementById('passwordRepeatError');
    const telegramInput = document.getElementById('telegram');
    const telegramError = document.getElementById('telegramError');
    const telegramErrorMin = document.getElementById('telegramErrorMin');
    let emailValid = false;
    let emailHasBeenBlurred = false;
    let passwordValid = false;
    let passwordHasBeenBlurred = false;
    let telegramValid = false;
    let telegramHasBeenBlurred = false;

    const validateEmail = () => {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        emailValid = emailRegex.test(emailValue);
        emailErrorSymbols.classList.toggle('error--active', !emailValid);

        const isLengthValid = emailValue.length <= 80;
        emailErrorLength.classList.toggle('error--active', !isLengthValid);

        const isEmpty = emailHasBeenBlurred && emailValue === '';
        emailErrorEmpty.classList.toggle('error--active', isEmpty);
        emailErrorSymbols.classList.toggle('error--active', !isEmpty && !emailValid);
        emailValid = emailValid && !isEmpty;
    }

    const validatePassword = () => {
        const passwordValue = passwordInput.value.trim();
        const passwordRepeatValue = passwordRepeatInput.value.trim();
        let passwordsMatch = true;

        passwordErrorSymbols.classList.toggle('error--active', /[а-яА-ЯЁё]/.test(passwordValue));
        passwordErrorMin.classList.toggle('error--active', passwordValue.length < 8);
        passwordErrorMax.classList.toggle('error--active', passwordValue.length > 60);

        if (passwordRepeatValue !== '' && passwordHasBeenBlurred) {
            passwordsMatch = passwordValue === passwordRepeatValue;
            passwordRepeatError.classList.toggle('error--active', !passwordsMatch);
        }

        passwordValid = !(/[а-яА-ЯЁё]/.test(passwordValue) || passwordValue.length < 8 || passwordValue.length > 60 || !passwordsMatch);
    };

    passwordInput.addEventListener('blur', () => {
        passwordHasBeenBlurred = true;
        validatePassword();
    });

    passwordInput.addEventListener('input', () => {
        validatePassword();
    });

    passwordRepeatInput.addEventListener('blur', () => {
        if (passwordHasBeenBlurred) {
            validatePassword();
        }
    });

    passwordRepeatInput.addEventListener('input', () => {
        if (passwordHasBeenBlurred) {
            validatePassword();
        }
    });

    emailInput.addEventListener('blur', () => {
        emailHasBeenBlurred = true;
        validateEmail();
    });

    emailInput.addEventListener('input', validateEmail);

    const validateTelegram = () => {
        const telegramValue = telegramInput.value.trim();
        const telegramRegex = /^[a-z0-9_]{5,32}$/;

        telegramValid = telegramRegex.test(telegramValue);
        telegramError.classList.toggle('error--active', !telegramValid);

        const isLengthValid = telegramValue.length >= 5 && telegramValue.length <= 32;
        telegramErrorMin.classList.toggle('error--active', !isLengthValid);

        telegramValid = telegramValid && isLengthValid;
    };

    telegramInput.addEventListener('blur', () => {
        telegramHasBeenBlurred = true;
        validateTelegram();
    });

    telegramInput.addEventListener('input', () => {
        if (telegramHasBeenBlurred) {
            validateTelegram();
        }
    });

    form.addEventListener('submit', (event) => {
        validateEmail();
        validatePassword();
        validateTelegram();

        if (!emailValid || !passwordValid || !telegramValid) {
            event.preventDefault();
        }
    });
});