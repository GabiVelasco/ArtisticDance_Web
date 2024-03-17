/**
 * Adds event listeners to execute certain actions when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Selects all sections in the document and performs actions on each section.
     */
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        // Selecting elements within each section
        const button = section.querySelector('button');
        const close = section.querySelector('.close');
        const slides = section.querySelectorAll('.inner1, .inner2'); // Corrected selector for slides

        /**
         * Adds a click event listener to the button to trigger certain actions.
         * - Locks the body scroll
         * - Scrolls to the current section smoothly
         * - Adds transition classes to the section
         */
        button.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth',
            });
            section.classList.add('transition', 'animate');
            setTimeout(() => {
                section.classList.add('animate-completed');
            }, 1000);
        });

        /**
         * Adds a click event listener to the close button to trigger certain actions.
         * - Unlocks the body scroll
         * - Removes transition and animation classes from the section
         */
        close.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            section.classList.remove('animate-completed');
            setTimeout(() => {
                section.classList.remove('animate');
            }, 100);
        });

        // JavaScript for slide functionality
        let currentSlideIndex = 0;

        /**
         * Adds swipeLeft event listener to navigate to the previous slide.
         */
        section.addEventListener('swipeLeft', () => { // Corrected swipe event name
            navigateSlide('prev'); // Changed direction for swipeLeft
        });

        /**
         * Adds swipeRight event listener to navigate to the next slide.
         */
        section.addEventListener('swipeRight', () => { // Corrected swipe event name
            navigateSlide('next'); // Changed direction for swipeRight
        });

        /**
         * Navigates to the next or previous slide based on the direction provided.
         * @param {string} direction - Direction to navigate ('next' or 'prev').
         */
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
    sections.forEach(section => {
        let initialX = null;
        let initialY = null;

        /**
         * Adds touchstart event listener to detect the initial touch position.
         */
        section.addEventListener('touchstart', e => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        });

        /**
         * Adds touchmove event listener to detect the touch movement and navigate between sections.
         */
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

    /**
     * Navigates to the next or previous section based on the direction provided.
     * @param {HTMLElement} currentSection - Current section element.
     * @param {string} direction - Direction to navigate ('next' or 'prev').
     */
    function navigateSection(currentSection, direction) {
        const sections = document.querySelectorAll('section');
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

/* slides w3schools*/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/* slides w3schools end*/