
# TISIO — RESUMEN

## Estructura
- `index.html`: página de inicio.
- `webs/tienda.html`: catálogo y filtros.
- `webs/producto.html`: ficha de cada producto (articulo).
- `webs/cesta.html`: contenido y resumen de la cesta.
- `webs/login.html`: acceso y registro.
- `webs/informacion.html`: información y contacto tienda.
- `404.html`: página para direcciones no encontradas.
- `css/estilos.css`: estilos generales y adaptación visual.

## JavaScript
- `auth.js`: registro, inicio y cierre de sesión; guarda usuarios en el navegador.
- `carrito.js`: operaciones comunes de cesta y persistencia de sus productos en opción desplegable.
- `carrusel.js`: controles y cambio automático del carrusel de inicio.
- `categorias.js`: desplazamiento horizontal de las categorías.
- `cesta.js`: muestra productos, cantidades, subtotales y total de la cesta.
- `contacto.js`: valida los campos y el envío del formulario de contacto.
- `datos-productos.js`: catálogo de productos y sus características.
- `detalle.js`: obtiene el producto solicitado y gestiona imágenes, tallas y añadido a la cesta.
- `login.js`: valida los formularios de acceso y registro.
- `menu.js`: menú desplegable hamburguesa y búsqueda de productos.
- `sidebar.js`: apertura de la barra lateral y sus grupos de filtros.
- `tema.js`: cambia entre tema claro y oscuro y actualiza el logotipo.
- `tienda.js`: filtra, ordena y muestra el catálogo.
- `voltear.js`: alterna visualmente entre acceso y registro.

## Cómo funciona en conjunto
`datos-productos.js` proporciona los productos, `tienda.js` y `detalle.js` los muestran, `carrito.js` mantiene la cesta y `cesta.js` presenta su contenido completo. `auth.js` y `login.js` gestionan el acceso.

## Página de iconos:
- [Enlace Motor FontAwesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css): Sirve para enlazar servidor para no ocupar mucho espacio para poner todos los iconos.
- [Enlace Iconos FontAwesome](https://fontawesome.com/icons): Muestra los iconos visuales.

## Copyright  
Crado por **Javier Collado Vinagre**  
Enlace del proyecto vercel: [Página Web](https://tisioshop.vercel.app)  
Enlace del proyecto github: [GitHub](https://github.com/javy016/TISIO)  
Enlace portafolios: [Portafolios](https://javiercolladovinagre.netlify.app)
