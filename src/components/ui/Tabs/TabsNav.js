/* eslint-disable */
import { animate } from '@/js/utils';

function moveCar(tabBtn, tabsNav) {
  console.log(tabBtn);
  console.log(tabsNav);
  const btnLeft = tabBtn.offsetLeft;
  const tabsNavLeft = tabsNav.offsetLeft;
  const math = btnLeft - tabsNavLeft;
  const tabsNavWidth = tabsNav.getBoundingClientRect().width;
  const tabCar = document.querySelector('#car');
  tabCar.style.left = `${math}px`;
  const widthCar = tabCar.offsetWidth;
  console.log(widthCar);
  const widthTabBtn = tabBtn.offsetWidth;
  console.log(widthTabBtn);
  const space = widthTabBtn - widthCar;
  console.log(space);
  const separate = space / 2;
  console.log(separate);
  tabCar.style.marginLeft = `${separate}px`;
  // console.log(tabsNavWidth);
}

(function TabsNav() {
  const clickHandler = async (e) => {
    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;

    moveCar(tabBtn, tabsNav);

    // hide
    const beforeActiveBtn = tabsNav.querySelector('.tabs-nav__btn.active');
    beforeActiveBtn?.classList.remove('active');
    const activeTabs = document.querySelectorAll(
      `[data-tab-id="${beforeActiveBtn?.dataset.tabTarget}"]`
    );

    // activeTabs.forEach(async (activeTab) => {
    //   await animate({
    //     draw(progress) {
    //       activeTab.style.opacity = 1 - progress;
    //     },
    //   });
    //   activeTab.style.display = 'none';
    //   activeTab.style.opacity = null;
    // });

    // show

    async function animateTabs() {
      for (const activeTab of activeTabs) {
        await animate({
          draw(progress) {
            activeTab.style.opacity = 1 - progress;
          },
        });
        activeTab.style.display = 'none';
        activeTab.style.opacity = null;
        // console.log('forEach');
      }
      tabBtn.classList.add('active');
      const targetTabs = document.querySelectorAll(
        `[data-tab-id="${tabBtn.dataset.tabTarget}"]`
      );
      for (const targetTab of targetTabs) {
        targetTab.style.opacity = 0;
        targetTab.style.display = null;
        await animate({
          draw(progress) {
            targetTab.style.opacity = progress;
          },
        });
        targetTab.style.opacity = null;
      }
    }

    animateTabs();

    // targetTabs.forEach(async (targetTab) => {
    //   targetTab.style.opacity = 0;
    //   targetTab.style.display = null;
    //   await animate({
    //     draw(progress) {
    //       targetTab.style.opacity = progress;
    //     },
    //   });
    //   targetTab.style.opacity = null;
    // });
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('DOMContentLoaded', () => {
    const var1 = document.querySelector(
      '.visit-home__tabs-full .tabs-nav__btn'
    );
    const var2 = document.querySelector('.visit-home__tabs-full .tabs-nav');
    moveCar(var1, var2);
  });
})();
