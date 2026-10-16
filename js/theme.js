/* Gestiona los dos temas y guarda únicamente la preferencia visual. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initTheme = function initTheme() {
    const themeButton = document.getElementById('btn-modo');
    const themeLabel = document.getElementById('texto-modo');
    if (!themeButton || !themeLabel) return;

    function applyTheme(theme, persist = false) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('modo-oscuro', isDark);
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        themeButton.setAttribute('aria-pressed', String(isDark));
        themeButton.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
        themeLabel.textContent = isDark ? 'Modo claro' : 'Modo oscuro';

        if (persist) {
            try {
                localStorage.setItem('cv-theme', JSON.stringify({ theme }));
            } catch {
                themeLabel.textContent += ' (no se pudo guardar)';
            }
        }
    }

    let savedTheme = 'light';
    try {
        savedTheme = JSON.parse(localStorage.getItem('cv-theme') ?? 'null')?.theme === 'dark' ? 'dark' : 'light';
    } catch {
        savedTheme = 'light';
    }

    applyTheme(savedTheme);
    themeButton.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('modo-oscuro') ? 'light' : 'dark';
        applyTheme(nextTheme, true);
    });
};
