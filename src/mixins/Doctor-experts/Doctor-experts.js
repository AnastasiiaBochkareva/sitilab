/*eslint-disable*/
document.addEventListener('click', (event) => {
    const btn = event.target.closest('.experts-cards__btn');
    if (btn) {
        const card = btn.closest('.experts-cards');
        const backside = card.querySelector('.experts-cards__backside');
        backside.classList.toggle('active');
    }
});

// document.addEventListener('click', (event) => {
//     const btn = event.target.closest('.experts-cards__btn');
//     if (btn) {
//         event.stopPropagation(); // Останавливаем распространение события, чтобы не срабатывало событие на слайдере
//         const card = btn.closest('.experts-cards');
//         const backside = card.querySelector('.experts-cards__backside');
//         backside.classList.toggle('active');
//     }
// });

// const container = document.querySelector('.ask-experts__body');

// container.addEventListener('wheel', (e) => {
//   if (e.deltaY !== 0) {
//     e.preventDefault();
//     container.scrollLeft += e.deltaY; // Скроллит влево или вправо в зависимости от направления колеса
//   }
// });

// const container = document.querySelector('.ask-experts__body');

// let scrollAmount = 0;
// let isScrolling = false;

// container.addEventListener('wheel', (e) => {
//   e.preventDefault();
//   const scrollStep = e.deltaY * 5; // Меньший шаг для более плавного скролла
//   scrollAmount += scrollStep;

//   if (!isScrolling) {
//     isScrolling = true;
//     smoothScroll();
//   }
// });

// function smoothScroll() {
//   container.scrollLeft += scrollAmount * 3.2; // Плавное увеличение значения
//   scrollAmount *= 0.9; // Постепенное замедление

//   if (Math.abs(scrollAmount) > 0.1) {
//     requestAnimationFrame(smoothScroll); // Продолжает анимацию до остановки
//   } else {
//     isScrolling = false;
//   }
// }
