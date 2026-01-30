import { logIfDebug } from '../../mydebug';

function initGlobalTooltip(): void {
  const tooltip = document.getElementById(
    'globalTooltip'
  ) as HTMLDivElement | null;
  if (!tooltip) return;

  document.addEventListener(
    'mouseenter',
    (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const wrapper = target.closest('.icon-tooltip-wrapper');
      if (!(wrapper instanceof Element)) return;

      const text = wrapper.getAttribute('data-tooltip');
      if (!text) return;

      tooltip.textContent = text;

      tooltip.className = 'global-tooltip';

      if (wrapper.classList) {
        wrapper.classList.forEach((cls) => {
          if (cls.endsWith('_tooltip')) {
            tooltip.classList.add(cls);
          }
        });
      }

      const rect = wrapper.getBoundingClientRect();
      tooltip.style.setProperty(
        '--anchor-x',
        `${rect.left + rect.width / 2}px`
      );
      tooltip.style.setProperty(
        '--anchor-y',
        `${rect.top + rect.height / 2}px`
      );

      tooltip.classList.add('is-visible');
      logIfDebug(`[tooltip] show: "${text}" at ${rect.left}, ${rect.top}`);
    },
    true
  );

  document.addEventListener(
    'mouseleave',
    (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const wrapper = target.closest('.icon-tooltip-wrapper');
      if (!(wrapper instanceof Element)) return;

      tooltip.classList.remove('is-visible');
      tooltip.textContent = '';

      tooltip.style.removeProperty('--anchor-x');
      tooltip.style.removeProperty('--anchor-y');

      tooltip.className = 'global-tooltip';
      logIfDebug('[tooltip] hide');
    },
    true
  );

  logIfDebug('[tooltip] initialized');
}

export { initGlobalTooltip };
