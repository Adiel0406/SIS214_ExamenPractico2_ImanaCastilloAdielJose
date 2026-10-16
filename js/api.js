/* Carga el perfil y repositorios públicos reales del usuario configurado. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initGithub = function initGithub() {
    const status = document.getElementById('estado-github');
    const dataRoot = document.getElementById('datos-github');
    const retryButton = document.getElementById('reintentar-github');
    if (!status || !dataRoot || !retryButton) return;

    const username = 'Adiel0406';

    async function getJson(url) {
        const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
        if (!response.ok) {
            const error = new Error(`GitHub respondió HTTP ${response.status}.`);
            error.status = response.status;
            throw error;
        }
        return response.json();
    }

    function createExternalLink(url, label, linkVariant = 'github-link--repo') {
        const link = document.createElement('a');
        link.className = `github-link ${linkVariant}`;
        link.href = url;
        link.textContent = label;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        return link;
    }

    function renderProfile(profile, repositories) {
        const profileBlock = document.createElement('div');
        profileBlock.className = 'github-perfil';
        const profileName = document.createElement('h3');
        profileName.textContent = profile.name || profile.login;
        profileBlock.append(profileName);

        if (profile.bio) {
            const biography = document.createElement('p');
            biography.textContent = profile.bio;
            profileBlock.append(biography);
        }
        profileBlock.append(createExternalLink(profile.html_url, `Ver perfil de ${profile.login} en GitHub`, 'github-link--profile'));
        dataRoot.replaceChildren(profileBlock);

        const heading = document.createElement('h3');
        heading.className = 'github-repos';
        heading.textContent = 'Repositorios públicos recientes';
        dataRoot.append(heading);

        if (!repositories.length) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Este perfil no tiene repositorios públicos disponibles.';
            dataRoot.append(emptyMessage);
            return;
        }

        const list = document.createElement('ul');
        list.className = 'github-repos';
        repositories.slice(0, 6).forEach((repository) => {
            const item = document.createElement('li');
            item.append(createExternalLink(repository.html_url, repository.name));
            if (repository.description) item.append(`: ${repository.description}`);
            if (repository.language) item.append(` (${repository.language})`);
            list.append(item);
        });
        dataRoot.append(list);
    }

    function getErrorMessage(error) {
        if (error.status === 400) return 'GitHub rechazó la solicitud (400). Revisa el usuario configurado.';
        if (error.status === 404) return 'GitHub no encontró ese usuario (404).';
        if (error.status === 500) return 'GitHub presenta un error interno (500). Inténtalo más tarde.';
        if (error.status === 403 || error.status === 429) return 'GitHub limitó las consultas públicas. Inténtalo más tarde.';
        if (error.status) return `GitHub respondió con un error HTTP ${error.status}.`;
        return 'No se pudo conectar con GitHub. Comprueba tu conexión e inténtalo de nuevo.';
    }

    async function loadProfile() {
        status.dataset.state = 'loading';
        status.textContent = 'Cargando perfil y repositorios públicos de GitHub...';
        dataRoot.replaceChildren();
        retryButton.hidden = true;
        const encodedUsername = encodeURIComponent(username);

        try {
            const [profile, repositories] = await Promise.all([
                getJson(`https://api.github.com/users/${encodedUsername}`),
                getJson(`https://api.github.com/users/${encodedUsername}/repos?sort=updated&per_page=6`)
            ]);
            renderProfile(profile, repositories);
            status.dataset.state = 'success';
            status.textContent = 'Perfil y repositorios cargados desde la API pública de GitHub.';
        } catch (error) {
            status.dataset.state = 'error';
            status.textContent = getErrorMessage(error);
            dataRoot.replaceChildren(createExternalLink(`https://github.com/${username}`, `Abrir el perfil de ${username} en GitHub`, 'github-link--profile'));
            retryButton.hidden = false;
        }
    }

    retryButton.addEventListener('click', loadProfile);
    loadProfile();
};
