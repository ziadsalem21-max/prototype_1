// =========================
// EduConnect interactions
// - theme toggle (persist)
// - mobile menu toggle
// - smooth anchor scrolling for hero CTAs & nav
// - course filtering (live)
// - basic accessibility niceties
// =========================

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    /* THEME (dark) */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('edu_theme');
    if (savedTheme === 'dark') body.classList.add('dark');

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        localStorage.setItem('edu_theme', isDark ? 'dark' : 'light');
        themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });

    /* MOBILE MENU */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileToggle.addEventListener('click', () => {
        const opened = mobileMenu.getAttribute('aria-hidden') === 'false';
        mobileMenu.style.display = opened ? 'none' : 'block';
        mobileMenu.setAttribute('aria-hidden', opened ? 'true' : 'false');
        mobileToggle.setAttribute('aria-expanded', !opened ? 'true' : 'false');
    });

    // close mobile menu on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* HERO CTA anchors (smooth scroll) */
    document.getElementById('exploreBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('learnBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    /* NAV links: smooth scroll */
    document.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', (ev) => {
            // allow normal external URLs
            const href = a.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            ev.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* COURSE FILTER */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseList = Array.from(document.querySelectorAll('.course-card'));

    function applyFilter(filter) {
        courseList.forEach(card => {
            const cat = card.dataset.category || 'all';
            if (filter === 'all' || filter === cat) {
                card.style.display = ''; // default (flex/grid)
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.style.display = 'none';
                card.setAttribute('aria-hidden', 'true');
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter || 'all';
            applyFilter(f);
            // if in small screen and using scroll-snap, move viewport to first visible card
            const firstVisible = document.querySelector('.course-card[style*="display:"]') ?
                document.querySelector('.course-card:not([style*="display: none"])') : null;
            if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        });
    });

    /* Accessibility: close mobile menu on ESC */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu && mobileMenu.getAttribute('aria-hidden') === 'false') {
                mobileMenu.style.display = 'none';
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    /* Small polish: ensure course list shows all initially */
    applyFilter('all');
});
