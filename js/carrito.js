document.addEventListener('DOMContentLoaded', () => {

    // SISTEMA DE ALERTAS (TOASTS)
    function mostrarAlerta(mensaje, tipo = 'exito') {
        // Crea el contenedor si no existe
        let contenedor= document.getElementById('toast-container');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = 'toast-container';
            document.body.appendChild(contenedor);
        }

        // Crea la alerta
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        
        // Icono según el tipo de estado
        const icon = tipo === 'exito' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${mensaje}</span>`;
        contenedor.appendChild(toast);

        // Animación de salida y eliminación a los 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    // Declararla global para que cesta.js la use
    window.mostrarAlerta = mostrarAlerta; 


    // LÓGICA DEL CARRITO
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarInterfazCarrito();
    }

    window.eliminarCarrito = function(index) {
        let carrito = obtenerCarrito();
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        if (window.location.pathname.includes('cesta.html')) location.reload();
    };

    window.cambiarCantidad = function(index, delta) {
        let carrito = obtenerCarrito();
        if (carrito[index]) {
            carrito[index].cantidad += delta;
            if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
            guardarCarrito(carrito);
            if (window.location.pathname.includes('cesta.html')) location.reload();
        }
    };

    window.agregarCarrito = function(producto) {
        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === producto.id && item.talla === producto.talla);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }
        guardarCarrito(carrito);
        mostrarAlerta('Producto añadido al carrito', 'exito');
    };

    // INTERFAZ VISUAL (FLOTANTE)
    function actualizarInterfazCarrito() {
        const carrito = obtenerCarrito();
        const contador = document.querySelector('.cart-count');
        const listaFlotante = document.getElementById('lista-carrito-flotante');
        const totalFlotante = document.getElementById('total-carrito-flotante');

        if (contador) {
            const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            contador.textContent = totalItems;
            contador.style.transform = 'scale(1.3)';
            setTimeout(() => contador.style.transform = 'scale(1)', 200);
        }

        if (listaFlotante) {
            if (carrito.length === 0) {
                listaFlotante.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding: 20px;">Tu cesta está vacía</p>';
                if (totalFlotante) totalFlotante.textContent = '0,00 €';
            } else {
                listaFlotante.innerHTML = '';
                let totalPrecio = 0;
                const enSubcarpeta = window.location.pathname.includes('/webs/');

                carrito.forEach((item, index) => {
                    totalPrecio += item.precio * item.cantidad;
                    const rutaImagen = enSubcarpeta ? `../${item.imagen}` : item.imagen;

                    listaFlotante.innerHTML += `
                        <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                            <img src="${rutaImagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                            <div style="flex: 1; text-align: left;">
                                <p style="font-size: 13px; font-weight: bold; margin: 0;">${item.nombre}</p>
                                <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Talla: ${item.talla}</p>
                                
                                <div class="item-controls">
                                    <button onclick="event.preventDefault(); cambiarCantidad(${index}, -1)">-</button>
                                    <span>${item.cantidad}</span>
                                    <button onclick="event.preventDefault(); cambiarCantidad(${index}, 1)">+</button>
                                    <button class="btn-remove-item" onclick="event.preventDefault(); eliminarDelCarrito(${index})">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <span style="font-size: 13px; font-weight: bold;">${(item.precio * item.cantidad).toFixed(2).replace('.', ',')} €</span>
                        </div>
                    `;
                });

                if (totalFlotante) {
                    totalFlotante.textContent = totalPrecio.toFixed(2).replace('.', ',') + ' €';
                }
            }
        }
    }

    actualizarInterfazCarrito();
});