document.querySelectorAll('.franchise-slide__body').forEach((body) => {
  const textEl = body.querySelector<HTMLElement>('.text');
  const shadow = body.querySelector<HTMLElement>('.white-shadow-block');

  if (!textEl || !shadow) return;

  // Проверяем, есть ли скролл
  const hasScroll = textEl.scrollHeight > textEl.clientHeight;

  if (!hasScroll) {
    // если скролла нет — вообще не активируем тень
    shadow.classList.remove('active');
    return;
  }

  // если скролл есть — изначально включаем тень
  shadow.classList.add('active');

  textEl.addEventListener('scroll', () => {
    const isAtBottom =
      textEl.scrollTop + textEl.clientHeight >= textEl.scrollHeight - 1;

    if (isAtBottom) {
      shadow.classList.remove('active');
    } else {
      shadow.classList.add('active');
    }
  });
});
