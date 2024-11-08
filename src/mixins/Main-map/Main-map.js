/*eslint-disable*/
document.addEventListener('click', (event) => {
    const element = event.target;
    const filters = document.querySelector('[data-choosing-filters]');
    if (element.closest('[data-open-filters]')) {
        if (filters.classList.contains('open')) {
            filters.classList.remove('open');
        } else {
            filters.classList.add('open');
        }
    }
    if (element.closest('[data-close-filters]')) {
        if (filters.classList.contains('open')) {
            filters.classList.remove('open');
        }
    }
});
