document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú plegable barra lateral
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.classList.toggle('activo');
            const opciones = boton.nextElementSibling;
            if (opciones) opciones.classList.toggle('abierto');
        });
    });

    // 2. Mostrar/ocultar el sidebar completo
    const btnToggle = document.getElementById('btn-toggle-sidebar');
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    const content = document.querySelector('.content');

    if (btnToggle && sidebarWrapper && content) {
        // Empieza oculta por defecto
        sidebarWrapper.classList.add('oculto');
        content.classList.add('expandido');

        btnToggle.addEventListener('click', () => {
            sidebarWrapper.classList.toggle('oculto');
            content.classList.toggle('expandido');
            
            // Movemos el botón y cambiamos la flecha según el estado
            if (sidebarWrapper.classList.contains('oculto')) {
                btnToggle.style.left = '0';
                btnToggle.querySelector('i').className = 'fas fa-chevron-right';
            } else {
                btnToggle.style.left = 'var(--sidebar-width)';
                btnToggle.querySelector('i').className = 'fas fa-chevron-left';
            }
        });
    }
});