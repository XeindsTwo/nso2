const body = document.body;
const modal = document.querySelector('.modal');
const btnRegister = document.getElementById('buttonOpenRegister');
const btnCloseRegister = document.getElementById('buttonCloseRegister');

btnRegister.addEventListener('click', function () {
    body.classList.add('body--active');
    modal.classList.add('modal--active');
});

btnCloseRegister.addEventListener('click', function () {
    body.classList.remove('body--active');
    modal.classList.remove('modal--active');
    modal.scrollTop = 0;
});