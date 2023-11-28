export function initializeSwiper() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        let materialsTypesSwiper = new Swiper(".materials-types-swiper", {
            slidesPerView: 1,
            pagination: {
                el: ".materials-types-pagination",
                clickable: true,
            },
        });

        let ourWorksSwiper = new Swiper(".our-works-swiper", {
            slidesPerView: 1,
            grid: {
                rows: 2,
            },
            spaceBetween: 20,
            pagination: {
                el: ".our-works-pagination",
                clickable: true,
            },
            breakpoints: {
                500: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            }
        });

        let technicalCapabilitiesSwiper = new Swiper(".technical-capabilities-swiper", {
            slidesPerView: 1,
            pagination: {
                el: ".technical-capabilities-pagination",
                clickable: true,
            },
        });
    }
}