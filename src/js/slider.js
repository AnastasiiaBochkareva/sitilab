/* eslint-disable */
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let objectSliders = [];
const saleCards = document.querySelectorAll('.a-sale__cards');
if (saleCards) {
  saleCards.forEach((element, index) => {
    const btnPrev = element.querySelector('.slider-navigation_prev');
    const btnNext = element.querySelector('.slider-navigation_next');
    const saleSlider = element.querySelector('.a-sale__slider');
    objectSliders[index] = new Swiper(saleSlider, {
      modules: [Navigation],
      slidesPerView: '3',
      spaceBetween: 20,
      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext,
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      grabCursor: true,
      slideToClickedSlide: true,
      breakpoints: {
        1440: {
          slidesPerView: '3',
          spaceBetween: 20,
        },
        1000: {
          slidesPerView: '3',
        },
        800: {
          slidesPerView: '2.1',
        },
        375: {
          slidesPerView: '1.5',
          spaceBetween: 10,
        },
        300: {
          slidesPerView: '1.1',
          spaceBetween: 10,
        },
      },
    });
  });
}

const doctorSlider = new Swiper('.form-slider', {
  modules: [Navigation],
  slidesPerView: '1',
  spaceBetween: 10,
  navigation: {
    prevEl: '.slider-navigation_prev',
    nextEl: '.slider-navigation_next',
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  grabCursor: true,
  slideToClickedSlide: true,
  breakpoints: {
    1308: {
      slidesPerView: '1',
    },
    401: {
      slidesPerView: '2',
    },
    300: {
      slidesPerView: '2',
    },
  },
});
