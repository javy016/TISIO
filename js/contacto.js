document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const temporizadores = {};

    // Muestra el error en el campo (borde rojo y bocadillo), y lo quita despues de 5 segundos
    function mostrarError(input, mensaje) {
        const group = input.closest('.form-group-contact');
        group.classList.remove('input-success');
        group.classList.add('input-error');

        const tooltip = group.querySelector('.tooltip-error');
        if (tooltip) tooltip.innerText = mensaje;

        if (temporizadores[input.id]) clearTimeout(temporizadores[input.id]);

        temporizadores[input.id] = setTimeout(() => {
            group.classList.remove('input-error');
            if (input.value.trim() !== '' && esValido(input)) {
                group.classList.add('input-success');
            }
            delete temporizadores[input.id];
        }, 5000);
    }

    // Muestra el estado correcto (borde verde)
    function mostrarExito(input) {
        const group = input.closest('.form-group-contact');
        group.classList.remove('input-error');
        group.classList.add('input-success');

        if (temporizadores[input.id]) {
            clearTimeout(temporizadores[input.id]);
            delete temporizadores[input.id];
        }
    }

    // Valida un campo según su tipo 
    function esValido(input) {
        if (input.value.trim() === '') return false;

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input.value);
        } 
        else if (input.id === 'cp') {
            return /^\d{5}$/.test(input.value);
        }
        else if (input.id === 'mensaje') {
            return input.value.length >= 10;
        }
        else {
            return input.value.length >= 2;
        }
    }

    // 1. Validación al salir del campo (blur)
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const group = input.closest('.form-group-contact');
            
            if (input.value.trim() === '') {
                group.classList.remove('input-error', 'input-success');
                return;
            }

            if (esValido(input)) {
                mostrarExito(input);
            } else {
                let mensajeError = '';
                if (input.type === 'email') mensajeError = "Introduce un correo válido (ej: nombre@gmail.com)";
                else if (input.id === 'cp') mensajeError = "Debe ser un código postal de 5 números";
                else if (input.id === 'mensaje') mensajeError = "El mensaje debe tener al menos 10 caracteres";
                else mensajeError = "Este campo debe tener al menos 2 caracteres";
                
                mostrarError(input, mensajeError);
            }
        });

        // Quita el error mientras escribe
        input.addEventListener('input', () => {
            const group = input.closest('.form-group-contact');
            group.classList.remove('input-error');
            if (temporizadores[input.id]) {
                clearTimeout(temporizadores[input.id]);
                delete temporizadores[input.id];
            }
        });
    });

    // 2. Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valido = true;

        document.querySelectorAll('.form-group-contact').forEach(g => g.classList.remove('input-error', 'input-success'));
        Object.keys(temporizadores).forEach(id => {
            clearTimeout(temporizadores[id]);
            delete temporizadores[id];
        });

        const nombre = document.getElementById('nombre');
        const apellido1 = document.getElementById('apellido1');
        const apellido2 = document.getElementById('apellido2');
        const email = document.getElementById('email');
        const domicilio = document.getElementById('domicilio');
        const cp = document.getElementById('cp');
        const mensaje = document.getElementById('mensaje');

        // Validación de cada campo al enviar
        if (nombre.value.trim().length < 2) { mostrarError(nombre, "El nombre es obligatorio (mín. 2 letras)"); valido = false; } else { mostrarExito(nombre); }
        if (apellido1.value.trim().length < 2) { mostrarError(apellido1, "El primer apellido es obligatorio"); valido = false; } else { mostrarExito(apellido1); }
        if (apellido2.value.trim().length > 0 && apellido2.value.trim().length < 2) { mostrarError(apellido2, "El segundo apellido debe tener al menos 2 letras"); valido = false; } else if (apellido2.value.trim().length >= 2) { mostrarExito(apellido2); }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) { mostrarError(email, "Introduce un correo válido (ej: nombre@gmail.com)"); valido = false; } else { mostrarExito(email); }

        if (domicilio.value.trim().length < 5) { mostrarError(domicilio, "Introduce tu domicilio completo (mín. 5 caracteres)"); valido = false; } else { mostrarExito(domicilio); }
        if (!/^\d{5}$/.test(cp.value)) { mostrarError(cp, "Debe ser un código postal de 5 números"); valido = false; } else { mostrarExito(cp); }
        if (mensaje.value.trim().length < 10) { mostrarError(mensaje, "El mensaje debe tener al menos 10 caracteres"); valido = false; } else { mostrarExito(mensaje); }

        if (!valido) return;

        // Simula el envío
        const btn = form.querySelector('.btn-enviar');
        btn.innerText = "Enviando...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        setTimeout(() => {
            mostrarAlerta('¡Mensaje enviado con éxito! Te responderemos pronto.', 'exito');
            form.reset();
            btn.innerText = "Enviar Mensaje";
            btn.disabled = false;
            btn.style.opacity = "1";
            
            document.querySelectorAll('.form-group-contact').forEach(g => g.classList.remove('input-success', 'input-error'));
            Object.keys(temporizadores).forEach(id => {
                clearTimeout(temporizadores[id]);
                delete temporizadores[id];
            });
        }, 1500);
    });
});