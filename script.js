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
});
}
