import Pokemon from './pokemon.js';
import PokeAPI from './pokeapi.js';

// html elements
const playBtn = document.getElementById('play-btn');
const background = document.getElementById('transparent-background');

// choices
const choiceModal = document.getElementById('choices-modal');
const choices = document.querySelectorAll('.choices');

// name input
const inputDiv = document.getElementById('input-div');
const nameTextbox = document.getElementById('name-textbox');
const confirmNameBtn = document.getElementById('confirm-name-btn');

// game
const game = document.getElementById('game-container');
const gamePokemon = document.getElementById('game-pokemon');

// game buttons
const playGameButton = document.getElementById('game-play-btn');
const feedGameButton = document.getElementById('game-feed-btn');
const sleepGameButton = document.getElementById('game-sleep-btn');

// close buttons declarations
const closeBtns = document.querySelectorAll('.close-btn');
const closeChoices = closeBtns[0];
const closeNameInput = closeBtns[1];
const closeGame = closeBtns[2];

// close events
closeChoices.addEventListener('click', () => {
    background.style.display = 'none';
});

closeNameInput.addEventListener('click', () => {
    inputDiv.style.display = 'none';
    choiceModal.style.display = 'flex';
});

closeGame.addEventListener('click', () => {
    game.style.display = 'none';
    background.style.display = 'none';
    Pokemon.deleleInstance();
    pokemon = null;
    name = null;
    choice = null;
    gamePokemon.src = "";
});

// fetch/api
const api = new PokeAPI();

async function fetchPokemonList() {
  try {
    const reponse = await fetch("./pokemon_list.json");

    if(!reponse.ok) {
      throw new Error("Could not fetch");
    }

    const data = await reponse.json();
    return data;
  }
  catch(error) {
    console.error(error);
  }
}

// sprite in choices menu
async function setSprites() {
  const pokemonList = await fetchPokemonList()

  const spritePromises = pokemonList.map(async (pokemon, index) => {  
    const spriteUrl = await api.getSprite(pokemon.species);
    choices[index].src = spriteUrl;
  });

  await Promise.all(spritePromises);
}

// sprite in-game
async function setGameSprite(choice) {
  gamePokemon.src = await api.getSprite(choice);
}

// ===== main memu ===== (To revamp)
// Play
playBtn.addEventListener('click', () => {
    background.style.display = 'block';
    choiceModal.style.display = 'flex';
});

let pokemon = null, choice = null, name = null;

function closeChoices_OpenNameInput() {
  choiceModal.style.display = "none";
  inputDiv.style.display = 'block';
}

// buttons handler function
function gameButtonsFunction() {
  playGameButton.addEventListener('click', () => {
    pokemon.play();
  });

  feedGameButton.addEventListener('click', () => {
    pokemon.feed();
  });

  sleepGameButton.addEventListener('click', () => {
    pokemon.sleep();
  });
}

async function nameInputFunction() {
  const pokemonList = await fetchPokemonList();

  // choice
  choices[0].addEventListener('click', () => {
    choice = pokemonList[0].species;
    closeChoices_OpenNameInput();
  });

  choices[1].addEventListener('click', () => {
    choice = pokemonList[1].species;;
    closeChoices_OpenNameInput();
  });

  choices[2].addEventListener('click', () => {
    choice = pokemonList[2].species;;
    closeChoices_OpenNameInput();
  });

  // confirm button in name input
  confirmNameBtn.addEventListener('click', () => {
    // gets the input
    name = nameTextbox.value;
    // creates object based on choice and input
    if(pokemon === null) {
      if(choice === pokemonList[0].species) {
        pokemon = new Pokemon(name, pokemonList[0].species);
      } else if (choice === pokemonList[1].species) {
        pokemon = new Pokemon(name, pokemonList[1].species)
      } else if (choice === pokemonList[2].species) {
        pokemon = new Pokemon(name, pokemonList[2].species)
      }
    }

    nameTextbox.value = "";
    setGameSprite(choice);
    inputDiv.style.display = "none";
    game.style.display = "flex";
  });

  gameButtonsFunction();
}

setSprites();
nameInputFunction();