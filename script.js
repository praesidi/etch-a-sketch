/*TODO:
*1. Сделать генерацию полотна по заданному значению (разрешению) !DONE!
*2. Сделать отображение текушего разрешения над слайдером !DONE!
*3. Добавить функцию для очистки полотна !DONE!
4. Добавить функцию для актививации ластика (очистка полотна "попиксельно")
5. Добавить функцию для актививации RGB мода
*6. Добавить функцию для рисования заданным цветом !DONE!
7. Сделать нормальное масштабирование при изменении размера страницы
*/

const defaultCanvasSize = 16;
const defaultColor = "#6C8091";

let draw = false;
document.body.onmousedown = (e) => {
    draw = true;
    e.preventDefault(); //fix a problem when we can't draw bcs drag event appears
}
document.body.onmouseup = () => draw = false;

let canvasSize = defaultCanvasSize;
let color = defaultColor;
let canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("colorSelection");
const clearBtn = document.getElementById ("clearBtn");
const eraserBtn = document.getElementById ("eraserBtn");
const rgbBtn = document.getElementById ("rainbowModeBtn");
const slider = document.getElementById("canvasResolutionRange");
const modeBtns = {clearBtn, eraserBtn, rgbBtn};

function createCanvas(canvasSize){
    canvas.style.setProperty('--size', canvasSize);
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        //canvas.appendChild(div);

        div.addEventListener('mousedown', function(){
            div.style.setProperty('background-color', color);
        });
        div.addEventListener('mouseover', function(){
            if (!draw) return;
            div.style.setProperty('background-color', color);
        });
        canvas.appendChild(div);
    }
}

function randomColor(){
    let randomR = Math.floor(Math.random()*256);
    let randomG = Math.floor(Math.random()*256);
    let randomB = Math.floor(Math.random()*256);

    color = `rgb(${randomR}, ${randomG}, ${randomB})`;
    //console.log(color);
}

function activateEraser(){
    color = defaultColor;
}

function clearCanvas(){
    canvas.innerHTML = '';
    createCanvas(canvasSize);
}

function showCanvasResolution(canvasSize){
    document.getElementById('canvasResolutionValue').innerText = canvasSize + " x " 
    + canvasSize;
}

clearBtn.addEventListener('click', function(){
    clearCanvas();
});

colorPicker.addEventListener('change', function(){
    color = document.getElementById("colorSelection").value;
}); 

slider.addEventListener('input', function(){ //create canvas when we change resolution
    canvas.innerHTML = '';
    canvasSize = this.value;
    showCanvasResolution(canvasSize);
    createCanvas(canvasSize);
    
});

window.onload = () => {
    createCanvas(defaultCanvasSize);
}