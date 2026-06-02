'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('#burgerToggle');
    const nav = document.querySelector('#navMenu');
    const modal = document.querySelector('#registrationModal');
    const scrollTop = document.querySelector('#scrollTop');
    const reviewsSwiper = document.querySelector('.reviews-swiper');
    const modalForm = document.querySelector('.modal-form');
    const newsletterForm = document.querySelector('.newsletter form');
    const cookiesBanner = document.querySelector('#cookiesBanner');
    const cookiesForm = document.querySelector('#cookiesForm');
    const cookiesAcceptAll = document.querySelector('#cookiesAcceptAll');
    const cookiesRejectAll = document.querySelector('#cookiesRejectAll');
    const cookiesSettings = document.querySelector('#cookiesSettings');

    const toggleMenu = (isOpen) => {
        if (nav) {
            nav.classList.toggle('is-active', isOpen);
        }
        document.body.classList.toggle('menu-open', isOpen);
    };

    const toggleModal = (isOpen) => {
        if (modal) {
            modal.classList.toggle('is-open', isOpen);
        }
        document.body.classList.toggle('modal-open', isOpen);
        if (isOpen) {
            toggleMenu(false);
        }
    };

    if (localStorage.getItem('isAccepted') !== 'true') {
        cookiesBanner.style.display = 'flex';
    }

    cookiesAcceptAll.addEventListener('click', () => {
        localStorage.setItem('isAccepted', 'true');
        cookiesBanner.style.display = 'none';
    });

    cookiesRejectAll.addEventListener('click', () => {
        localStorage.setItem('isAccepted', 'false');
        cookiesBanner.style.display = 'none';
    });

    if (burger) {
        burger.addEventListener('click', () => {
            const isActive = nav && nav.classList.contains('is-active');
            toggleMenu(!isActive);
        });
    }

    if (nav) {
        nav.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            if (target.dataset.openModal) {
                toggleModal(true);
            } 
            else if (target.tagName === 'A' && window.innerWidth <= 768) {
                toggleMenu(false);
            }
        });
    }

    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
        btn.addEventListener('click', () => toggleModal(true));
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', () => toggleModal(false));
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                toggleModal(false);
            }
        });
    }

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modalForm.reset();
            toggleModal(false);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMenu(false);
            toggleModal(false);
        }
    });

    window.addEventListener('scroll', () => {
        if (scrollTop) {
            scrollTop.classList.toggle('is-visible', window.scrollY > 300);
        }
    }, { passive: true });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (reviewsSwiper && typeof Swiper !== 'undefined') {
        new Swiper(reviewsSwiper, {
            slidesPerView: 1,
            spaceBetween: 24,
            grabCursor: true,
            pagination: {
                el: '.reviews-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 28 },
                1083: { slidesPerView: 3, spaceBetween: 32 },
            },
        });
    } else {
        if (reviewsSwiper) {
            reviewsSwiper.classList.add('is-fallback');
        }
    }

    if (cookiesForm) {
        updateCookieForm();
    }
    showCookiesBanner();
});