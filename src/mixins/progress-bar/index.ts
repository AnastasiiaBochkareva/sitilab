function setupProgressBar() {
  const wrappers = document.querySelectorAll<HTMLElement>(
    '.progress-bar__wrapper'
  );

  wrappers.forEach((wrapper) => {
    const radios = wrapper.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    const calculationInput = wrapper.closest<HTMLElement>('.calculation-input');
    const fill = calculationInput?.querySelector<HTMLElement>(
      '.progress-bar__fill'
    );
    const thumb = calculationInput?.querySelector<HTMLElement>(
      '.progress-bar__thumb'
    );
    const valueDisplay = calculationInput?.querySelector<HTMLElement>(
      '.calculation-input__header .calculation-input__value'
    );

    if (!radios.length || !fill || !thumb || !valueDisplay) return;

    /** 🔹 Получаем процентную позицию радио относительно wrapper */
    const getRadioPercent = (radio: HTMLElement) => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const radioRect = radio.getBoundingClientRect();
      const radioCenter = radioRect.left + radioRect.width / 2;
      const percent =
        ((radioCenter - wrapperRect.left) / wrapperRect.width) * 100;
      return Math.min(100, Math.max(0, percent));
    };

    /** 🔹 Обновляем визуальное состояние */
    const updateProgress = (radio?: HTMLInputElement) => {
      const checkedRadio =
        radio || Array.from(radios).find((r) => r.checked) || radios[0];

      const isLastEl = radio === radios[radios.length - 1];
      if (!checkedRadio.parentElement) return;
      if (!checkedRadio.checked) checkedRadio.checked = true;

      const percent = getRadioPercent(checkedRadio.parentElement);
      fill.style.width = !isLastEl ? `${percent}%` : '100%';
      thumb.style.left = !isLastEl ? `${percent}%` : '100%';

      const label = checkedRadio.nextElementSibling as HTMLElement;
      const totalValueProgressBar = label?.textContent || checkedRadio.value;
      valueDisplay.textContent = totalValueProgressBar;

      const changeEvent = new CustomEvent('progressBarChange', {
        detail: { name: checkedRadio.name, value: checkedRadio.value },
      });
      document.dispatchEvent(changeEvent);
    };

    // Инициализация
    updateProgress();

    // Обработка кликов по радио
    radios.forEach((radio) => {
      radio.addEventListener('click', () => updateProgress(radio));
    });

    // === 👇 Перетаскивание ползунка (мышь + тач) ===
    let isDragging = false;

    const moveHandler = (clientX: number) => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const x = Math.min(
        Math.max(clientX - wrapperRect.left, 0),
        wrapperRect.width
      );
      const percent = (x / wrapperRect.width) * 100;

      let nearestRadio: HTMLInputElement | null = null;
      let nearestDistance = Infinity;

      radios.forEach((radio) => {
        const radioPercent = getRadioPercent(radio);
        const dist = Math.abs(radioPercent - percent);
        if (dist < nearestDistance) {
          nearestDistance = dist;
          nearestRadio = radio;
        }
      });

      if (nearestRadio) updateProgress(nearestRadio);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      moveHandler(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      moveHandler(e.touches[0].clientX);
    };

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      thumb.classList.remove('active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopDragging);
    };

    const startDragging = (clientX: number) => {
      isDragging = true;
      thumb.classList.add('active');
      moveHandler(clientX);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopDragging);
    };

    thumb.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDragging(e.clientX);
    });

    thumb.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDragging(e.touches[0].clientX);
    });

    // Если окно ресайзится — пересчитать позицию
    window.addEventListener('resize', () => updateProgress());
  });
}

export { setupProgressBar };
