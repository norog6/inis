const shirtData = JSON.parse(localStorage.getItem('selectedShirt'));

if (shirtData) {
    document.getElementById('shirt-title').textContent = shirtData.name || 'Нет названия';
    document.getElementById('shirt-image').src = shirtData.colors?.white?.front || shirtData.default?.front || '';
    document.getElementById('shirt-price').textContent = `Цена: ${shirtData.price || 'Нет цены'}`;
    document.getElementById('shirt-description').textContent = 'Beautiful T-Shirt';

    const colorButtonsContainer = document.getElementById('color-buttons');
    let selectedColor = Object.keys(shirtData.colors)[0];
    let currentSide = 'front';

    const frontButton = document.getElementById('front-button');
    frontButton.onclick = function() {
        currentSide = 'front';
        document.getElementById('shirt-image').src = shirtData.colors[selectedColor].front || shirtData.default.front || '';
    };

    const backButton = document.getElementById('back-button');
    backButton.onclick = function() {
        currentSide = 'back';
        document.getElementById('shirt-image').src = shirtData.colors[selectedColor].back || shirtData.default.back || '';
    };

    for (const color in shirtData.colors) {
        const button = document.createElement('button');
        button.textContent = color;
        button.style.backgroundColor = color;
        button.onclick = function() {
            selectedColor = color;
            if (currentSide === 'front') {
                frontButton.onclick();
            } else {
                backButton.onclick();
            }
        };
        colorButtonsContainer.appendChild(button);
    }
}

function goBack() {
    window.history.back();
}