document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('.slider-swiper .swiper-slide img');
  var loadedImages = 0;
  var totalImages = images.length;

  // Espera a que todas las imágenes se carguen antes de inicializar Swiper
  images.forEach(function(img) {
    if (img.complete) {
      loadedImages++;
      checkInit();
    } else {
      img.onload = function() {
        loadedImages++;
        checkInit();
      };
    }
  });

  function checkInit() {
    if (loadedImages === totalImages) {
      var swiperSlider = new Swiper('.slider-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        grabCursor: true,           // permite arrastrar
        simulateTouch: true,        // arrastre en escritorio
        autoHeight: true,           // altura automática
        watchSlidesProgress: true,  // detecta slide activo
        watchSlidesVisibility: true,
        threshold: 20,              // distancia mínima de arrastre para cambiar slide
        touchStartPreventDefault: false,
      });

      // Actualiza altura y paginación después de cualquier cambio de slide
      swiperSlider.on('slideChangeTransitionEnd', function() {
        swiperSlider.updateAutoHeight();
      });

      // Asegura altura correcta al finalizar arrastre
      swiperSlider.on('touchEnd', function() {
        swiperSlider.updateAutoHeight();
      });
    }
  }
});