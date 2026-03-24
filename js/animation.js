document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.our-hearts__scroll-container');
    const stickyWrapper = document.querySelector('.our-hearts__sticky-wrapper');
    const cards = document.querySelectorAll('.our-hearts__card');

    if (!scrollContainer || !stickyWrapper || cards.length === 0) return;

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

    // Existing Card Animation Logic
    const animateCards = () => {
        if (!scrollContainer) return;
        const rect = scrollContainer.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // Progress: 0 when top is at bottom of viewport, 1 when bottom is at top
        // But for sticky, we want 0 when it starts being sticky, 1 when it stops
        const start = 0;
        const end = rect.height - viewHeight;
        
        let progress = -rect.top / end;
        progress = Math.max(0, Math.min(1, progress));

        // Thresholds for showing/hiding cards
        if (progress > 0 && progress < 1) {
            cards.forEach(card => card.classList.add('active'));
        } else if (progress <= 0) {
            cards.forEach(card => card.classList.remove('active'));
        }

        // Apply transforms based on progress
        const spreadAmount = 110; // percentage
        const rotationAmount = 8; // degrees

        // Card 1 (Left)
        const c1X = -50 - (progress * spreadAmount);
        const c1Rot = -progress * rotationAmount;
        cards[0].style.transform = `translate(${c1X}%, -50%) rotate(${c1Rot}deg) scale(${0.9 + progress * 0.1})`;

        // Card 2 (Center)
        const c2Scale = 0.9 + (progress * 0.15);
        const c2Y = -50 - (progress * 20); // Slight upward float
        cards[1].style.transform = `translate(-50%, ${c2Y}%) scale(${c2Scale})`;
        cards[1].style.zIndex = 10; // Keep center card on top

        // Card 3 (Right)
        const c3X = -50 + (progress * spreadAmount);
        const c3Rot = progress * rotationAmount;
        cards[2].style.transform = `translate(${c3X}%, -50%) rotate(${c3Rot}deg) scale(${0.9 + progress * 0.1})`;
        
        // Adjust opacity for fade in/out
        cards.forEach(card => {
            if (progress < 0.1) {
                card.style.opacity = progress * 10;
            } else if (progress > 0.9) {
                card.style.opacity = (1 - progress) * 10;
            } else {
                card.style.opacity = 1;
            }
        });
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateCards);
    });

    // Initial call
    animateCards();
});
