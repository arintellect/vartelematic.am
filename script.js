document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
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

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            // Remove the 'active' class from both the menu and hamburger button
            document.querySelector('.menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        separateDialCode: true,
        formatOnDisplay: true,
        autoPlaceholder: "off",
        preferredCountries: ["am"], // Armenia first
        initialCountry: "am",
        loadUtilsOnInit: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js",
    });
    
    const form = document.getElementById("contactForm");

    const hiddenPhoneInput = document.createElement('input');
    hiddenPhoneInput.type = 'hidden';
    hiddenPhoneInput.name = 'phone'; 
    form.appendChild(hiddenPhoneInput);

    phoneInput.removeAttribute('name');

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (!iti.isValidNumber()) {
            phoneInput.classList.add("error");
            return;
        }
        
        hiddenPhoneInput.value = iti.getNumber();
        
        form.submit();
    });

    phoneInput.addEventListener("input", function() {
        phoneInput.classList.remove("error");
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
