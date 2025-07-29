function conditionsStart() {
    // Объявление основных переменных и запросов
    var swiperConditions = null;
    var currentWidth = window.innerWidth;
    var timeoutId = null;
    var scrollConditions = document.querySelector('.conditions');
    var scrollWriperConditions = document.querySelector('.conditions-wrapper');
    var scrollSlideConditions = document.querySelectorAll('.conditions-slide');

    //Функция инициализации Swiper
    function swiperConditionsInit() {
        if (window.innerWidth < 768) {
            scrollConditions.classList.add('swiper__conditions');
            scrollWriperConditions.classList.add('swiper-wrapper');
            scrollSlideConditions.forEach(slide => {
                slide.classList.add('swiper-slide')
            })
            swiperConditions = new Swiper('.swiper__conditions', {
                slidesPerView: 'auto',  // Автоподбор ширины слайдов
                spaceBetween: 16,       // Фиксированный отступ между слайдами (в пикселях)
                freeMode: true,         // Плавное перетаскивание
                mousewheel: true,       // Прокрутка колесиком мыши
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }

            })
        } else {
            swiperConditionsDestroy()
        }
    }

    //Функция удаления Swiper
    function swiperConditionsDestroy() {
        if (swiperConditions) {
            swiperConditions.destroy(true, true);
            swiperConditions = null;

            scrollConditions.classList.remove('swiper__conditions');
            scrollWriperConditions.classList.remove('swiper-wrapper');
            scrollSlideConditions.forEach(slide => {
                slide.classList.remove('swiper-slide')
            })

        }
    }
    //Функция отслеживания текущего разрешения окна
    const handleResizeConditions = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (window.innerWidth !== currentWidth) {
                currentWidth = window.innerWidth;
                swiperConditionsDestroy();
                swiperConditionsInit();
            }
        }, 1);
    };

    return {
        init: () => {
            swiperConditionsInit();
            window.addEventListener('resize', handleResizeConditions);
        },
        destroy: () => {
            window.removeEventListener('resize', handleResizeConditions);
            swiperConditionsDestroy();
        }
    };

}
const conditionsControl = conditionsStart();
conditionsControl.init();
// Обработка нажатий кнопок
