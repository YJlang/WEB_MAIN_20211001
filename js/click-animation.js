document.addEventListener('click', function(e) {
    let animationElement = document.createElement('div');
    animationElement.className = 'animation';
    animationElement.style.left = `${e.pageX}px`;
    animationElement.style.top = `${e.pageY}px`;
    document.body.appendChild(animationElement);

    // 애니메이션이 끝난 후 요소를 제거
    animationElement.addEventListener('animationend', function() {
        document.body.removeChild(animationElement);
    });
});
