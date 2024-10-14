$(document).ready(function () {

    function handleScroll() {
        if ($(window).width() > 1024) {
            let $headerElement = $(".header");
            let $main = $(".main");
            if ($headerElement.length) {
                if ($(window).scrollTop() > 20) {
                    $headerElement.addClass("header--scrolled");
                    $main.addClass("header--scrolled");
                } else {
                    $headerElement.removeClass("header--scrolled");
                    $main.removeClass("header--scrolled");
                }
            } else {
                return;
            }
        }
    }

    $(window).on("scroll", handleScroll);

    function toggleMenu() {
        let $buttonOpen = $(".header_right_menu_btn");
        let $buttonClose = $(".menu-close");
        let $menu = $(".menu-mobile");

        $buttonOpen.on("click", function () {
            $menu.addClass("menu-mobile--active");
            $("body").addClass("body-overlay");
        });

        $buttonClose.on("click", function () {
            $menu.removeClass("menu-mobile--active");
            $("body").removeClass("body-overlay");
        });

        // Fermer le menu si on clique sur le body et le menu est ouvert
        $("body").on("click", function (event) {
            if ($menu.hasClass("menu-mobile--active") && !$(event.target).closest(".menu-mobile, .header_right_menu_btn").length) {
                $menu.removeClass("menu-mobile--active");
                $("body").removeClass("body-overlay");
            }
        });
    }


    toggleMenu();

});
