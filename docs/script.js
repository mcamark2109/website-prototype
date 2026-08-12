document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('.reveal');
    const tiltContainer = document.getElementById('tilt-container');
    const tiltCard = document.querySelector('.tilt-card');
    const form = document.getElementById('access-form');
    const successMsg = document.getElementById('form-success');

    // 1. Navigation background toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for reveal animations
    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // 3. 3D Interactive Simulation (Parallax Tilt)
    if (tiltContainer && tiltCard) {
        tiltContainer.addEventListener('mousemove', (e) => {
            const rect = tiltContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20; // Adjust intensity
            const rotateY = (centerX - x) / 20;
            
            tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltContainer.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 4. Form Handling
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
        });
    }
});