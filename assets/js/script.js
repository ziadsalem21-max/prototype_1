// =========================
// EduConnect interactions
// - theme toggle (persist)
// - mobile menu toggle (class-based)
// - smooth anchor scrolling for hero CTAs & nav
// - course filtering (live)
// - accessibility: ESC to close mobile menu
// =========================

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    /* THEME (dark) — use body.dark to match CSS */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('edu_theme');
    if (savedTheme === 'dark') body.classList.add('dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark');
            localStorage.setItem('edu_theme', isDark ? 'dark' : 'light');
            themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        });
    }

    /* MOBILE MENU (class-based .active) */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const opened = mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-hidden', opened ? 'false' : 'true');
            mobileToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* HERO CTA anchors (smooth scroll) */
    const exploreBtn = document.getElementById('exploreBtn');
    const learnBtn = document.getElementById('learnBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('courses');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (learnBtn) {
        learnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('about');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    /* NAV LINKS: smooth scroll for nav links on desktop */
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', (ev) => {
            const href = a.getAttribute('href');
            if (!href || !href.startsWith('#')) return; // external links proceed
            ev.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* COURSE FILTER */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = Array.from(document.querySelectorAll('.course-card'));

    function applyFilter(filter) {
        courseCards.forEach(card => {
            const cat = (card.dataset.category || 'all').toLowerCase();
            if (filter === 'all' || filter === cat) {
                card.style.display = '';
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.style.display = 'none';
                card.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = (btn.dataset.filter || 'all').toLowerCase();
                applyFilter(f);
                const firstVisible = document.querySelector('.course-card:not([style*="display: none"])');
                if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            });
        });
    }

    // initial state
    applyFilter('all');
});
