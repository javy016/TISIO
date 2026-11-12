document.addEventListener('DOMContentLoaded', () => {
    const contenedorCesta = document.getElementById('cesta-items-container');
    const resumenSubtotal = document.getElementById('resumen-subtotal');
    const resumenTotal = document.getElementById('resumen-total');
    
    if (!contenedorCesta) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarCesta() {
        if (carrito.length === 0) {
            contenedorCesta.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3 style="margin-bottom: 20px; font-size: 20px; color: var(--text-main);">Tu cesta está vacía</h3>
                    <a href="tienda.html" class="btn-comprar" style="display: inline-block; width: auto; padding: 10px 30px; text-decoration: none; background-color: var(--btn-bg); color: var(--btn-text); border-radius: 8px;">Ir a la tienda</a>
                </div>
            `;
            if (resumenSubtotal) resumenSubtotal.textContent = '0,00 €';
            if (resumenTotal) resumenTotal.textContent = '0,00 €';
            return;
        }

        contenedorCesta.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            const precio = parseFloat(item.precio) || 0;
            const cantidad = parseInt(item.cantidad) || 1;
            const subtotal = precio * cantidad;
            total += subtotal;
            const rutaImagen = `../${item.imagen}`;

            contenedorCesta.innerHTML += `
                <div class="cesta-item">
                    <div class="cesta-item-img-container">
                        <img src="${rutaImagen}" alt="${item.nombre}">
                    </div>
                    <div class="cesta-item-info">
                        <h4>${item.nombre}</h4>
                        <p>Talla: ${item.talla}</p>
                        <div class="cesta-item-controls">
                            <div class="cantidad-control">
                                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                                <span>${cantidad}</span>
                                <button onclick="cambiarCantidad(${index}, 1)">+</button>
                            </div>
                            <button onclick="eliminarCarrito(${index})" class="btn-remove-cesta" title="Eliminar producto">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: right; min-width: 80px;">
                        <p style="font-weight: bold; font-size: 18px; color: var(--text-main);">${subtotal.toFixed(2).replace('.', ',')} €</p>
                    </div>
                </div>
            `;
        });

        if (resumenSubtotal) resumenSubtotal.textContent = total.toFixed(2).replace('.', ',') + ' €';
        if (resumenTotal) resumenTotal.textContent = total.toFixed(2).replace('.', ',') + ' €';
    }

    renderizarCesta();

    //  BOTÓN VACIAR CESTA 
    const btnVaciar = document.getElementById('btn-vaciar-cesta');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if (carrito.length === 0) {
                if (window.mostrarAlerta) window.mostrarAlerta("La cesta ya está vacía.", "error");
                return;
            }
            
            localStorage.setItem('carrito', JSON.stringify([]));
            if (window.mostrarAlerta) window.mostrarAlerta('Cesta vaciada correctamente', 'exito');
            
            setTimeout(() => location.reload(), 1000);
        });
    }

    //  BOTÓN COMPRAR 
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            if (carrito.length === 0) {
                if (window.mostrarAlerta) window.mostrarAlerta("Tu cesta está vacía.", "error");
                return;
            }
            
            if (window.mostrarAlerta) window.mostrarAlerta("¡Gracias por tu compra!", "exito");
            
            localStorage.setItem('carrito', JSON.stringify([]));
            setTimeout(() => location.reload(), 2000);
        });
    }
});