document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Functionality ---
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar-right');
    const hamburgerBtn = document.querySelector('.hamburger-menu');

    // Function to close the mobile menu
    function closeMobileMenu() {
        navbar.classList.remove('nav-open');
        hamburgerBtn.classList.remove('is-active');
    }

    // Determine current page filename (e.g., "index.html" or "contacts.html")
    let currentPagePath = window.location.pathname.split('/').pop();
    if (currentPagePath === "" || currentPagePath.startsWith("#")) { // Handle root URL (e.g., mysite.com/ -> index.html) or direct hash links
        currentPagePath = "index.html";
    }

    // Set active nav item on initial page load
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const linkHref = link.getAttribute('href');
        // Extract filename from href (e.g., "index.html#home" -> "index.html", "contacts.html" -> "contacts.html")
        const linkFilename = linkHref.split('/').pop().split('#')[0];

        if (linkFilename === currentPagePath) {
            // Check for explicit hash if on index.html
            if (currentPagePath === 'index.html' && linkHref.includes('#')) {
                if (linkHref === currentPagePath + window.location.hash) {
                     item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            } else if (!linkHref.includes('#') || currentPagePath !== 'index.html') { // For links like contacts.html or index.html without hash
                item.classList.add('active');
            } else {
                 item.classList.remove('active'); // For index.html, only the specific hash should be active if it exists
            }
        } else {
            item.classList.remove('active');
        }
    });

    // Toggle Mobile Navbar on Hamburger Click
    hamburgerBtn.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        hamburgerBtn.classList.toggle('is-active');
    });

    // Handle Navbar Item Clicks (Desktop & Mobile)
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const link = this.querySelector('a');
            const linkHref = link.getAttribute('href');
            const clickedLinkFilename = linkHref.split('/').pop().split('#')[0];

            // Apply ripple effect regardless of navigation type
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });

            // If the link points to the current page AND uses a hash, prevent default and scroll
            if (clickedLinkFilename === currentPagePath && linkHref.includes('#')) {
                event.preventDefault(); // Prevent full page reload
                const targetId = linkHref.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                // Manually update active class for same-page hash navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                // Update URL hash without page reload
                window.history.pushState(null, '', linkHref);

            } else {
                // For links to different HTML files or external links, let default behavior happen (browser navigates)
                // The active class will be set on the new page's DOMContentLoaded event.
            }
            
            // Close mobile menu if it's open (only on mobile screens)
            if (window.getComputedStyle(hamburgerBtn).display !== 'none') {
                closeMobileMenu();
            }
        });
    });

    // Optional: Close menu if user clicks outside of it on mobile
    document.addEventListener('click', (event) => {
        // Check if the menu is open and the click is outside the navbar and hamburger button
        if (navbar.classList.contains('nav-open') && 
            !navbar.contains(event.target) && 
            !hamburgerBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Optional: Hide hamburger button on resize if desktop mode
    window.addEventListener('resize', () => {
        if (window.getComputedStyle(hamburgerBtn).display === 'none') {
            closeMobileMenu(); // Ensure menu is closed if resizing to desktop
        }
    });

    // --- Contact Card Animation on Scroll (for contacts.html) ---
    const contactCards = document.querySelectorAll('.contact-card');
    
    // THE FIX: Remove the check for "contacts.html".
    // Now it will run on any page as long as contact cards are present.
    if (contactCards.length > 0) {
        // Add initial hidden class to all cards
        contactCards.forEach(card => card.classList.add('card-hidden'));

        const observerOptions = {
            root: null, // viewport as root
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item must be visible
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(contactCards).indexOf(card);
                    // Set a custom property for animation-delay
                    card.style.setProperty('--animation-delay', `${index * 0.15}s`); // 0.15s delay between cards
                    card.classList.remove('card-hidden');
                    card.classList.add('card-visible');
                    observer.unobserve(card); // Stop observing once animated
                }
            });
        }, observerOptions);

        contactCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
}); 


    // --- Interactive Contact Card Logic ---
    const cardsWrapper = document.querySelector('.contact-cards-wrapper');

    if (cardsWrapper) {
        cardsWrapper.addEventListener('click', (event) => {
            const icon = event.target.closest('.phone-btn, .email-btn');
            const backBtn = event.target.closest('.back-btn');

            // If an icon was clicked
            if (icon) {
                event.preventDefault();
                const card = icon.closest('.contact-card');
                const infoText = card.querySelector('.info-text');
                const info = icon.dataset.info;

                if (card && infoText && info) {
                    infoText.textContent = info;
                    card.classList.add('info-mode-active');
                }
            }

            // If the back button was clicked
            if (backBtn) {
                event.preventDefault();
                const card = backBtn.closest('.contact-card');
                if (card) {
                    card.classList.remove('info-mode-active');
                }
            }
        });
    }