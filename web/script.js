document.addEventListener('DOMContentLoaded', () => {
    console.log("Website script loaded successfully.");

    // --- 1. MOBILE MENU LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            console.log("Menu toggled");
        });

        // Close menu when a link is clicked
        const allLinks = document.querySelectorAll('.nav-links a');
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 2. MANUAL IMAGE SLIDER LOGIC ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    // Check if slider elements exist before running code
    if (slides.length > 0 && nextBtn && prevBtn) {
        console.log("Slider elements found. initializing...");

        // Function to update the image
        function showSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            // Add active class to the current slide
            slides[index].classList.add('active');
        }

        // Next Button Click
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page jumping
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            console.log("Next slide: " + currentSlide);
        });

        // Previous Button Click
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page jumping
            // Logic to go backwards and loop to end if needed
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            console.log("Prev slide: " + currentSlide);
        });
    } else {
        console.error("Slider elements NOT found. Check HTML classes.");
    }

});
