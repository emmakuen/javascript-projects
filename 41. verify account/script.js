const codes = document.querySelectorAll('.code')

codes[0].focus()    /* automatically focus on the first number */

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <= 9) {
            codes[idx].value = ''
            codes[idx].style.borderColor = '#3498db'
            setTimeout(() => codes[idx + 1].focus(), 10)
            
        } else if(e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
            codes[idx].style.borderColor = '#eee'
        } else {
            codes[idx].value = ''
            codes[idx].style.borderColor = 'red'
            codes[idx].style.outline = 'red'
        }
    })
})