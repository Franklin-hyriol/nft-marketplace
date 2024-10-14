$(document).ready(function () {
    $('.items_slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: $(".slick_custom_prev"),
        nextArrow: $(".slick_custom_next"),
        appendDots: $('.slick_dots_container'),
        responsive: [
            {
                breakpoint: 1640,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1330,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1015,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    });
});