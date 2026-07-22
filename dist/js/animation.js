document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Header Scroll Effect (Floating Nav)
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const galleryCarousel = document.querySelector('[data-gallery-carousel]');
    const galleryTrack = document.querySelector('[data-gallery-track]');
    const galleryPrev = document.querySelector('[data-gallery-prev]');
    const galleryNext = document.querySelector('[data-gallery-next]');
    if (galleryCarousel && galleryTrack && galleryPrev && galleryNext) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let autoplayId = null;

        const getStep = () => {
            const firstCard = galleryTrack.querySelector('.gallery-card');
            if (!firstCard) {
                return 0;
            }

            const styles = window.getComputedStyle(galleryTrack);
            const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
            return firstCard.getBoundingClientRect().width + gap;
        };

        const getMaxScroll = () => Math.max(0, galleryTrack.scrollWidth - galleryTrack.clientWidth);

        const scrollGallery = (direction) => {
            const step = getStep();
            const maxScroll = getMaxScroll();
            if (!step || maxScroll === 0) {
                return;
            }

            const nextLeft = galleryTrack.scrollLeft + (step * direction);

            if (direction > 0 && nextLeft >= maxScroll - 2) {
                galleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
                return;
            }

            if (direction < 0 && galleryTrack.scrollLeft <= 2) {
                galleryTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
                return;
            }

            galleryTrack.scrollBy({ left: step * direction, behavior: 'smooth' });
        };

        const restartAutoplay = () => {
            if (autoplayId) {
                window.clearInterval(autoplayId);
                autoplayId = null;
            }

            if (!prefersReducedMotion) {
                autoplayId = window.setInterval(() => scrollGallery(1), 6000);
            }
        };

        galleryPrev.addEventListener('click', () => {
            scrollGallery(-1);
            restartAutoplay();
        });

        galleryNext.addEventListener('click', () => {
            scrollGallery(1);
            restartAutoplay();
        });

        galleryCarousel.addEventListener('mouseenter', () => {
            if (autoplayId) {
                window.clearInterval(autoplayId);
                autoplayId = null;
            }
        });

        galleryCarousel.addEventListener('mouseleave', restartAutoplay);
        galleryCarousel.addEventListener('focusin', () => {
            if (autoplayId) {
                window.clearInterval(autoplayId);
                autoplayId = null;
            }
        });
        galleryCarousel.addEventListener('focusout', restartAutoplay);

        window.addEventListener('resize', () => {
            const maxScroll = getMaxScroll();
            if (galleryTrack.scrollLeft > maxScroll) {
                galleryTrack.scrollLeft = maxScroll;
            }
        });

        restartAutoplay();
    }
});
