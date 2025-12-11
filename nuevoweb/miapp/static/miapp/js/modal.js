document.addEventListener('DOMContentLoaded', function() {
    // Mostrar modal automáticamente
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    // Inicializar Swiper
    var swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
});