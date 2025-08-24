document.addEventListener("DOMContentLoaded", function() {

    // --- Smart Navigation Bar Logic ---
    let lastScrollY = window.scrollY;
    const mainNav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down, hide the nav bar.
            mainNav.classList.add('hidden');
        } else {
            // Scrolling up or at the top of the page, show the nav bar.
            mainNav.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('#main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = mainNav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for scroll-based animations ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('.scroll-animation');
    animatedSections.forEach(section => {
        observer.observe(section);
    });

    const sections = document.querySelectorAll('.scroll-animation');
    sections.forEach(section => {
        section.classList.add('hidden-on-load');
    });

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden-on-load');
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer2.observe(section);
    });

    // --- Parallax effect for project cards ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const x_center = rect.width / 2;
            const y_center = rect.height / 2;

            const x_rotation = ((x - x_center) / x_center) * 10;
            const y_rotation = ((y - y_center) / y_center) * -10;

            card.style.transform = `perspective(1000px) rotateX(${y_rotation}deg) rotateY(${x_rotation}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
});
