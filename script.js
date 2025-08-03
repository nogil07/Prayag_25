gsap.registerPlugin(ScrollTrigger);

// Loading animation
const loadingContainer = document.querySelector('.loading-container');
const cinematicIntroTimeline = gsap.timeline({
  onComplete: hideLoading // Hide loading after initial animation
});
cinematicIntroTimeline.to(".loading-text", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out",
});

cinematicIntroTimeline.to(".loading-text", {
  opacity: 0,
  duration: 1.5,
  ease: "power2.in",
  delay: 1,
});

cinematicIntroTimeline.from(".cinematic-logo", {
  scale: 0.5,
  opacity: 0,
  duration: 2,
  ease: "back.out(1.7)",
});

cinematicIntroTimeline.to(".cinematic-logo", {
  opacity: 0,
  duration: 1.5,
  ease: "power2.in",
  delay: 1,
});

function hideLoading() {
  loadingContainer.style.display = 'none';
}

gsap.to(".overlay", {
  opacity: 0,
  duration: 2.8,
  ease: "power3.out",
  delay: 1, // Add delay
  onComplete: () => document.body.style.overflow = "visible",
});

// Scroll Indicator
const scrollIndicator = document.querySelector(".scroll-indicator");
const bounceTimeline = gsap.timeline({
  repeat: -1,
 yoyo: true,
});

bounceTimeline.to(scrollIndicator, {
  y: 20,
  opacity: 0.6,
  duration: 0.8,
 ease: "power1.inOut",
});

// Create a timeline for better control
const tl = gsap.timeline({
  scrollTrigger: {
 trigger: ".container",
 scrub: 2,
 pin: true,
 start: "top top",
 end: "+=2000",
 ease: "none",
  },
});

// Need to ensure that the scale is like this otherwise some flicks happens
tl.set(".hero-main-container", {
  scale: 1.25,
});

tl.to(".hero-main-container", {
  scale: 1,
 duration: 1,
});

tl.to(
  ".hero-main-logo",
  {
    opacity: 0,
 duration: 0.5,
  },
  "<" // starts at the same time of previous animation
);

tl.to(
  ".hero-main-image",
  {
    opacity: 0,
 duration: 0.9,
  },
  "<+=0.5"
);

tl.to(
  ".hero-main-container",
  {
 backgroundSize: "28vh",
 duration: 1.5,
  },
  "<+=0.2"
);

tl.fromTo(
  ".hero-text",
 {
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
 },
 {
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
     rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
       rgba(32, 31, 66, 0) 140.599vh)`,
 duration: 3,
  },
  "<1.2" // starts 1.2 seconds before the previous animation
);


gsap.to(window, {
  duration: 1,
  scrollTo: {
 y: ".auto-scroll-target",
  },
});






document.addEventListener('DOMContentLoaded', function() {
    
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    });

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    // Only run this script if the user is not on a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .swiper-slide').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'var(--spice-gold)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    } else {
        // Hide the custom cursor on touch devices
        cursor.style.display = 'none';
    }


    // --- PARTICLE.JS BACKGROUND ---
    // This function will be defined on both index.html and event-detail.html, so we check if the element exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
          "particles": {
            "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#FFD700" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
          },
          "retina_detect": true
        });
    }

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section On-Load Animation
    gsap.from(".main-title", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out", delay: 0.5 });
    gsap.from(".sub-title, .institution, .key-details", { duration: 1.5, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.8 });
    gsap.from(".cta-button", { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)", delay: 1.5 });
    
    // Parallax Effect for the star background
    gsap.to("#stars-bg", {
        scrollTrigger: {
            scrub: 1
        },
        y: -200
    });

    // Scroll-Triggered Section Animations for all sections with the class
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title');
        // Select all direct children of the specified containers to animate them
        const content = section.querySelectorAll('.event-slider, .sponsors-grid, .footer-content > *');

        // Title Scan Line Effect
        if(sectionTitle) {
            // We create a timeline to sequence the animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%", // Start animation when the top of the section is 85% from the top of the viewport
                    toggleActions: "play none none none"
                }
            });

            // Animate the scan line first
            tl.fromTo(sectionTitle.querySelector('::before'), 
                { left: '-100%' }, 
                { left: '100%', duration: 1.2, ease: "power3.inOut" }
            );

            // Then fade in the content
            if (content.length > 0) {
                 tl.from(content, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                }, "-=0.8"); // Start this animation 0.8s before the previous one ends
            }
        }
    });


    // --- SWIPER SLIDER INITIALIZATION ---
    // Check if the slider element exists on the page before initializing
    if (document.querySelector('.event-slider')) {
        const swiper = new Swiper('.event-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            // CHANGE MADE HERE:
            slidesPerView: 3, // Changed from 'auto' to a fixed number for better visual centering with coverflow
            loop: true,
            
            coverflowEffect: {
                rotate: 50,       // Slide rotate in degrees
                stretch: 0,       // Stretch space between slides (in px)
                depth: 100,       // Depth offset in px (slides translate in Z axis)
                modifier: 1,      // Effect multiplier
                slideShadows: true, // Enables slides shadows
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Optional: Add responsive breakpoints for different screen sizes
            breakpoints: {
                // When window width is <= 768px
                768: {
                    slidesPerView: 1 // Only show 1 slide on smaller screens
                },
                // When window width is <= 992px
                992: {
                    slidesPerView: 3 // Show 3 slides on medium screens
                },
                // When window width is > 992px (default, not strictly needed if 3 is primary)
                1200: {
                    slidesPerView: 3 // Keep 3 slides on larger screens
                }
            }
        });
    }
});