const nav = document.getElementById('active')
const icon = document.getElementById('toggle')

icon.addEventListener('click', () => {
    nav.classList.toggle('active')
})