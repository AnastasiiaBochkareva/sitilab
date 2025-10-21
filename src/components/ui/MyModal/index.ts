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
  const target = event.target as HTMLElement;

  // Открытие модалки
  const openElementModal = target.closest(
    '[data-open-modal]'
  ) as HTMLElement | null;
  if (openElementModal) {
    event.preventDefault();
    const idOpenModal = openElementModal.dataset.openModal;
    const modal = idOpenModal
      ? (document.querySelector(idOpenModal) as HTMLElement)
      : null;
    if (modal) {
      modal.classList.add('active');
      document.documentElement.classList.add('overflow-hidden');
    }
  }

  // Закрытие по крестику
  const closeElementModal = target.closest(
    '[data-close-modal]'
  ) as HTMLElement | null;
  const modalForClose = closeElementModal?.closest(
    '.modal-fixed'
  ) as HTMLElement | null;
  if (
    closeElementModal &&
    modalForClose &&
    modalForClose.classList.contains('active')
  ) {
    modalForClose.classList.remove('active');
    if (!document.querySelector('.modal-fixed.active')) {
      document.documentElement.classList.remove('overflow-hidden');
    }
  }

  // Закрытие по клику на фон
  const clickedModal = target.closest('.modal-fixed') as HTMLElement | null;
  if (clickedModal) {
    const modalContent = clickedModal.firstElementChild as HTMLElement | null;
    if (modalContent && !modalContent.contains(target)) {
      clickedModal.classList.remove('active');
      if (!document.querySelector('.modal-fixed.active')) {
        document.documentElement.classList.remove('overflow-hidden');
      }
    }
  }
}

function initModal() {
  document.addEventListener('click', clickHandler);
}

export { initModal };
