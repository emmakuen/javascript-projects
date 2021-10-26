buttonColors = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickPattern = []
let level = 0
let started = false
$(document).one("keydown", () => {
    nextSequence()
    $("h1").text(`Level ${level}`)
    started = true
    
})



$(".btn").click((e) => {
    if(started===true) {
        userChosenColor = e.target.id
        userClickPattern.push(userChosenColor)
        playSound(userChosenColor)
        animatePress(userChosenColor)
        checkAnswer(userClickPattern.length - 1)
        }
})




function checkAnswer(idx) {
    if(userClickPattern[idx] === gamePattern[idx]) {
        console.log("success")
        if(idx === gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
            userClickPattern = []
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        started = false
        startOver()
    }
}

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = buttonColors[randomNumber]
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    gamePattern.push(randomChosenColor)
    level++
    $("h1").text(`Level ${level}`)
}


function playSound(name) {
    var audio = new Audio()
    audio.src = `sounds/${name}.mp3`
    audio.play()
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed')
    setTimeout(() => $(`#${currentColor}`).removeClass('pressed'), 100)
}

function startOver() {
    $(document).one("keydown", () => {
        level = 0
        gamePattern = []
        started = true
        nextSequence()
    })
}