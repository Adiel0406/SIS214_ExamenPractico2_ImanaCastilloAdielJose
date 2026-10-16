/* Voltea tarjetas con botón nativo y oculta la cara inactiva del árbol accesible. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initFlashcards = function initFlashcards() {
    document.querySelectorAll('[data-flashcard]').forEach((card) => {
        const front = card.querySelector('.flashcard__front');
        const back = card.querySelector('.flashcard__back');
        if (!front || !back) return;

        function setFlipped(isFlipped) {
            card.classList.toggle('is-flipped', isFlipped);
            card.setAttribute('aria-expanded', String(isFlipped));
            card.setAttribute('aria-label', `${isFlipped ? 'Mostrar cara frontal de' : 'Mostrar detalles de'} ${card.dataset.skillName}`);
            front.setAttribute('aria-hidden', String(isFlipped));
            back.setAttribute('aria-hidden', String(!isFlipped));
            front.toggleAttribute('inert', isFlipped);
            back.toggleAttribute('inert', !isFlipped);
        }

        setFlipped(false);
        card.addEventListener('click', () => {
            setFlipped(card.getAttribute('aria-expanded') !== 'true');
        });
    });
};
