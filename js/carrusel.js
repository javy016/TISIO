document.addEventListener('DOMContentLoaded', () => {
    const heros = [
        {
            imagen: "imagenes/carrusel1.png",
            subtitulo: "COLECCIÓN",
            titulo: "URBANA <br> Y AUTÉNTICA",
            texto: "Ropa diseñada para quienes viven la calle."
        },
        {
            imagen: "imagenes/carrusel2.png",
            subtitulo: "COLECCIÓN",
            titulo: "CHAQUETAS <br> Y ABRIGOS",
            texto: "Protección, estilo y comodidad en cualquier estación del año."
        },
        {
            imagen: "imagenes/carrusel3.png",
            subtitulo: "COLECCIÓN",
            titulo: "CALZADO <br> Y ACCESORIOS",
            texto: "Detalles que marcan la diferencia. Completa tu estilo con nuestra selección."
        },
        {
            imagen: "imagenes/carrusel4.png",
            subtitulo: "STREETWEAR",
            titulo: "ESTILO <br> SIN LÍMITES",
            texto: "Nuestra nueva colección ya está aquí."
        }
    ];

    // Elementos del DOM
    const heroImg = document.getElementById('hero-img');
    const heroSubtitulo = document.getElementById('hero-subtitulo');
    const heroTitulo = document.getElementById('hero-titulo');
    const heroTexto = document.getElementById('hero-texto');
    
    const btnPrev = document.getElementById('hero-prev');
    const btnNext = document.getElementById('hero-next');
    const dots = document.querySelectorAll('.dot');

    if (!btnPrev || !btnNext || !heroImg) return; // Salir si no existe el carrusel

    let indiceActual = 0;
    let intervalo;

    // Actualiza el contenido del carrusel según el índice actual
    function actualizarCarrusel() {
        const hero = heros[indiceActual];

        heroImg.src = hero.imagen;
        heroSubtitulo.textContent = hero.subtitulo;
        heroTitulo.innerHTML = hero.titulo; 
        heroTexto.textContent = hero.texto;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === indiceActual);
        });
    }

    // Inicia el paso automático cada X segundos
    function iniciarAutoPlay() {
        intervalo = setInterval(() => {
            indiceActual = (indiceActual + 1) % heros.length;
            actualizarCarrusel();
        }, 5000); // 5 segundos
    }

    // Detiene el paso automático
    function detenerAutoPlay() {
        if (intervalo) clearInterval(intervalo);
    }

    // Eventos de navegación manual
    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % heros.length;
        actualizarCarrusel();
        detenerAutoPlay();
        iniciarAutoPlay(); // Reinicia el temporizador
    });

    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + heros.length) % heros.length;
        actualizarCarrusel();
        detenerAutoPlay();
        iniciarAutoPlay();
    });

    // dots=navegacion
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            indiceActual = index;
            actualizarCarrusel();
            detenerAutoPlay();
            iniciarAutoPlay();
        });
    });

    // Pausar autoplay al pasar el ratón por encima del hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', detenerAutoPlay);
        heroSection.addEventListener('mouseleave', iniciarAutoPlay);
    }

    actualizarCarrusel();
    iniciarAutoPlay();
});