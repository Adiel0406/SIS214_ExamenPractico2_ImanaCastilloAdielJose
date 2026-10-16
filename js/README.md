# JavaScript del portafolio

`main.js` coordina módulos JavaScript nativos clásicos al terminar de cargar el documento. No requiere `npm`, bundler ni sistema de módulos.

## Funcionalidades

- `theme.js`: persistencia JSON del tema.
- `navigation.js`: menú accesible y resaltado de la sección visible.
- `flashcards.js`: giro 3D y caras inactivas excluidas de tecnologías de asistencia.
- `filters.js`: filtros de habilidades (incluida la categoría de bases de datos) y proyectos sin alterar las colecciones base.
- `animations.js`: reveal de una sola vez, barra de lectura y movimiento reducido.
- `contact.js`: validación nativa/en vivo y envío EmailJS con protección de duplicados.
- `api.js`: perfil y repositorios reales de GitHub con estados y reintento.
- `main.js`: inicialización de módulos presentes en cada página.

## Configuración

El usuario de GitHub está definido por `username` en `api.js`. La consulta usa la API pública y no requiere token. No incluyas claves privadas ni secretos en este archivo.

`email-config.js` contiene el Service ID, Template ID y Public Key. La plantilla recibe `user_name`, `user_email`, `phone`, `contact_reason`, `message` y `privacy_consent`. Configura el destinatario en **To Email**, `{{user_email}}` en **Reply-To** y utiliza una dirección autorizada del servicio como **From Email**. No existe un campo de asunto en el formulario.

Las páginas con formulario cargan el CDN oficial `@emailjs/browser@5`. El script inicializa el SDK una vez por documento, limita solicitudes desde el navegador y espera `emailjs.sendForm()`. Solo un estado 200 limpia los campos y muestra aceptación. La Public Key puede publicarse; no incluyas la Private Key. Configura límites de dominio y mecanismos antispam en EmailJS.

El script compartido se carga en las cinco páginas y activa cada función solo cuando encuentra los controles requeridos en esa página. Mantén sincronizados los identificadores HTML con los selectores JavaScript al modificar una vista.
