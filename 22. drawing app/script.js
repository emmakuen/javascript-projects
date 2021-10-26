const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const decrease = document.getElementById('decrease')
const increase = document.getElementById('increase')
const clear = document.getElementById('clear')
const sizeEl = document.getElementById('size')
let colorPicker = document.getElementById('colorpicker')

let size = 20
let defaultColor = '#000'
let color = defaultColor
let isPressed = false
let x
let y
canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})


canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        
        x = x2
        y = y2
    }

})

clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, 800, 800);
})

increase.addEventListener('click', (e) => {
    size += 5
    sizeEl.innerHTML = size
})

decrease.addEventListener('click', (e) => {
    if(size > 5) {
        size -= 5
        sizeEl.innerHTML = size
    }
})

window.addEventListener("load", startup, false);

function startup() {
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", updateColor, false);
    
    colorPicker.select();
}

function updateColor(event) {
    color = event.target.value;
}



function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true)
    ctx.fillStyle = color
    ctx.fill()
    
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}



