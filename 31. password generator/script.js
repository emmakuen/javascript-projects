// const lowercase = document.getElementById('lowercase')
// const uppercase = document.getElementById('uppercase')
// const numbers = document.getElementById('numbers')
// const symbols = document.getElementById('symbols')
// const lengthEl = document.getElementById('length')
// const generateBtn = document.getElementById('generate')
// const resultEl = document.getElementById('result')

// let result = ''
// let length = lengthEl.value

// let needLowerCase = true
// let needUpperCase = true
// let needSymbols = true
// let needNumbers = true


// function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
// }

// function getRandomLower() {
//     charIndex = getRandomArbitrary(97, 122)
//     return String.fromCharCode(charIndex)
// }

// function getRandomUpper() {
//     charIndex = getRandomArbitrary(65, 90)
//     return String.fromCharCode(charIndex)
// }

// function getRandomNumber() {
//     charIndex = getRandomArbitrary(48, 57)
//     return String.fromCharCode(charIndex)
// }

// function getRandomSymbol() {
//     charIndex = getRandomArbitrary(33, 47)
//     return String.fromCharCode(charIndex)
// }

// uppercase.addEventListener('change', (e) => {
//     if(e.target.checked) {
//         needUpperCase = true
//     } else {
//         needUpperCase = false
//     }
// })

// lowercase.addEventListener('change', (e) => {
//     if(e.target.checked) {
//         needLowerCase = true
//     } else {
//         needLowerCase = false
//     }
// })

// symbols.addEventListener('change', (e) => {
//     if(e.target.checked) {
//         needSymbols = true
//     } else {
//         needSymbols = false
//     }
// })

// numbers.addEventListener('change', (e) => {
//     if(e.target.checked) {
//         needNumbers = true
//     } else {
//         needNumbers = false
//     }
// })

// lengthEl.addEventListener('input', updateValue)

// function updateValue(e) {
//     length = e.target.value
// }


// generateBtn.addEventListener('click', () => generatePassword())


// function generatePassword() {
//     const conditions = [needLowerCase, needNumbers, needUpperCase, needSymbols]
//     const conditionCount = conditions.filter(Boolean).length

//     result = ""
//     if(needNumbers === true) {
//         for(let i=0; i < Math.floor(length / conditionCount); i++) {
//             result += getRandomLower()
//         }
//     }
//     if(needSymbols === true) {
//         for(let i=0; i < Math.floor(length / conditionCount); i++) {
//             result += getRandomSymbol()
//         }
//     }

//     if(needUpperCase === true) {
//         for(let i=0; i < Math.floor(length / conditionCount); i++) {
//             result += getRandomUpper()
//         }
//     }

//     if(needLowerCase === true) {
//         for(let i=result.length; i < length; i++) {
//             result += getRandomLower()
//         }
//     }

//     var shuffled = result.split('').sort(function(){return 0.5-Math.random()}).join('');

//     resultEl.innerText = shuffled
    
// }

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const symbolsEl = document.getElementById('symbols')
const numbersEl = document.getElementById('numbers')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password is copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ""
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }
    

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.split('').sort(function(){return 0.5-Math.random()}).join('')

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,."
    return symbols[Math.floor(Math.random() * symbols.length)]
}

