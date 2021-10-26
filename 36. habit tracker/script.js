const container = document.getElementById('container')
const colors = ["#CF6679", "#6200EE", "#CA5010", "#40C5AF", "#e9c46a", "#fec5bb", "#219ebc", "#e63946"]

const SQUARES = 500

for(let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', () => setColor(square))
    square.addEventListener('mouseout', () => removeColor(square))

    container.appendChild(square)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    console.log(123)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}