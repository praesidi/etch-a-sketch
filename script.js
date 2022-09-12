/*TODO:
1. Сделать генерацию полотна по заданному значению (разрешению)
2. Сделать отображение текушего разрешения над слайдером !DONE!
3. Добавить функцию для очистки полотна
4. Добавить функцию для актививации ластика (очистка полотна "попиксельно")
5. Добавить функцию для актививации RGB мода
6. Добавить функцию для рисования заданным цветом
7. Сделать эффект "нажатой" кнопки при выборе режима
*/

const canvas = document.getElementsByClassName("canvas");
const slider = document.getElementsByClassName("slider");

/*function createCanvas(canvasResolution){
    
}

function paintOnCanvas(){

}

function eraseCanvasElement(){

}

function clearCanvas(){

}*/

function showSliderValue(val){
    document.getElementById("sliderValue").innerHTML = val + " x " + val;
}

/*slider.addEventListener("mouseup", function(){
    createCanvas(canvasResolution)
});*/

//console.log(canvasResolution);