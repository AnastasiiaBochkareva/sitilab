/*eslint-disable*/
document.addEventListener('click', (event) => {
    const btn = event.target.closest('.experts-cards__btn');
    if (btn) {
        const card = btn.closest('.experts-cards');
        const backside = card.querySelector('.experts-cards__backside');
        backside.classList.toggle('active');
    }
});

const container = document.querySelector('.ask-experts__body');

// container.addEventListener('wheel', (e) => {
//   if (e.deltaY !== 0) {
//     e.preventDefault();
//     container.scrollLeft += e.deltaY; // Скроллит влево или вправо в зависимости от направления колеса
//   }
// });