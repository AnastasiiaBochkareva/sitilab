/* eslint-disable */
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const analysisSaleSlider = new Swiper('.a-sale__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: '3',
  spaceBetween: 20,
  navigation: {
    prevEl: 'slider-navigation_prev',
    nextEl: 'slider-navigation_next',
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  grabCursor: true,
  slideToClickedSlide: true,
  pagination: {
    el: '.slider-pagination',
    type: 'bullets',
  },
  breakpoints: {
    1440: {
      slidesPerView: '3',
      spaceBetween: 20,
    },
    900: {
      slidesPerView: '3',
    },
    500: {
      slidesPerView: '2',
    },
    300: {
      slidesPerView: '1',
      spaceBetween: 10,
    },
  },
});
