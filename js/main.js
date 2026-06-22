document.addEventListener('DOMContentLoaded', () => {

    /* --- Année du copyright -------------------------------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* --- Nav : état "scrolled" ----------------------------------- */
    const nav = document.getElementById('nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* --- Menu mobile --------------------------------------------- */
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const closeMenu = () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* --- Apparition au scroll (reveal) --------------------------- */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in'));
    }

    /* --- Lightbox galerie ---------------------------------------- */
    const figures = Array.from(document.querySelectorAll('.gallery figure'));
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbCaption = document.getElementById('lbCaption');
    let current = 0;

    const items = figures.map(fig => {
        const img = fig.querySelector('img');
        const cap = fig.querySelector('figcaption');
        return { src: img.getAttribute('src'), alt: img.getAttribute('alt'), caption: cap ? cap.textContent : '' };
    });

    const show = (i) => {
        current = (i + items.length) % items.length;
        const it = items[current];
        lbImg.setAttribute('src', it.src);
        lbImg.setAttribute('alt', it.alt);
        lbCaption.textContent = it.caption;
    };
    const openLb = (i) => { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };

    figures.forEach((fig, i) => {
        fig.addEventListener('click', () => openLb(i));
    });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
    document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
    });

});
