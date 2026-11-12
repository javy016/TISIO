document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('detalle-producto');
    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get('id');

    // Busca el producto por ID
    const producto = productos.find(p => String(p.id) === String(idProducto));

    if (!producto) {
        contenedor.innerHTML = '<h2>Producto no encontrado</h2><p>Vuelve a la tienda para ver más productos.</p>';
        return;
    }

    const imagenes = producto.imagenes || [producto.imagen];
    const tieneVarias = imagenes.length > 1;

    // Genera los botones de tallas con su stock
    let tallasHtml = '';
    for (const [talla, cantidad] of Object.entries(producto.tallas)) {
        const stockTexto = cantidad > 0 ? `${cantidad} disponibles` : 'Agotada';
        const disabled = cantidad === 0 ? 'disabled' : '';
        tallasHtml += `
            <button class="talla-btn" data-talla="${talla}" ${disabled}>
                ${talla}
                <span class="stock-info">${stockTexto}</span>
            </button>
        `;
    }

    const precioFormateado = producto.precio.toFixed(2).replace('.', ',') + ' €';

    // Flechas del carrusel (solo si hay varias imágenes)
    const flechasHtml = tieneVarias ? `
        <button class="detalle-arrow prev" id="detalle-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="detalle-arrow next" id="detalle-next"><i class="fas fa-chevron-right"></i></button>
    ` : '';

    // Pinta el HTML del producto
    contenedor.innerHTML = `
        <div class="producto-imagen">
            <div class="carrusel-detalle" id="carrusel-detalle">
                <img src="../${imagenes[0]}" alt="${producto.nombre}" id="imagen-detalle">
                ${flechasHtml}
            </div>
        </div>
        <div class="producto-info">
            <h1>${producto.nombre}</h1>
            <p class="precio-grande">${precioFormateado}</p>
            <p class="descripcion">${producto.descripcion}</p>
            <h3 style="margin-bottom: 10px; font-size: 16px;">Selecciona tu talla:</h3>
            <div class="tallas-grid">${tallasHtml}</div>
            <button id="btn-add-cart-detalle" class="btn-primary" style="margin-top: 20px; width: 100%;" disabled>
                Añadir al carrito
            </button>
        </div>
    `;

    // Carrusel automático cada 2,5 segundos
    const imagenElemento = document.getElementById('imagen-detalle');
    let indiceActual = 0;
    let intervalo;

    function cambiarImagen() {
        if (tieneVarias) {
            indiceActual = (indiceActual + 1) % imagenes.length;
            imagenElemento.src = `../${imagenes[indiceActual]}`;
        }
    }

    function iniciarCarrusel() {
        if (tieneVarias) {
            intervalo = setInterval(cambiarImagen, 2500);
        }
    }

    function pausarCarrusel() {
        if (intervalo) clearInterval(intervalo);
    }

    iniciarCarrusel();

    // Controles manuales del carrusel
    if (tieneVarias) {
        const carruselDiv = document.getElementById('carrusel-detalle');
        carruselDiv.addEventListener('mouseenter', pausarCarrusel);
        carruselDiv.addEventListener('mouseleave', iniciarCarrusel);

        const btnPrev = document.getElementById('detalle-prev');
        const btnNext = document.getElementById('detalle-next');

        if (btnPrev && btnNext) {
            btnPrev.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
                imagenElemento.src = `../${imagenes[indiceActual]}`;
                pausarCarrusel();
                iniciarCarrusel();
            });

            btnNext.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % imagenes.length;
                imagenElemento.src = `../${imagenes[indiceActual]}`;
                pausarCarrusel();
                iniciarCarrusel();
            });
        }
    }

    // Selección de talla (habilita el botón de añadir al carrito)
    let tallaSeleccionada = null;
    const botonesTalla = document.querySelectorAll('.talla-btn:not([disabled])');
    const btnAddCart = document.getElementById('btn-add-cart-detalle');

    botonesTalla.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botonesTalla.forEach(b => b.style.border = '1px solid var(--border-color)');
            const botonActual = e.currentTarget;
            botonActual.style.border = '2px solid var(--text-main)';
            tallaSeleccionada = botonActual.getAttribute('data-talla');
            
            btnAddCart.disabled = false;
        });
    });

    // Añadir al carrito con la talla seleccionada
    btnAddCart.addEventListener('click', () => {
        if (!tallaSeleccionada) {
            mostrarAlerta('Por favor, selecciona una talla antes de continuar.');
            return;
        }

        agregarCarrito({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: imagenes[0],       
            imagenes: imagenes,        
            talla: tallaSeleccionada
        });
        
        // Estado de la operación visual
        btnAddCart.innerHTML = '<i class="fas fa-check"></i> ¡Añadido!';
        btnAddCart.style.backgroundColor = '#00a650';
        btnAddCart.style.borderColor = '#00a650';
        
        setTimeout(() => {
            btnAddCart.innerHTML = 'Añadir al carrito';
            btnAddCart.style.backgroundColor = 'var(--btn-bg)';
            btnAddCart.style.borderColor = 'var(--btn-bg)';
        }, 2000);
    });
});