document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ HAMBURGUESA
    const btnMenu = document.getElementById('btn-menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    if (btnMenu && menuDropdown) {
        // Abrir/cerrar el menú al pulsar el botón
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('abierto');
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!menuDropdown.contains(e.target) && e.target !== btnMenu) {
                menuDropdown.classList.remove('abierto');
            }
        });
    }

    // 2. BUSCADOR 
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const inputBusqueda = document.getElementById('input-busqueda');

    if (searchIcon && searchBar && inputBusqueda) {
        // Mostrar/ocultar la barra
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBar.classList.toggle('abierto');
            if (searchBar.classList.contains('abierto')) {
                inputBusqueda.focus();
            }
        });

        // Cerrar la barra al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && e.target !== searchIcon) {
                searchBar.classList.remove('abierto');
            }
        });

        // Redirige a tienda.html con el término de búsqueda en la URL
        const redirigirABusqueda = () => {
            const termino = inputBusqueda.value.trim();
            if (termino !== '') {
                const esIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
                const rutaTienda = esIndex ? './webs/tienda.html' : 'tienda.html';
                window.location.href = `${rutaTienda}?buscar=${encodeURIComponent(termino)}`;
            }
        };

        // Buscar al pulsar "Intro"
        inputBusqueda.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                redirigirABusqueda();
            }
        });
    }
});