function initPromocode(): void {
  const inputs = document.querySelectorAll<HTMLInputElement>(
    '[data-promo-code-input]'
  );

  inputs.forEach((input) => {
    const wrapper = input.closest('.promo-code__field');
    if (!wrapper) return;

    const clearBtn = wrapper.querySelector<HTMLButtonElement>(
      '[data-promo-code-clear]'
    );
    if (!clearBtn) return;

    // Показываем/скрываем крестик при вводе
    input.addEventListener('input', () => {
      if (input.value.trim().length > 0) {
        clearBtn.classList.add('promo-code__clear--visible');
      } else {
        clearBtn.classList.remove('promo-code__clear--visible');
      }
    });

    // Очистка по клику
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.remove('promo-code__clear--visible');
      input.focus();
    });
  });
}
export { initPromocode };
