const buttons = document.querySelectorAll(".set .drum")
const images = ["crash.png", "kick.png", "snare.png", "tom1.png", "tom2.png", "tom3.png", "tom4.png"]

const sounds = ["crash.mp3", "kick-bass.mp3", "snare.mp3", "tom-1.mp3", "tom-2.mp3", "tom-3.mp3", "tom-4.mp3"]
const keys = []


buttons.forEach((button, idx) => {
    button.style.backgroundImage = `url('images/${images[idx]}')`
    keys.push(button.innerHTML)
    console.log(keys)

    // Mouse click
    button.addEventListener('click', () => {
        playSound(idx)
        buttonAnimation(idx)
    })
})

// Key press
document.addEventListener('keydown', (e) => {
    if(keys.includes(e.key)) {
        keyIdx = keys.indexOf(e.key)
        playSound(keyIdx)
        buttonAnimation(keyIdx)
    }
})

function playSound(idx) {
    var audio = new Audio(`sounds/${sounds[idx]}`)
    audio.play()
}

function buttonAnimation(idx) {
    buttons[idx].classList.add("pressed")

    setTimeout(() => {buttons[idx].classList.remove("pressed")}, 100)
}
