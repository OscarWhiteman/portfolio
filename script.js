// ── Typing Animation ──
const phrases = [
    'Computer Science Student',
    'Aspiring Developer',
    'Problem Solver',
    'Future Builder'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

type();

// ── Scroll Progress Bar ──
const progressBar = document.getElementById('scrollProgress');

// ── Navbar scroll state + active link ──
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll progress
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';

    // Navbar glass effect
    navbar.classList.toggle('scrolled', scrollTop > 20);

    // Back to top visibility
    backToTopBtn.classList.toggle('visible', scrollTop > 400);

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (scrollTop >= section.offsetTop - 130) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ── Scroll Reveal (Intersection Observer) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Number(entry.target.dataset.delay) || 0);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, _, siblings) => {
    const parentSiblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
    const index = parentSiblings.indexOf(el);
    el.dataset.delay = index * 100;
    revealObserver.observe(el);
});

// ── Skill Bar Animation ──
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                fill.style.width = fill.dataset.width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ── Back to Top ──
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
