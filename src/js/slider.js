/* eslint-disable */
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

let objectSliders = [];
const saleCards = document.querySelectorAll('.a-sale__cards');
if (saleCards) {
    saleCards.forEach((element, index) => {
        const btnPrev = element.querySelector('.slider-navigation_prev');
        const btnNext = element.querySelector('.slider-navigation_next');
        const saleSlider = element.querySelector('.a-sale__slider');
        const swiperParams = {
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
        };
        if (saleSlider.classList.contains('a-main__slider')) {
            swiperParams.breakpoints = {
                1001: {
                    slidesPerView: '3',
                },
                768: {
                    slidesPerView: '2',
                },
                360: {
                    slidesPerView: '1.5',
                    spaceBetween: 10,
                },
                300: {
                    slidesPerView: '1',
                    spaceBetween: 10,
                },
            };
        }
        objectSliders[index] = new Swiper(saleSlider, swiperParams);
    });
}

// const doctorSlider = new Swiper('.form-slider', {
//     modules: [Navigation],
//     slidesPerView: '1',
//     spaceBetween: 10,
//     navigation: {
//         prevEl: '.slider-navigation_prev',
//         nextEl: '.slider-navigation_next',
//     },
//     observer: true,
//     observeParents: true,
//     observeSlideChildren: true,
//     grabCursor: true,
//     loop: false,
//     slideToClickedSlide: true,
//     breakpoints: {
//         1308: {
//             slidesPerView: '1',
//         },
//         // 401: {
//         //   slidesPerView: '2',
//         // },
//         // 300: {
//         //   slidesPerView: '2',
//         // },
//         300: {
//             slidesPerView: '1',
//         },
//     },
// });

// setTimeout(() => {
//     const doctorSlider = new Swiper('.form-slider', {
//         modules: [Navigation],
//         slidesPerView: '1',
//         spaceBetween: 10,
//         navigation: {
//             prevEl: '.slider-navigation_prev',
//             nextEl: '.slider-navigation_next',
//         },
//         observer: true,
//         observeParents: true,
//         observeSlideChildren: true,
//         grabCursor: true,
//         loop: false,
//         slideToClickedSlide: true,
//         watchOverflow: true,
//         breakpoints: {
//             1308: {
//                 slidesPerView: '1',
//             },
//             300: {
//                 slidesPerView: '1',
//             },
//         },
//     });
// }, 10000);

const askExpertsSlider = new Swiper('.ask-experts__body', {
    modules: [Navigation],
    slidesPerView: '4.5',
    spaceBetween: 28,
    navigation: {
        prevEl: document.querySelector('.ask-experts .slider-navigation_prev'),
        nextEl: document.querySelector('.ask-experts .slider-navigation_next'),
    },
    noSwiping: true,
    noSwipingSelector: '.experts-cards__btn',
    grabCursor: true,
    slideToClickedSlide: true,
    breakpoints: {
        1308: {
            slidesPerView: '4.5',
        },
        901: {
            slidesPerView: '3.5',
            spaceBetween: 20,
        },
        701: {
            slidesPerView: '2.8',
        },
        450: {
            slidesPerView: '2',
        },
        400: {
            slidesPerView: '1.8',
        },
        300: {
            slidesPerView: '1.4',
        },
    },
});
const corporateSlider = new Swiper('.corporate-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: '5',
    spaceBetween: 40,
    navigation: {
        prevEl: document.querySelector('.slider-navigation_prev'),
        nextEl: document.querySelector('.slider-navigation_next'),
    },
    pagination: {
        el: '.corporate-pagination',
    },
    noSwiping: true,
    // noSwipingSelector: '.experts-cards__btn',
    grabCursor: true,
    slideToClickedSlide: true,
    breakpoints: {
        1308: {
            slidesPerView: '5',
        },
        901: {
            slidesPerView: '4',
            spaceBetween: 20,
        },
        701: {
            slidesPerView: '3',
        },
        450: {
            slidesPerView: '2',
        },
        400: {
            slidesPerView: '1',
        },
        300: {
            slidesPerView: '1',
        },
    },
});
const mainBannerSlider = new Swiper('.main-banner__slider', {
    modules: [Pagination, Autoplay],
    slidesPerView: '1',
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
        el: '.main-banner-pagination',
        type: 'bullets',
    },
    noSwiping: true,
    grabCursor: true,
    slideToClickedSlide: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        // 1308: {
        //     slidesPerView: '5',
        // },
        // 901: {
        //     slidesPerView: '4',
        //     spaceBetween: 20,
        // },
        // 701: {
        //     slidesPerView: '3',
        // },
        // 450: {
        //     slidesPerView: '2',
        // },
        // 400: {
        //     slidesPerView: '1',
        // },
        300: {
            slidesPerView: '1',
        },
    },
});
