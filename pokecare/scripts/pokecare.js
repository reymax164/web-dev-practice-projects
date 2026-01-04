import {Treecko, Mudkip, Torchic} from './pokemon.js';
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

// close buttons declarations
const closeBtns = document.querySelectorAll('.close-btn');
const closeChoices = closeBtns[0];
const closeNameInput = closeBtns[1];

// close events
closeChoices.addEventListener('click', () => {
    background.style.display = 'none';
})

closeNameInput.addEventListener('click', () => {
    inputDiv.style.display = 'none';
    choiceModal.style.display = 'flex';
})

// fetch/api
const api = new PokeAPI();

// fetch sprites
choices[0].src = await api.getSprite(Treecko.getSpecies);
choices[1].src = await api.getSprite(Torchic.getSpecies);
choices[2].src = await api.getSprite(Mudkip.getSpecies);

// ===== main memu =====
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

// choice
choices[0].addEventListener('click', () => {
  choice = 0;
  closeChoices_OpenNameInput();
});

choices[1].addEventListener('click', () => {
  choice = 1;
  closeChoices_OpenNameInput();
});

choices[2].addEventListener('click', () => {
  choice = 2;
  closeChoices_OpenNameInput();
});

// confirm button in name input
confirmNameBtn.addEventListener('click', () => {
  // gets the input
  name = nameTextbox.value;
  // creates object based on choice and input
  if(pokemon === null) {
    if(choice === 0)       pokemon = new Treecko(name);
    else if (choice === 1) pokemon = new Torchic(name);
    else if (choice === 2) pokemon = new Mudkip(name);
  }
});

