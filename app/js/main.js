const body = document.body;
const modal = document.querySelector('.modal');
const btnRegister = document.getElementById('buttonOpenRegister');
const btnCloseRegister = document.getElementById('buttonCloseRegister');

window.addEventListener('keydown', function (event) {
    const body = document.body;
    const modalComplete = document.querySelector('.modal__complete');
    const modal = document.querySelector('.modal');

    if (event.key === 'Escape') {
        if (modalComplete.classList.contains('modal__complete--active')) {
            modalComplete.classList.remove('modal__complete--active');
            body.classList.remove('body--complete');
            setTimeout(() => {
                body.classList.remove('body--active');
                modal.classList.remove('modal--active');
                modal.scrollTop = 0;
            }, 600);
        } else if (modal.classList.contains('modal--active')) {
            body.classList.remove('body--active');
            modal.classList.remove('modal--active');
            modal.scrollTop = 0;
        }
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
    const modalCloseCompleteIcon = document.getElementById('modalCloseCompleteIcon');
    const modalCloseComplete = document.getElementById('modalCloseComplete');
    const modalComplete = document.querySelector('.modal__complete');
    const modal = document.querySelector('.modal');

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

    const closeModal = () => {
        const body = document.body;
        const modalRegistration = document.querySelector('.modal');
        const modal = document.getElementById('modalComplete');
        body.classList.remove('body--complete');
        modal.classList.remove('modal__complete--active');
        modal.style.transform = 'translate(-50%, 20%)';
        modal.style.zIndex = '0';
        modal.style.opacity = '0';
        modal.style.transition = 'all .8s ease-in-out';
        modal.style.pointerEvents = 'none';

        setTimeout(() => {
            body.classList.remove('body--active');
            modalRegistration.classList.remove('modal--active');
        }, 600);

        setTimeout(() => {
            modal.style.opacity = '';
            modal.style.transform = '';
            modal.style.pointerEvents = '';
            modal.style.zIndex = '';
            modal.style.transition = '';
        }, 700);
    };

    const showModalComplete = () => {
        const body = document.body;
        const modal = document.getElementById('modalComplete');
        body.classList.add('body--complete');
        modal.classList.add('modal__complete--active');
    };

    document.addEventListener('click', (event) => {
        const modal = document.getElementById('modalComplete');
        if (modal.classList.contains('modal__complete--active') && !modal.contains(event.target)) {
            closeModal();
        }
    });

    form.addEventListener('submit', (event) => {
        validateEmail();
        validatePassword();
        validateTelegram();

        if (!emailValid || !passwordValid || !telegramValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            showModalComplete();
        }
    });

    modalCloseCompleteIcon.addEventListener('click', closeModal);
    modalCloseComplete.addEventListener('click', closeModal);
});

document.getElementById('buttonError').addEventListener('click', function () {
    document.querySelector('.modal__error-info').style.display = 'block';
    document.querySelector('.modal__error').style.display = 'block';

    setTimeout(function () {
        document.querySelector('.modal__error-info').style.display = 'none';
        document.querySelector('.modal__error').style.display = 'none';
    }, 5000);
});