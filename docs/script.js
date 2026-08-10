document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // Set to 30 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<h3>NEXUS AI OS HAS LAUNCHED</h3>";
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. Comparison Slider
    const slider = document.getElementById('slider');
    const afterImage = document.getElementById('after-image');

    if (slider && afterImage) {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            afterImage.style.width = `${value}%`;
        });
    }

    // 3. Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 4. Navbar shrink on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    // 5. Form submission handler (Prevent default for demo)
    const form = document.querySelector('.waitlist-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            alert(`Thank you! ${email} has been added to the Nexus AI OS priority waitlist.`);
            form.reset();
        });
    }
});
