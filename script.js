// Ensure GSAP and ScrollTrigger are available

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Project cards animation
    gsap.utils.toArray(".project-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Skill cards animation
    gsap.utils.toArray(".skill-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    // About section animations
    gsap.from(".about-left", {
        scrollTrigger: {
            trigger: ".about-left",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-right", {
        scrollTrigger: {
            trigger: ".about-right",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".stat", {
        scrollTrigger: {
            trigger: ".about-stats",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Vanta.js Background Animation
    // VANTA.CLOUDS({
    //   el: "#hero-background",
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   skyColor: 0x4fbbe5,
    //   speed: 0.90
    // });

    // if (typeof VANTA !== 'undefined') {
    //     VANTA.NET({
    //         el: "#hero-background",
    //         mouseControls: true,
    //         touchControls: true,
    //         gyroControls: false,
    //         minHeight: 200.00,
    //         minWidth: 200.00,
    //         scale: 1.00,
    //         scaleMobile: 1.00
    //     });
    // } else {
    //     console.error("VANTA is not loaded. Please check your script source.");
    // }
    

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('section');

    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.classList.remove('slide-in-left');
                } else {
                    entry.target.classList.add('slide-in-right');
                }
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('load', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('slide-in-left'); // Add slide-in effect when sections load
        });
    });

    // Certificate Slider Functionality
    const slider = document.querySelector('.certificate-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        const cardWidth = 280; // Width of each certificate card
        const gap = 24; // Gap between cards (1.5rem = 24px)

        // Function to scroll to next/previous card
        const scrollToCard = (direction) => {
            const currentScroll = slider.scrollLeft;
            const scrollAmount = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);
            
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };

        // Add click event listeners
        prevBtn.addEventListener('click', () => scrollToCard('prev'));
        nextBtn.addEventListener('click', () => scrollToCard('next'));

        // Update button visibility based on scroll position
        const updateButtonVisibility = () => {
            const isAtStart = slider.scrollLeft <= 0;
            const isAtEnd = slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1);
            
            prevBtn.style.display = isAtStart ? 'none' : 'flex';
            nextBtn.style.display = isAtEnd ? 'none' : 'flex';
        };

        // Add event listeners
        slider.addEventListener('scroll', updateButtonVisibility);
        window.addEventListener('resize', updateButtonVisibility);
        
        // Initial check
        updateButtonVisibility();

        // Add touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            const swipeThreshold = 50; // Minimum distance for swipe

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    scrollToCard('prev');
                } else {
                    scrollToCard('next');
                }
            }
        };
    }

    // Mobile/Tablet Certificate Carousel (one card at a time)
    function updateCertificateCarousel() {
        const cards = document.querySelectorAll('.certificate-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        if (!cards.length || !prevBtn || !nextBtn) return;
        let current = 0;

        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            prevBtn.style.display = index === 0 ? 'none' : 'flex';
            nextBtn.style.display = index === cards.length - 1 ? 'none' : 'flex';
        }

        prevBtn.addEventListener('click', () => {
            if (current > 0) {
                current--;
                showCard(current);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (current < cards.length - 1) {
                current++;
                showCard(current);
            }
        });

        // Touch swipe support
        let startX = 0;
        let endX = 0;
        const slider = document.querySelector('.certificate-slider');
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                if (endX - startX > 50 && current > 0) {
                    current--;
                    showCard(current);
                } else if (startX - endX > 50 && current < cards.length - 1) {
                    current++;
                    showCard(current);
                }
            });
        }

        showCard(current);
    }

    if (window.innerWidth <= 1024) {
        updateCertificateCarousel();
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 1024) updateCertificateCarousel();
        });
    }

    // Hamburger menu toggle for mobile nav
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        // Optional: close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
});
}
