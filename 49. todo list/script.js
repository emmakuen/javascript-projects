const input = document.getElementById('input')
const todos = document.getElementById('todos')
const form = document.getElementById('form')

const savedtodos = JSON.parse(localStorage.getItem('todos'))

if(savedtodos) {
    savedtodos.forEach(todo => generateTodo(todo))
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    generateTodo()
})




function generateTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if (todoText) {
        let listEl = document.createElement('li')

        if(todo && todo.completed) {
            listEl.classList.add('completed')
        }
        
        listEl.innerText = todoText

        listEl.addEventListener('click', (e) => {
            listEl.classList.toggle('completed')
            updateLS()
        })

        listEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todos.removeChild(listEl)
            updateLS()
        })

        todos.appendChild(listEl)
        input.value = ''
        updateLS()
    }
}

function updateLS() {
    listEls = document.querySelectorAll('li')

    const todos = []

    listEls.forEach(listEl => {
        todos.push({
            text: listEl.innerText,
            completed: listEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

