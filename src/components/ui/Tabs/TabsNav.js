/* eslint-disable */
import { animate } from '@/js/utils';

function moveCar(tabBtn, tabsNav) {
  if (document.documentElement.clientWidth <= 1500) return;
  const btnLeft = tabBtn.offsetLeft;
  const tabsNavLeft = tabsNav.offsetLeft;
  const math = btnLeft - tabsNavLeft;
  const tabsNavWidth = tabsNav.getBoundingClientRect().width;
  const tabCar = document.querySelector('#car');
  tabCar.style.left = `${math}px`;
  const widthCar = tabCar.offsetWidth;
  const widthTabBtn = tabBtn.offsetWidth;
  const space = widthTabBtn - widthCar;
  const separate = space / 2;
  tabCar.style.marginLeft = `${separate}px`;
}

(function TabsNav() {
  const clickHandler = async (e) => {

    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;
    const beforeActiveBtn = tabsNav.querySelector('.tabs-nav__btn.active');
    beforeActiveBtn?.classList.remove('active');
    tabBtn.classList.add('active');
    tabsNav.classList.add('blocked');

    moveCar(tabBtn, tabsNav);

    // hide
    const activeTab = document.getElementById(beforeActiveBtn?.dataset.tabTarget);
    const activeTab1 = document.querySelector(`[data-tab-id="${beforeActiveBtn?.dataset.tabTarget}"]`);
    if (activeTab) {
      await animate({
        draw(progress) {
          activeTab.style.opacity = 1 - progress;
          activeTab1.style.opacity = 1 - progress;
        },
      })
      activeTab.style.display = 'none';
      activeTab1.style.display = 'none';
      activeTab.style.opacity = null;
      activeTab1.style.opacity = null;
    }

    // show
    const targetTab = document.getElementById(tabBtn.dataset.tabTarget);
    const targetTab1 = document.querySelector(`[data-tab-id="${tabBtn?.dataset.tabTarget}"]`);
    if (targetTab) {
      targetTab.style.opacity = 0;
      targetTab1.style.opacity = 0;
      targetTab.style.display = null;
      targetTab1.style.display = null;
      await animate({
        draw(progress) {
          targetTab.style.opacity = progress;
          targetTab1.style.opacity = progress;
        },
      });
      targetTab.style.opacity = null;
      targetTab1.style.opacity = null;
    }

    setTimeout(() => {
      tabsNav.classList.remove('blocked');
    }, 100)
  };

  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;
    if (tabsNav.classList.contains('blocked')) return;
    clickHandler(e);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const var1 = document.querySelector(
      '.visit-home__tabs-full .tabs-nav__btn'
    );
    const var2 = document.querySelector('.visit-home__tabs-full .tabs-nav');
    moveCar(var1, var2);
  });
})();
