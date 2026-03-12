import { logIfDebug } from '../../mydebug';

enum TOOLTIP_MODE {
  HOVER = 'hover',
}

const itemHasTooltip = '.icon-tooltip-wrapper';

function initGlobalTooltip(): void {
  const tooltip = document.getElementById(
    'globalTooltip'
  ) as HTMLDivElement | null;
  if (!tooltip) return;

  handleTooltipMode(tooltip);

  let currentWrapper: HTMLElement | null = null;

  function updateTooltipPosition() {
    if (!currentWrapper || !tooltip) return;

    const mode = currentWrapper.dataset.tooltipMode;
    if (mode === TOOLTIP_MODE.HOVER) return;

    const rect = currentWrapper.getBoundingClientRect();
    tooltip.style.setProperty('--anchor-x', `${rect.left + rect.width / 2}px`);
    tooltip.style.setProperty('--anchor-y', `${rect.top + rect.height / 2}px`);
  }

  document.addEventListener(
    'mouseenter',
    (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const wrapper = target.closest(itemHasTooltip) as HTMLElement | null;
      if (!wrapper) return;

      const mode = wrapper.dataset.tooltipMode;
      if (mode === TOOLTIP_MODE.HOVER) return;

      const text = wrapper.getAttribute('data-tooltip');
      if (!text) return;

      tooltip.innerHTML = text;
      tooltip.className = 'global-tooltip';

      const tooltipClass = wrapper.dataset.tooltipClass;
      if (tooltipClass) {
        tooltip.classList.add(tooltipClass);
        logIfDebug(`[tooltip] data class added: ${tooltipClass}`);
      }

      wrapper.classList.forEach((cls) => {
        if (cls.endsWith('_tooltip')) {
          tooltip.classList.add(cls);
        }
      });

      currentWrapper = wrapper;
      updateTooltipPosition();

      tooltip.classList.add('is-visible');
      logIfDebug(`[tooltip] show: "${text}"`);
    },
    true
  );

  document.addEventListener(
    'mouseleave',
    (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const wrapper = target.closest(itemHasTooltip) as HTMLElement | null;
      if (!wrapper) return;

      const mode = wrapper.dataset.tooltipMode;
      if (mode === TOOLTIP_MODE.HOVER) return;

      tooltip.classList.remove('is-visible');
      tooltip.textContent = '';
      tooltip.style.removeProperty('--anchor-x');
      tooltip.style.removeProperty('--anchor-y');
      tooltip.className = 'global-tooltip';

      currentWrapper = null;
      logIfDebug('[tooltip] hide');
    },
    true
  );

  document.addEventListener('scroll', updateTooltipPosition, true);
  window.addEventListener('resize', updateTooltipPosition);

  logIfDebug('[tooltip] initialized');
}

function handleTooltipMode(globalTooltip: HTMLDivElement) {
  const wrappers = document.querySelectorAll<HTMLDivElement>(itemHasTooltip);
  wrappers.forEach((el) => {
    const mode = el.dataset.tooltipMode;
    const text = el.dataset.tooltip;
    const tClass = el.dataset.tooltipClass;
    if (!text) return;

    if (mode === TOOLTIP_MODE.HOVER) {
      const cloned = globalTooltip.cloneNode(true) as HTMLElement;
      cloned.id = '';
      if (tClass) cloned.classList.add(tClass);
      el.appendChild(cloned);
      cloned.innerHTML = text;
    }
  });
}

export { initGlobalTooltip };
