document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SCROLL REVEAL SYSTEM
    ========================= */

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));

    /* =========================
       COUNTER ANIMATION (if extended later)
    ========================= */

    const counters = document.querySelectorAll("[data-count]");

    const animateCount = (el) => {

        const target = +el.getAttribute("data-count");
        let current = 0;

        const step = target / 80;

        const update = () => {

            current += step;

            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        update();
    };

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                animateCount(entry.target);
                counterObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(c => counterObserver.observe(c));

    /* =========================
       SMOOTH NAV ACTIVE STATE
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }

        });

    });

    /* =========================
       ENERGY BACKGROUND PARALLAX
    ========================= */

    const glows = document.querySelectorAll(".glow");

    window.addEventListener("mousemove", (e) => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glows.forEach((glow, index) => {

            const speed = (index + 1) * 20;

            glow.style.transform = `
                translate(
                    ${x * speed}px,
                    ${y * speed}px
                )
            `;
        });

    });

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.background = "rgba(7,11,18,0.92)";
            header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
        } else {
            header.style.background = "rgba(7,11,18,0.7)";
            header.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        }

    });

    /* =========================
       SMOOTH SCROLL FIX
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });

            }

        });

    });

});