const centerText = document.getElementById('center-text');
const crossesContainer = document.getElementById('crosses-container');

const activePointers = new Map();

function getProceduralColor(index) {
    const hue = (index * 137.5) % 360;
    return `hsl(${hue}, 100%, 50%)`;
}

let colorIndex = 0;

function updateCenterText() {
    const count = activePointers.size;
    if (count === 0) {
        centerText.textContent = 'Touch';
        colorIndex = 0;
    } else {
        centerText.textContent = count.toString();
    }
}

function createCross(id, color, x, y) {
    const wrapper = document.createElement('div');

    const hLine = document.createElement('div');
    hLine.className = 'cross-h';
    hLine.style.backgroundColor = color;
    hLine.style.top = `${y}px`;

    const vLine = document.createElement('div');
    vLine.className = 'cross-v';
    vLine.style.backgroundColor = color;
    vLine.style.left = `${x}px`;

    wrapper.appendChild(hLine);
    wrapper.appendChild(vLine);
    crossesContainer.appendChild(wrapper);

    return { wrapper, hLine, vLine, color };
}

function handlePointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    if (!activePointers.has(e.pointerId)) {
        const color = getProceduralColor(colorIndex);
        colorIndex++;

        const cross = createCross(e.pointerId, color, e.clientX, e.clientY);
        activePointers.set(e.pointerId, cross);

        updateCenterText();
    }
}

function handlePointerMove(e) {
    if (activePointers.has(e.pointerId)) {
        const cross = activePointers.get(e.pointerId);
        cross.hLine.style.top = `${e.clientY}px`;
        cross.vLine.style.left = `${e.clientX}px`;
    }
}

function handlePointerUp(e) {
    if (activePointers.has(e.pointerId)) {
        const cross = activePointers.get(e.pointerId);
        cross.wrapper.remove();
        activePointers.delete(e.pointerId);

        updateCenterText();
    }
}

document.addEventListener('pointerdown', handlePointerDown);
document.addEventListener('pointermove', handlePointerMove);
document.addEventListener('pointerup', handlePointerUp);
document.addEventListener('pointercancel', handlePointerUp);

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
