const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        }
    });
});

function setupCarousel(carouselSelector) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-btn.next');
    const prevButton = carousel.querySelector('.carousel-btn.prev');

    function setSlidePositions() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    }

    setSlidePositions();

    function moveToSlide(currentSlide, targetSlide) {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        if (!nextSlide) {
            nextSlide = slides[0];
        }
        moveToSlide(currentSlide, nextSlide);
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
        }
        moveToSlide(currentSlide, prevSlide);
    });

    window.addEventListener('resize', () => {
        setSlidePositions();
        const currentSlide = track.querySelector('.current-slide');
        track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    });
}



setupCarousel('.carousel:not(.gallery-carousel)');
setupCarousel('.gallery-carousel'); 