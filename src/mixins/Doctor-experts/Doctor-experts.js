/*eslint-disable*/
document.addEventListener('click', (event) => {
    const btn = event.target.closest('.experts-cards__btn');
    if (btn) {
        const card = btn.closest('.experts-cards');
        const backside = card.querySelector('.experts-cards__backside');
        backside.classList.toggle('active');
    }
});