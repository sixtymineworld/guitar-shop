'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const burgerToggle = document.querySelector('#burgerToggle');
    const navMenu = document.querySelector('#navMenu');
    const modal = document.querySelector('#registrationModal');
    const scrollTop = document.querySelector('#scrollTop');
    const modalForm = modal?.querySelector('#form');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const setMenuState = (isOpen) => {
        navMenu.classList.toggle('is-active', isOpen);
        burgerToggle.setAttribute('aria-expanded', String(isOpen));
        burgerToggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
        document.body.classList.toggle('menu-open', isOpen);
    };

    const setModalState = (isOpen) => {
        modal.classList.toggle('is-open', isOpen);
        modal.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('modal-open', isOpen);

        if (isOpen) {
            setMenuState(false);
            window.requestAnimationFrame(() => modal?.querySelector('input')?.focus());
        }
    };

    burgerToggle?.addEventListener('click', () => {
        setMenuState(!navMenu?.classList.contains('is-active'));
    });

    navMenu?.addEventListener('click', (event) => {
        const target = event.target.closest('a, button');

        if (!target) {
            return;
        }

        if (target.matches('[data-open-modal]')) {
            setModalState(true);
            return;
        }

        if (target.matches('a') && mobileQuery.matches) {
            setMenuState(false);
        }
    });

    document.querySelectorAll('[data-open-modal]').forEach((button) => {
        button.addEventListener('click', () => setModalState(true));
    });

    document.querySelectorAll('[data-close-modal]').forEach((button) => {
        button.addEventListener('click', () => setModalState(false));
    });

    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            setModalState(false);
        }
    });

    modalForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        modalForm.reset();
        setModalState(false);
    });

    document.querySelector('.newsletter form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        event.currentTarget.reset();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
            setModalState(false);
        }
    });

    window.addEventListener('scroll', () => {
        scrollTop?.classList.toggle('is-visible', window.scrollY > 300);
    }, { passive: true });

    scrollTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const reviewsSwiper = document.querySelector('.reviews-swiper');

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
                768: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                },
                1083: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
        });
    } else {
        reviewsSwiper?.classList.add('is-fallback');
    }
});