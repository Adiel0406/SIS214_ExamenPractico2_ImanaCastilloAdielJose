/* Coordina módulos independientes después de que el documento está listo. */
document.addEventListener('DOMContentLoaded', () => {
    const modules = window.PortfolioModules ?? {};
    [
        modules.initTheme,
        modules.initNavigation,
        modules.initFlashcards,
        modules.initFilters,
        modules.initAnimations,
        modules.initContact,
        modules.initGithub
    ].forEach((initialize) => initialize?.());
});
