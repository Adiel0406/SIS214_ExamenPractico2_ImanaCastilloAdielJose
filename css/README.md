# Estilos del portafolio

Las hojas se enlazan en este orden en las cinco páginas HTML. No requieren compilación:

- `styles.css`: reset, estructura base, formularios y breakpoints.
- `paleta-viva.css`: tokens navy/blue/violet/cyan y variantes de tema.
- `componentes-vivos.css`: hero, navegación, flashcards, filtros, tarjetas y estados.
- `movimiento.css`: IntersectionObserver, transiciones, progreso y `prefers-reduced-motion`.

## Organización

- Los tokens académicos originales se conservan en `styles.css`; `paleta-viva.css` añade variables de identidad visual.
- El tema oscuro se mantiene con `body.modo-oscuro`.
- Los componentes nuevos reutilizan las clases existentes de navegación, secciones, proyectos, multimedia y formulario.
- Los breakpoints siguen definidos en la hoja base: tabletas entre 768 y 1024 px y escritorio desde 1025 px.

## Mantenimiento

Conserva los tokens CSS solicitados por la evaluación y usa las variables existentes en los componentes. Antes de añadir reglas específicas para una página nueva, comprueba si el componente ya tiene estilos reutilizables. Verifica el diseño en móvil, tableta y escritorio y mantén visible el foco de teclado.
