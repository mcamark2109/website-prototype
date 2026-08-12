document.addEventListener('DOMContentLoaded', () => {
    // --- Delivery Timer ---
    const timerDisplay = document.getElementById('delivery-timer');
    let timeLeft = 45 * 60; // 45 minutes in seconds

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft > 0) {
            timeLeft--;
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- ZIP Validator ---
    const zipInput = document.getElementById('zip-input');
    const zipBtn = document.getElementById('zip-btn');
    const zipFeedback = document.getElementById('zip-feedback');

    zipBtn.addEventListener('click', () => {
        const zip = zipInput.value;
        const zipRegex = /^\d{5}$/;

        if (zipRegex.test(zip)) {
            zipFeedback.classList.remove('hidden');
            zipInput.style.borderColor = '#28a745';
        } else {
            zipFeedback.classList.add('hidden');
            zipInput.style.borderColor = '#dc3545';
            alert('Please enter a valid 5-digit ZIP code.');
        }
    });

    // --- Intersection Observer for Fade-in ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
