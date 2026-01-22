// function initListElementsSeparator() {
//   const medicalCatalog = document.querySelector<HTMLElement>(
//     '.medical-center__catalog'
//   );
//   const catalogList =
//     medicalCatalog?.querySelector<HTMLUListElement>('.catalog__list');
//   const catalogListItems = catalogList?.querySelectorAll<HTMLLIElement>(
//     '.catalog__list_item'
//   );

//   let previousTop = 0;

//   catalogListItems?.forEach((item) => {
//     item.classList.add('has-separator');

//     const currentTop = item.offsetTop;

//     const isNewLine = previousTop < currentTop;
//     if (isNewLine) {
//       item.classList.remove('has-separator');
//     }
//     previousTop = currentTop;
//   });
// }

function initListElementsSeparator() {
  const medicalCatalog = document.querySelector<HTMLElement>(
    '.medical-center__catalog'
  );
  const catalogList =
    medicalCatalog?.querySelector<HTMLUListElement>('.catalog__list');
  const catalogListItems = catalogList?.querySelectorAll<HTMLLIElement>(
    '.catalog__list_item'
  );

  if (!catalogListItems) return;

  let previousTop: number | null = null;

  catalogListItems.forEach((item) => {
    // 🔹 всегда сначала сбрасываем
    item.classList.remove('has-separator');

    const currentTop = item.offsetTop;

    if (previousTop !== null && currentTop === previousTop) {
      // элемент НЕ первый в строке
      item.classList.add('has-separator');
    }

    previousTop = currentTop;
  });
}

export { initListElementsSeparator };
