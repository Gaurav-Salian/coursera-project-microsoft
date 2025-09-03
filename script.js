// Hamburger Menu Toggle
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
    const hamburger = document.querySelector('.hamburger');
    hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', nav.classList.contains('active'));
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Project Filter
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Lightbox Effect
function setupLightbox() {
    const images = document.querySelectorAll('.project-img');
    const lightbox = document.querySelector('#lightbox');
    const lightboxImg = document.querySelector('#lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.focus();
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
}

// Form Validation
function setupFormValidation() {
    const form = document.querySelector('#contact-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    
    function validateField(input, errorElement, message) {
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', !!message);
        input.classList.toggle('invalid', !!message);
    }
    
    nameInput.addEventListener('input', () => {
        validateField(nameInput, document.querySelector('#name-error'), 
            nameInput.value.trim().length < 2 ? 'Name must be at least 2 characters' : '');
    });
    
    emailInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, document.querySelector('#email-error'), 
            !emailPattern.test(emailInput.value) ? 'Please enter a valid email' : '');
    });
    
    messageInput.addEventListener('input', () => {
        validateField(messageInput, document.querySelector('#message-error'), 
            messageInput.value.trim().length < 10 ? 'Message must be at least 10 characters' : '');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameValid = nameInput.value.trim().length >= 2;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const messageValid = messageInput.value.trim().length >= 10;
        
        validateField(nameInput, document.querySelector('#name-error'), 
            nameValid ? '' : 'Name must be at least 2 characters');
        validateField(emailInput, document.querySelector('#email-error'), 
            emailValid ? '' : 'Please enter a valid email');
        validateField(messageInput, document.querySelector('#message-error'), 
            messageValid ? '' : 'Message must be at least 10 characters');
        
        if (nameValid && emailValid && messageValid) {
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            form.reset();
            alert('Form submitted successfully!');
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
    setupSmoothScrolling();
    setupLightbox();
    setupFormValidation();
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterProjects(btn.dataset.filter));
    });
    
    // Debug: Log initialization
    console.log('JavaScript initialized successfully');
});
