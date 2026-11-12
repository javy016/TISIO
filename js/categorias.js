// Desplazar las categorias del index
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('category-grid');
    const prevBtn = document.getElementById('cat-prev');
    const nextBtn = document.getElementById('cat-next');

    if (!grid || !prevBtn || !nextBtn) return; // Evita errores si no existen los elementos

    const scrollAmount = 240; // Píxeles que se desplaza

    // Desplaza categorías hacia la izquierda
    prevBtn.addEventListener('click', () => {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Desplaza categorías hacia la derecha
    nextBtn.addEventListener('click', () => {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});