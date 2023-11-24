/* eslint-disable */
import { animate } from '@/js/utils';

(function TabsNav() {
  const clickHandler = async (e) => {
    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;

    // hide
    const beforeActiveBtn = tabsNav.querySelector('.tabs-nav__btn.active');
    beforeActiveBtn.classList.remove('active');
    const activeTabs = document.querySelectorAll(
      `[data-tab-id="${beforeActiveBtn.dataset.tabTarget}"]`
    );
    activeTabs.forEach(async (activeTab) => {
      await animate({
        draw(progress) {
          activeTab.style.opacity = 1 - progress;
        },
      });
      activeTab.style.display = 'none';
      activeTab.style.opacity = null;
    });

    setTimeout(() => {
      // show
      tabBtn.classList.add('active');
      const targetTabs = document.querySelectorAll(
        `[data-tab-id="${tabBtn.dataset.tabTarget}"]`
      );
      targetTabs.forEach(async (targetTab) => {
        targetTab.style.opacity = 0;
        targetTab.style.display = null;
        await animate({
          draw(progress) {
            targetTab.style.opacity = progress;
          },
        });
        targetTab.style.opacity = null;
      });
    }, 300);
  };

  document.addEventListener('click', clickHandler);
})();
