document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // --- Growth Stage Calculator ---
    const baselineInput = document.getElementById('baseline');
    const currentInput = document.getElementById('current');
    const resultOutput = document.getElementById('resultOutput');
    const stageOutput = document.getElementById('stageOutput');

    const calculateGrowth = () => {
        const baseline = parseFloat(baselineInput.value);
        const current = parseFloat(currentInput.value);

        if (isNaN(baseline) || isNaN(current) || baseline <= 0) {
            resultOutput.textContent = '--';
            stageOutput.textContent = 'Enter valid positive values';
            return;
        }

        const growth = ((current - baseline) / baseline) * 100;
        const growthFixed = growth.toFixed(2);
        
        resultOutput.textContent = `${growthFixed}%`;

        // Define clinical stages based on growth percentage
        let stage = '';
        if (growth <= 0) stage = 'Stable / Regression';
        else if (growth > 0 && growth <= 10) stage = 'Stage I: Minimal Growth';
        else if (growth > 10 && growth <= 30) stage = 'Stage II: Moderate Growth';
        else if (growth > 30 && growth <= 60) stage = 'Stage III: Significant Growth';
        else stage = 'Stage IV: Accelerated Growth';

        stageOutput.textContent = stage;
    };

    if (baselineInput && currentInput) {
        baselineInput.addEventListener('input', calculateGrowth);
        currentInput.addEventListener('input', calculateGrowth);
    }

    // --- Intersection Observer (Fade-in & ScrollSpy) ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in
                entry.target.classList.add('visible');

                // ScrollSpy: Update active link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
