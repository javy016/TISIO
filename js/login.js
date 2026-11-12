document.addEventListener('DOMContentLoaded', () => {
    // 1. LÓGICA PARA VOLTEAR LA TARJETA (FLIP)
    const flipCardInner = document.querySelector('.flip-card-inner');
    const btnFlip = document.getElementById('btn-flip');
    const btnFlipBack = document.getElementById('btn-flip-back');

    if (btnFlip && flipCardInner) {
        btnFlip.addEventListener('click', () => {
            flipCardInner.classList.add('flipped');
        });
    }

    if (btnFlipBack && flipCardInner) {
        btnFlipBack.addEventListener('click', () => {
            flipCardInner.classList.remove('flipped');
        });
    }

    // 2. MOSTRAR/OCULTAR CONTRASEÑA (OJITO)
    function configurarOjito(iconoId, inputId) {
        const icono = document.getElementById(iconoId);
        const input = document.getElementById(inputId);
        if (icono && input) {
            icono.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                icono.classList.toggle('fa-eye');
                icono.classList.toggle('fa-eye-slash');
            });
        }
    }
    configurarOjito('toggle-password-login', 'login-password');
    configurarOjito('toggle-password-reg', 'reg-password');


    // 3. FUNCIÓN PARA VALIDAR LA CONTRASEÑA (REGISTRO)
    function esPasswordValida(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        return regex.test(password);
    }


    // 4. VALIDACIÓN EN TIEMPO REAL 
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.input-group');
            group.classList.remove('input-error', 'input-success');

            if (input.value.trim() === '') return;

            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input.value)) group.classList.add('input-success');
                else group.classList.add('input-error');
            } 
            else if (input.type === 'password') {
                if (input.id === 'reg-password') {
                    if (esPasswordValida(input.value)) group.classList.add('input-success');
                    else group.classList.add('input-error');
                } else {
                    if (input.value.length > 0) group.classList.add('input-success');
                    else group.classList.add('input-error');
                }
            } 
            else {
                if (input.value.length >= 2) group.classList.add('input-success');
                else group.classList.add('input-error');
            }
        });
    });

  

    // 5. LÓGICA DEL FORMULARIO DE REGISTRO
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('reg-nombre');
            const email = document.getElementById('reg-email');
            const password = document.getElementById('reg-password');

            document.querySelectorAll('.input-group').forEach(g => g.classList.remove('input-error', 'input-success'));

            let valido = true;

            if (!nombre.value.trim() || nombre.value.length < 2) { 
                nombre.closest('.input-group').classList.add('input-error'); 
                valido = false; 
            } else { 
                nombre.closest('.input-group').classList.add('input-success'); 
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) { 
                email.closest('.input-group').classList.add('input-error'); 
                valido = false; 
            } else { 
                email.closest('.input-group').classList.add('input-success'); 
            }

            if (!password.value.trim() || !esPasswordValida(password.value)) { 
                password.closest('.input-group').classList.add('input-error'); 
                valido = false; 
            } else { 
                password.closest('.input-group').classList.add('input-success'); 
            }

            if (!valido) {
                if (typeof mostrarAlerta === 'function') mostrarAlerta('Por favor, revisa los campos marcados en rojo.');
                return;
            }

            if (typeof ObtenerBD === 'function') {
                const db = ObtenerBD();
                if (db.usuarios.some(u => u.email === email.value)) {
                    if (typeof mostrarAlerta === 'function') mostrarAlerta('Este correo electrónico ya está registrado.');
                    email.closest('.input-group').classList.remove('input-success');
                    email.closest('.input-group').classList.add('input-error');
                    return;
                }

                db.usuarios.push({
                    nombre: nombre.value,
                    email: email.value,
                    password: password.value
                });
                if (typeof guardarBD === 'function') guardarBD(db);
            }

            if (typeof mostrarAlerta === 'function') mostrarAlerta('¡Registro exitoso! Ahora puedes iniciar sesión.', 'exito');
            
            if (flipCardInner) flipCardInner.classList.remove('flipped');
            
            formRegistro.reset();
            setTimeout(() => {
                document.querySelectorAll('.input-group').forEach(g => g.classList.remove('input-success', 'input-error'));
            }, 500);
        });
    }

   
    // 6. LÓGICA DEL FORMULARIO DE LOGIN
    const formLogin = document.getElementById('form-login');
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
                valido = false; 
            }

            if (!password.value.trim()) { 
                password.closest('.input-group').classList.add('input-error'); 
                valido = false; 
            }

            if (!valido) {
                if (typeof mostrarAlerta === 'function') mostrarAlerta('Por favor, rellena todos los campos.');
                return;
            }

            if (typeof ObtenerBD === 'function') {
                const db = ObtenerBD();
                const usuario = db.usuarios.find(u => u.email === email.value && u.password === password.value);
                
                if (usuario) {
                    if (typeof mostrarAlerta === 'function') mostrarAlerta(`¡Bienvenido de nuevo, ${usuario.nombre}!`, 'exito');
                } else {
                    if (typeof mostrarAlerta === 'function') mostrarAlerta('Correo o contraseña incorrectos.');
                    password.closest('.input-group').classList.add('input-error');
                }
            } else {
                if (typeof mostrarAlerta === 'function') mostrarAlerta('¡Bienvenido de nuevo! (Modo simulación)', 'exito');
            }
        });
    }
});