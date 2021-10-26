const contents = document.querySelectorAll('.content')
const lists = document.querySelectorAll('nav ul li')

lists.forEach((list, idx) => {
    list.classList.remove('active')
    list.addEventListener('click', () => {
        
        contents.forEach(content => content.classList.remove('show'))

        lists.forEach(list => list.classList.remove('active'))
        
        contents[idx].classList.add('show')
        lists[idx].classList.add('active')

    })
})

