document.addEventListener('DOMContentLoaded', () => {
    // 1. Delivery Calculator Logic
    const calcBtn = document.getElementById('calc-btn');
    const zipInput = document.getElementById('zipcode');
    const calcResult = document.getElementById('calc-result');

    calcBtn.addEventListener('click', () => {
        const zip = zipInput.value.trim();
        if (!zip) {
            calcResult.textContent = "Please enter a valid zip code.";
            calcResult.style.color = "red";
            return;
        }

        calcBtn.disabled = true;
        calcBtn.textContent = "Calculating...";
        calcResult.textContent = "Connecting to logistics server...";
        calcResult.style.color = "var(--primary-accent)";

        // Simulate network delay
        setTimeout(() => {
            const eta = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
            calcResult.innerHTML = `Estimated delivery to your location: <strong>${eta} Minutes</strong>`;
            calcBtn.disabled = false;
            calcBtn.textContent = "Calculate ETA";
        }, 1500);
    });

    // 2. Testimonial Slider Logic
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto-advance every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});
