document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });

    // 2. TYPEWRITER
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            if(this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } 
            else { this.txt = fullTxt.substring(0, this.txt.length + 1); }
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
            let typeSpeed = 200;
            if(this.isDeleting) { typeSpeed /= 2; }
            if(!this.isDeleting && this.txt === fullTxt) { typeSpeed = this.wait; this.isDeleting = true; } 
            else if(this.isDeleting && this.txt === '') { this.isDeleting = false; this.wordIndex++; typeSpeed = 500; }
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);

    // 3. PROGRESS BAR
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
    });

    // 4. ANIMATIONS & COUNTERS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / 200; 
                        if (count < target) { counter.innerText = Math.ceil(count + inc); setTimeout(updateCount, 20); } 
                        else { counter.innerText = target; }
                    };
                    updateCount();
                });
            }
        });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // 5. 3D TILT
    document.addEventListener("mousemove", (e) => {
        document.querySelectorAll(".tilt-card").forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > -50 && x < rect.width + 50 && y > -50 && y < rect.height + 50) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5; 
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            }
        });
    });

    // 6. MENU & SLIDER
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;
    if (slides.length > 0 && nextBtn && prevBtn) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        nextBtn.addEventListener('click', (e) => { e.preventDefault(); currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); });
        prevBtn.addEventListener('click', (e) => { e.preventDefault(); currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); });
    }
});

// --- LIGHTBOX ---
let currentGalleryImages = [];
let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const counterText = document.getElementById('image-counter');

// --- FOLDER LOGIC ---
function openFolder(galleryId) {
    const container = document.getElementById(galleryId);
    if (!container) return;
    const images = container.querySelectorAll('img');
    currentGalleryImages = Array.from(images).map(img => ({ src: img.src, alt: img.alt }));
    currentImageIndex = 0;
    showLightboxImage();
    lightbox.style.display = "block";
}
function showLightboxImage() {
    if (currentGalleryImages.length === 0) return;
    lightboxImg.src = currentGalleryImages[currentImageIndex].src;
    captionText.innerHTML = currentGalleryImages[currentImageIndex].alt;
    counterText.innerHTML = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
}
function changeSlide(n) {
    currentImageIndex += n;
    if (currentImageIndex >= currentGalleryImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = currentGalleryImages.length - 1;
    showLightboxImage();
}
document.querySelector('.close-lightbox').addEventListener('click', () => { lightbox.style.display = "none"; });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.style.display = "none"; } });


// --- STORY MODAL LOGIC (UPDATED WITH SKILLS & CONDITIONAL LINKEDIN) ---
const teamStories = {
    hamido: {
        name: 'Hamido Ossama',
        role: 'Team Leader & Hardware Architect',
        img: 'hamido.jpeg',
        github: 'https://github.com/', 
        // LINKEDIN REMOVED HERE (Empty String)
        linkedin: '', 
        skills: ['Python', 'C++', 'SolidWorks', 'OpenCV', 'AI Modeling','Arduino IDE','Linux'],
        text: `Ahmed "Hamido" started his robotics journey at just <strong>7 years old</strong>. He built his foundation competing in LEGO and VEX challenges, gaining deep technical experience from a young age.<br><br>
        He is a veteran of the field, having joined the <strong>RCJ (RoboCup Junior)</strong> competition 3 times. In <strong>2024</strong>, he proudly <strong>Founding Egypt Pharos</strong> alongside Rana.<br><br>
        This marked the beginning of the "real journey," leading the team to national victory and establishing a new standard for robotics in Egypt.`
    },
    rana: {
        name: 'Rana Ashraf',
        role: 'Software & AI Lead',
        img: 'rana.png',
        github: 'https://github.com/',
        // LINKEDIN REMAINS HERE
        linkedin: 'https://linkedin.com/',
        skills: ['Python', 'OpenCV', 'C++', 'AI Modeling','Arduino IDE','Linux'],
        text: `Rana entered the world of robotics at <strong>13 years old</strong>. Her passion quickly turned into expertise as she dove into complex systems.<br><br>
        She joined an RCJ team in <strong>2024</strong>, and in that same pivotal year, she became a <strong>Founder of Egypt Pharos</strong> alongside Hamido.<br><br>
        Today, she is still deep in the "real journey," pushing the boundaries of AI and Computer Vision every day to ensure the team remains at the cutting edge of technology.`
    }
};

const storyModal = document.getElementById('story-modal');
const storyImg = document.getElementById('story-img');
const storyName = document.getElementById('story-name');
const storyRole = document.getElementById('story-role');
const storyText = document.getElementById('story-text');
const storyGithub = document.getElementById('story-github');
const storyLinkedin = document.getElementById('story-linkedin');
const storySkills = document.getElementById('story-skills');

function openStory(memberId) {
    const member = teamStories[memberId];
    if (member) {
        storyImg.src = member.img;
        storyName.innerText = member.name;
        storyRole.innerText = member.role;
        storyText.innerHTML = member.text;
        
        // Socials - Github (Always show)
        storyGithub.href = member.github;
        storyGithub.style.display = ''; // Ensure it's visible

        // Socials - LinkedIn (Conditional Check)
        if (member.linkedin && member.linkedin !== '') {
            storyLinkedin.href = member.linkedin;
            storyLinkedin.style.display = ''; // Show if link exists
        } else {
            storyLinkedin.style.display = 'none'; // Hide if no link
        }

        // Render Skills Tags
        storySkills.innerHTML = ''; 
        if (member.skills) {
            member.skills.forEach(skill => {
                let tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.innerText = skill;
                storySkills.appendChild(tag);
            });
        }

        storyModal.style.display = 'flex';
    }
}

document.querySelector('.close-story').addEventListener('click', () => {
    storyModal.style.display = 'none';
});

storyModal.addEventListener('click', (e) => {
    if (e.target === storyModal) {
        storyModal.style.display = 'none';
    }
});
