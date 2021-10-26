const passwordInput = document.getElementById('password')
const backgroundDiv = document.querySelector('.background')




getPasswordLength() 

function getPasswordLength() {
    passwordInput.addEventListener('input', () => {
        
        let blur = 20 - (passwordInput.value.length * 1.5)
        backgroundDiv.style.filter = `blur(${blur}px)`
    })
}