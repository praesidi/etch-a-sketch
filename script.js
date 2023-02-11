const DEFAULT_CANVAS_SIZE = 16;
const DEFAULT_COLOR = '#6C8091';
const DEFAULT_MODE = 'colorMode';

let canvasSize = DEFAULT_CANVAS_SIZE;
let color = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorSelection');
const colorBtn = document.getElementById('colorBtn');
const clearBtn = document.getElementById('clearBtn');
const eraserBtn = document.getElementById('eraserBtn');
const rgbBtn = document.getElementById('rgbBtn');
const slider = document.getElementById('canvasResolutionRange');

let draw = false;
canvas.onmousedown = (e) => {
  draw = true;
  e.preventDefault();
};
canvas.onmouseup = () => {
  draw = false;
};

function setCurrentColor(newColor) {
  color = newColor;
}

function getCurrentColor() {
  const currentColor = document.getElementById('colorSelection').value;
  color = currentColor;
}

function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);

  color = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function activateEraser() {
  color = '#F3F5F4';
}

function populateCanvas() {
  canvas.style.setProperty('--size', canvasSize);
  for (let i = 0; i < canvasSize * canvasSize; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');

    div.addEventListener('mousedown', function () {
      if (currentMode === 'colorMode') {
        getCurrentColor();
        div.style.setProperty('background-color', color);
      }
      if (currentMode === 'rgbMode') {
        getRandomColor();
        div.style.setProperty('background-color', color);
      }
      if (currentMode === 'eraserMode') {
        activateEraser();
        div.style.setProperty('background-color', color);
      }
    });

    div.addEventListener('mouseover', function () {
      if (!draw) return;
      if (currentMode === 'colorMode') {
        getCurrentColor();
        div.style.setProperty('background-color', color);
      }
      if (currentMode === 'rgbMode') {
        getRandomColor();
        div.style.setProperty('background-color', color);
      }
      if (currentMode === 'eraserMode') {
        activateEraser();
        div.style.setProperty('background-color', color);
      }
    });
    canvas.appendChild(div);
  }
}

function activateBtn(newMode) {
  if (currentMode === 'rgbMode') {
    rgbBtn.classList.remove('active-btn');
  } else if (currentMode === 'colorMode') {
    colorBtn.classList.remove('active-btn');
  } else if (currentMode === 'eraserMode') {
    eraserBtn.classList.remove('active-btn');
  }

  if (newMode === 'rgbMode') {
    rgbBtn.classList.add('active-btn');
  } else if (newMode === 'colorMode') {
    colorBtn.classList.add('active-btn');
  } else if (newMode === 'eraserMode') {
    eraserBtn.classList.add('active-btn');
  }
}

function setCurrentMode(newMode) {
  activateBtn(newMode);
  currentMode = newMode;
}

function clearCanvas() {
  canvas.innerHTML = '';
  populateCanvas(canvasSize);
}

function showCanvasResolution() {
  document.getElementById('span').innerText = `${canvasSize}  x  ${canvasSize}`;
}

colorBtn.onclick = () => setCurrentMode('colorMode');
eraserBtn.onclick = () => setCurrentMode('eraserMode');
rgbBtn.onclick = () => setCurrentMode('rgbMode');

clearBtn.addEventListener('click', function () {
  clearCanvas();
});

colorPicker.addEventListener('change', function () {
  const newColor = document.getElementById('colorSelection').value;
  setCurrentColor(newColor);
});

slider.addEventListener('input', function () {
  // create canvas when we change resolution
  canvas.innerHTML = '';
  canvasSize = this.value;
  showCanvasResolution(canvasSize);
  populateCanvas(canvasSize);
});

window.onload = () => {
  populateCanvas(DEFAULT_CANVAS_SIZE);
  activateBtn(DEFAULT_MODE);
};
