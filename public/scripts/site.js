
const getPokemonData = async () => {

    const parts = location.pathname.split('/').slice(1)

    const url = `/api/v1/` + (parts[0] === 'pokemon' ? `pokemon/${parts[1]}` : '')

    const result = await fetch(url)
    const { name, number, types } = await result.json()

    const nameH1 = document.querySelector('#pokemon-name')
    const typesDiv = document.querySelector('#pokemon-types')

    nameH1.textContent = name
    types.forEach(type => {
        const span = document.createElement('span')
        span.classList.add(type.toLowerCase())
        span.textContent = type
        typesDiv.append(span)
    })
}

getPokemonData()
