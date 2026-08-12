# Fans3D — Web

Proyecto base: React + Vite + Bootstrap + React Router (sin backend por ahora — se puede sumar una API en .NET más adelante).

## Estructura

```
public/
  img/
    banner.png       Fondo del hero (imagen generada)
    logo.jpeg         Logo real del cliente (navbar + footer + favicon)
    P (1).jpeg ... P (10).jpeg   Fotos de producto reales
src/
  pages/
    Home.jsx          Home: hero, categorías, personalizados, nosotros, instagram, ferias
    CatalogPage.jsx    /catalogo — tienda completa: búsqueda, filtro por categoría, grid, modal de detalle
  components/
    Header, Hero, Categories, CustomOrder, AboutSection,
    InstagramFeed, Events, Footer, ProductModal, ProductThumb
  data/mockData.js    Datos de ejemplo (categorías, productos con foto real, eventos, posts de instagram)
  utils/images.js     Helper para armar URLs de fotos con espacios/paréntesis en el nombre
  App.jsx              Layout + rutas (Header + Routes + Footer)
  main.jsx             Monta BrowserRouter
```

## Cómo correrlo

No pude ejecutar `npm install` desde acá (el sandbox de este chat no está disponible), así que corré esto en tu máquina, dentro de la carpeta del proyecto:

```
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Dependencias nuevas: `react-router-dom` (multi-página), `react-social-media-embed` (embeds de Instagram), `react-lazy-load-image-component` (fotos de producto con tamaño/recorte consistente) y `gsap` (animaciones — ver abajo).

## Animaciones (GSAP)

Se agregó `gsap` con los plugins ScrollTrigger, SplitText, DrawSVGPlugin y Flip, registrados una sola vez en `src/lib/gsapSetup.js`. Desde GSAP 3.13 (2025) todos los plugins son gratis, no hace falta ninguna licencia de Club GSAP ni paquete extra — con `npm install` alcanza.

Dónde se usa cada uno:
- **Hero** (`Hero.jsx`): el título se separa en letras (SplitText) y entra en cascada al cargar; hay un garabato SVG debajo del título que se "dibuja" solo (DrawSVGPlugin), como si lo imprimiera una boquilla; y un parallax sutil del texto al scrollear (ScrollTrigger). El zoom lento y continuo del banner ("Ken Burns") es CSS puro (`.hero-kenburns` en `index.css`), no necesita GSAP.
- **FandomMarquee** (`FandomMarquee.jsx`): franja oscura con las franquicias que se trabajan, en loop infinito.
- **ProcessSection** (`ProcessSection.jsx`): reemplaza el viejo "Cómo lo hacemos" con una versión honesta (elegís/mandás el modelo → lo imprimimos → pintamos y entregamos), con scroll-storytelling: la sección se fija en pantalla mientras scrolleás y los 3 pasos se van revelando en secuencia con una barra de progreso.
- **CatalogPage**: al cambiar de categoría, las cards del catálogo se reacomodan animadas en vez de "saltar" (GSAP Flip).

## Cambios de esta vuelta

- **Banner como fondo real**: antes era una imagen "flotando" en una card con bordes redondeados y espacios en blanco. Ahora `banner.png` es el `background-image` de toda la sección hero (`.hero-section` en `index.css`), con `background-size: cover` y `background-position: right center`, igual que en el mockup aprobado. El texto queda arriba a la izquierda sobre la parte clara de la imagen.
- **Logo real**: Header, Footer y el favicon de la pestaña ahora usan `public/img/logo.jpeg` en vez del ícono genérico anterior.
- **Fotos reales de producto**: cada producto en `mockData.js` tiene un campo `image` apuntando a una de las fotos que pasaste (`P (1).jpeg` a `P (10).jpeg`). La asignación es provisoria — no coincide necesariamente la foto con la descripción, como dijiste que no importaba por ahora. Se puede reordenar cambiando el campo `image` de cada producto.
- **Por qué esta librería para imágenes**: usé `react-lazy-load-image-component` + CSS `object-fit: cover` para que todas las fotos (que tienen tamaños/proporciones distintas, típico de fotos sacadas con el celular) se vean recortadas y centradas de forma consistente en cards, catálogo y modal de detalle, con un efecto de carga suave. No agregué una librería de recorte/rotación interactivo (tipo `react-easy-crop`) porque hoy no hay un panel de carga de productos — eso lo sumamos cuando haya backend/admin y el cliente pueda subir fotos y ajustarlas él mismo.
- **"Cómo lo hacemos" se sacó**: implicaba que diseñamos/esculpimos personajes, y el cliente confirmó por WhatsApp que no ofrece escultura o diseño digital de personas/personajes (solo objetos simples: cajas, marcos, piezas). Se reemplazó por una sección "Nosotros" honesta, con qué hacemos / qué no hacemos.
- **Personalizados**: se ajustó el copy y el formulario para pedir archivo STL/objeto simple en vez de "hacemos tu personaje a medida".
- **Instagram real**: el feed usa `react-social-media-embed` para embeber posteos públicos reales (no hace falta token ni API de Meta). Hay que reemplazar las URLs placeholder en `src/data/mockData.js` (`instagramPosts`) por links reales de posteos de `@fans3d_impresiones` (click derecho sobre el posteo → Copiar enlace).
- **Tienda como página aparte**: el catálogo completo ya no vive en el home. Ahora es la ruta `/catalogo`, con buscador, filtro por categoría (sidebar) y grid de productos con fotos reales. Las categorías del home llevan directo a `/catalogo?categoria=...` con el filtro aplicado. El click en un producto sigue abriendo el modal de detalle (foto, precio, altura, material, entrega).

## Limpieza pendiente (no pude borrar archivos desde acá)

Estos archivos quedaron sin usar, los podés borrar cuando quieras:
- `src/components/Catalog.jsx` (reemplazado por `src/pages/CatalogPage.jsx`)
- `src/components/HowWeDoIt.jsx` (reemplazado por `src/components/AboutSection.jsx`)

## Pendiente / próximos pasos sugeridos

- Ajustar qué foto va con qué producto a medida que definan el catálogo real (y sus precios/medidas reales).
- Cargar URLs reales de Instagram en `mockData.js`.
- Definir flujo de compra final (¿cotizar por WhatsApp o checkout real?).
- Si arrancamos el backend en .NET: API para catálogo, pedidos personalizados y eventos, y ahí sí un panel de carga de fotos con recorte/rotación.
