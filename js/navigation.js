/* Mantiene accesible el menú compacto y marca la sección visible. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initNavigation = function initNavigation() {
    const navigation = document.querySelector('nav[aria-label="Navegación principal"]');
    if (!navigation) return;

    const menuButton = navigation.querySelector('#btn-menu');
    const menu = navigation.querySelector('#menu-principal');
    const compactNavigation = window.matchMedia('(max-width: 1024px)');

    if (menuButton && menu) {
        function closeMenu() {
            menu.classList.remove('abierto');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Abrir menú de navegación');
        }

        function syncMenu() {
            navigation.classList.toggle('menu-colapsable', compactNavigation.matches);
            closeMenu();
        }

        syncMenu();
        compactNavigation.addEventListener('change', syncMenu);
        menuButton.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('abierto');
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        });
        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) closeMenu();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
                closeMenu();
                menuButton.focus();
            }
        });
    }

    const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
    const sections = sectionLinks
        .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
        .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (!visibleSections.length) return;
        const currentId = visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0].target.id;

        sectionLinks.forEach((link) => {
            const isCurrent = link.hash === `#${currentId}`;
            link.classList.toggle('is-active', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'location');
            else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
        });
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.5] });

    sections.forEach((section) => sectionObserver.observe(section));
};
