# Hoja de vida y portafolio

Portafolio profesional de Adiel Jose Imaña Castillo, estudiante de Ingeniería de Sistemas en la Universidad Católica Boliviana, sede La Paz. Fue desarrollado para la evaluación práctica de Tecnologías Web I (SIS-214) y conserva la información, proyectos y recursos multimedia del CV.

---

## 🚀 Enlaces del Proyecto

* **Sitio publicado:** pendiente de configurar en GitHub Pages.
* **Repositorio:** https://github.com/Adiel0406/hoja_de_vida_adiel_jose_imana_castilo

---

## 👨‍💻 Datos del Estudiante

* **Nombre:** Adiel Jose Imaña Castillo
* **Carrera:** Ingeniería de Sistemas (4.º Semestre)
* **Institución:** Universidad Católica Boliviana "San Pablo" (Sede La Paz)
* **Materia:** Tecnologías Web I (SIS-214)
* **Docente:** Ing. M.Sc. Miguel Angel Pacheco Arteaga

---

## 🛠️ Tecnologías Utilizadas

* HTML5 semántico y controles accesibles.
* CSS3, variables, Flexbox, Grid y media queries mobile-first.
* JavaScript ES6+, Fetch API y almacenamiento local JSON.
* Lenguajes y tecnologías declarados: Python, C++, Java, HTML5, CSS y SQL; herramientas: Visual Studio Code, CLion, PyCharm y PostgreSQL.
* API REST pública de GitHub, sin token ni credenciales.
* Envío de formulario mediante EmailJS Browser SDK v5, con rate limit local y estado ligado a la respuesta del SDK.


## 📂 Estructura del Proyecto

```text
hoja-vida/
├── index.html            # Archivo principal con marcado HTML5 semántico
├── formacion.html        # Formación, experiencia, habilidades e idiomas
├── proyectos.html        # Proyectos y repositorios públicos de GitHub
├── multimedia.html       # Imagen, audio y video del portafolio
├── contacto.html         # Formulario de contacto con EmailJS
├── css/
│   ├── README.md
│   ├── styles.css        # Hoja de estilos principal con Flexbox, Grid y Responsive
│   ├── paleta-viva.css    # Tokens de los dos temas visuales
│   ├── componentes-vivos.css # Hero, tarjetas, navegación y controles
│   └── movimiento.css    # Reveals, transiciones y progreso de lectura
├── js/
│   ├── README.md
│   ├── email-config.js   # Configuración pública de EmailJS
│   ├── main.js            # Coordinador de módulos
│   ├── theme.js           # Tema claro/oscuro
│   ├── navigation.js      # Menú responsive y navegación accesible
│   ├── flashcards.js      # Interacción accesible de tarjetas
│   ├── filters.js         # Filtros de habilidades y proyectos
│   ├── animations.js      # IntersectionObserver y progreso
│   ├── contact.js         # Validación y EmailJS
│   └── api.js             # Perfil y repositorios de GitHub
├── assets/               # Recursos multimedia del proyecto
│   ├── README.md
│   ├── documents/
│   ├── images/           # Fotografía de perfil y capturas de proyectos
│   ├── audio/            # Presentación profesional en audio
│   └── video/            # Demostración en video de proyecto
└── README.md             # Documentación del repositorio
```

## Funcionalidades

* Temas claro/oscuro persistidos en `localStorage` como JSON.
* Navegación entre páginas, menú hamburguesa accesible y cierre por enlace o Escape.
* Flashcards por teclado/táctil para lenguajes, desarrollo web, bases de datos, herramientas y habilidades declaradas, con filtros de categoría.
* Búsqueda y filtros tecnológicos de proyectos sin modificar la colección original.
* La sección de experiencia incluye las ayudantías indicadas por el estudiante: Programación 2 (actual), Introducción a la Programación y Álgebra Lineal.
* La galería conserva los dos proyectos académicos anteriores y añade el videojuego de Terrifier en C++, la aplicación de datos del Mundial 2026 en Java y el Sorteador del Mundial en HTML. Los enlaces se indican como pendientes hasta que existan URLs reales.
* El perfil expresa el interés en desarrollo de software y armado y análisis de datos con bases de datos.
* Aparición por `IntersectionObserver`, indicador de lectura y alternativa `prefers-reduced-motion`.
* Formulario con validación HTML5 y mensajes accesibles. Cuando EmailJS está configurado, envía los campos al destinatario y solo confirma que EmailJS aceptó la solicitud tras una respuesta HTTP exitosa.
* Perfil y repositorios públicos cargados desde GitHub, con estados de carga, éxito y error y opción de reintento.

## Ejecución local

Desde la carpeta del proyecto, inicia un servidor estático:

```sh
python3 -m http.server 8000
```

Abre http://localhost:8000. La consulta a GitHub requiere conexión a Internet.

## Configuración de GitHub

El nombre de usuario está configurado en `js/api.js` como `Adiel0406`, identificado en el enlace del repositorio original. Si debe ser otro, cambia el valor `username`. Se consultan los endpoints públicos `/users/{usuario}` y `/users/{usuario}/repos`; no se necesitan tokens.

## Configuración de EmailJS

El SDK oficial se carga desde `https://cdn.jsdelivr.net/npm/@emailjs/browser@5/dist/email.min.js` en las dos páginas que contienen el formulario. Los valores `serviceId`, `templateId` y `publicKey` están en `js/email-config.js`. El formulario envía estos nombres de campo: `user_name`, `user_email`, `phone`, `contact_reason`, `message` y `privacy_consent`. No hay campo `subject`; puedes construir el asunto de la plantilla con `{{user_name}}` y `{{contact_reason}}`.

En EmailJS, configura el destinatario `imanaadiel4@gmail.com` en el campo **To Email** de la plantilla y `{{user_email}}` en **Reply-To**. El campo **From Email** debe usar la dirección autorizada del servicio, no el correo introducido por el visitante. La plantilla puede mostrar `{{user_name}}`, `{{user_email}}`, `{{phone}}`, `{{contact_reason}}` y `{{message}}`; `{{privacy_consent}}` es opcional.

La Public Key está diseñada para uso frontend. No copies una Private Key ni otros secretos al repositorio. Restringe los dominios autorizados desde EmailJS, activa CAPTCHA/antispam en la cuenta cuando corresponda y revisa sus cuotas. El SDK limita solicitudes desde la página; esto no sustituye los controles de abuso del proveedor. El éxito se muestra solo si `sendForm()` devuelve estado 200; eso confirma que EmailJS aceptó el envío, no garantiza la entrega final en la bandeja de entrada.

## Publicación en GitHub Pages

1. Confirma que `index.html` esté en la raíz del repositorio.
2. Sube los cambios a GitHub en la rama elegida.
3. Abre **Settings > Pages** en el repositorio.
4. Selecciona **Deploy from a branch**, la rama (normalmente `main`) y la carpeta `/ (root)`; guarda.
5. Cuando termine el despliegue, abre la URL que muestra Pages y revisa recursos y funcionalidades.

URL del repositorio: https://github.com/Adiel0406/hoja_de_vida_adiel_jose_imana_castilo

URL de GitHub Pages: ______________________________________________