// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.style.display = 'none';
        }
    });

    checkAdminStatus();
});

// Load projects from Supabase
async function loadProjects() {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const projectGallery = document.querySelector('.project-gallery');
        projectGallery.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image_url}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-date">${new Date(project.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        created_at: new Date().toISOString()
    };

    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([formData]);

        if (error) throw error;

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again later.');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('.mission, .vision, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(element);
});

// Load projects when the page loads
loadProjects();

// Initialize EmailJS
(function() {
    emailjs.init("2SeNL4oqM1pkYx_t8"); // EmailJS public key
})();

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open specific forms
function openVolunteerForm() {
    openModal('volunteerFormModal');
}

function openDonateForm() {
    openModal('donateFormModal');
}

function openPartnerForm() {
    openModal('partnerFormModal');
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Handle donation amount selection
const amountButtons = document.querySelectorAll('.amount-btn');
let selectedAmount = null;

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedAmount = parseFloat(button.dataset.amount);
        document.getElementById('customAmount').value = '';
    });
});

// Handle custom amount input
document.getElementById('customAmount').addEventListener('input', (e) => {
    amountButtons.forEach(btn => btn.classList.remove('selected'));
    selectedAmount = parseFloat(e.target.value);
});

// Initialize Stripe
let stripe;
let elements;

async function initializeStripe() {
    stripe = Stripe('pk_test_51R4h4CCkDuxB8RmmyEF3vY3jVGtr2EOUeZ3Tbj92Fus1z0hHR6aiuA0lC0NoJIeurTPKLPIXLVI0qmX4vlSVXCxP00vR423iTE');
    elements = stripe.elements();
}

// Handle form submissions
async function submitVolunteerForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('volunteerName').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value,
        interests: document.getElementById('volunteerInterests').value,
        message: document.getElementById('volunteerMessage').value
    };

    try {
        await emailjs.send(
            "service_xiyzixb",
            "email",
            {
                to_email: "nelsonlikhaya@gmail.com",
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                interests: formData.interests,
                message: `
                    Volunteer Application:
                    Name: ${formData.name}
                    Email: ${formData.email}
                    Phone: ${formData.phone}
                    Areas of Interest: ${formData.interests}
                    Message: ${formData.message}
                `,
                subject: "New Volunteer Application"
            }
        );

        alert('Thank you for your interest in volunteering! We will contact you soon.');
        document.getElementById('volunteerForm').reset();
        closeModal('volunteerFormModal');
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your application. Please try again.');
    }
}

async function submitDonation(event) {
    event.preventDefault();
    
    const amount = selectedAmount || parseFloat(document.getElementById('customAmount').value);
    
    if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount.');
        return;
    }

    try {
        // Create a payment intent on your server
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                amount: amount * 100, // Convert to cents
                currency: 'usd'
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        const { error: stripeError } = await stripe.confirmPayment({
            elements,
            clientSecret: data.clientSecret,
            confirmParams: {
                return_url: window.location.origin + '/donation-success',
            },
        });

        if (stripeError) {
            throw new Error(stripeError.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your donation. Please try again.');
    }
}

async function submitPartnerForm(event) {
    event.preventDefault();
    
    const formData = {
        organization: document.getElementById('organizationName').value,
        contact: document.getElementById('contactPerson').value,
        position: document.getElementById('position').value,
        email: document.getElementById('partnerEmail').value,
        phone: document.getElementById('partnerPhone').value,
        type: document.getElementById('partnershipType').value,
        goals: document.getElementById('partnershipGoals').value
    };

    try {
        await emailjs.send(
            "service_xiyzixb",
            "email",
            {
                to_email: "nelsonlikhaya@gmail.com",
                from_name: formData.contact,
                from_email: formData.email,
                subject: "New Partnership Inquiry",
                message: `
                    Partnership Inquiry:
                    Organization: ${formData.organization}
                    Contact Person: ${formData.contact}
                    Position: ${formData.position}
                    Email: ${formData.email}
                    Phone: ${formData.phone}
                    Partnership Type: ${formData.type}
                    Goals & Ideas: ${formData.goals}
                `
            }
        );

        alert('Thank you for your partnership inquiry! We will contact you soon.');
        document.getElementById('partnerForm').reset();
        closeModal('partnerFormModal');
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your inquiry. Please try again.');
    }
}

// Initialize Stripe when the page loads
document.addEventListener('DOMContentLoaded', initializeStripe);

// Check admin status
function checkAdminStatus() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminElements = document.querySelectorAll('.admin-only');
    
    adminElements.forEach(element => {
        element.style.display = isAdmin ? 'block' : 'none';
    });

    // Add admin indicator if logged in
    if (isAdmin) {
        const navbar = document.querySelector('.nav-container');
        if (!document.querySelector('.admin-indicator')) {
            const adminIndicator = document.createElement('div');
            adminIndicator.className = 'admin-indicator';
            adminIndicator.innerHTML = `
                <span>Admin Mode</span>
                <button onclick="logout()" class="logout-btn">Logout</button>
            `;
            navbar.appendChild(adminIndicator);
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isAdmin');
    window.location.reload();
} 