function equipmentStart() {
    // Объявление основных переменных и запросов
    var swiperEquipment = null;
    var currentWidth = window.innerWidth;
    var timeoutId = null;
    var scrollEquipment = document.querySelector('.equipment');
    var scrollWriperEquipment = document.querySelector('.equipment-wrapper');
    var scrollSlideEquipment = document.querySelectorAll('.equipment-slide');

    //Функция инициализации Swiper
    function swiperEquipmentInit() {
        if (window.innerWidth < 768) {
            scrollEquipment.classList.add('swiper__equipment');
            scrollWriperEquipment.classList.add('swiper-wrapper');
            scrollSlideEquipment.forEach(slide => {
                slide.classList.add('swiper-slide')
            })
            swiperEquipment = new Swiper('.swiper__equipment', {
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
            swiperEquipmentDestroy()
        }
    }

    //Функция удаления Swiper
    function swiperEquipmentDestroy() {
        if (swiperEquipment) {
            swiperEquipment.destroy(true, true);
            swiperEquipment = null;

            scrollEquipment.classList.remove('swiper__equipment');
            scrollWriperEquipment.classList.remove('swiper-wrapper');
            scrollSlideEquipment.forEach(slide => {
                slide.classList.remove('swiper-slide')
            })

        }
    }
    //Функция отслеживания текущего разрешения окна
    const handleResizeEquipment = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (window.innerWidth !== currentWidth) {
                currentWidth = window.innerWidth;
                swiperEquipmentDestroy();
                swiperEquipmentInit();
            }
        }, 1);
    };

    return {
        init: () => {
            swiperEquipmentInit();
            window.addEventListener('resize', handleResizeEquipment);
        },
        destroy: () => {
            window.removeEventListener('resize', handleResizeEquipment);
            swiperEquipmentDestroy();
        }
    };

}
const equipmentControl = equipmentStart();
equipmentControl.init();
// Обработка нажатий кнопок
var hiddenEquipment = document.querySelector('.equipment-wrapper');
var equipmentButton = document.querySelector('.more__equipment');
var labelEquipment = document.querySelector('.equipment__label');


equipmentButton.addEventListener('click' , function(evt) {
    evt.preventDefault();

    if (labelEquipment.textContent === "Скрыть") {
        labelEquipment.textContent = "Показать все";
        hiddenEquipment.style.height = "180px";
        equipmentButton.classList.toggle('arrow--top');


    } else if (labelEquipment.textContent === "Показать все") {
        labelEquipment.textContent = "Скрыть";
        hiddenEquipment.style.height = "auto";
        equipmentButton.classList.toggle('arrow--top');
    }
});