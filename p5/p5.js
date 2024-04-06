const animateMe = document.getElementById('animate-me');
const controlBtn = document.getElementById('control-btn');
let animationInterval;
let currentTranslateX = 0;
let direction = 1;

controlBtn.addEventListener('click', function() {
    if (!animationInterval) {
        startAnimation();
    } else {
        stopAnimation();
    }
});

function startAnimation() {
    controlBtn.textContent = 'Stop/Reset';
    animationInterval = setInterval(move, 10);
}

function move() {
    const containerWidth = document.getElementById('animation-container').offsetWidth;
    const divWidth = animateMe.offsetWidth;
    const maxTranslateX = containerWidth - divWidth;

    currentTranslateX += direction;

    if (currentTranslateX >= maxTranslateX || currentTranslateX <= 0) {
        direction *= -1;
    }

    animateMe.style.transform = `translateX(${currentTranslateX}px)`;
}

function stopAnimation() {
    clearInterval(animationInterval);
    controlBtn.textContent = 'Move';
    animationInterval = null;

    // Move the square back to the starting position
    animateMe.style.transform = 'translateX(0)';
    currentTranslateX = 0;
}
