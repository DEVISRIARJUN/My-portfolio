// Theme toggle
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    } else {
        // Default to light if no theme saved
        body.setAttribute('data-theme', 'light');
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.classList.add('solid-header');
        } else {
            header.classList.remove('solid-header');
        }
    });

    // Section visibility on scroll
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animated Bubbles Logic
    (function() {
        const bubblesBg = document.querySelector('.bubbles-bg');
        const NUM_BUBBLES = 30;
        const bubbles = [];

        function randomBetween(min, max) {
            return Math.random() * (max - min) + min;
        }

        function createBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubblesBg.appendChild(bubble);

            const size = randomBetween(15, 60);
            const startX = randomBetween(0, window.innerWidth);
            const startY = randomBetween(0, window.innerHeight);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${startX}px`;
            bubble.style.top = `${startY}px`;

            // Random direction and amplitude for gentle float
            bubble.dataset.dx = randomBetween(-0.5, 0.5);
            bubble.dataset.dy = randomBetween(-0.5, 0.5);
            bubble.dataset.amp = randomBetween(8, 24);
            bubble.dataset.phase = randomBetween(0, Math.PI * 2);
            // Random speed multiplier for natural look
            bubble.dataset.speed = randomBetween(0.6, 1.5);
            bubblesBg.appendChild(bubble);
            bubbles.push(bubble);
        }

        for (let i = 0; i < NUM_BUBBLES; i++) createBubble();

        function animateBubbles() {
            const now = Date.now();
            bubbles.forEach((bubble, i) => {
                let x = parseFloat(bubble.style.left);
                let y = parseFloat(bubble.style.top);
                let dx = parseFloat(bubble.dataset.dx);
                let dy = parseFloat(bubble.dataset.dy);
                let amp = parseFloat(bubble.dataset.amp);
                let phase = parseFloat(bubble.dataset.phase);
                let speed = parseFloat(bubble.dataset.speed);

                // Gentle floating using sine/cosine, with speed variation
                const t = now / (4000 / speed) + phase;
                const nx = x + Math.sin(t) * dx * amp;
                const ny = y + Math.cos(t) * dy * amp;

                bubble.style.transform = `translate(${nx - x}px, ${ny - y}px)`;
            });
            requestAnimationFrame(animateBubbles);
        }
        animateBubbles();
    })();

    // Hamburger menu logic
    const hamburger = document.getElementById('hamburger-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    function closeMenu() {
        dropdownMenu.classList.remove('open');
    }
    function openMenu() {
        dropdownMenu.classList.add('open');
    }
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
    });
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownMenu.classList.contains('open') && !dropdownMenu.contains(e.target) && e.target !== hamburger) {
            closeMenu();
        }
    });
    // Smooth scroll for dropdown links
    dropdownMenu.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            closeMenu();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });