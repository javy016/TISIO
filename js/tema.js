document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoTisio = document.getElementById('logo-tisio');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    if (!themeToggle) return;

    // Detecta si estamos dentro de /webs/ para ajustar la ruta del logo
    const enSubcarpeta = window.location.pathname.includes('/webs/');
    const rutaImagenes = enSubcarpeta ? '../imagenes/' : 'imagenes/';

    // Cambia el logo según el tema 
    function updateLogo(isLightTheme) {
        if (logoTisio) {
            logoTisio.src = isLightTheme 
                ? rutaImagenes + 'logo_oscuro.png' 
                : rutaImagenes + 'logo_claro.png';
        }
    }

    // Carga el tema guardado o usa el claro por defecto
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        updateLogo(false); 
        if (iconSun) iconSun.classList.remove('active');
        if (iconMoon) iconMoon.classList.add('active');
    } else {
        body.classList.remove('dark-theme');
        updateLogo(true); 
        if (iconSun) iconSun.classList.add('active');
        if (iconMoon) iconMoon.classList.remove('active');
        if (!currentTheme) localStorage.setItem('theme', 'light');
    }

    // Cambia de tema al pulsar el botón
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        const isLight = !isDark;
        
        updateLogo(isLight);
        
        if (isDark) {
            if (iconSun) iconSun.classList.remove('active');
            if (iconMoon) iconMoon.classList.add('active');
            localStorage.setItem('theme', 'dark');
        } else {
            if (iconSun) iconSun.classList.add('active');
            if (iconMoon) iconMoon.classList.remove('active');
            localStorage.setItem('theme', 'light');
        }
    });
});