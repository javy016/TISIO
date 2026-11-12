document.addEventListener('DOMContentLoaded', () => {
    // Si hay una búsqueda activa, no muestra el resto de productos
    if (window.busquedaActiva) return;

    // Detectamos si estamos en el index o en la tienda
    const esIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const contenedor = document.getElementById('lista-productos') || document.getElementById('destacados-index');
    if (!contenedor) return;

    // Leemos los filtros de la URL
    const parametros = new URLSearchParams(window.location.search);
    const generoSeleccionado = parametros.get('genero');
    const tipoSeleccionado = parametros.get('tipo');
    const soloNuevos = parametros.get('nuevo') === 'true';
    const terminoBusqueda = parametros.get('buscar');

    // Filtramos los productos según los parámetros de la URL
    let productosBase = productos;

    if (esIndex) {
        productosBase = productosBase.filter(p => p.nuevo === true).slice(0, 5);
    } else {
        if (soloNuevos) productosBase = productosBase.filter(p => p.nuevo === true);
        if (generoSeleccionado) productosBase = productosBase.filter(p => p.genero === generoSeleccionado || p.genero === 'unisex');
        if (tipoSeleccionado) productosBase = productosBase.filter(p => p.categoria === tipoSeleccionado);
        if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            productosBase = productosBase.filter(p => p.nombre.toLowerCase().includes(termino));
        }
    }

    // Muestra las tarjetas de los articulos
    function renderizarProductos(listaProductos) {
        contenedor.innerHTML = '';
        
        const contador = document.getElementById('resultado-contador');
        if (contador) contador.textContent = `Mostrando ${listaProductos.length} productos`;

        if (listaProductos.length === 0) {
            contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 2rem;">No hay productos disponibles con estos filtros.</p>';
            return;
        }

        const prefijo = esIndex ? './' : '../';

        listaProductos.forEach(prod => {
            const enlace = document.createElement('a');
            enlace.href = esIndex ? `./webs/producto.html?id=${prod.id}` : `producto.html?id=${prod.id}`;
            enlace.className = 'product-card';
            enlace.style.textDecoration = 'none';
            enlace.style.color = 'inherit';

            const precioFormateado = prod.precio.toFixed(2).replace('.', ',') + ' €';
            const rutaImagen = `${prefijo}${prod.imagen}`;

            enlace.innerHTML = `
                <div class="product-img">
                    ${prod.nuevo ? '<span class="badge">NUEVO</span>' : ''}
                    <img src="${rutaImagen}" alt="${prod.nombre}">
                </div>
                <div class="product-info">
                    <h4>${prod.nombre}</h4>
                    <div class="price-cart">
                        <span class="price">${precioFormateado}</span>
                        <!-- Enlace a la página del producto para elegir talla -->
                        <a href="${esIndex ? './webs/producto.html?id=' + prod.id : 'producto.html?id=' + prod.id}" class="add-cart" style="text-decoration: none;">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                    </div>
                </div>
            `;
            contenedor.appendChild(enlace);
        });
    }

    // Ordenación de productos 
    const selectOrden = document.getElementById('select-orden');

    function ordenarCatalogo() {
        let orden = selectOrden ? selectOrden.value : 'reciente';
        let productosOrdenados = [...productosBase];
        const fechaHoy = new Date();

        switch (orden) {
            case 'reciente':
                productosOrdenados.sort((a, b) => {
                    const difA = Math.abs(fechaHoy - new Date(a.fecha));
                    const difB = Math.abs(fechaHoy - new Date(b.fecha));
                    return difA - difB;
                });
                break;
            case 'antiguo':
                productosOrdenados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                break;
            case 'precio-asc':
                productosOrdenados.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                productosOrdenados.sort((a, b) => b.precio - a.precio);
                break;
            case 'az':
                productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'za':
                productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                break;
        }

        renderizarProductos(productosOrdenados);
    }

    // Inicializar
    if (selectOrden) {
        selectOrden.addEventListener('change', ordenarCatalogo);
    }

    ordenarCatalogo();
});