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
    let isResizing = false;
    let originalPosition = {left: target.style.left, top: target.style.top};

    const minSize = 50;

    const resizeHandle = document.createElement('div');
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '10px';
    resizeHandle.style.backgroundColor = 'black';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.right = '0';
    resizeHandle.style.cursor = 'se-resize';
    target.appendChild(resizeHandle);

    const startDragging = (e) => {
        if (isStuck) {
            isStuck = false;
            target.style.backgroundColor = '';
            originalPosition = { left: target.style.left, top: target.style.top };
        } else {
            isDragging = true;
            offsetX = e.clientX ? e.clientX - target.getBoundingClientRect().left : e.touches[0].clientX - target.getBoundingClientRect().left;
            offsetY = e.clientY ? e.clientY - target.getBoundingClientRect().top : e.touches[0].clientY - target.getBoundingClientRect().top;
            target.style.cursor = 'grabbing';
        }
    };

    const moveElement = (clientX, clientY) => {
        target.style.position = 'absolute';
        target.style.left = `${clientX - offsetX}px`;
        target.style.top = `${clientY - offsetY}px`;
    };

    const stopDragging = () => {
        if (!isStuck) {
            isDragging = false;
            target.style.cursor = 'grab';
            originalPosition = { left: target.style.left, top: target.style.top };
        }
    };

    target.addEventListener('mousedown', (e) => {
        if (e.target === resizeHandle) {
            startResizing(e.clientX, e.clientY);
        } else {
            startDragging(e);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging || isStuck) {
            moveElement(e.clientX, e.clientY);
        } else if (isResizing) {
            resizeElement(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mouseup', () => {
        stopDragging();
        stopResizing();
    });

    target.addEventListener('dblclick', () => {
        isStuck = true;
        colorInterval = setInterval(() => {
            if (isStuck) {
                target.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }
        }, 300);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isStuck || isDragging) {
                isDragging = false;
                isStuck = false;
                target.style.left = originalPosition.left;
                target.style.top = originalPosition.top;
                target.style.cursor = 'grab';
                target.style.backgroundColor = '';
            }
        }
    });

    target.addEventListener('touchmove', (e) => {
        if (isDragging || isStuck) {
            moveElement(e.touches[0].clientX, e.touches[0].clientY);
        } else if (isResizing) {
            resizeElement(e.touches[0].clientX, e.touches[0].clientY);
        }
    });


    document.addEventListener('touchend', () => {
        stopDragging();
        stopResizing();
    });

    target.addEventListener('touchstart', (e) => {
        if (e.target === resizeHandle) {
            e.preventDefault();
            startResizing(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 1) {
            startDragging(e.touches[0]);
        }
    });

    document.addEventListener('touchstart', (e) => {
        if ((isDragging && e.touches.length > 1) || (isStuck && e.touches.length > 1)) {
            isDragging = false;
            isStuck = false;
            target.style.left = originalPosition.left;
            target.style.top = originalPosition.top;
            target.style.cursor = 'grab';
            target.style.backgroundColor = '';
        } else if (isStuck) {
            moveElement(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (isStuck) {
            moveElement(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    function startResizing(clientX, clientY) {
        isResizing = true;
        initialWidth = target.offsetWidth;
        initialHeight = target.offsetHeight;
        initialX = clientX;
        initialY = clientY;
    }

    function resizeElement(clientX, clientY) {
        const widthDiff = clientX - initialX;
        const heightDiff = clientY - initialY;

        const newWidth = Math.max(minSize, initialWidth + widthDiff);
        const newHeight = Math.max(minSize, initialHeight + heightDiff);

        target.style.width = `${newWidth}px`;
        target.style.height = `${newHeight}px`;
    }

    function stopResizing() {
        isResizing = false;
    }
});