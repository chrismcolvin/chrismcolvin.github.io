document.addEventListener("DOMContentLoaded", function(){
    const nav = document.querySelector('nav');
    const photoNav = document.querySelector('.sub-nav.photo');
    const devNav = document.querySelector('.sub-nav.dev');
    const socialNav = document.querySelector('.sub-nav.social');
    const elseNav = document.querySelector('.sub-nav.else');

    document.getElementById('mobile-photo').addEventListener('click', function () {
        if(photoNav.classList.contains('active')) {
            photoNav.classList.remove('active');
            nav.classList.remove('active');
        } else {
            photoNav.classList.add('active');
            nav.classList.add('active');
        }

        //document.getElementById('mobile-photo').classList.add('no-hover');

        document.getElementById('mobile-dev_nav').classList.remove("active");
        document.getElementById('mobile-social_nav').classList.remove("active");
        document.getElementById('mobile-else_nav').classList.remove("active");
    });

    document.getElementById('mobile-dev').addEventListener('click', function () {
        if(devNav.classList.contains('active')) {
            devNav.classList.remove('active');
            nav.classList.remove('active');
        } else {
            devNav.classList.add('active');
            nav.classList.add('active');
        }

        //document.getElementById('mobile-dev').classList.add('no-hover');

        document.getElementById('mobile-photo_nav').classList.remove("active");
        document.getElementById('mobile-social_nav').classList.remove("active");
        document.getElementById('mobile-else_nav').classList.remove("active");
    });

    document.getElementById('mobile-social').addEventListener('click', function () {
        if(socialNav.classList.contains('active')) {
            socialNav.classList.remove('active');
            nav.classList.remove('active');
        } else {
            socialNav.classList.add('active');
            nav.classList.add('active');
        }

        //document.getElementById('mobile-social').classList.add('no-hover');

        document.getElementById('mobile-dev_nav').classList.remove("active");
        document.getElementById('mobile-photo_nav').classList.remove("active");
        document.getElementById('mobile-else_nav').classList.remove("active");
    });

    document.getElementById('mobile-else').addEventListener('click', function () {
        if(elseNav.classList.contains('active')) {
            elseNav.classList.remove('active');
            nav.classList.remove('active');
        } else {
            elseNav.classList.add('active');
            nav.classList.add('active');
        }

        //document.getElementById('mobile-else').classList.add('no-hover');

        document.getElementById('mobile-dev_nav').classList.remove("active");
        document.getElementById('mobile-social_nav').classList.remove("active");
        document.getElementById('mobile-photo_nav').classList.remove("active");
    });

    //slide stuff
    function randomSlider() {
        if(document.querySelector('.image-cycle .image-container.one')) {
            const slide1 = document.querySelector('.image-cycle .image-container.one');
            const slide2 = document.querySelector('.image-cycle .image-container.two');
            const slide3 = document.querySelector('.image-cycle .image-container.three');
            const slide4 = document.querySelector('.image-cycle .image-container.four');
            const slide5 = document.querySelector('.image-cycle .image-container.five');
            const slide6 = document.querySelector('.image-cycle .image-container.six');
            const slide7 = document.querySelector('.image-cycle .image-container.seven');
            const slide8 = document.querySelector('.image-cycle .image-container.eight');
            const slide9 = document.querySelector('.image-cycle .image-container.nine');
            const slide10 = document.querySelector('.image-cycle .image-container.ten');

            var slides = [
                slide1,
                slide2,
                slide3,
                slide4,
                slide5,
                slide6,
                slide7,
                slide8,
                slide9,
                slide10
            ];

            var randomSlide = slides[Math.floor(Math.random()*slides.length)];

            randomSlide.classList.add('active');
        }
    }
    randomSlider();

    //gallery images
    const galleryLinks = document.querySelectorAll('a.gallery-image_container');

    if(galleryLinks) {
        for (const link of galleryLinks) {
            link.addEventListener('click', function() {
                let fullImage = link.nextElementSibling;

                fullImage.classList.add('active');

                fullImage.addEventListener('click', function() {
                    fullImage.classList.remove('active');
                })
            })
        }
    }
});