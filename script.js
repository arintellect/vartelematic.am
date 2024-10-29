document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id) {
                const id = entry.target.getAttribute('id');
                if (window.scrollY > 50) {
                    history.replaceState(null, null, `#${id}`);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            history.replaceState(null, null, window.location.pathname);
        }
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add click event listeners to all navigation links in the hamburger menu
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            // Remove the 'active' class from both the menu and hamburger button
            document.querySelector('.menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Phone input initialization
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        separateDialCode: true,
        formatOnDisplay: true,
        autoPlaceholder: "polite",
        preferredCountries: ["am"], // Armenia first
        initialCountry: "am",
    });

    // Validate on form submit
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function(e) {
        if (!iti.isValidNumber()) {
            e.preventDefault();
            phoneInput.classList.add("error");
        }
    });

    // Remove error class on input
    phoneInput.addEventListener("input", function() {
        phoneInput.classList.remove("error");
    });
});
