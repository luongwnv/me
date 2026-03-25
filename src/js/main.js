// ===== Scroll to top on page load =====
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
history.scrollRestoration = 'manual';

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Fade-in on scroll =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Typewriter effect =====
const typewriterEl = document.getElementById('typewriter');
const words = [
    { text: 'Scalable Systems', gradient: 'linear-gradient(90deg, #8b5cf6, #d946ef)' },
    { text: 'Microservices', gradient: 'linear-gradient(90deg, #10b981, #34d399)' },
    { text: 'Distributed Apps', gradient: 'linear-gradient(90deg, #3b82f6, #06b6d4)' },
    { text: 'Cloud Platforms', gradient: 'linear-gradient(90deg, #f59e0b, #ef4444)' },
    { text: 'High Performance', gradient: 'linear-gradient(90deg, #ef4444, #ec4899)' }
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewrite() {
    const current = words[wordIndex];

    typewriterEl.style.backgroundImage = current.gradient;
    typewriterEl.style.webkitBackgroundClip = 'text';
    typewriterEl.style.webkitTextFillColor = 'transparent';
    typewriterEl.style.backgroundClip = 'text';

    if (isDeleting) {
        typewriterEl.textContent = current.text.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.text.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.text.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
    }

    setTimeout(typewrite, delay);
}

typewrite();

// ===== Counter animation for stats =====
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== Scroll to Top button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
