/* Revela contenido una sola vez y actualiza el progreso solo durante el scroll. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initAnimations = function initAnimations() {
    const revealTargets = [...new Set(document.querySelectorAll(
        'header, main > section, main > aside, main > section article[data-reveal], [data-flashcard], footer'
    ))];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

        revealTargets.forEach((target) => {
            target.classList.add('reveal-ready');
            revealObserver.observe(target);
        });
    } else {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    }

    if (prefersReducedMotion) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Progreso de lectura');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    document.body.prepend(progressBar);

    let frameRequested = false;
    function updateProgress() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100)) : 0;
        progressBar.style.transform = `scaleX(${progress / 100})`;
        progressBar.setAttribute('aria-valuenow', String(progress));
        frameRequested = false;
    }

    window.addEventListener('scroll', () => {
        if (frameRequested) return;
        frameRequested = true;
        window.requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();
};
