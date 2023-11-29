/* eslint-disable */
function removeShowClass(element) {
  const arrayClasses = Array.from(element.classList);
  arrayClasses.forEach((item) => {
    if (item.includes('v-show-')) {
      element.classList.remove(item);
    }
  });
}
document.addEventListener('click', (event) => {
  if (document.documentElement.clientWidth > 1000) return;
  const { target } = event;
  const button = target.closest('[data-show-type]');
  const parent = button?.closest('.visit-price__btn');
  const nextParent = parent?.parentElement;
  if (!button && !parent && !nextParent) return;
  const showType = button.dataset.showType;
  if (showType) {
    if (nextParent.classList.contains(`v-show-${showType}`)) return;
    removeShowClass(nextParent);
    nextParent.classList.add(`v-show-${showType}`);
  }
});
