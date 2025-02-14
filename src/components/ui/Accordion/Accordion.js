/*eslint-disable*/
const openItem = (item) => {
    if (!item) return;
    item.classList.add('active');

    const body = item.querySelector('.accordion__body');
    body.style.maxHeight = `${body.scrollHeight}px`;
};

const closeItem = (item) => {
    if (!item) return;
    item.classList.remove('active');

    const body = item.querySelector('.accordion__body');
    body.style.maxHeight = null;
};

function fixScroll(activeItem, itemToScroll) {
    if (!activeItem) return;
    const body = activeItem.querySelector('.accordion__body');
    console.log(body.scrollHeight);
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight);
    if (body.scrollHeight > viewportHeight) {
        setTimeout(() => {
            const header = document.querySelector('.header');
            const offset = header ? header.scrollHeight : 100;
            const rect = itemToScroll.getBoundingClientRect();
            const offsetTop = window.pageYOffset + rect.top - offset;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }, 250);
    }
}

const clickHandler = (e) => {
    const accordionHead = e.target.closest('.accordion__head');
    if (!accordionHead) return;
    console.log(e);
    const accordion = e.target.closest('.accordion');
    const targetItem = e.target.closest('.accordion__item');
    const activeItem = accordion.querySelector('.accordion__item.active');

    if (targetItem !== activeItem) {
        openItem(targetItem);
        closeItem(activeItem);
        fixScroll(activeItem, targetItem);
    } else {
        closeItem(targetItem);
    }
};

document.addEventListener('click', clickHandler);
