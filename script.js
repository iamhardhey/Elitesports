

/* ============================================
   ELITE SPORTS ACADEMY - UNIFIED JAVASCRIPT
   Interactivity, Form Handling, and Dynamic Features
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCarousel();
    initializeFormHandlers();
    initializeScrollAnimations();
    setupNavbarScroll();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate menu toggle button
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

let currentSlideIndex = 0;
const carouselInterval = 5000; // 5 seconds
let interval;

// Initialize carousel
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Show first slide
    slides[0].classList.add('active');
    if (indicators[0]) indicators[0].classList.add('active');

    // Auto-rotate slides
    interval = setInterval(nextSlide, carouselInterval);
}

// Show specific slide (when clicking indicator)
function currentSlide(index) {
    showSlide(index);
}

// Show next slide
function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Core function to show slide
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Clamp index
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlideIndex = index;

    // Remove active from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Add active to current
    slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) indicators[currentSlideIndex].classList.add('active');
}

// Start carousel on page load
document.addEventListener("DOMContentLoaded", initializeCarousel);


// ============================================
// FORM HANDLERS
// ============================================

function initializeFormHandlers() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Registration Form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Save to localStorage
    const contactData = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    showNotification('Message sent successfully! We will get back to you soon.', 'success');

    // Reset form
    document.getElementById('contactForm').reset();
}

function handleRegistrationFormSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const sport = document.getElementById('sport').value;
    const level = document.getElementById('level').value;
    const parentName = document.getElementById('parentName').value.trim();
    const parentPhone = document.getElementById('parentPhone').value.trim();
    const terms = document.querySelector('input[name="terms"]').checked;
    const privacy = document.querySelector('input[name="privacy"]').checked;

    // Validation
    if (!firstName || !lastName || !email || !phone || !age || !gender || !sport || !level || !parentName || !parentPhone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }

    if (age < 5 || age > 30) {
        showNotification('Age must be between 5 and 30.', 'error');
        return;
    }

    if (!terms || !privacy) {
        showNotification('You must agree to the terms and privacy policy.', 'error');
        return;
    }

    // Save to localStorage
    const registrationData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        sport: sport,
        level: level,
        parentName: parentName,
        parentPhone: parentPhone,
        timestamp: new Date().toLocaleString()
    };

    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    showNotification('Registration successful! We will contact you soon with further details.', 'success');

    // Reset form
    document.getElementById('registrationForm').reset();

    // Redirect to home after 2 seconds
    setTimeout(function() {
        window.location.href = 'home.html';
    }, 2000);
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4caf50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#2196f3';
        notification.style.color = 'white';
    }

    // Add to body
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    // Add fade-in animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.program-card, .coach-card, .testimonial-card, .value-card, .achievement-card, .stat-card, .gallery-item'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get stored data from localStorage
function getStoredData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Clear stored data
function clearStoredData(key) {
    localStorage.removeItem(key);
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================

window.showNotification = showNotification;
window.getStoredData = getStoredData;
window.clearStoredData = clearStoredData;
window.currentSlide = currentSlide;

// ============================================
// CONSOLE LOG FOR DEBUGGING
// ============================================

console.log('Elite Sports Academy - JavaScript loaded successfully!');
console.log('Stored Contacts:', getStoredData('contacts'));
console.log('Stored Registrations:', getStoredData('registrations'));

