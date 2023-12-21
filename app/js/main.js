const buttons = document.querySelectorAll('[data-target="modalContact"]');
const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.navigation__mobile');
let handleModalClose;
let clickOutsideModal;

menuBtn.addEventListener('click', () => {
    if (body.classList.contains('body--active') && menuBtn.classList.contains('active') && menu.classList.contains('navigation__mobile--active')) {
        body.classList.remove('body--active');
        menuBtn.classList.remove('active');
        menu.classList.remove('navigation__mobile--active');
    } else {
        body.classList.add('body--active');
        menuBtn.classList.add('active');
        menu.classList.add('navigation__mobile--active');
    }
    menuBtn.blur();
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-target');
        const modal = document.querySelector(`#${targetModalId}`);
        let isOpening = true;

        const openModal = () => {
            modal.classList.add('modal--active');
            body.classList.add('body--modal');
            isOpening = false;

            const closeButton = modal.querySelector('.modal__close');
            closeButton.addEventListener('click', () => {
                closeModal(modal);
            });

            handleModalClose = (e) => {
                if (e.key === 'Escape') {
                    closeModal(modal);
                }
            };

            document.addEventListener('keyup', handleModalClose);

            clickOutsideModal = (event) => {
                if (!isOpening && !modal.contains(event.target)) {
                    closeModal(modal);
                }
            };

            document.addEventListener('click', clickOutsideModal);
        };

        setTimeout(openModal, 100);
    });
});

const closeModal = (modal) => {
    modal.classList.remove('modal--active');
    body.classList.remove('body--modal');
    if (handleModalClose) {
        document.removeEventListener('keyup', handleModalClose);
    }

    if (clickOutsideModal) {
        document.removeEventListener('click', clickOutsideModal);
    }
};

function addToggleListener(buttonId, hiddenSelector) {
    const button = document.getElementById(buttonId);
    const hiddenButton = document.querySelector(hiddenSelector);

    button.addEventListener('click', () => {
        if (hiddenButton.classList.contains('active')) {
            hiddenButton.classList.remove('active');
        } else {
            hiddenButton.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target !== button && !hiddenButton.contains(e.target)) {
            hiddenButton.classList.remove('active');
        }
    });
}

addToggleListener('buttonLang', '.navigation__lang--hidden');
addToggleListener('buttonLangFooter', '.navigation__lang--hidden-footer');

Fancybox.bind("[data-fancybox]", {});