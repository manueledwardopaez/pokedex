import { getPokemon, getSpecies } from "./api.js"
import { createChart } from "./charts.js"

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')
const $input = document.querySelector('#input')
const $pokemonName = document.querySelector('#pokemon-name')

export function setImage(image) {
    $image.src = image
}

export function setDescription(text) {
    $description.textContent = text
}

export function setPokemonName(text) {
    $pokemonName.textContent = text
}

export function setInput(id) {
    $input.value = id
}

export function setRandomPokemon() {
    return Math.floor((Math.random() * 898) + 1)
}


export async function findPokemon(id) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
    const sprites = [pokemon.sprites.front_default]
    const stats = pokemon.stats.map(item => item.base_stat)

    for (const item in pokemon.sprites) {
        if(item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item] ) {
            sprites.push(pokemon.sprites[item])
        }
    }

    return {
        sprites,
        description: description.flavor_text,
        id: pokemon.id,
        name: pokemon.name,
        stats,
    }

}

const $screen = document.querySelector('#screen')
function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img
}

const $ligth = document.querySelector('#ligth')

function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es'
    speechSynthesis.speak(utterance);

    $ligth.classList.add('is-animated')

    utterance.addEventListener('end', () => {
        $ligth.classList.remove('is-animated')
    })
}

let activeChart = null

export async function setPokemon(id) {
    //Activar loader
    loader(true)
    const pokemon = await findPokemon(id)
    //Desactivar loader 
    loader(false)

    setImage(pokemon.sprites[0])
    setPokemonName(pokemon.name)
    setDescription(pokemon.description)
    speech(`${pokemon.name}. ${pokemon.description}`)

    if(activeChart instanceof Chart) {
        activeChart.destroy()
    }
    activeChart = createChart(pokemon.stats)

    return pokemon
}