/* Filtra tarjetas sin modificar las colecciones originales del documento. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initFilters = function initFilters() {
    const skillCards = Object.freeze([...document.querySelectorAll('[data-skill-card]')]);
    const skillFilters = [...document.querySelectorAll('[data-skill-filter]')];
    const skillStatus = document.getElementById('estado-habilidades');
    let activeSkillCategory = 'all';

    function updateSkills() {
        const visibleCards = skillCards
            .filter((card) => activeSkillCategory === 'all' || card.dataset.category === activeSkillCategory)
            .map((card) => card);
        const visibleSet = new Set(visibleCards);
        skillCards.forEach((card) => { card.hidden = !visibleSet.has(card); });
        if (skillStatus) skillStatus.textContent = `${visibleCards.length} ${visibleCards.length === 1 ? 'habilidad visible' : 'habilidades visibles'}.`;
    }

    skillFilters.forEach((filter) => {
        filter.addEventListener('click', () => {
            activeSkillCategory = filter.dataset.skillFilter;
            skillFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
            updateSkills();
        });
    });
    if (skillCards.length) updateSkills();

    const searchField = document.getElementById('buscar-proyectos');
    const projectStatus = document.getElementById('estado-filtro');
    const projectCards = Object.freeze(
        [...document.querySelectorAll('#lista-proyectos > [data-project-card]')].map((element) => ({
            element,
            text: element.textContent.toLocaleLowerCase('es'),
            technologies: (element.dataset.technologies ?? '').split(/\s+/).filter(Boolean)
        }))
    );
    const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
    let activeTechnology = 'all';

    function updateProjects() {
        const query = searchField?.value.trim().toLocaleLowerCase('es') ?? '';
        const matchingProjects = projectCards
            .filter(({ text, technologies }) => {
                const matchesText = text.includes(query);
                const matchesTechnology = activeTechnology === 'all' || technologies.includes(activeTechnology);
                return matchesText && matchesTechnology;
            })
            .map((project) => project.element);
        const visibleSet = new Set(matchingProjects);
        projectCards.forEach(({ element }) => { element.hidden = !visibleSet.has(element); });

        if (!projectStatus) return;
        projectStatus.textContent = matchingProjects.length
            ? `${matchingProjects.length} ${matchingProjects.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}.`
            : 'No se encontraron proyectos que coincidan con los filtros.';
    }

    searchField?.addEventListener('input', updateProjects);
    projectFilters.forEach((filter) => {
        filter.addEventListener('click', () => {
            activeTechnology = filter.dataset.projectFilter;
            projectFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
            updateProjects();
        });
    });
    if (projectCards.length) updateProjects();
};
