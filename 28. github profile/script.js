const APIURL = "https://api.github.com/users/"


const form = document.getElementById('form')
const search = document.getElementById('search')
const avatar = document.querySelector('.avatar')
const main = document.getElementById('main')

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        
        createUserCard(data)
        getRepos(username)

    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username.')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)

    } catch(err) {
        ErrorCard('Problems fetching repos.')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})

function createUserCard(user) {
    const avatarURL = user['avatar_url']
    const name = user['name']
    const bio = user['bio']
    const followers = user['followers']
    const following = user['following']
    const repos = user['public_repos']
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${avatarURL}" alt="${name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${name}</h2>
            <p>${bio}</p>

            <ul>
                <li>${followers} <strong>Followers</strong></li>
                <li>${following} <strong>Following</strong></li>
                <li>${repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos">
            </div>
        </div>
    </div>`

    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML = `
    <div class='card'>
        <h2>${msg}</h2>
    </div>
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')
    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}