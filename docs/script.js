document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14); // Set target to 14 days from now

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "DROPPED";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // 2. Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Parallax / Product Rotation on Scroll
    const productWrapper = document.querySelector('.product-wrapper');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Rotate product slightly based on scroll position when in view
        if (productWrapper) {
            const rotation = scrolled * 0.05; 
            productWrapper.style.transform = `rotateY(${rotation}deg)`;
        }
    });

    // 4. Hotspot Interaction
    document.querySelectorAll('.hotspot').forEach(spot => {
        spot.addEventListener('click', () => {
            alert(spot.getAttribute('data-info'));
        });
    });
});
