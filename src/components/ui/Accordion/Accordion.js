/*eslint-disable*/
const openItem = (item) => {
    if (!item) return;
    item.classList.add('active');

    const body = item.querySelector('.accordion__body');
    body.style.maxHeight = `${body.scrollHeight}px`;

    body.addEventListener('transitionend', () => {
    // updateParentAccordion(item);
    fixScroll(item.closest('.accordion'), item);
}, { once: true });
};

const closeItem = (item) => {
    if (!item) return;
    item.classList.remove('active');

    const body = item.querySelector('.accordion__body');
    body.style.maxHeight = null;

    body.addEventListener('transitionend', () => {
    // updateParentAccordion(item);
    fixScroll(item.closest('.accordion'), item);
}, { once: true });
};

// function updateParentAccordion(item) {
//     const parentAccordion = item.closest('.accordion__body')?.closest('.accordion');
//     if (parentAccordion) {
//         const parentBody = parentAccordion.querySelector(':scope > .accordion__item.active > .accordion__body.accordion__body-limiter');
//         if (parentBody) {
//             console.log(1);
            
//             if (parentBody.style.minHeight == '') {
// parentBody.style.minHeight = `max-content`;
// console.log(2);
//             } else {
//                 console.log(3);
//                 parentBody.style.minHeight = ``;
//             }
            
//             updateParentAccordion(parentAccordion);
//         }
//     }
// }

function fixScroll(activeItem, itemToScroll) {
    if (!activeItem) return;
    const body = activeItem.querySelector('.accordion__body');
    const viewportHeight = window.innerHeight;
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

    const accordion = e.target.closest('.accordion');
    const targetItem = e.target.closest('.accordion__item');
     if (!accordion || !targetItem) return;
    const activeItem = accordion.querySelector('.accordion__item.active');

    if (targetItem !== activeItem) {
        // openItem(targetItem);
        closeItem(activeItem);
        openItem(targetItem);
        // fixScroll(activeItem, targetItem);
    } else {
        closeItem(targetItem);
    }
};

document.addEventListener('click', clickHandler);

