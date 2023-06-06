const defaultColor = '#333333'
const defaultMode = 'color'
const defaultSize = 16


let currentColor = defaultColor
let currentMode = defaultMode
let size = defaultSize


const grid = document.querySelector('.grid')
const changeColorButton = document.querySelector('#color-picker')
const colorModeButton = document.querySelector('#color-mode')
const rainbowModeButton = document.querySelector('#rainbow-mode')
const eraserModeButton = document.querySelector('#eraser-mode')
const clearButton = document.querySelector('#clear')
const shownSize = document.querySelector('#shown-size')
const slider = document.querySelector('#size-picker')
const toggleableButtons = document.querySelectorAll('button.toggleable')



colorModeButton.addEventListener('click', buttonPressed)
rainbowModeButton.addEventListener('click', buttonPressed)
eraserModeButton.addEventListener('click', buttonPressed)
clearButton.addEventListener('click', reloadGrid)
changeColorButton.addEventListener('change', updateColor)


slider.addEventListener('mousemove', updateShownSize)
slider.addEventListener('change', updateSize)





function updateColor(e){
    currentColor = e.target.value
}







function buttonPressed(e){

    switch(e.target.id){

        case 'color-mode':
            currentMode = 'color'
            break;
        case 'rainbow-mode':
            currentMode = 'rainbow'
            break;
        case 'eraser-mode':
            currentMode = 'eraser'
            break;

    }
    

    for(let i = 0;i<toggleableButtons.length;i++){
        toggleableButtons[i].style.backgroundColor = '#fefefe';
        toggleableButtons[i].style.color = '#333';
    }

    e.target.style.backgroundColor = '#333';
    e.target.style.color = '#fefefe';
    
}


function updateShownSize(e){
    sizeValue = e.target.value

    shownSize.textContent = `${sizeValue} x ${sizeValue}`

}

function updateSize(e){
    size = e.target.value
    reloadGrid()

}




let isMouseClicked = false
document.body.onmousedown = ()=> isMouseClicked = true
document.body.onmouseup = ()=> isMouseClicked = false


function colorSquare(e){
    if(e.type === 'mousedown' || isMouseClicked) {
        if(currentMode==='color'){
            e.target.style.backgroundColor = currentColor;
        } else if(currentMode==='rainbow'){
            let red = Math.floor(Math.random()*256);
            let green = Math.floor(Math.random()*256);
            let blue = Math.floor(Math.random()*256);
            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
        } else if(currentMode==='eraser'){
            e.target.style.backgroundColor = '#fefefe';
        }
    }
}




function createGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0;i<size**2;i++){
        const gridSquare = document.createElement('div')
        gridSquare.classList.add('grid-square')
        gridSquare.addEventListener('mousedown', colorSquare)
        gridSquare.addEventListener('mouseover', colorSquare)
        grid.appendChild(gridSquare)

    }
}

function clearGrid(){
    grid.innerHTML = ''
}


function reloadGrid(){
    clearGrid()
    createGrid(size)
}





createGrid(size)