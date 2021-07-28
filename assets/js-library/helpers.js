/**
 * Return true if all provided objects are neither null nor undefined.
 * @param {any[]} objects which should be neither undefined not null
 * @returns {boolean} true if all objects are neither undefined nor null
 */
export const has = (...objects) => {
    for (const object of objects) {
        if (typeof object === "undefined" || object === null) {
            return false;
        }
    }
    return true;
};

/**
 * Marks the first slide of the bootstrap slider as active.
 */
export function makeFirstSlideOfSlidersActive(
    {
        sliderSelector,
        slideSelector
    } =
        {
            sliderSelector: '[data-ride="carousel"]',
            slideSelector: '.carousel-item'
        }
) {
    const allSlider = document.querySelectorAll(sliderSelector);
    for (const slider of allSlider) {
        const slide = slider.querySelector(slideSelector);
        if (has(slide)) {
            slide.classList.add("active");
        }
    }
}

//Initialize Lightbox, so lightbox items using same image like image inside.
export function initializeGalleryLightbox() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === "src") {
                const lightboxItem = mutation.target.closest('[data-lightbox]');
                if (has(lightboxItem)) {
                    lightboxItem.setAttribute('href', mutation.target.getAttribute('src'));
                }
            }
        }
    });
    const lightboxItems = document.querySelectorAll('[data-lightbox]');
    for (const lightboxItem of lightboxItems) {
        const image = lightboxItem.querySelector('img');
        if (!has(image)) {
            continue;
        }
        observer.observe(image, {
            attributes: true
        });
        const imageSrc = image.getAttribute('src');
        if (!has(imageSrc)) {
            continue;
        }
        lightboxItem.setAttribute('href', imageSrc);
    }
}

//This function will initialize swiper for all elements which have this selector.
export function initializeSwiper(
    {
        parentElementSelector: parentElementSelector,
        selector: selector,
        nextButtonSelector: nextButtonSelector,
        previousButtonSelecor: previousButtonSelecor,
        slidesPerView: slidesPerView,
        breakpoints: breakpoints
    } =
    {
        parentElementSelector: '.swiper-parent',
        selector: '.swiper-container',
        nextButtonSelector: undefined,
        previousButtonSelecor: undefined,
        slidesPerView: 1,
        breakpoints: {
            600: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1100: {
                slidesPerView: 5,
            },
            1300: {
                slidesPerView: 6,
            },
            1510: {
                slidesPerView: 7,
            }
        }
    }
) {
    const swiperContainers = document.querySelectorAll(selector);
    for(const swiperContainer of swiperContainers){
        let nextButtonElement;
        let previousButtonElement;
        if(has(nextButtonSelector)){
            nextButtonElement = swiperContainer.closest(parentElementSelector).querySelector(nextButtonSelector);
        }
        if(has(previousButtonSelecor)){
            previousButtonElement = swiperContainer.closest(parentElementSelector).querySelector(previousButtonSelecor);
        }
        const swiper = new Swiper(swiperContainer, {
            autoHeight: true,
            slidesPerView: slidesPerView,
            breakpoints: breakpoints,
            navigation: {
                nextEl: nextButtonElement,
                prevEl: previousButtonElement,
            },
    
        });
    }
}