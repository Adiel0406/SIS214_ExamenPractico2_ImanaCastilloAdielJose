/* Valida el formulario y envía sus controles originales mediante EmailJS. */
window.PortfolioModules = window.PortfolioModules || {};
window.PortfolioModules.initContact = function initContact() {
    const form = document.getElementById('form-contacto');
    const status = document.getElementById('mensaje-formulario');
    if (!form || !status) return;

    const fields = [...form.querySelectorAll('input, textarea, select')];
    const submitButton = form.querySelector('button[type="submit"]');
    const emailConfig = window.emailJsConfig ?? {};
    let isSending = false;

    function setStatus(message, state) {
        status.className = `mensaje-respuesta ${state}`;
        status.textContent = message;
        status.hidden = false;
    }

    function validateField(field) {
        field.setCustomValidity('');
        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        let message = '';

        if (field.id === 'nombre') {
            if (!value) message = 'Escribe tu nombre.';
            else if (value.length < 3) message = 'El nombre debe tener al menos 3 caracteres.';
        } else if (field.id === 'correo') {
            if (!value) message = 'Escribe tu correo electrónico.';
            else if (field.validity.typeMismatch) message = 'Escribe un correo electrónico válido.';
        } else if (field.id === 'telefono') {
            if (!value) message = 'Escribe tu número de teléfono.';
            else if (field.validity.patternMismatch) message = 'Usa un teléfono válido, por ejemplo +591 67167255.';
        } else if (field.id === 'motivo' && !value) {
            message = 'Selecciona un motivo de contacto.';
        } else if (field.id === 'mensaje') {
            if (!value) message = 'Escribe un mensaje.';
            else if (value.length < 10) message = 'El mensaje debe contener al menos 10 caracteres.';
        } else if (field.id === 'aceptacion' && !value) {
            message = 'Debes aceptar el uso de tus datos para responder a la consulta.';
        }

        if (!message && !field.validity.valid) message = field.validationMessage;
        field.setCustomValidity(message);
        field.setAttribute('aria-invalid', String(Boolean(message)));
        field.classList.toggle('campo-error', Boolean(message));
        const errorNode = document.getElementById(`error-${field.id}`);
        if (errorNode) errorNode.textContent = message;
        return !message;
    }

    function validateFromEvent(event) {
        if (fields.includes(event.target)) validateField(event.target);
        status.hidden = true;
    }

    form.addEventListener('invalid', (event) => {
        if (fields.includes(event.target)) validateField(event.target);
    }, true);
    form.addEventListener('input', validateFromEvent);
    form.addEventListener('change', validateFromEvent);
    form.addEventListener('reset', () => {
        fields.forEach((field) => {
            field.setCustomValidity('');
            field.setAttribute('aria-invalid', 'false');
            field.classList.remove('campo-error');
            const errorNode = document.getElementById(`error-${field.id}`);
            if (errorNode) errorNode.textContent = '';
        });
        status.hidden = true;
    });

    function serviceErrorMessage(error) {
        if (error.status === 400) return 'EmailJS rechazó la solicitud. Revisa el servicio, la plantilla y sus variables.';
        if (error.status === 401 || error.status === 403) return 'EmailJS no autorizó el envío. Revisa la Public Key y los dominios permitidos.';
        if (error.status === 405) return 'El servidor rechazó el método POST (405). En Network, revisa la URL y el iniciador de la solicitud.';
        if (error.status === 429) return 'EmailJS limitó temporalmente los envíos. Espera un momento y vuelve a intentarlo.';
        if (error.status === 451) return 'EmailJS bloqueó la solicitud. Revisa las opciones de seguridad y antispam de la cuenta.';
        if (error.status >= 500) return 'EmailJS presenta un problema temporal. El mensaje no se confirmó como enviado.';
        return 'No se pudo contactar con EmailJS. El mensaje no se envió; comprueba tu conexión y reintenta.';
    }

    async function sendFormWithEmailJs() {
        const emailJs = window.emailjs;
        if (!emailJs || typeof emailJs.sendForm !== 'function') {
            throw new Error('No se cargó el SDK de EmailJS Browser.');
        }

        if (!window.portfolioEmailJsInitialized) {
            emailJs.init({
                publicKey: emailConfig.publicKey,
                limitRate: { id: 'portfolio-contact-form', throttle: 10000 }
            });
            window.portfolioEmailJsInitialized = true;
        }

        return emailJs.sendForm(emailConfig.serviceId, emailConfig.templateId, form);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isSending) return;

        const isValid = fields.map(validateField).every(Boolean);
        if (!isValid) {
            form.reportValidity();
            fields.find((field) => !field.checkValidity())?.focus();
            return;
        }

        const settingsReady = ['serviceId', 'templateId', 'publicKey'].every((key) => Boolean(emailConfig[key]));
        if (!settingsReady) {
            setStatus('No se envió el mensaje: falta la configuración de EmailJS.', 'error');
            return;
        }

        isSending = true;
        submitButton.disabled = true;
        form.setAttribute('aria-busy', 'true');
        setStatus('Enviando el mensaje a través de EmailJS...', 'cargando');

        try {
            const response = await sendFormWithEmailJs();
            if (response.status !== 200) {
                const error = new Error(`EmailJS respondió con estado ${response.status}.`);
                error.status = response.status;
                error.text = response.text;
                throw error;
            }

            form.reset();
            setStatus('EmailJS aceptó la solicitud de envío. Revisa la bandeja de entrada y correo no deseado.', 'exito');
        } catch (error) {
            console.error('[EmailJS] No se pudo enviar el formulario.', {
                status: error.status,
                details: error.text ?? error.message
            });
            setStatus(serviceErrorMessage(error), 'error');
        } finally {
            isSending = false;
            submitButton.disabled = false;
            form.removeAttribute('aria-busy');
        }
    });
};
