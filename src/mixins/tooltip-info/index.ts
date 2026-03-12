import { logIfDebug } from '../../mydebug';

function initGlobalTooltipStyleClass() {
  const globalTooltip = document.querySelector<HTMLElement>('.global-tooltip');
  const tooltipElements = document.querySelectorAll<HTMLElement>(
    '.icon-tooltip-wrapper'
  );

  tooltipElements.forEach((el) => {
    console.log(el);
    const tooltipClass = el.dataset.tooltipClass;
    console.log(tooltipClass);
    if (tooltipClass) {
      globalTooltip?.classList.add(tooltipClass);
    }
  });
}

export { initGlobalTooltipStyleClass };
