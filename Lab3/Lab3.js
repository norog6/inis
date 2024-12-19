document.querySelectorAll('.target').forEach(target => {
    const colors = [
        'yellow', 'red', 'blue', 'green', 'orange',
        'purple', 'pink', 'cyan', 'magenta', 'lime',
        'brown', 'teal', 'navy', 'gold', 'silver',
        'coral', 'salmon', 'violet', 'khaki', 'lavender'
    ];
    let colorInterval;
    let isDragging = false;
    let isStuck = false;
    let offsetX, offsetY;
    let originalPosition = { left: target.style.left, top: target.style.top };

    target.addEventListener('mousedown', (e) => {
        if (isStuck) {
            isStuck = false;
            target.style.backgroundColor = '';
            originalPosition = { left: target.style.left, top: target.style.top };
        } else {
            isDragging = true;
            offsetX = e.clientX - target.getBoundingClientRect().left;
            offsetY = e.clientY - target.getBoundingClientRect().top;
            target.style.cursor = 'grabbing';
        }
    });

    target.addEventListener('dblclick', () => {
        isStuck = true;
        colorInterval = setInterval(() => {
            if (isStuck) {
                target.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }
        }, 300);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging || isStuck) {
            target.style.position = 'absolute';
            target.style.left = `${e.clientX - offsetX}px`;
            target.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isStuck) {
            isDragging = false;
            originalPosition = { left: target.style.left, top: target.style.top };
            target.style.cursor = 'grab';
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (isDragging || isStuck)) {
            isDragging = false;
            isStuck = false;
            target.style.left = originalPosition.left;
            target.style.top = originalPosition.top;
            target.style.cursor = 'grab';
            target.style.backgroundColor = '';
        }
    });
});