// document.addEventListener('DOMContentLoaded', () => {
//   const visitPromo = document.querySelector('.visit-promo');
//   const tabVisitPromo = visitPromo.closest('.tabb');
//   const parent = tabVisitPromo.parentElement;
//   const heightVisitPromo = tabVisitPromo.clientHeight;
//   parent.style.height = `${heightVisitPromo}px`;
// });
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const head = dropdown.querySelector('.dropdown__head');
    const list = dropdown.querySelector('.dropdown__list');
    const hiddenInput = dropdown.querySelector('.dropdown__value');
    const text = dropdown.querySelector('.dropdown__text');

    head.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    list.addEventListener('click', (e) => {
        const item = e.target.closest('.dropdown__item');
        if (!item) return;

        hiddenInput.value = item.dataset.value;
        text.textContent = item.textContent;

        dropdown.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

