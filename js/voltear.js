document.addEventListener('DOMContentLoaded', () => {
    const flipCardInner = document.querySelector('.flip-card-inner');
    const btnFlip = document.getElementById('btn-flip');
    const btnFlipBack = document.getElementById('btn-flip-back');

    if (flipCardInner && btnFlip && btnFlipBack) {
        // Gira la tarjeta para mostrar el registro
        btnFlip.addEventListener('click', () => {
            flipCardInner.classList.add('flipped');
        });

        // Gira la tarjeta para volver al login
        btnFlipBack.addEventListener('click', () => {
            flipCardInner.classList.remove('flipped');
        });
    }
});