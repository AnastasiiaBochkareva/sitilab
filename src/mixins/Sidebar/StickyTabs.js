/* eslint-disable */
const stickyTab = document.querySelector('.sticky-tab');
const stickyTabParent = stickyTab.parentElement;
const container = document.querySelector('.a-services .a-inner-container');
const activeClass = 'sticky-tab-active';
const opacityClass = 'sticky-tab-opacity';
const additionalClasses = ['a-container-fix'];

let headerHeight = document.querySelector('.header')?.clientHeight;

let isWaitPromise = false;
let isSetListener = false;

const urlSearch = new URL(window.location.href);
const debug = urlSearch.searchParams.get('debug') === '1';

function stickyLog(data) {
  if (debug) {
    console.log(data);
  }
}

function getElementDistanceFromTop(element) {
  var distance = 0;
  while (element) {
    distance += element.offsetTop;
    element = element.offsetParent;
  }
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return distance - scrollTop;
}

function waitForTransitionEnd(element) {
  return new Promise(function (resolve) {
    if (isSetListener) return;

    function transitionEndHandler(event) {
      if (event.propertyName === 'opacity') {
        resolve();
        element.removeEventListener('transitionend', transitionEndHandler);

        isSetListener = false;
      }
    }

    isSetListener = true;

    element.addEventListener('transitionend', transitionEndHandler);

    stickyLog('removeFixed UseOpacity WAITING');
  });
}

function needShowStickyTab() {
  let needState = 'init';

  const topPosition = stickyTabParent.getBoundingClientRect().top;
  const containerIsHide =
    container.getBoundingClientRect().top + container.clientHeight <=
    headerHeight;

  if (topPosition <= headerHeight && !containerIsHide) {
    needState = 'show';
  } else if (containerIsHide) {
    needState = 'hide-opacity';
  } else {
    needState = 'hide';
  }

  return needState;
}

function addFixed(element) {
  if (element.classList.contains(activeClass)) return;
  stickyLog('addFixed');
  if (isWaitPromise) return;

  element.classList.remove(opacityClass);
  element.classList.add(activeClass);

  additionalClasses.forEach((className) => element.classList.add(className));

  element.style.top = `${headerHeight}px`;
}

function removeFixed(element, isUseOpacity = false) {
  if (isUseOpacity) {
    if (!element.classList.contains(opacityClass)) {
      element.classList.add(opacityClass);
    } else {
      return;
    }

    stickyLog('removeFixed UseOpacity');

    isWaitPromise = true;

    waitForTransitionEnd(element)
      .then(() => {
        if (element.classList.contains(activeClass)) {
          element.classList.remove(activeClass);
          element.classList.remove(opacityClass);
          additionalClasses.forEach((className) =>
            element.classList.remove(className)
          );

          element.style.top = null;

          isWaitPromise = false;
          stickyLog('removeFixed UseOpacity THEN');
        }
      })
      .finally(() => {
        isWaitPromise = false;
      });
  } else {
    stickyLog('removeFixed');

    element.style.top = null;

    element.classList.remove(activeClass);
    element.classList.remove(opacityClass);
    additionalClasses.forEach((className) =>
      element.classList.remove(className)
    );
  }
}

function handleEvent() {
  if (document.querySelector('.header')) {
    headerHeight = document.querySelector('.header').clientHeight;
  }

  switch (needShowStickyTab()) {
    case 'init':
      break;
    case 'show':
      addFixed(stickyTab);
      break;
    case 'hide-opacity':
      removeFixed(stickyTab, true);
      break;
    case 'hide':
      removeFixed(stickyTab);
      break;
  }
}

if (stickyTab) {
  document.addEventListener('scroll', handleEvent);
  window.addEventListener('resize', handleEvent);
}
