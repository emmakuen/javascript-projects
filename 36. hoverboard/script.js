const container = document.getElementById('container')
const statistics = document.querySelector('.statistics')
const spanEl = document.querySelector('.statistics span')
const colors = ["#CF6679", "#6200EE", "#CA5010", "#40C5AF", "#e9c46a", "#fec5bb", "#219ebc", "#e63946"]

const SQUARES = 500
const updatedColors = JSON.parse(localStorage.getItem('squareNotes'))
const updatedShadows = JSON.parse(localStorage.getItem('squareShadows'))
console.log(updatedColors)
console.log(updatedShadows)



for(let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.style.background = `#1d1d1d`
    square.style.boxShadow = `0 0 2px #000`

    if(updatedColors) {
        
        if(updatedColors[i] !== "rgb(29, 29, 29) none repeat scroll 0% 0%") {
            square.style.background = `${updatedColors[i]}`
            square.style.boxShadow = `${updatedShadows[i]}`
        }    
    } 

    square.addEventListener('click', () => {
        setColor(square, i)
        updateLS()
        
    })

    container.appendChild(square)
}

updateLS()


function setColor(element) {
    
    if(element.style.background !== "rgb(29, 29, 29) none repeat scroll 0% 0%") {
        element.style.background = `#1d1d1d`
        element.style.boxShadow = `0 0 2px #000`
    } else {
        const color = getRandomColor()
        element.style.background = color
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    }

}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function updateLS() {
    const squares = document.querySelectorAll('.container .square')
    const squareNotes = []
    const squareShadows = []
    squares.forEach(square => squareNotes.push(square.style.background))
    squares.forEach(square => squareShadows.push(square.style.boxShadow))

    let markedDays = 0
    for(let i = 0; i < squareNotes.length; i++) {
        if(squareNotes[i] !== "rgb(29, 29, 29) none repeat scroll 0% 0%") {
            markedDays += 1
        }
    }
    spanEl.innerText = `${markedDays}/500`

    localStorage.setItem('squareNotes', JSON.stringify(squareNotes))
    localStorage.setItem('squareShadows', JSON.stringify(squareShadows))

}


// // LOCAL STORAGE API
// console.log(JSON.parse(localStorage.getItem('colors')))
// localStorage.removeItem('squareNotes')
// localStorage.removeItem('squareShadows')