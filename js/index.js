import { setPokemon, setInput, setDescription, setRandomPokemon, setImage } from "./pokedex.js";

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $random = document.querySelector('#random')
const $nextImage = document.querySelector("#next-image");
const $prevImage = document.querySelector("#prev-image")

$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$random.addEventListener('click', handleRandomPokemon)
$nextImage.addEventListener("click", handleNextImage);
$prevImage.addEventListener("click", handlePrevImage);

let activePokemon = null
async function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData($form);
  const id = form.get("id");
  try{
    activePokemon = await setPokemon(id)
  } catch {
    setDescription('Error: No se encontro este pokemon')
  }
}

async function handleNextPokemon() {
    const id = (activePokemon === null || activePokemon.id === 898) ? 1 : activePokemon.id + 1
    activePokemon = await setPokemon(id)
    setInput(id)
}

async function handlePrevPokemon() {
    const id = (activePokemon === null || activePokemon.id === 1) ? 898 : activePokemon.id - 1
    activePokemon = await setPokemon(id)
    setInput(id)
}

async function handleRandomPokemon() {
    activePokemon = await setPokemon(setRandomPokemon())
    setInput(activePokemon.id)
}

let activeSprite = 0

function handleNextImage() {
    if(activePokemon === null) return false
    if(activeSprite >= activePokemon.sprites.length - 1) {
        activeSprite = 0
        setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite = activeSprite + 1
    return setImage(activePokemon.sprites[activeSprite])
}

function handlePrevImage() {
    if(activePokemon === null) return false
    if(activeSprite <= 0) {
        activeSprite = activePokemon.sprites.length - 1
        return setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite = activeSprite - 1
    return setImage(activePokemon.sprites[activeSprite])
}