document.addEventListener('DOMContentLoaded', () => {
    
    // Select the toggle button (hamburger icon)
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Select the navigation links list
    const navLinks = document.querySelector('.nav-links');

    // Add click event to the toggle button
    menuToggle.addEventListener('click', () => {
        // Toggle the 'active' class on the nav-links
        // This makes the menu appear/disappear on mobile
        navLinks.classList.toggle('active');
    });

    // Optional: Close menu when a link is clicked (better user experience)
    const allLinks = document.querySelectorAll('.nav-links a');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- MANUAL IMAGE SLIDER LOGIC ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    // Function to update the image
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Add active class to the current slide
        slides[index].classList.add('active');
    }

    // Check if slider elements exist
    if (slides.length > 0 && nextBtn && prevBtn) {
        
        // Next Button Click
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // Previous Button Click
        prevBtn.addEventListener('click', () => {
            // Logic to go backwards and loop to end if needed
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

});