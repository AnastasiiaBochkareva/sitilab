// function clickHandler(event) {
//     const openElementModal = event.target.closest("[data-open-modal]");
//     if (openElementModal) {
//         event.preventDefault();

//         const idOpenModal = openElementModal.dataset.openModal;
//         if (idOpenModal) {
//             const modal = document.querySelector(idOpenModal);
//             if (modal) {
//                 modal.classList.add("active");
//             }
//         }
//     }

//     const closeElementModal = event.target.closest("[data-close-modal]");
//     const modal = closeElementModal?.closest(".modal-fixed");
//     if (closeElementModal && modal && modal.classList.contains("active")) {
//         modal.classList.remove("active");
//     }
// }

// function initModal() {
//     document.addEventListener("click", clickHandler);
// }

// export { initModal };
function clickHandler(event: MouseEvent) {
  const openElementModal = (event.target as HTMLElement).closest(
    '[data-open-modal]'
  ) as HTMLElement | null;
  if (openElementModal) {
    event.preventDefault();

    const idOpenModal = openElementModal.dataset.openModal;
    if (idOpenModal) {
      const modal = document.querySelector(idOpenModal) as HTMLElement | null;
      if (modal) {
        modal.classList.add('active');
      }
    }
  }

  const closeElementModal = (event.target as HTMLElement).closest(
    '[data-close-modal]'
  ) as HTMLElement | null;
  const modal = closeElementModal?.closest(
    '.modal-fixed'
  ) as HTMLElement | null;
  if (closeElementModal && modal && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
}

function initModal() {
  document.addEventListener('click', clickHandler);
}

export { initModal };
