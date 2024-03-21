function changeSidebarPosition() {
  const sidebarList = document.querySelector('.sidebar-list');
  const body = document.querySelector('body');
  if (window.innerWidth < 900) {
    const headerHeight = document.querySelector('.header')?.clientHeight;
    if (headerHeight) {
      sidebarList.style.top = `${headerHeight}px`;
      sidebarList.style.height = `calc(100% - ${headerHeight}px`;
    }
  } else {
    if (body.classList.contains('sidebarOpened')) {
      body.classList.remove('sidebarOpened');
    }
    sidebarList.style.top = null;
    sidebarList.style.height = null;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  changeSidebarPosition();
  window.addEventListener('resize', changeSidebarPosition);

  document.addEventListener('click', (event) => {
    const { target } = event;
    const sidebarOpenBtn = target.closest('.a-show-more__btn');
    if (sidebarOpenBtn) {
      body.classList.add('sidebarOpened');
    }
    const sidebarCloseBtn = target.closest('.sidebar-btn__close');
    if (sidebarCloseBtn) {
      body.classList.remove('sidebarOpened');
    }
  });
});
