/*TODO:
*1. Сделать генерацию полотна по заданному значению (разрешению) !DONE!
*2. Сделать отображение текушего разрешения над слайдером !DONE!
*3. Добавить функцию для очистки полотна !DONE!
4. Добавить функцию для актививации ластика (очистка полотна "попиксельно")
5. Добавить функцию для актививации RGB мода
*6. Добавить функцию для рисования заданным цветом !DONE!
7. Сделать эффект "нажатой" кнопки при выборе режима
*/

const defaultCanvasSize = 16;
const defaultColor = "#6C8091";

let draw = false;
let canvasSize = defaultCanvasSize;
let canvas = document.getElementById("canvas");
let color = defaultColor;
const colorPicker = document.getElementById("colorSelection");
const clearBtn = document.getElementById ("clearBtn");
const eraserBtn = document.getElementById ("eraserBtn");
const rainbowModeBtn = document.getElementById ("rainbowModeBtn");
const slider = document.getElementById("canvasResolutionRange");

function createCanvas(canvasSize){
    canvas.style.setProperty('--size', canvasSize);
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        canvas.appendChild(div);

        div.addEventListener('mouseover', function(){
            if (!draw) return;
            div.style.setProperty('background-color', color);
        });

        div.addEventListener('mousedown', function(){
            div.style.setProperty('background-color', color);
        });
    }

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

window.addEventListener('mousedown', function(){
    draw = true;
});

window.addEventListener('mouseup', function(){
    draw = false;
});

window.onload = () => {
    createCanvas(defaultCanvasSize);
}