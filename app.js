document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const button = section.querySelector('button');
        const close = section.querySelector('.close');

        button.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth',
            })
            section.classList.add('transition', 'animate');
            setTimeout(() => {
                section.classList.add('animate-completed');
            }, 1000)
        });

        close.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            section.classList.remove('animate-completed');
            setTimeout(() => {
                section.classList.remove('animate');
            }, 100);
        });

        // JavaScript for slide functionality
        const slides = section.querySelectorAll('.slide');
        let currentSlideIndex = 0;

        section.addEventListener('swipeleft', () => {
            navigateSlide('next');
        });

        section.addEventListener('swiperight', () => {
            navigateSlide('prev');
        });

        function navigateSlide(direction) {
            if (direction === 'next') {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            } else {
                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            }

            slides.forEach((slide, index) => {
                if (index === currentSlideIndex) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
    });

    // JavaScript for swipe functionality between sections
    const innerSections = document.querySelectorAll('.inner');
    innerSections.forEach(section => {
        let initialX = null;
        let initialY = null;

        section.addEventListener('touchstart', e => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        });

        section.addEventListener('touchmove', e => {
            if (!initialX || !initialY) {
                return;
            }

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;

            const diffX = initialX - currentX;
            const diffY = initialY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    // Swipe left
                    navigateSection(section, 'next');
                } else {
                    // Swipe right
                    navigateSection(section, 'prev');
                }
            }

            initialX = null;
            initialY = null;
        });
    });

    function navigateSection(currentSection, direction) {
        const sections = document.querySelectorAll('.inner');
        const currentIndex = Array.from(sections).indexOf(currentSection);

        let nextIndex;
        if (direction === 'next') {
            nextIndex = currentIndex === sections.length - 1 ? 0 : currentIndex + 1;
        } else {
            nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        }

        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }

});
