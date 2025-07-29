
    const BASE_Z_INDEX = 300;
    // Переменные для меню 'Заказать звонок'
    const callOpen = document.querySelector(".callOpen");
    const callClose = document.querySelector(".call__close");
    const callMenu = document.querySelector(".call");
    // Переменные для меню 'Оставить заявку'
    const asideButton = document.querySelector(".bid");
    const asideBid = document.querySelector(".sidebar");
    const BidButton = document.querySelector(".sidebar__close");
    // Переменные для блюра области
    const pageOpacity = document.querySelectorAll(".page__opacity");
    const page = document.querySelector(".page");


    function openAside(menu, otherMenu) {
        const otherZIndex = parseInt(otherMenu.style.zIndex, 10) || 0;
        menu.style.zIndex = otherZIndex + 300;
        menu.style.animationName = "sidebarOpen";
        page.style.overflowY = "hidden";
        if (window.innerWidth >= 1440 ) {
            pageOpacity.forEach(part => {
                part.style.display = "auto";
                part.style.opacity = "0.2";
            });
            slideMenu.style.opacity = "0.2";
            slideMenu.style.pointerEvents = "none";

        }
    }

    function closeAside(menu) {
        menu.style.animationName = "sidebarClose";
        menu.style.zIndex = BASE_Z_INDEX;
        page.style.overflowY = "auto";
        if (slideMenu.style.animationName !== "slideMenuOpen") {
            pageOpacity.forEach(part => {
                part.style.opacity = "1";
                part.style.display = "block";
            });

        }
        slideMenu.style.opacity = "1";
        slideMenu.style.pointerEvents = "auto";
    }

    // Открывание и закрывание боковых меню
    callOpen.addEventListener("click", () => {
        openAside(callMenu, asideBid);
        if (window.innerWidth >= 768) {
            callClose.style.animationName = "forSidebarOpen";
        }
    });

    callClose.addEventListener("click", () => {
        closeAside(callMenu);
        if (window.innerWidth >= 768) {
            callClose.style.animationName = "forSidebarClose";
        }
    });
    pageOpacity.forEach(part => {
        part.addEventListener("click", () => {
            if(callMenu.style.animationName === "sidebarOpen") {
                closeAside(callMenu);
            }
            if(asideBid.style.animationName === "sidebarOpen") {
                closeAside(asideBid);
            }
                if(slideMenu.style.animationName === "slideMenuOpen") {
                    slideMenu.style.animationName = "slideMenuClose";
                        setTimeout(function() {
                            slideOpen.style.display = "flex";
                            slideOpen.style.animationName = "forOffSlide";
                        }, 400);

                }
                pageOpacity.forEach(part => {
                    part.style.opacity = "1";
                    page.style.overflowY = "auto";
            })

        })
    })

    asideButton.addEventListener("click", () => {
        openAside(asideBid, callMenu);
        if (window.innerWidth >= 768) {
            BidButton.style.animationName = "forSidebarOpen";
        }
    });

    BidButton.addEventListener("click", () => {
        closeAside(asideBid);
        if (window.innerWidth >= 768) {
            BidButton.style.animationName = "forSidebarClose";
        }
    });





// Боковое

var slideMenu = document.querySelector(".slide");
var content = document.querySelector(".page");
const slideOpen = document.querySelector(".off-slide");


    slideOpen.addEventListener("click", () => {
        slideOpen.style.display = "none";
        slideMenu.style.animationName = "slideMenuOpen";
        pageOpacity.forEach(part => {
            part.style.opacity = "0.2";

        });
        page.style.overflowY = "hidden";
    })





var closeMenu =document.querySelector(".top-board__button--left");

closeMenu.addEventListener("click", function() {
    slideMenu.style.animationName = "slideMenuClose";
        setTimeout(function() {
            slideOpen.style.display = "flex";
            slideOpen.style.animationName = "forOffSlide";
        }, 400);

    if (callMenu.style.animationName !== "sidebarOpen" && asideBid.style.animationName !== "sidebarOpen") {

        pageOpacity.forEach(part => {
            part.style.opacity = "1";
        })
    }
    page.style.overflowY = "auto";


})



// Swiper

function pageStart() {
    // Объявление основных переменных и запросов
    var swiper = null;
    var currentWidth = window.innerWidth;
    var timeoutId = null;
    var scroll = document.querySelector('.list');
    var scrollWriper = document.querySelector('.list-wrapper');
    var scrollSlide = document.querySelectorAll('.list-slide');

    //Функция инициализации Swiper
    function swiperInit() {
        if (window.innerWidth < 768) {
            scroll.classList.add('swiper');
            scrollWriper.classList.add('swiper-wrapper');
            scrollSlide.forEach(slide => {
                slide.classList.add('swiper-slide')
            })
            swiper = new Swiper('.swiper', {
                slidesPerView: 'auto',  // Автоподбор ширины слайдов
                spaceBetween: 8,       // Фиксированный отступ между слайдами (в пикселях)
                freeMode: true,         // Плавное перетаскивание
                mousewheel: true,       // Прокрутка колесиком мыши
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }

            })
        } else {
            swiperDestroy()
        }
    }

    //Функция удаления Swiper
    function swiperDestroy() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;

            scroll.classList.remove('swiper');
            scrollWriper.classList.remove('swiper-wrapper');
            scrollSlide.forEach(slide => {
                slide.classList.remove('swiper-slide')
            })

        }
    }
    //Функция отслеживания текущего разрешения окна
    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (window.innerWidth !== currentWidth) {
                currentWidth = window.innerWidth;
                swiperDestroy();
                swiperInit();
            }
        }, 1);
    };

    return {
        init: () => {
            swiperInit();
            window.addEventListener('resize', handleResize);
        },
        destroy: () => {
            window.removeEventListener('resize', handleResize);
            swiperDestroy();
        }
    };

}
const pageControl = pageStart();
pageControl.init();
// Обработка нажатий кнопок
var hiddenSlide = document.querySelector('.list-wrapper');
var moreButton = document.querySelector('.more__button');
var labelButton = document.querySelector('.more__label');


moreButton.addEventListener('click' , function(evt) {
    evt.preventDefault();

    if (labelButton.textContent === "Скрыть") {
        labelButton.textContent = "Показать все";
        hiddenSlide.style.height = "160px";
        moreButton.classList.toggle('arrow--top');



    } else if (labelButton.textContent === "Показать все") {
        labelButton.textContent = "Скрыть";
        hiddenSlide.style.height = "auto";
        moreButton.classList.toggle('arrow--top');

    }
});


// Swiper 2



