import { logIfDebug } from '../../../mydebug';

function initCartServicesCheckboxes() {
  const container = document.querySelector<HTMLElement>('.cart-page__services');
  if (!container) {
    logIfDebug('[cart] .cart-page__services not found');
    return;
  }

  const toggleAll = container.querySelector<HTMLInputElement>(
    '#cart-page-toggle-all'
  );
  if (!toggleAll) {
    logIfDebug('[cart] toggle-all checkbox not found');
    return;
  }

  const serviceCheckboxes = Array.from(
    container.querySelectorAll<HTMLInputElement>(
      '.v-checkbox__input:not(#cart-page-toggle-all)'
    )
  );

  if (serviceCheckboxes.length === 0) {
    logIfDebug('[cart] no service checkboxes found');
    return;
  }

  logIfDebug(`[cart] found ${serviceCheckboxes.length} service checkboxes`);

  // --- 1. Кликнули "Выделить все" ---
  toggleAll.addEventListener('change', () => {
    const isChecked = toggleAll.checked;

    logIfDebug(`[cart] toggle-all changed → ${isChecked}`);

    serviceCheckboxes.forEach((cb) => {
      cb.checked = isChecked;
    });
  });

  // --- 2. Логика: если пользователь вручную снял один чекбокс ---
  serviceCheckboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const allChecked = serviceCheckboxes.every((c) => c.checked);

      logIfDebug(`[cart] service checkbox changed → allChecked=${allChecked}`);

      // Если ВСЕ сервисные чекбоксы выбраны → выделяем "выделить все"
      // Если НЕТ → снимаем "выделить все"
      toggleAll.checked = allChecked;
    });
  });
}

export { initCartServicesCheckboxes };
