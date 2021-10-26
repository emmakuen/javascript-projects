const button = document.getElementById('button')
const toasts = document.getElementById('toasts')

const messages = [
    'Hello You',
    'Wonderful Day',
    'Love it!',
    'Success is right in front of you!',
    'Happy life',
    'Have a cup of tea with lots of love.',
    'Motion is life. Do some yoga!',
    'Yay, you rock!',
    'Be an achiever!',
    "Begin now! It's never late.",
    "Have fun!",
    "Enjoy some coffee.",
    "You are awesome!",
    "You rock!!"
]

button.addEventListener('click', () => createNotification())

function createNotification() {
    const notif = document.createElement('div')
    notif.classList.add('toast')

    notif.innerText = getRandomMessage()

    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}