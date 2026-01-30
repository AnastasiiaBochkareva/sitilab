import { logIfDebug } from '../../mydebug';
// document.addEventListener('DOMContentLoaded', () => {
//   const visitPromo = document.querySelector('.visit-promo');
//   const tabVisitPromo = visitPromo.closest('.tabb');
//   const parent = tabVisitPromo.parentElement;
//   const heightVisitPromo = tabVisitPromo.clientHeight;
//   parent.style.height = `${heightVisitPromo}px`;
// });

// const dropdowns = document.querySelectorAll('.dropdown');

// dropdowns.forEach(dropdown => {
//     const head = dropdown.querySelector('.dropdown__head');
//     const list = dropdown.querySelector('.dropdown__list');
//     const hiddenInput = dropdown.querySelector('.dropdown__value');
//     const text = dropdown.querySelector('.dropdown__text');

//     head.addEventListener('click', () => {
//         dropdown.classList.toggle('active');
//     });

//     list.addEventListener('click', (e) => {
//         const item = e.target.closest('.dropdown__item');
//         if (!item) return;

//         hiddenInput.value = item.dataset.value;
//         text.textContent = item.textContent;

//         dropdown.classList.remove('active');
//     });

//     document.addEventListener('click', (e) => {
//         if (!dropdown.contains(e.target)) {
//             dropdown.classList.remove('active');
//         }
//     });
// });

function initDropdowns(): void {
  const dropdowns = document.querySelectorAll<HTMLElement>('.dropdown');

  logIfDebug(`[dropdown] found: ${dropdowns.length}`);

  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown, index) => {
    const head = dropdown.querySelector<HTMLElement>('.dropdown__head');
    const list = dropdown.querySelector<HTMLElement>('.dropdown__list');
    const hiddenInput =
      dropdown.querySelector<HTMLInputElement>('.dropdown__value');
    const text = dropdown.querySelector<HTMLElement>('.dropdown__text');

    if (!head || !list || !hiddenInput || !text) {
      logIfDebug(`[dropdown ${index}] missing elements`);
      return;
    }

    logIfDebug(`[dropdown ${index}] initialized`);

    head.addEventListener('click', () => {
      dropdown.classList.toggle('active');
      logIfDebug(`[dropdown ${index}] head clicked`);
    });

    list.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>(
        '.dropdown__item'
      );
      if (!item) return;

      hiddenInput.value = item.dataset.value ?? '';
      text.textContent = item.textContent ?? '';

      dropdown.classList.remove('active');

      logIfDebug(`[dropdown ${index}] selected value=${hiddenInput.value}`);
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target as Node)) {
        dropdown.classList.remove('active');
      }
    });
  });
}

export { initDropdowns };
