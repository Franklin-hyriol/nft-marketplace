// Scroll Top
(function ($) {
    $(document).ready(function () {
        let calcScrollValue = () => {
            let scrollProgress = document.getElementById("progress");
            let progressValue = document.getElementById("progress-value");
            let pos = document.documentElement.scrollTop;
            let calcHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            let scrollValue = Math.round((pos * 100) / calcHeight);
            if (pos > 100) {
                scrollProgress.style.display = "grid";
            } else {
                scrollProgress.style.display = "none";
            }
            scrollProgress.addEventListener("click", () => {
                document.documentElement.scrollTop = 0;
            });
            scrollProgress.style.background = `conic-gradient(#0058e7 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
        };

        window.onscroll = calcScrollValue;
        window.onload = calcScrollValue;

        $('#progress').click(function (event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                $('html, body').animate({
                    scrollTop: $('body, html').offset().top
                }, 1000); // Durée du défilement en millisecondes
        });
    });
})(jQuery);


 