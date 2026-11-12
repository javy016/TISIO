const STORAGE_KEY = "Interfaces-Web-Javier-Collado-Vinagre";

// Obtiene la base de datos desde localStorage
function ObtenerBD() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { usuarios: [], sesionActiva: null, carritos: {} };
}

// Guarda la base de datos en localStorage
function guardarBD(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// Muestra una alerta flotante 
function mostrarAlerta(mensaje, tipo = 'error') {
    const alertaPrevia = document.getElementById('alerta-flotante');
    if (alertaPrevia) alertaPrevia.remove();

    const alerta = document.createElement('div');
    alerta.id = 'alerta-flotante';
    alerta.innerText = mensaje;
    const bgColor = tipo === 'exito' ? '#00a650' : '#ff4d4d';

    alerta.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background-color: ${bgColor}; color: white; padding: 15px 30px;
        border-radius: 8px; z-index: 9999; font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: opacity 0.3s;
        text-align: center; min-width: 300px; font-family: Arial, sans-serif;
    `;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => alerta.remove(), 300);
    }, 20000);
}

// Lógica principal 
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    
    // 1. FORMULARIO DE LOGIN
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            
            document.querySelectorAll('.input-group').forEach(g => g.classList.remove('input-error', 'input-success'));
            let valido = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.closest('.input-group').classList.add('input-error');
                mostrarAlerta('El campo de correo electrónico es obligatorio o no es válido.');
                valido = false;
            } else {
                email.closest('.input-group').classList.add('input-success');
            }

            if (!password.value.trim()) {
                password.closest('.input-group').classList.add('input-error');
                if (valido) mostrarAlerta('El campo de contraseña es obligatorio.');
                valido = false;
            } else {
                password.closest('.input-group').classList.add('input-success');
            }

            if (!valido) return;

            const db = ObtenerBD();
            const usuario = db.usuarios.find(u => u.email === email.value && u.password === password.value);

            if (usuario) {
                // Login exitoso
                db.sesionActiva = usuario.email;

                // Fusionar carrito de invitado con el del usuario
                if (db.carritos && db.carritos["invitado"] && db.carritos["invitado"].length > 0) {
                    if (!db.carritos[usuario.email]) db.carritos[usuario.email] = [];
                    db.carritos["invitado"].forEach(itemInvitado => {
                        const existe = db.carritos[usuario.email].find(i => String(i.id) === String(itemInvitado.id) && i.talla === itemInvitado.talla);
                        if (existe) { existe.cantidad += itemInvitado.cantidad; }
                        else { db.carritos[usuario.email].push(itemInvitado); }
                    });
                    db.carritos["invitado"] = [];
                }

                guardarBD(db);
                mostrarAlerta('¡Bienvenid@ ' + usuario.nombre + '!', 'exito');
                
                setTimeout(() => {
                    if (window.location.pathname.includes('/webs/')) {
                        window.location.href = '../index.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            } else {
                // Login fallido
                mostrarAlerta('Correo o contraseña incorrectos.');
                email.closest('.input-group').classList.add('input-error');
                password.closest('.input-group').classList.add('input-error');
            }
        });

        // Quitar el borde rojo al escribir
        document.querySelectorAll('.input-group input').forEach(input => {
            input.addEventListener('input', function() {
                this.closest('.input-group').classList.remove('input-error', 'input-success');
            });
        });
    }

    // 2. ACTUALIZAR EL HEADER SEGÚN LA SESIÓN
    const db = ObtenerBD();
    const headerUser = document.getElementById('header-user');
    
    if (headerUser) {
        if (db.sesionActiva) {
            const usuario = db.usuarios.find(u => u.email === db.sesionActiva);
            if (usuario) {
                headerUser.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 14px; font-weight: bold; color: var(--text-main);">Hola, ${usuario.nombre}</span>
                        <button id="btn-logout" style="background: none; border: none; color: var(--text-main); cursor: pointer; font-size: 18px;" title="Cerrar sesión">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                `;
                document.getElementById('btn-logout').addEventListener('click', () => {
                    db.sesionActiva = null;
                    guardarBD(db);
                    window.location.reload();
                });
            }
        } else {
            const loginPath = window.location.pathname.includes('/webs/') ? 'login.html' : 'webs/login.html';
            headerUser.innerHTML = `<a href="${loginPath}" title="Iniciar sesión"><i class="far fa-user"></i></a>`;
        }
    }
});