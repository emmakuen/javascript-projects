const textEl = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = 'We Love Programming!'

let idx = 1
let speed = 300 / speedEl.value

writeText()

function writeText() {
    if(idx <= text.length) {
        textEl.innerText = text.slice(0, idx)
        idx++
    } else {
        textEl.innerText = ""
        idx = 1
    }
    setTimeout(writeText, speed)
}




speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)