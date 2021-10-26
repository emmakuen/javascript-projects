const container = document.querySelector(".container")

let randlist = []
function createImages(num) {
    for (let i = 0; i < num; i++) {
        var image = document.createElement("img")
        var randint = Math.floor(Math.random() * 100)
        while (randlist.includes(randint)) {
            var randint = Math.floor(Math.random() * 100)
        }
        randlist += randint
        image.setAttribute("src",`https://source.unsplash.com/random/${300 + randint}x${300 + randint}`)
        container.appendChild(image)
    }
}

createImages(20)