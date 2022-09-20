const defaultCanvasSize = 16;
const defaultColor = '#6C8091';
const defaultMode = 'colorMode';

let canvasSize = defaultCanvasSize;
let color = defaultColor;
let currentMode = defaultMode;
let canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorSelection');
const colorBtn = document.getElementById('colorBtn');
const clearBtn = document.getElementById('clearBtn');
const eraserBtn = document.getElementById('eraserBtn');
const rgbBtn = document.getElementById('rgbBtn');
const slider = document.getElementById('canvasResolutionRange');

colorBtn.onclick = () => setCurrentMode('colorMode');
eraserBtn.onclick = () => setCurrentMode('eraserMode');
rgbBtn.onclick = () => setCurrentMode('rgbMode');

let draw = false;
canvas.onmousedown = (e) => {
    draw = true;
    e.preventDefault(); //fix a problem when we can't draw bcs drag event appears
}
canvas.onmouseup = () => draw = false;

function setCurrentMode(newMode){
    activateBtn(newMode);
    currentMode = newMode;
}

function setCurrentColor(newColor){
    color = newColor;
}

function populateCanvas(canvasSize){
    canvas.style.setProperty('--size', canvasSize);
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');

        div.addEventListener('mousedown', function(){
            if (currentMode == 'colorMode'){
                getCurrentColor();
                div.style.setProperty('background-color', color);
            } else if(currentMode == 'rgbMode'){
                getRandomColor();
                div.style.setProperty('background-color', color);
            } else if(currentMode == 'eraserMode') {
                activateEraser();
                div.style.setProperty('background-color', color);
            }
        });

        div.addEventListener('mouseover', function(){
            if (!draw) return;
            if (currentMode == 'colorMode'){
                getCurrentColor();
                div.style.setProperty('background-color', color);
            } else if(currentMode == 'rgbMode'){
                getRandomColor();
                div.style.setProperty('background-color', color);
            }else if(currentMode == 'eraserMode') {
                activateEraser();
                div.style.setProperty('background-color', color);
            }
        });
        canvas.appendChild(div);
    }
}

function activateBtn(newMode){
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

function getCurrentColor (){
    let currentColor = document.getElementById('colorSelection').value;
    color = currentColor;
}

function getRandomColor(){
    let randomR = Math.floor(Math.random()*256);
    let randomG = Math.floor(Math.random()*256);
    let randomB = Math.floor(Math.random()*256);

    color = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function activateEraser(){
    color = '#F3F5F4';
}

function clearCanvas(){
    canvas.innerHTML = '';
    populateCanvas(canvasSize);
}

function showCanvasResolution(canvasSize){
    document.getElementById('canvasResolutionValue').innerText = canvasSize + " x " 
    + canvasSize;
}

clearBtn.addEventListener('click', function(){
    clearCanvas();
});

colorPicker.addEventListener('change', function(){
    let newColor = document.getElementById('colorSelection').value;
    setCurrentColor(newColor);
}); 

slider.addEventListener('input', function(){ //create canvas when we change resolution
    canvas.innerHTML = '';
    canvasSize = this.value;
    showCanvasResolution(canvasSize);
    populateCanvas(canvasSize);
});

window.onload = () => {
    populateCanvas(defaultCanvasSize);
    activateBtn(defaultMode);
}